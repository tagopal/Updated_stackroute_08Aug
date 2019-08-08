import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  constructor(private router: Router, private routerService: RouterService) {


  }
  trigger(value: string) {
    if (value === 'listView') {
        this.routerService.routeToListView();
        this.isNoteView = false;
    } else {
        this.routerService.routeToNoteView();
        this.isNoteView = true;
    }
  }
}
