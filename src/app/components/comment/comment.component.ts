import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from "../../models/ItemModel";
import { RepositoryService } from "../../services/repository.service";
import { ItemTypeEnum } from "../../models/ItemTypeEnum";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [RepositoryService]
})
export class CommentComponent implements OnInit {
  @Input() comment: ItemModel;
  @Input() commentLevel: number = 0;
  subComments: ItemModel[];

  constructor(private repository: RepositoryService) {
    this.repository.resetVariables();
  }

  ngOnInit(): void {
    if(this.comment.kids != null) {
      this.repository.itemIds = this.comment.kids;
      this.repository.getNextPage(ItemTypeEnum.Comment)
        .subscribe((items) => {
          this.subComments = items;
        })
    }
  }

}
