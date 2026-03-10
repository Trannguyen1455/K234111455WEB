import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserSession {
    name: string;
    role: 'customer' | 'employee' | null;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Initial state: Logged in as the student (Employee) for exam requirements
    private currentUser = new BehaviorSubject<UserSession>({
        name: 'Nguyễn Thị Bảo Trân',
        role: 'employee'
    });

    currentUser$ = this.currentUser.asObservable();

    constructor() {
        // For the exam, we prioritize the student session
        const savedUser = localStorage.getItem('panda_user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            if (user.role) {
                this.currentUser.next(user);
            }
        }
    }

    login(name: string, role: 'customer' | 'employee') {
        const user: UserSession = { name, role };
        this.currentUser.next(user);
        localStorage.setItem('panda_user', JSON.stringify(user));
    }

    logout() {
        this.currentUser.next({ name: '', role: null });
        localStorage.removeItem('panda_user');
    }

    isEmployee(): boolean {
        return this.currentUser.value.role === 'employee';
    }

    isLoggedIn(): boolean {
        return this.currentUser.value.role !== null;
    }

    getUserName(): string {
        return this.currentUser.value.name;
    }
}
