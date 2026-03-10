import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
    userName: string = '';

    constructor(
        public cartService: CartService,
        public authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.userName = user.name;
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/shopping']);
        alert('Logged out successfully');
    }
}
