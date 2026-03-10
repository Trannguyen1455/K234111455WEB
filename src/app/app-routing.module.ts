import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingComponent } from './client/shopping/shopping.component';
import { CartComponent } from './client/cart/cart.component';
import { RevenueComponent } from './client/revenue/revenue.component';
import { VipComponent } from './client/vip/vip.component';
import { LoginComponent } from './client/login/login.component';

const routes: Routes = [
    { path: 'shopping', component: ShoppingComponent },
    { path: 'cart', component: CartComponent },
    { path: 'revenue', component: RevenueComponent },
    { path: 'vip', component: VipComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
    { path: '', redirectTo: 'shopping', pathMatch: 'full' },
    { path: '**', redirectTo: 'shopping' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
