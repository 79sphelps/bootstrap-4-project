import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-personel-new",
  templateUrl: "./personel-new.component.html",
  styleUrls: ["./personel-new.component.scss"]
})
export class PersonelNewComponent implements OnInit {
  pageTitle = "Add Person";

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }
}
