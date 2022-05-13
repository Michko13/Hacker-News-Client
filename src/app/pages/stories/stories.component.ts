import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "../../services/repository.service";
import { ItemModel } from "../../models/ItemModel";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ItemTypeEnum } from "../../models/ItemTypeEnum";

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {
  private subscription: Subscription;

  repository: RepositoryService;
  stories: ItemModel[] = [];
  userId: string = "";
  isUserSubmissions: boolean = false;

  constructor(repository: RepositoryService,
              private router: Router,
              private route: ActivatedRoute) {
    this.repository = repository;
    this.repository.resetVariables();

    this.userId = this.route.snapshot.paramMap.get('id') ?? "";

    if (!this.userId) {
      let itemUrl = router.url + "stories";

      if (router.url == "/jobs") {
        itemUrl = "/jobstories";
      }

      this.repository.getItemIds(itemUrl)
        .subscribe((itemIds) => {
          this.repository.itemIds = itemIds;
          this.getNextPage();
        });
    } else {
      this.repository.getUser(this.userId).subscribe((user) => {
        this.repository.itemIds = user.submitted;
        this.isUserSubmissions = true;

        console.log(user);
        this.getNextPage();
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getNextPage(): void {
    this.repository.getNextPage(ItemTypeEnum.Story)
      .subscribe((items) => {
        this.stories = this.stories.concat(items);

        if(this.isUserSubmissions && !this.repository.allItemsLoaded) {
          if(this.repository.itemsPushed <= this.repository.pageItemCount) {
            this.getNextPage();
          } else {
            this.repository.itemsPushed = 0;
          }
        }
      });
  }

}
