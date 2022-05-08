import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RepositoryService } from "../../services/repository.service";
import { UserModel } from "../../models/UserModel";
import { ItemModel } from "../../models/ItemModel";
import { ItemTypeEnum } from "../../models/ItemTypeEnum";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  repository: RepositoryService;
  userId: string = "";
  user: UserModel;
  stories: ItemModel[] = [];

  constructor(repository: RepositoryService,
              private route: ActivatedRoute) {
    this.repository = repository;
    this.repository.resetVariables();
  }

  /* Bug, check user hunglee2 */
  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? "";

    this.repository.getUser(this.userId).subscribe((user) => {
      // converts epoch time to ms
      user.created *= 1000;
      this.user = user;

      this.repository.itemIds = user.submitted;

      this.fetchNextPage();
    });
  }

  onScroll(): void {
    this.fetchNextPage();
  }

  private fetchNextPage(): void {
    this.repository.getNextPage(ItemTypeEnum.Story)
      .subscribe((items) => {
        this.stories = this.stories.concat(items);
      });
  }
}
