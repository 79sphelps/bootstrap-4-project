// src/app/core/api.service.ts
import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";
import { ENV } from "./env.config";
import { EventModel } from "./models/event.model";
import { Testimonial } from "./models/testimonials.model";
import { Image } from "./models/images.model";
import { Homepage } from "./models/homepage.model";
import { Personel } from "./models/personel.model";

@Injectable()
export class ApiService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private get _authHeader(): string {
    return `Bearer ${localStorage.getItem("access_token")}`;
  }

  // GET list of public, future events
  getEvents$(): Observable<EventModel[]> {
    return this.http
      .get(`${ENV.BASE_API}events`)
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET all events - private and public (admin only)
  getAdminEvents$(): Observable<EventModel[]> {
    return this.http
      .get(`${ENV.BASE_API}events/admin`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET an event by ID (login required)
  getEventById$(id: string): Observable<EventModel> {
    return this.http
      .get(`${ENV.BASE_API}event/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  /*
  // GET RSVPs by event ID (login required)
  getRsvpsByEventId$(eventId: string): Observable<RsvpModel[]> {
    return this.http
      .get(`${ENV.BASE_API}event/${eventId}/rsvps`, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }
  */

  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    const errorMsg = err.message || "Error: Unable to complete request.";
    if (err.message && err.message.indexOf("No JWT present") > -1) {
      this.auth.login();
    }
    return Observable.throw(errorMsg);
  }

  // GET all events a specific user has RSVPed to (login required)
  getUserEvents$(userId: string): Observable<EventModel[]> {
    return this.http
      .get<EventModel[]>(`${ENV.BASE_API}events/${userId}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  /*
  // POST new RSVP (login required)
  postRsvp$(rsvp: RsvpModel): Observable<RsvpModel> {
    return this.http
      .post(`${ENV.BASE_API}rsvp/new`, rsvp, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
  }

  // PUT existing RSVP (login required)
  editRsvp$(id: string, rsvp: RsvpModel): Observable<RsvpModel> {
    return this.http
      .put(`${ENV.BASE_API}rsvp/${id}`, rsvp, {
        headers: new HttpHeaders().set('Authorization', this._authHeader)
      })
      .pipe(
        catchError((error) => this._handleError(error))
      );
    }
  */

  // POST new event (admin only)
  postEvent$(event: EventModel): Observable<EventModel> {
    return this.http
      .post(`${ENV.BASE_API}event/new`, event, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // PUT existing event (admin only)
  editEvent$(id: string, event: EventModel): Observable<EventModel> {
    return this.http
      .put(`${ENV.BASE_API}event/${id}`, event, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // DELETE existing event and all associated RSVPs (admin only)
  deleteEvent$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}event/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // ---------------------------------------------------------------------
  // GET list of public testimonials
  getTestimonials$(): Observable<Testimonial[]> {
    return this.http
      .get(`${ENV.BASE_API}testimonials`)
      .pipe(catchError(error => this._handleError(error)));
  }

  // ---------------------------------------------------------------------
  // GET list of public images
  getImages$(): Observable<Image[]> {
    return this.http
      .get(`${ENV.BASE_API}admin/images`)
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET an event by ID (login required)
  getImageById$(id: string): Observable<Image> {
    return this.http
      .get(`${ENV.BASE_API}admin/images/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // POST new event (admin only)
  postImage$(image: Image): Observable<Image> {
    delete image._id;

    return this.http
      .post(`${ENV.BASE_API}admin/images/new`, image, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // PUT existing event (admin only)
  editImage$(id: string, image: Image): Observable<Image> {
    return this.http
      .put(`${ENV.BASE_API}admin/images/${id}`, image, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // DELETE existing event and all associated RSVPs (admin only)
  deleteImage$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}admin/images/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // ---------------------------------------------------------------------
  // GET list of personel
  getPersonel$(): Observable<Personel[]> {
    return this.http
      .get(`${ENV.BASE_API}admin/personel`)
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET an event by ID (login required)
  getPersonelById$(id: string): Observable<Personel> {
    return this.http
      .get(`${ENV.BASE_API}admin/personel/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // POST new event (admin only)
  postPersonel$(personel: Personel): Observable<Personel> {
    delete personel._id;

    return this.http
      .post(`${ENV.BASE_API}admin/personel/new`, personel, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // PUT existing event (admin only)
  editPersonel$(id: string, personel: Personel): Observable<Personel> {
    return this.http
      .put(`${ENV.BASE_API}admin/personel/${id}`, personel, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // DELETE existing event and all associated RSVPs (admin only)
  deletePersonel$(id: string): Observable<any> {
    return this.http
      .delete(`${ENV.BASE_API}admin/personel/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // ---------------------------------------------------------------------
  // GET list of public homepage details
  getHomepageDetails$(): Observable<Homepage> {
    return this.http
      .get(`${ENV.BASE_API}homepage`)
      .pipe(catchError(error => this._handleError(error)));
  }

  // GET an event by ID (login required)
  getHomepageDetailsById$(id: string): Observable<Homepage> {
    return this.http
      .get(`${ENV.BASE_API}homepage/${id}`, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }

  // PUT existing homepage (admin only)
  editHomepage$(id: string, homepage: Homepage): Observable<Homepage> {
    return this.http
      .put(`${ENV.BASE_API}homepage/${id}`, homepage, {
        headers: new HttpHeaders().set("Authorization", this._authHeader)
      })
      .pipe(catchError(error => this._handleError(error)));
  }
}
