import { Component, OnInit } from '@angular/core';
import { NavigatorService, DialogService } from '@ts-webapp/front';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(private nav: NavigatorService) { }

  ngOnInit() {
    this.nav.title('Clients');
    this.nav.home(false);
    this.nav.menu([]);
  }

}
