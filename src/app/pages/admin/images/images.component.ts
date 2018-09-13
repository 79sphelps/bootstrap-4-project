import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./../../../auth/auth.service";
import { ApiService } from "./../../../core/api.service";
import { UtilsService } from "./../../../core/utils.service";
import { FilterSortService } from "./../../../core/filter-sort.service";
import { Subscription } from "rxjs";
import { Image } from "./../../../core/models/images.model";

import { expandCollapse } from "./../../../core/expand-collapse.animation";

@Component({
  selector: "app-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.scss"],
  animations: [expandCollapse]
})
export class ImagesComponent implements OnInit, OnDestroy {
  pageTitle = "Images";
  imagesSub: Subscription;
  imageList: Image[];
  filteredImages: Image[];
  loading: boolean;
  error: boolean;
  query = "";

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    public fs: FilterSortService
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getImageList();
  }

  private _getImageList() {
    this.loading = true;

    // Get all (admin) events
    this.imagesSub = this.api.getImages$().subscribe(
      res => {
        this.imageList = res;
        this.filteredImages = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  searchImages() {
    this.filteredImages = this.fs.search(this.imageList, this.query, "_id");
  }

  resetQuery() {
    this.query = "";
    this.filteredImages = this.imageList;
  }

  ngOnDestroy() {
    this.imagesSub.unsubscribe();
  }
}
