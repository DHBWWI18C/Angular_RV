import { Component, OnInit, Input } from '@angular/core';
import { Prices } from '../interfaces/Prices';
import { NgListItem } from '../interfaces/NgListItem';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  @Input()
  prices: Prices;

  @Input()
  additionalItems: NgListItem[];

  constructor() { }

  ngOnInit() {
  }

}
