import { Component, Input } from "@angular/core";
import { AuthService } from "./../../../../auth/auth.service";
import { UtilsService } from "./../../../../core/utils.service";
import { Personel } from "./../../../../core/models/personel.model";

@Component({
  selector: "app-person-detail",
  templateUrl: "./person-detail.component.html",
  styleUrls: ["./person-detail.component.scss"]
})
export class PersonDetailComponent {
  @Input() person: Personel;

  constructor(public utils: UtilsService, public auth: AuthService) {}
}
