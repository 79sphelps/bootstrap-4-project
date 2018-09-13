import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "./../core/api.service";
import { UtilsService } from "./../core/utils.service";
import { Subscription } from "rxjs/Subscription";
import { Image } from "../core/models/images.model";

@Component({
  selector: "carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"]
})
export class CarouselComponent implements OnInit, OnDestroy {
  pageTitle = "Images";
  imageListSub: Subscription;
  imageList: Image[];
  loading: boolean;
  error: boolean;
  query: "";

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getImageList();
  }

  private _getImageList() {
    this.loading = true;
    // Get future, public events
    this.imageListSub = this.api.getImages$().subscribe(
      res => {
        this.imageList = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  ngOnDestroy() {
    this.imageListSub.unsubscribe();
  }
}
