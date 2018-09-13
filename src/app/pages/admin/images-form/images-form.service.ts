import { Injectable } from "@angular/core";
// import { SubmittingComponent } from "../../../core/forms/submitting.component";

@Injectable()
export class ImagesFormService {
  validationMessages: any;
  // Set up errors object
  formErrors = {
    caption: "",
    path: "",
    editable: "",
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
      caption: {
        required: `Caption is <strong>required</strong>.`,
        minlength: `Caption must be ${this.textMin} characters or more.`,
        maxlength: `Caption must be ${this.titleMax} characters or less.`
      },
      path: {
        required: `Path is <strong>required</strong>.`,
        minlength: `Path must be ${this.textMin} characters or more.`,
        maxlength: `Path must be ${this.locMax} characters or less.`
      },
      description: {
        maxlength: `Description must be ${this.descMax} characters or less.`
      },
      editable: {
        required: `You must specify whether this image should be editable.`
      }
    };
  }
}
