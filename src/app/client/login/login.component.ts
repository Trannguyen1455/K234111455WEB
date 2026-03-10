import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = '';

    constructor(private authService: AuthService, private router: Router) { }

    onLogin() {
        if (!this.username.trim()) {
            alert('Please enter a username');
            return;
        }

        // Exam simplification: any name containing 'employee', 'admin', 'tran' or 'tuan' is an employee.
        const lowerName = this.username.toLowerCase();
        const isEmployee = lowerName.includes('employee') || lowerName.includes('admin') || lowerName.includes('thị bảo trân') || lowerName.includes('tran');

        this.authService.login(
            this.username,
            isEmployee ? 'employee' : 'customer'
        );

        this.router.navigate(['/shopping']);
    }
}
