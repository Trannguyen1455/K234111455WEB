import { Component, OnInit } from '@angular/core';
import { EntityService } from '../../services/entity.service';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-vip',
  standalone: false,
  templateUrl: './vip.component.html',
  styleUrls: ['./vip.component.css']
})
export class VipComponent implements OnInit {
  vipCustomers: any[] = [];
  loading = true;
  topN: number = 5;

  constructor(
    private entityService: EntityService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isEmployee()) {
      alert('Access Denied. Employee only.');
      return;
    }
    this.fetchVIPs();
  }

  fetchVIPs() {
    this.loading = true;
    forkJoin({
      customers: this.entityService.getCustomers(),
      orders: this.entityService.getOrders()
    }).subscribe(({ customers, orders }) => {
      const spendingMap: { [key: string]: number } = {};

      orders.forEach((o: any) => {
        const custId = o.customer_id;
        spendingMap[custId] = (spendingMap[custId] || 0) + o.total_amount;
      });

      this.vipCustomers = customers
        .map((c: any) => ({
          ...c,
          totalSpent: spendingMap[c.customer_id] || spendingMap[c._id] || 0
        }))
        .sort((a: any, b: any) => b.totalSpent - a.totalSpent)
        .slice(0, this.topN);

      this.loading = false;
    });
  }
}
