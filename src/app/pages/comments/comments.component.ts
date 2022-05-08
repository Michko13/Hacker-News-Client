import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RepositoryService } from "../../services/repository.service";
import { ItemModel } from "../../models/ItemModel";
import { ItemTypeEnum } from "../../models/ItemTypeEnum";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  private subscription: Subscription;

  repository: RepositoryService;
  story: ItemModel;
  comments: ItemModel[] = [];

  constructor(repository: RepositoryService,
              private router: Router,
              private route: ActivatedRoute) {
    this.repository = repository;
    repository.resetVariables();

    const storyId = parseInt(this.route.snapshot.paramMap.get('id')!);
    if (isNaN(storyId)) {
      router.navigate(['/top']);
    }

    this.subscription = router.events.subscribe((event => {
      if (event instanceof NavigationEnd) {
        const navigation = this.router.getCurrentNavigation();
        if (navigation!.extras.state) {
          this.story = navigation!.extras.state['story'];
          this.loadComments();
        } else {
          this.repository.getItem(storyId).subscribe((item) => {
            this.story = item;
            this.loadComments();
          });
        }
      }
    }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  loadComments(): void {
    this.repository.itemIds = this.story.kids;
    this.repository.getNextPage(ItemTypeEnum.Comment).subscribe((items) => {
      this.comments = items;
    })
  }

}
