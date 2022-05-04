import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ItemModel } from "../models/ItemModel";

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private baseUrl: string = "https://hacker-news.firebaseio.com/v0";
  private page: number = 0;
  private pageItemCount: number = 30;
  itemIds: number[];
  allItemsLoaded: boolean = false;

  constructor(private http: HttpClient) {
  }

  fetchNextPage(): Observable<ItemModel[]> {
    let items: ItemModel[] = [];
    let itemIdsSliced = this.itemIds.slice(this.page * this.pageItemCount, this.page * this.pageItemCount + this.pageItemCount);

    if (itemIdsSliced.length == 0) {
      this.allItemsLoaded = true;
    }

    return new Observable<ItemModel[]>(subscriber => {
      itemIdsSliced.forEach((id, index) => {
        this.getItem(id).subscribe({
          next: (response: ItemModel) => {
            if (response.url != null) {
              // gets only the domain of the url
              let regExp = new RegExp('^(?:https?:\\/\\/)?(?:[^@\\/\\n]+@)?(?:www\\.)?([^:\\/?\\n]+)');
              response.urlShortened = response.url.match(regExp)![1];
            }

            // converts epoch time to ms
            response.time = response.time * 1000;
            items.push(response);

            // if its the last item to load, push the whole array to subscribers
            if (index == itemIdsSliced.length - 1) {
              subscriber.next(items);
            }
          }
        })
      })

      this.page++;
    })
  }

  fetchItemsIds(storiesUrl: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}${storiesUrl}.json?print=pretty`);
  }

  private getItem(id: number): Observable<ItemModel> {
    return this.http.get<ItemModel>(`${this.baseUrl}/item/${id}.json?print=pretty`);
  }
}
