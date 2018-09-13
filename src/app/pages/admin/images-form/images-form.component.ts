import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiService } from "./../../../core/api.service";
import { Image } from "./../../../core/models/images.model";
import { ImagesFormService } from "./images-form.service";
// import { SubmittingComponent } from "../../../core/forms/submitting.component";

@Component({
  selector: "app-images-form",
  templateUrl: "./images-form.component.html",
  styleUrls: ["./images-form.component.scss"],
  providers: [ImagesFormService]
})
export class ImagesFormComponent implements OnInit, OnDestroy {
  @Input()
  image: Image;
  isEdit: boolean;

  // FormBuilder form
  imageForm: FormGroup;

  // Model storing initial form values
  formImage: Image;

  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;

  // Form submission
  submitImageObj: Image;
  submitImageSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public ef: ImagesFormService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formErrors = this.ef.formErrors;
    this.isEdit = !!this.image;
    this.submitBtnText = this.isEdit ? "Update Image" : "Create Image";
    // Set initial form data
    this.formImage = this._setFormImage();
    // Use FormBuilder to construct the form
    this._buildForm();
  }

  private _setFormImage() {
    if (!this.isEdit) {
      return new Image(null, null, null, null, null);
    } else {
      return new Image(
        this.image._id,
        this.image.caption,
        this.image.path,
        this.image.description,
        this.image.editable
      );
    }
  }

  private _buildForm() {
    this.imageForm = this.fb.group({
      caption: [
        this.formImage.caption,
        [
          Validators.required,
          Validators.minLength(this.ef.textMin),
          Validators.maxLength(this.ef.locMax)
        ]
      ],
      path: [
        this.formImage.path,
        [
          Validators.required,
          Validators.minLength(this.ef.textMin),
          Validators.maxLength(this.ef.locMax)
        ]
      ],
      description: [
        this.formImage.description,
        Validators.maxLength(this.ef.descMax)
      ],
      editable: [this.formImage.editable, Validators.required]
    });

    // Subscribe to form value changes
    this.formChangeSub = this.imageForm.valueChanges.subscribe(data =>
      this._onValueChanged()
    );

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an image that is no
    // longer valid
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.imageForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.imageForm) {
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
        // Set errors for fields
        // Clear previous error message (if any)
        this.formErrors[field] = "";
        _setErrMsgs(this.imageForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {
    return new Image(
      "",
      this.imageForm.get("caption").value,
      this.imageForm.get("path").value,
      this.imageForm.get("description").value,
      this.imageForm.get("editable").value
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitImageObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitImageSub = this.api
        .postImage$(this.submitImageObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitImageSub = this.api
        .editImage$(this.image._id, this.submitImageObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to image detail
    this.router.navigate(["/admin/images", res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.imageForm.reset();
  }

  ngOnDestroy() {
    if (this.submitImageSub) {
      this.submitImageSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }
}
