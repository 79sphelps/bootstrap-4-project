// src/app/pages/admin/update-event/update-event.component.ts
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "../../../auth/auth.service";
import { ApiService } from "../../../core/api.service";
import { UtilsService } from "../../../core/utils.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Homepage } from "../../../core/models/homepage.model";

@Component({
  selector: "app-update-homepage",
  templateUrl: "./update-homepage.component.html",
  styleUrls: ["./update-homepage.component.scss"]
})
export class UpdateHomepageComponent implements OnInit, OnDestroy {
  pageTitle = "Update Homepage";
  routeSub: Subscription;
  homepageSub: Subscription;
  homepage: Homepage;
  loading: boolean;
  error: boolean;
  private _id: string;

  tabSub: Subscription;
  tab: string;

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private api: ApiService,
    public utils: UtilsService,
    private title: Title
  ) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);

    // Set event ID from route params and subscribe
    this.routeSub = this.route.params.subscribe(params => {
      this._id = params["id"];
      this._getHomepageDetails();
    });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams.subscribe(queryParams => {
      this.tab = queryParams["tab"] || "edit";
    });
  }

  private _getHomepageDetails() {
    this.loading = true;
    // GET event by ID
    this.homepageSub = this.api.getHomepageDetailsById$(this._id).subscribe(
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
    this.routeSub.unsubscribe();
    this.homepageSub.unsubscribe();
    this.tabSub.unsubscribe();
  }
}
