import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  image_1: string;
  image_2: string;
  image_3: string;

  constructor() { 
    this.image_1 = '../assets/images/brazil.png';
    this.image_2 = '../assets/images/datsun.png';
    this.image_3 = '../assets/images/skydive.png';
  }

  ngOnInit() {
  }

}
