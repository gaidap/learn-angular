import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/services/data-storage.service";
import {AuthService} from "../auth/auth/service/auth.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  userSubscription?: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      console.log(user);
      this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe({
      error: error => {
        console.error(error);
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
