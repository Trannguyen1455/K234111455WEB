import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/* ===== LunarYear CLASS ===== */
class LunarYear {
  constructor(
    public day: number,
    public month: number,
    public year: number
  ) {}

  findLunarYearDetail(): any {
    const lunarDate = this.convertSolar2Lunar(this.day, this.month, this.year, 7);

    return {
      dayOfWeek: this.getDayOfWeek(this.day, this.month, this.year),
      lunarDate: `${lunarDate[0]}/${lunarDate[1]}/${lunarDate[2]}`,
      yearName: this.getYearCanChi(lunarDate[2]),
      monthName: this.getMonthCanChi(lunarDate[1], lunarDate[2]),
      dayName: this.getDayCanChi(this.jdFromDate(this.day, this.month, this.year))
    };
  }

  private jdFromDate(dd: number, mm: number, yy: number): number {
    const a = Math.floor((14 - mm) / 12);
    const y = yy + 4800 - a;
    const m = mm + 12 * a - 3;
    return dd + Math.floor((153 * m + 2) / 5) + 365 * y +
           Math.floor(y / 4) - Math.floor(y / 100) +
           Math.floor(y / 400) - 32045;
  }

  private convertSolar2Lunar(dd: number, mm: number, yy: number, timeZone: number): number[] {
    const dayNumber = this.jdFromDate(dd, mm, yy);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);
    let monthStart = this.getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) monthStart = this.getNewMoonDay(k, timeZone);

    let a11 = this.getLunarMonth11(yy, timeZone);
    let b11 = a11;
    let lunarYear;

    if (a11 >= monthStart) {
      lunarYear = yy;
      a11 = this.getLunarMonth11(yy - 1, timeZone);
    } else {
      lunarYear = yy + 1;
      b11 = this.getLunarMonth11(yy + 1, timeZone);
    }

    const lunarDay = dayNumber - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let lunarMonth = diff + 11;

    if (b11 - a11 > 365) {
      const leapMonthDiff = this.getLeapMonthOffset(a11, timeZone);
      if (diff >= leapMonthDiff) lunarMonth = diff + 10;
    }

    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear -= 1;

    return [lunarDay, lunarMonth, lunarYear];
  }

  private getDayOfWeek(dd: number, mm: number, yy: number): string {
    const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
    return days[(this.jdFromDate(dd, mm, yy) + 1) % 7];
  }

  private getYearCanChi(year: number): string {
    const can = ['Canh','Tân','Nhâm','Quý','Giáp','Ất','Bính','Đinh','Mậu','Kỷ'];
    const chi = ['Thân','Dậu','Tuất','Hợi','Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi'];
    return can[year % 10] + ' ' + chi[year % 12];
  }

  private getMonthCanChi(month: number, year: number): string {
    const can = ['Canh','Tân','Nhâm','Quý','Giáp','Ất','Bính','Đinh','Mậu','Kỷ'];
    const chi = ['Thân','Dậu','Tuất','Hợi','Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi'];
    return can[(year * 12 + month + 3) % 10] + ' ' + chi[(month + 1) % 12];
  }

  private getDayCanChi(jd: number): string {
    const can = ['Canh','Tân','Nhâm','Quý','Giáp','Ất','Bính','Đinh','Mậu','Kỷ'];
    const chi = ['Thân','Dậu','Tuất','Hợi','Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi'];
    return can[(jd + 6) % 10] + ' ' + chi[(jd + 8) % 12];
  }

  private getNewMoonDay(k: number, timeZone: number): number {
    return Math.floor(2415021 + 29.530588853 * k + timeZone / 24);
  }

  private getLunarMonth11(yy: number, timeZone: number): number {
    return this.getNewMoonDay(
      Math.floor((this.jdFromDate(31, 12, yy) - 2415021) / 29.53),
      timeZone
    );
  }

  private getLeapMonthOffset(_: number, __: number): number {
    return 0;
  }
}



@Component({
  selector: 'app-ex10',
  templateUrl: './ex10.html',
  styleUrls: ['./ex10.css']
})
export class Ex10 {
  days: number[] = [];
  months: number[] = [];
  years: number[] = [];

  selectedDay!: number;
  selectedMonth!: number;
  selectedYear!: number;

  lunarResult: any = null;

  constructor() {
    this.days = Array.from({ length: 31 }, (_, i) => i + 1);
    this.months = Array.from({ length: 12 }, (_, i) => i + 1);
    this.years = Array.from({ length: 201 }, (_, i) => 1900 + i);
  }

  convert() {
    this.lunarResult = {
      day: this.selectedDay,
      month: this.selectedMonth,
      year: this.selectedYear
    };
  }
}
