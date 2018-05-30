import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  my_image: string;

  constructor() {
    //this.my_image = '../assets/images/IMG_4378.JPG';
    this.my_image = '../assets/images/rachel_phelps.JPG';
   }

  ngOnInit() {
  }

}
