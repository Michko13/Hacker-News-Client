import { Component, OnInit } from '@angular/core';
import { RepositoryService } from "../../services/repository.service";
import { ItemModel } from "../../models/ItemModel";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  repository: RepositoryService;
  stories: ItemModel[] = [];

  constructor(repository: RepositoryService) {
    this.repository = repository;
  }

  ngOnInit(): void {
    let itemUrl = window.location.pathname + "stories";

    if(window.location.pathname == "/jobs") {
      itemUrl = "/jobstories";
    } else if (window.location.pathname == "/") {
      itemUrl = "/topstories";
    }

    this.repository.fetchItemsIds(itemUrl).subscribe({
      next: (itemIds) => {
        this.repository.itemIds = itemIds;
        this.fetchNextPage();
      }
    })
  }

  onScroll(): void {
    this.fetchNextPage();
  }

  private fetchNextPage(): void {
    this.repository.fetchNextPage().subscribe({
      next: (items) => {
        this.stories = this.stories.concat(items);
      }
    })
  }

}
