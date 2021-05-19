import { Component } from '@angular/core';
import { CoinMarketCapService } from 'src/app/services/coin-market-cap.service';

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['./market-overview.component.css'],
})
export class MarketOverviewComponent {
  constructor(public coinMarketCapService: CoinMarketCapService) {}
}
