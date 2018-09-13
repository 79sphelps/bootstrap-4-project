import { Component, OnInit, OnDestroy } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ApiService } from "./../core/api.service";
import { UtilsService } from "./../core/utils.service";
import { Subscription } from "rxjs/Subscription";
import { EventModel } from "./../core/models/event.model";
import { Testimonial } from "./../core/models/testimonials.model";

@Component({
  selector: "services",
  templateUrl: "./services.component.html",
  styleUrls: ["./services.component.css"]
})
export class ServicesComponent implements OnInit, OnDestroy {
  pageTitle = "Events";
  eventListSub: Subscription;
  eventList: EventModel[];

  testimonialsListSub: Subscription;
  testimonialsList: Testimonial[];

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
    this._getEventList();
    this._getTestimonialList();
  }

  private _getEventList() {
    this.loading = true;
    // Get future, public events
    this.eventListSub = this.api.getEvents$().subscribe(
      res => {
        this.eventList = res;
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
        this.error = true;
      }
    );
  }

  private _getTestimonialList() {
    this.loading = true;
    // Get future, public events
    this.testimonialsListSub = this.api.getTestimonials$().subscribe(
      res => {
        this.testimonialsList = res;
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
    this.eventListSub.unsubscribe();
    this.testimonialsListSub.unsubscribe();
  }
}
