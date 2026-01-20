import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GoogleLogin } from './google-login/google-login';

@Component({
  selector: 'root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, GoogleLogin],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Angular Products';
  loggedGoogle(resp: google.accounts.id.CredentialResponse) {
    // Envia esto tu API
    console.log(resp.credential);
  }
}
