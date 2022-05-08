import { Component, Input, OnInit } from '@angular/core';
import { ItemModel } from "../../models/ItemModel";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  @Input() story: ItemModel;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
