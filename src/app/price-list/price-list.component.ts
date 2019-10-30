import { Component, OnInit, Input } from '@angular/core';
import { Prices } from '../interfaces/Prices';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  @Input()
  prices: Prices;

  constructor() { }

  ngOnInit() {
  }

}
