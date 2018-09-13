import { Component, OnInit, OnDestroy } from "@angular/core";
import "rxjs/add/operator/map";
import { PaginationService } from "./pagination.service";
import { ApiService } from "./../core/api.service";
import { EventModel } from "./../core/models/event.model";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit, OnDestroy {
  constructor(
    private pagerService: PaginationService,
    private api: ApiService
  ) {}

  // array of all items to be paged
  private allItemsSub: Subscription;
  itemList: EventModel[];
  loading = false;
  error = false;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  ngOnInit() {
    // get dummy data
    /*
    this.http
      .get("./dummy-data.json")
      .map((response: Response) => response.json())
      .subscribe(data => {
        // set items to json response
        this.allItems = data;

        // initialize to page 1
        this.setPage(1);
      });
    */

    this.allItemsSub = this.api.getEvents$().subscribe(
      res => {
        this.itemList = res;
        this.loading = false;
        this.setPage(1);
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.itemList.length, page, 2);

    // get current page of items
    this.pagedItems = this.itemList.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }

  ngOnDestroy() {
    this.allItemsSub.unsubscribe();
  }
}
