import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

let mockItem = { date: 'May 16, 17', detail: 'Transaction Details', amount: '$89.90' };
let mockData = new Array(20).fill(mockItem);

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,
      private authService: AuthService,
      private router: Router) {
  }

  private dateFrom = "";
  private dateTo = ""; 
  private transactions = mockData;

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      // example: NavigationStart, RoutesRecognized, NavigationEnd


    });
  }
}
