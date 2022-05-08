export class ItemModel {
  id: number;
  deleted: boolean;
  type: string;
  by: string;
  time: number;
  dead: boolean;
  parent: number;
  kids: number[];
  url: string;
  urlShortened: string;
  score: number;
  title: string;
  descendants: number;
}
