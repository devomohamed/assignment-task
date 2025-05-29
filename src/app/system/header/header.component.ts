import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  imports: [NgbDropdownModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() openMenu = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  openSideMenu() {
    this.openMenu.emit(true);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }
}
