import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileService } from '../profile/services/profile.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu-phone',
  templateUrl: './menu-phone.component.html',
  styleUrls: ['./menu-phone.component.scss'],
})
export class MenuPhoneComponent implements OnInit {
  constructor(private authService: AuthService, private profileService: ProfileService) {}

  @Output() closeEvent = new EventEmitter<string>();
  ngOnInit(): void {}

  closeMenu(route: string): void {
    this.closeEvent.emit(route);
  }

  public get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public get isAdmin(): boolean {
    return this.profileService.isAdmin();
  }
}
