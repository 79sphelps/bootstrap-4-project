import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "./../core/api.service";
import { UtilsService } from "./../core/utils.service";
import { Subscription } from "rxjs/Subscription";
import { Homepage } from "../core/models/homepage.model";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit, OnDestroy {
  my_image: string;

  pageTitle = "About";

  homepageSub: Subscription;
  homepage: Homepage;

  loading: boolean;
  error: boolean;
  query = "";

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService
  ) {
    this.my_image = "../assets/images/rachel_phelps.JPG";
  }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getHomepageDetails();
  }

  private _getHomepageDetails() {
    this.loading = true;
    // Get future, public events
    this.homepageSub = this.api.getHomepageDetails$().subscribe(
      res => {
        this.homepage = res;
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
    this.homepageSub.unsubscribe();
  }
}
