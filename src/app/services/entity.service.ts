import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entity } from '../models/entity.model';

export interface Product {
    _id?: string;
    product_name: string;
    model: string;
    made_by: string;
    price: number;
    quantity: number;
    thumbnail: string;
    description: string;
    category_id: string;
    status: boolean;
    created_at: string;
}

@Injectable({
    providedIn: 'root'
})
export class EntityService {
    private apiUrl = 'http://localhost:3000/api';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/product`);
    }

    getOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/order`);
    }

    getOrderDetails(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/orderdetails`);
    }

    getCustomers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/customer`);
    }

    getEntities(): Observable<Entity[]> {
        return this.http.get<Entity[]>(`${this.apiUrl}/fashions`);
    }

    createEntity(entity: Entity): Observable<Entity> {
        return this.http.post<Entity>(`${this.apiUrl}/fashions`, entity);
    }

    updateEntity(id: string, entity: Entity): Observable<Entity> {
        return this.http.put<Entity>(`${this.apiUrl}/fashions/${id}`, entity);
    }

    deleteEntity(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/fashions/${id}`);
    }
}
