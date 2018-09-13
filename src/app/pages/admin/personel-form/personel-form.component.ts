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
import { Personel } from "./../../../core/models/personel.model";
import { PersonelFormService } from "./personel-form.service";
import { SubmittingComponent } from "../../../core/forms/submitting.component";

@Component({
  selector: "app-personel-form",
  templateUrl: "./personel-form.component.html",
  styleUrls: ["./personel-form.component.scss"],
  providers: [PersonelFormService]
})
export class PersonelFormComponent implements OnInit, OnDestroy {
  @Input()
  person: Personel;
  isEdit: boolean;

  // FormBuilder form
  personelForm: FormGroup;

  // Model storing initial form values
  formPersonel: Personel;

  // Form validation and disabled logic
  formErrors: any;
  formChangeSub: Subscription;

  // Form submission
  submitPersonelObj: Personel;
  submitPersonelSub: Subscription;
  error: boolean;
  submitting: boolean;
  submitBtnText: string;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public ef: PersonelFormService,
    private router: Router
  ) {}

  ngOnInit() {
    this.formErrors = this.ef.formErrors;
    this.isEdit = !!this.person;
    this.submitBtnText = this.isEdit ? "Update Personel" : "Create Personel";
    // Set initial form data
    this.formPersonel = this._setFormPersonel();
    // Use FormBuilder to construct the form
    this._buildForm();
  }

  private _setFormPersonel() {
    if (!this.isEdit) {
      return new Personel(null, null, null, null);
    } else {
      return new Personel(
        this.person._id,
        this.person.name,
        this.person.role,
        this.person.editable
      );
    }
  }

  private _buildForm() {
    this.personelForm = this.fb.group({
      name: [
        this.formPersonel.name,
        [
          Validators.required,
          Validators.minLength(this.ef.textMin),
          Validators.maxLength(this.ef.locMax)
        ]
      ],
      role: [
        this.formPersonel.role,
        [
          Validators.required,
          Validators.minLength(this.ef.textMin),
          Validators.maxLength(this.ef.locMax)
        ]
      ],
      editable: [this.formPersonel.editable, Validators.required]
    });

    // Subscribe to form value changes
    this.formChangeSub = this.personelForm.valueChanges.subscribe(data =>
      this._onValueChanged()
    );

    // If edit: mark fields dirty to trigger immediate
    // validation in case editing an person that is no
    // longer valid
    if (this.isEdit) {
      const _markDirty = group => {
        for (const i in group.controls) {
          if (group.controls.hasOwnProperty(i)) {
            group.controls[i].markAsDirty();
          }
        }
      };
      _markDirty(this.personelForm);
    }

    this._onValueChanged();
  }

  private _onValueChanged() {
    if (!this.personelForm) {
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
        // Clear previous error message (if any)
        this.formErrors[field] = "";
        _setErrMsgs(this.personelForm.get(field), this.formErrors, field);
      }
    }
  }

  private _getSubmitObj() {
    return new Personel(
      "",
      this.personelForm.get("name").value,
      this.personelForm.get("role").value,
      this.personelForm.get("editable").value
    );
  }

  onSubmit() {
    this.submitting = true;
    this.submitPersonelObj = this._getSubmitObj();

    if (!this.isEdit) {
      this.submitPersonelSub = this.api
        .postPersonel$(this.submitPersonelObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    } else {
      this.submitPersonelSub = this.api
        .editPersonel$(this.person._id, this.submitPersonelObj)
        .subscribe(
          data => this._handleSubmitSuccess(data),
          err => this._handleSubmitError(err)
        );
    }
  }

  private _handleSubmitSuccess(res) {
    this.error = false;
    this.submitting = false;
    // Redirect to person detail
    this.router.navigate(["/admin/personel", res._id]);
  }

  private _handleSubmitError(err) {
    console.error(err);
    this.submitting = false;
    this.error = true;
  }

  resetForm() {
    this.personelForm.reset();
  }

  ngOnDestroy() {
    if (this.submitPersonelSub) {
      this.submitPersonelSub.unsubscribe();
    }
    this.formChangeSub.unsubscribe();
  }
}
