import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentInfoComponent } from './client/student-info/student-info.component';
import { ShoppingComponent } from './client/shopping/shopping.component';
import { CartComponent } from './client/cart/cart.component';
import { RevenueComponent } from './client/revenue/revenue.component';
import { VipComponent } from './client/vip/vip.component';
import { LoginComponent } from './client/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        StudentInfoComponent,
        ShoppingComponent,
        CartComponent,
        RevenueComponent,
        VipComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
