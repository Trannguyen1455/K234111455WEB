import { Component, OnInit } from '@angular/core';
import { EntityService, Product } from '../../services/entity.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-shopping',
    standalone: false,
    templateUrl: './shopping.component.html',
    styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    loading = true;
    error: string | null = null;

    // Q8: Search by price
    minPrice: number = 0;
    maxPrice: number = 99000000;

    // Q9: Quantity selection
    quantities: { [key: string]: number } = {};

    constructor(
        private entityService: EntityService,
        private cartService: CartService,
        private authService: AuthService
    ) { }

    ngOnInit(): void {
        console.log('ShoppingComponent initialized');
        this.fetchProducts();
    }

    addToCart(product: Product) {
        if (!this.authService.isLoggedIn()) {
            alert('Please login first to add items to your cart.');
            return;
        }

        const id = product._id as string || (product as any).product_id as string;
        const qty = this.quantities[id] || 1;
        if (qty < 1) {
            alert('Quantity must be at least 1.');
            return;
        }
        this.cartService.addToCart(product, qty);
        alert(`Added ${qty} unit(s) of ${product.product_name} to cart!`);
    }

    fetchProducts(): void {
        console.log('Fetching products...');
        this.loading = true;
        this.entityService.getProducts().subscribe({
            next: (data) => {
                console.log('Products received:', data);
                this.products = data;
                this.filteredProducts = data;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching products:', err);
                this.error = 'Unable to load products. Please ensure the backend is running.';
                this.loading = false;
            }
        });
    }

    // Q8 implementation
    searchByPrice(): void {
        console.log(`Searching for price between ${this.minPrice} and ${this.maxPrice}`);
        this.filteredProducts = this.products.filter(p => {
            const min = this.minPrice !== null ? this.minPrice : 0;
            const max = this.maxPrice !== null ? this.maxPrice : Infinity;
            return p.price >= min && p.price <= max;
        });
    }

    resetSearch(): void {
        this.minPrice = 0;
        this.maxPrice = 99000000;
        this.filteredProducts = [...this.products];
    }
}
