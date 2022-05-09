export class ItemModel {
  id: number;
  deleted: boolean;
  type: string;
  by: string;
  time: number;
  text: string;
  dead: boolean;
  parent: number;
  kids: number[];
  url: string;
  urlShortened: string;
  score: number;
  title: string;
  descendants: number;
}
