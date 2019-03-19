import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  highestPalindrome: number;
  num1: number;
  num2: number;

  returnPalindrome() {
    let x, y, product, max = 0;
    for (x = 100; x <= 999; x++) {
      for (y = x; y <= 999; y++) {
          product = x * y;
          if (this.isPalindrome(product)) {
            this.num1 = x;
            this.num2 = y;
            if (max < product ) {
              max = product;
              this.highestPalindrome = max;
            }
          }
      }
    }
  }

  isPalindrome(num) {
    const pal = +(num.toString().split('').reverse().join(''));

    if (pal === num) {
      return true;
    } else {
      return false;
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
