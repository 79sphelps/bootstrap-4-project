import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "../../../auth/auth.service";
import { ApiService } from "../../../core/api.service";
import { UtilsService } from "../../../core/utils.service";
import { Subscription } from "rxjs/Subscription";
import { Homepage } from "../../../core/models/homepage.model";

@Component({
  selector: "app-homepage-details",
  templateUrl: "./homepage-details.component.html",
  styleUrls: ["./homepage-details.component.scss"]
})
export class HomepageDetailsComponent implements OnInit, OnDestroy {
  pageTitle = "Homepage";
  homepageListSub: Subscription;
  homepage: Homepage;
  loading: boolean;
  error: boolean;

  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getHomepageDetails();
  }

  private _getHomepageDetails() {
    this.loading = true;
    // Get future, public events
    this.homepageListSub = this.api.getHomepageDetails$().subscribe(
      res => {
        this.homepage = res;
        console.log(this.homepage);
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
    this.homepageListSub.unsubscribe();
  }
}
