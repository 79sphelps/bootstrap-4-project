import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { AuthService } from "./../../../auth/auth.service";
import { ApiService } from "./../../../core/api.service";
import { UtilsService } from "./../../../core/utils.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Personel } from "./../../../core/models/personel.model";

@Component({
  selector: "app-personel-update",
  templateUrl: "./personel-update.component.html",
  styleUrls: ["./personel-update.component.scss"]
})
export class PersonelUpdateComponent implements OnInit, OnDestroy {
  pageTitle = "Update Personel";
  routeSub: Subscription;
  personelSub: Subscription;
  person: Personel;
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
      this._getPersonel();
    });

    // Subscribe to query params to watch for tab changes
    this.tabSub = this.route.queryParams.subscribe(queryParams => {
      this.tab = queryParams["tab"] || "edit";
    });
  }

  private _getPersonel() {
    this.loading = true;
    // GET event by ID
    this.personelSub = this.api.getPersonelById$(this._id).subscribe(
      res => {
        this.person = res;
        console.log(this.person);
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
    this.personelSub.unsubscribe();
    this.tabSub.unsubscribe();
  }
}
