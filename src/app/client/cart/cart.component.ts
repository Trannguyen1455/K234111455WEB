import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalAmount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalAmount = this.cartService.getTotalAmount();
    });
  }

  updateQuantity(productId: string | undefined, quantity: number) {
    if (!productId) return;
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string | undefined) {
    if (!productId) return;
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  checkout() {
    if (this.cartItems.length === 0) return;

    alert('Payment Successful! Thank you for your order.');
    this.cartService.clearCart();
  }
}
