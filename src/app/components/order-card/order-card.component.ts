import { Component, Input, OnInit } from '@angular/core';
import { ThemeServiceService } from 'src/app/services/theme-service.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input()
  orderItem! : any;

  constructor(public themeService : ThemeServiceService) {

  }

  ngOnInit(): void {

  }
}