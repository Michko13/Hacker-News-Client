export class ItemModel {
  id: number;
  type: string;
  by: string;
  time: number;
  parent: number;
  kids: number;
  url: string;
  urlShortened: string;
  score: number;
  title: string;
  descendants: number;

  constructor() {
  }
}
