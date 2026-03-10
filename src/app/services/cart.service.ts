import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './entity.service';

export interface CartItem extends Product {
    cartQuantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItems.asObservable();

    constructor() {
        const savedCart = localStorage.getItem('panda_cart');
        if (savedCart) {
            this.cartItems.next(JSON.parse(savedCart));
        }
    }

    addToCart(product: Product, quantity: number = 1) {
        const currentItems = this.cartItems.value;
        const existingItem = currentItems.find(item => item._id === product._id);

        if (existingItem) {
            existingItem.cartQuantity += quantity;
            this.cartItems.next([...currentItems]);
        } else {
            this.cartItems.next([...currentItems, { ...product, cartQuantity: quantity }]);
        }
        this.saveToLocalStorage();
    }

    removeFromCart(productId: string) {
        const updatedItems = this.cartItems.value.filter(item => item._id !== productId);
        this.cartItems.next(updatedItems);
        this.saveToLocalStorage();
    }

    updateQuantity(productId: string, quantity: number) {
        const currentItems = this.cartItems.value;
        const item = currentItems.find(i => i._id === productId);
        if (item) {
            item.cartQuantity = quantity;
            if (item.cartQuantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.cartItems.next([...currentItems]);
                this.saveToLocalStorage();
            }
        }
    }

    clearCart() {
        this.cartItems.next([]);
        localStorage.removeItem('panda_cart');
    }

    getTotalAmount(): number {
        return this.cartItems.value.reduce((total, item) => total + (item.price * item.cartQuantity), 0);
    }

    private saveToLocalStorage() {
        localStorage.setItem('panda_cart', JSON.stringify(this.cartItems.value));
    }
}
