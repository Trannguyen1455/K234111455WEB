import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AdminListComponent } from './pages/admin-list/admin-list.component';
import { AdminDetailComponent } from './pages/admin-detail/admin-detail.component';

const routes: Routes = [
    { path: 'admin-home', component: AdminHomeComponent },
    { path: 'admin-list', component: AdminListComponent },
    { path: 'admin-detail/:id', component: AdminDetailComponent },
    { path: '', redirectTo: 'admin-home', pathMatch: 'full' }
];

@NgModule({
    declarations: [
        AdminHomeComponent,
        AdminListComponent,
        AdminDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminModule { }
