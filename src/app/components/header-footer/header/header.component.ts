import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  isHomePage: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url.includes('/inicio');
    });
    this.isAuthenticated = this.authService.isAuthenticated();
  }


  fazerLogout(): void {
    this.authService.logout();
    window.location.reload();
    this.router.navigate(['/inicio']);
  }
}
