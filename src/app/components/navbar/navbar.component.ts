import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ResolveEnd, Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  selectedNavItem: string;

  constructor(router: Router) {
    router.events.subscribe((event => {
      if (event instanceof NavigationEnd) {
        this.selectedNavItem = router.url;
      }
    }));
  }

  ngOnInit(): void {

  }

}
