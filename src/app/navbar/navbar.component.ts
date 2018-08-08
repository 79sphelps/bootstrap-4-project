import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  closeMenu() {
    this.menu.nativeElement.click();
  }
}
