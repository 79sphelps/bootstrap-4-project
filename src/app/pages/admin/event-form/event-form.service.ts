// src/app/pages/admin/event-form/event-form.service.ts
import { Injectable } from "@angular/core";
// import { SubmittingComponent } from "../../../core/forms/submitting.component";

@Injectable()
export class EventFormService {
  validationMessages: any;
  // Set up errors object
  formErrors = {
    title: "",
    location: "",
    viewPublic: "",
    description: ""
  };

  // Min/maxlength validation
  textMin = 3;
  titleMax = 36;
  locMax = 1000;
  timeMax = 8;
  descMax = 2000;

  constructor() {
    this.validationMessages = {
      title: {
        required: `Title is <strong>required</strong>.`,
        minlength: `Title must be ${this.textMin} characters or more.`,
        maxlength: `Title must be ${this.titleMax} characters or less.`
      },
      location: {
        required: `Location is <strong>required</strong>.`,
        minlength: `Location must be ${this.textMin} characters or more.`,
        maxlength: `Location must be ${this.locMax} characters or less.`
      },
      viewPublic: {
        required: `You must specify whether this event should be publicly listed.`
      },
      description: {
        maxlength: `Description must be ${this.descMax} characters or less.`
      }
    };
  }
}
