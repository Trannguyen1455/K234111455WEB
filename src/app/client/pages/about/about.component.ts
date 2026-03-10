import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    template: `
    <div class="card mt-4 shadow-sm border-primary">
      <div class="card-header bg-primary text-white">
        <h3>About This Project</h3>
      </div>
      <div class="card-body">
        <p class="lead">Họ tên: Nguyễn Thị Bảo Trân</p>
        <p class="lead">MSSV: K234111455</p>
        <hr>
        <h5>Midterm Web 2 - Advanced Business Development</h5>
        <button class="btn btn-secondary mt-3" (click)="goBack()">
          <i class="bi bi-arrow-left"></i> Go Back
        </button>
      </div>
    </div>
  `,
    styles: [`
    .card { transition: transform 0.2s; }
    .card:hover { transform: scale(1.01); }
  `],
    standalone: false
})
export class AboutComponent {
    goBack() {
        window.history.back();
    }
}
