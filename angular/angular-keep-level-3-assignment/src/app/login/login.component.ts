import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService} from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username = new FormControl();
    password = new FormControl();
public BearerToken: any;
    public submitMessage: string;
    constructor(private _authService: AuthenticationService, public routerService: RouterService) {}

    loginSubmit() {
      this._authService.authenticateUser({username: this.username.value, password: this.password.value}).subscribe(res => {
        this.BearerToken = res['token'];
        this._authService.setBearerToken(this.BearerToken);
        this.routerService.routeToDashboard();

      }, err => {
        this.submitMessage = err.status === 404 ? err.message : err.error.message;
        return Observable.throw(this.submitMessage);
      });

    }
}
