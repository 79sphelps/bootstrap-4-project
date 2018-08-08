import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-images-new",
  templateUrl: "./images-new.component.html",
  styleUrls: ["./images-new.component.scss"]
})
export class ImagesNewComponent implements OnInit {
  pageTitle = "Add Image";

  constructor(private title: Title) {}

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }
}
