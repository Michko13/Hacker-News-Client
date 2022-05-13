import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ItemModel } from "../models/ItemModel";
import { UserModel } from "../models/UserModel";
import { ItemTypeEnum } from "../models/ItemTypeEnum";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl: string = "https://hacker-news.firebaseio.com/v0";

  pageItemCount: number = 30;
  page: number = 0;
  itemIds: number[] = [];
  allItemsLoaded: boolean = false;
  itemsPushed: number = 0;

  constructor(private http: HttpClient) {
  }

  resetVariables(): void {
    this.page = 0;
    this.allItemsLoaded = false;
  }

  getNextPage(itemType: ItemTypeEnum): Observable<ItemModel[]> {
    let items: ItemModel[] = [];
    let itemIdsSliced = this.itemIds.slice(this.page * this.pageItemCount, this.page * this.pageItemCount + this.pageItemCount);

    if (itemIdsSliced.length == 0) {
      this.allItemsLoaded = true;
    }

    return new Observable<ItemModel[]>(subscriber => {
      itemIdsSliced.forEach((id, index) => {
        this.getItem(id).subscribe({
          next: (item: ItemModel) => {
            // filters out inappropriate item types and dead/deleted items (story and job are same in this context)
            if(((itemType == ItemTypeEnum.Story && (item.type == "job" || item.type == "story"))
              || (itemType == ItemTypeEnum.Comment && (item.type == "comment")))
              && !item.deleted && !item.dead) {

              if (item.url != null) {
                // gets only the domain of the url
                let regExp = new RegExp('^(?:https?:\\/\\/)?(?:[^@\\/\\n]+@)?(?:www\\.)?([^:\\/?\\n]+)');
                item.urlShortened = item.url.match(regExp)![1];
              }

              // converts epoch time to ms
              item.time *= 1000;

              items.push(item);
              this.itemsPushed++;
            }

            if (index == itemIdsSliced.length - 1) {
              subscriber.next(items);
            }
          }
        })
      })

      this.page++;
    })
  }

  getItem(id: number): Observable<ItemModel> {
    return this.http.get<ItemModel>(`${this.baseUrl}/item/${id}.json?print=pretty`);
  }

  getItemIds(storiesUrl: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}${storiesUrl}.json?print=pretty`);
  }

  getUser(id: string): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.baseUrl}/user/${id}.json?print=pretty`);
  }
}
