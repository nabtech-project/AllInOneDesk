import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {

  showSettings = false;
  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate(['/' + path]);
  }

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }

  logout() {
    this.showSettings = false;
    this.router.navigate(['/login']);
  }
}
