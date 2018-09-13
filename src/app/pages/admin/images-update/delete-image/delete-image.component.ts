import { Component, OnDestroy, Input } from "@angular/core";
import { Image } from "./../../../../core/models/images.model";
import { Subscription } from "rxjs";
import { ApiService } from "./../../../../core/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-delete-image",
  templateUrl: "./delete-image.component.html",
  styleUrls: ["./delete-image.component.scss"]
})
export class DeleteImageComponent implements OnDestroy {
  @Input()
  image: Image;
  confirmDelete: string;
  deleteSub: Subscription;
  submitting: boolean;
  error: boolean;

  constructor(private api: ApiService, private router: Router) {}

  removeEvent() {
    this.submitting = true;
    // DELETE event by ID
    this.deleteSub = this.api.deleteImage$(this.image._id).subscribe(
      res => {
        this.submitting = false;
        this.error = false;
        console.log(res.message);
        // If successfully deleted event, redirect to Admin
        this.router.navigate(["/admin/images"]);
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
