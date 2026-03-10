import { Component } from '@angular/core';

@Component({
    selector: 'app-student-info',
    standalone: false,
    templateUrl: './student-info.component.html',
    styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent {
    studentName = 'Nguyễn Thị Bảo Trân';
    studentId = 'K234111455';
    profilePic = 'https://ui-avatars.com/api/?name=Bao+Tran&background=0D8ABC&color=fff&size=128';
}
