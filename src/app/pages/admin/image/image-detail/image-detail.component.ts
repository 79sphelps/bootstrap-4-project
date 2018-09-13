import { Component, Input } from "@angular/core";
import { AuthService } from "./../../../../auth/auth.service";
import { UtilsService } from "./../../../../core/utils.service";
import { Image } from "./../../../../core/models/images.model";

@Component({
  selector: "app-image-detail",
  templateUrl: "./image-detail.component.html",
  styleUrls: ["./image-detail.component.scss"]
})
export class ImageDetailComponent {
  @Input()
  image: Image;

  constructor(public utils: UtilsService, public auth: AuthService) {}
}
