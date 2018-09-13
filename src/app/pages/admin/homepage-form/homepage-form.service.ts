import { Injectable } from "@angular/core";
// import { SubmittingComponent } from "../../../core/forms/submitting.component";

@Injectable()
export class HomepageFormService {
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
  locMax = 3000;
  timeMax = 8;
  descMax = 2000;

  constructor() {
    this.validationMessages = {
      welcomeMsg: {
        required: `Welcome message is <strong>required</strong>.`,
        minlength: `Welcome message must be ${
          this.textMin
        } characters or more.`,
        maxlength: `Welcome message must be ${this.locMax} characters or less.`
      },
      aboutMsg: {
        required: `About message is <strong>required</strong>.`,
        minlength: `About message must be ${this.textMin} characters or more.`,
        maxlength: `About message must be ${this.locMax} characters or less.`
      },
      aboutQuote: {
        required: `You must specify a quote that represents the company motto.`
      },
      personHighlight: {
        required: `You must specify a key person to highlight on the homepage.`
      },
      personHighlightQuote: {
        required: `You must specify a key person quote on the homepage.`
      }
    };
  }
}
