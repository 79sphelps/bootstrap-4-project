// import { Component, OnInit } from '@angular/core';

// src/app/pages/home/home.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../core/api.service';
import { UtilsService } from './../core/utils.service';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../core/models/event.model';
import { Testimonial } from './../core/models/testimonials.model';
import { Image } from '../core/models/images.model';

/*
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
*/
@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

  pageTitle = 'Images';
  imageListSub: Subscription;
  imageList: Image[];
  // imageList = ['assets/images/brazil.png', 'assets/images/datsun.png', 'assets/images/skydive.png'];

  loading: boolean;
  error: boolean;
  query: '';


  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getImageList();
  }


  private _getImageList() {
    this.loading = true;
    // Get future, public events
    this.imageListSub = this.api
      .getImages$()
      .subscribe(
        res => {
          this.imageList = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    this.imageListSub.unsubscribe();
  }

}
