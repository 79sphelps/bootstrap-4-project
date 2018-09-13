import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiService } from "../../../core/api.service";
import { Homepage } from "../../../core/models/homepage.model";
import { HomepageFormService } from "./homepage-form.service";

@Component({
  selector: "app-homepage-form",
  templateUrl: "./homepage-form.component.html",
  styleUrls: ["./homepage-form.component.scss"],
  providers: [HomepageFormService]
})
export class HomepageFormComponent implements OnInit, OnDestroy {
  @Input()
  homepage: Homepage;
  isEdit: boolean;

  // FormBuilder form
  homepageForm: FormGroup;

  // Model storing initial form values
  formHomepage: Homepage;

  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;

  // Form submission
  submitHomepageObj: Homepage;
  submitHomepageSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public ef: HomepageFormService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formErrors = this.ef.formErrors;
    this.isEdit = !!this.homepage;
    this.submitBtnText = this.isEdit ? "Update Homepage" : "Create Homepage";
    // Set initial form data
    this.formHomepage = this._setFormEvent();
    // Use FormBuilder to construct the form
    this._buildForm();
  }

  private _setFormEvent() {
    if (!this.isEdit) {
      // If creating a new event, create new
      // FormEventModel with default null data
      // return new FormEventModel(null, null, null, null, null, null, null);
      return new Homepage(
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
      );
    } else {
      return new Homepage(
        this.homepage._id,
        this.homepage.welcomeMsg,
        this.homepage.aboutMsg,
        this.homepage.aboutQuote,
        this.homepage.personHighlight,
        this.homepage.personHighlightQuote,
        this.homepage.personHighlightBio,
        this.homepage.personHighlightThumbnail,
        this.homepage.personHighlightThumbnailCaption,
        this.homepage.editable
      );
    }
  }

  private _buildForm() {
    this.homepageForm = this.fb.group({
      welcomeMsg: [
        this.formHomepage.welcomeMsg,
        [
          Validators.required,
          Validators.minLength(this.ef.textMin),
          Validators.maxLength(this.ef.locMax)
        ]
      ],
      aboutMsg: [
        this.formHomepage.aboutMsg,
        [
          Validators.required,
          Validators.minLength(this.ef.textMin),
          Validators.maxLength(this.ef.locMax)
        ]
      ],
      aboutQuote: [this.formHomepage.aboutQuote, [Validators.required]],
      personHighlight: [
        this.formHomepage.personHighlight,
        [Validators.required]
      ],
      personHighlightQuote: [
        this.formHomepage.personHighlightQuote,
        [Validators.required]
      ],
      personHighlightBio: [
        this.formHomepage.personHighlightBio,
        [Validators.required]
      ],
      personHighlightThumbnail: [
        this.formHomepage.personHighlightThumbnail,
        [Validators.required]
      ],
      personHighlightThumbnailCaption: [
        this.formHomepage.personHighlightThumbnailCaption,
        [Validators.required]
      ],
      editable: [this.formHomepage.editable, [Validators.required]]
    });

    // Subscribe to form value changes
    this.formChangeSub = this.homepageForm.valueChanges.subscribe(data =>
      this._onValueChanged()
    );

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an event that is no
    // longer valid (for example, an event in the past)
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.homepageForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.homepageForm) {
      return;
    }
    const _setErrMsgs = (
      control: AbstractControl,
      errorsObj: any,
      field: string
    ) => {
      if (control && control.dirty && control.invalid) {
        const messages = this.ef.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
            errorsObj[field] += messages[key] + "<br>";
          }
        }
      }
    };

    // Check validation and set errors
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // Set errors for fields not inside datesGroup
        // Clear previous error message (if any)
        this.formErrors[field] = "";
        _setErrMsgs(this.homepageForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {
    // Convert form startDate/startTime and endDate/endTime
    // to JS dates and populate a new EventModel for submission
    return new Homepage(
      this.homepage ? this.homepage._id : null,
      this.homepageForm.get("welcomeMsg").value,
      this.homepageForm.get("aboutMsg").value,
      this.homepageForm.get("aboutQuote").value,
      this.homepageForm.get("personHighlight").value,
      this.homepageForm.get("personHighlightQuote").value,
      this.homepageForm.get("personHighlightBio").value,
      this.homepageForm.get("personHighlightThumbnail").value,
      this.homepageForm.get("personHighlightThumbnailCaption").value,
      this.homepageForm.get("editable").value
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitHomepageObj = this._getSubmitObj();

    this.submitHomepageSub = this.api
      .editHomepage$(this.homepage._id, this.submitHomepageObj)
      .subscribe(
        data => this._handleSubmitSuccess(data),
        err => this._handleSubmitError(err)
      );
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to event detail
    this.router.navigate(["/admin/homepage", res._id]);
    //this.router.navigate(["/homepage"]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.homepageForm.reset();
  }

  ngOnDestroy() {
    if (this.submitHomepageSub) {
      this.submitHomepageSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }
}
