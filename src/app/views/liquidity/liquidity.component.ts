import { Component } from '@angular/core';
import { CoinMarketCapService } from 'src/app/services/coin-market-cap.service';

@Component({
  selector: 'app-liquidity',
  templateUrl: './liquidity.component.html',
  styleUrls: ['./liquidity.component.css'],
})
export class LiquidityComponent {
  constructor(public coinMarketCapService: CoinMarketCapService) {}
}
