import { Component, OnDestroy, Input } from "@angular/core";
import { Personel } from "./../../../../core/models/personel.model";
import { Subscription } from "rxjs";
import { ApiService } from "./../../../../core/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-delete-person",
  templateUrl: "./delete-person.component.html",
  styleUrls: ["./delete-person.component.scss"]
})
export class DeletePersonComponent implements OnDestroy {
  @Input()
  person: Personel;
  confirmDelete: string;
  deleteSub: Subscription;
  submitting: boolean;
  error: boolean;

  constructor(private api: ApiService, private router: Router) {}

  removePerson() {
    this.submitting = true;
    // DELETE person by ID
    this.deleteSub = this.api.deletePersonel$(this.person._id).subscribe(
      res => {
        this.submitting = false;
        this.error = false;
        console.log(res.message);
        // If successfully deleted personel, redirect to Admin
        this.router.navigate(["/personel"]);
      },
      err => {
        console.error(err);
        this.submitting = false;
        this.error = true;
      }
    );
  }

  ngOnDestroy() {
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }
}
