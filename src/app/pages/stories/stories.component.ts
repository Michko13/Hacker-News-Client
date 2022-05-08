import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "../../services/repository.service";
import { ItemModel } from "../../models/ItemModel";
import { NavigationEnd, Router } from "@angular/router";
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

  constructor(repository: RepositoryService,
              private router: Router) {
    this.repository = repository;
    this.repository.resetVariables();

    this.subscription = router.events.subscribe((event => {
      if (event instanceof NavigationEnd) {
        let itemUrl = window.location.pathname + "stories";

        if (window.location.pathname == "/jobs") {
          itemUrl = "/jobstories";
        }

        this.repository.getItemIds(itemUrl)
          .subscribe((itemIds) => {
            this.repository.itemIds = itemIds;
            this.getNextPage();
          });
      }
    }));
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getNextPage(): void {
    this.repository.getNextPage(ItemTypeEnum.Story)
      .subscribe((items) => {
        this.stories = this.stories.concat(items)
      });
  }

}
