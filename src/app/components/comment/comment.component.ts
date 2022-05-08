import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from "../../models/ItemModel";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: ItemModel;

  constructor() { }

  ngOnInit(): void {
    console.log(this.comment);
  }

}
