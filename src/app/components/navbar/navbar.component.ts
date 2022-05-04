import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResolveEnd } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('top') topNavItem!: ElementRef;
  @ViewChild('best') bestNavItem!: ElementRef;
  @ViewChild('new') newNavItem!: ElementRef;
  @ViewChild('ask') askNavItem!: ElementRef;
  @ViewChild('show') showNavItem!: ElementRef;
  @ViewChild('jobs') jobsNavItem!: ElementRef;
  @ViewChild('about') aboutNavItem!: ElementRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    switch (window.location.pathname) {
      case "/":
      case "/top":
        this.topNavItem.nativeElement.classList.add("selected");
        break;
      case "/best":
        this.bestNavItem.nativeElement.classList.add("selected");
        break;
      case "/new":
        this.newNavItem.nativeElement.classList.add("selected");
        break;
      case "/ask":
        this.askNavItem.nativeElement.classList.add("selected");
        break;
      case "/show":
        this.showNavItem.nativeElement.classList.add("selected");
        break;
      case "/jobs":
        this.jobsNavItem.nativeElement.classList.add("selected");
        break;
      case "/about":
        this.aboutNavItem.nativeElement.classList.add("selected");
        break;
    }
  }
}
