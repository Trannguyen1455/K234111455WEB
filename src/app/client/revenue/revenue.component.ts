import { Component, OnInit } from '@angular/core';
import { EntityService } from '../../services/entity.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-revenue',
  standalone: false,
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent implements OnInit {
  revenueData: any[] = [];
  totalRevenue: number = 0;
  statisticsType: 'year' | 'product' = 'year';
  loading = true;

  constructor(
    private entityService: EntityService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isEmployee()) {
      alert('Access Denied. Employee only.');
      return;
    }
    this.fetchRevenue();
  }

  fetchRevenue() {
    this.loading = true;
    this.entityService.getOrders().subscribe(orders => {
      // Q11: Only PAID orders
      const paidOrders = orders.filter((o: any) => o.payment_status === 'paid');

      if (this.statisticsType === 'year') {
        this.calculateByYear(paidOrders);
      } else {
        this.calculateByProduct(paidOrders);
      }

      this.totalRevenue = paidOrders.reduce((sum: number, o: any) => sum + o.total_amount, 0);
      this.loading = false;
    });
  }

  calculateByYear(orders: any[]) {
    const groups: { [key: string]: number } = {};
    orders.forEach(o => {
      const year = new Date(o.order_date).getFullYear().toString();
      groups[year] = (groups[year] || 0) + o.total_amount;
    });
    this.revenueData = Object.keys(groups).map(key => ({ label: key, value: groups[key] }));
  }

  calculateByProduct(orders: any[]) {
    // In a real app, this would require joining OrderDetails. 
    // For this exam, we'll simulate based on the sample data or use product_id if available.
    // Let's fetch OrderDetails to be precise.
    this.entityService.getOrderDetails().subscribe(details => {
      const groups: { [key: string]: number } = {};
      details.forEach((d: any) => {
        // Check if the order for this detail is paid
        const order = orders.find(o => o._id === d.order_id || o.order_id === d.order_id);
        if (order) {
          groups[d.product_id] = (groups[d.product_id] || 0) + d.sub_total;
        }
      });
      this.revenueData = Object.keys(groups).map(key => ({ label: key, value: groups[key] }));
    });
  }

  switchType(type: 'year' | 'product') {
    this.statisticsType = type;
    this.fetchRevenue();
  }
}
