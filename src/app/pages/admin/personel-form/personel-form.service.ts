import { Injectable } from "@angular/core";
// import { SubmittingComponent } from "../../../core/forms/submitting.component";

@Injectable()
export class PersonelFormService {
  validationMessages: any;
  // Set up errors object
  formErrors = {
    name: "",
    role: "",
    editable: ""
  };

  // Min/maxlength validation
  textMin = 3;
  titleMax = 36;
  locMax = 1000;
  timeMax = 8;
  descMax = 2000;

  constructor() {
    this.validationMessages = {
      name: {
        required: `Name is <strong>required</strong>.`,
        minlength: `Name must be ${this.textMin} characters or more.`,
        maxlength: `Name must be ${this.titleMax} characters or less.`
      },
      role: {
        required: `Role is <strong>required</strong>.`,
        minlength: `Role must be ${this.textMin} characters or more.`,
        maxlength: `Role must be ${this.locMax} characters or less.`
      },
      editable: {
        required: `You must specify whether this personel should be editable.`
      }
    };
  }
}
