import { Component, OnInit } from '@angular/core';
import { NavigatorService, DialogService } from '@ts-webapp/front';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  safe = false;
  constructor(private nav: NavigatorService, private dialog: DialogService) { }

  ngOnInit() {
    // this.nav.notify('from home', 'I feel lonely', true);
    this.nav.title('Home page');
    this.nav.home(true);
    this.nav.menu([
      { text: 'test', icon: 'home'},
      { text: 'Message', icon: 'swap_vert', action: () => this.dialog.alert('Yahooo!')},
      { text: 'no icon'},
    ]);
    // this.nav.goto('/offers');
  }

}
