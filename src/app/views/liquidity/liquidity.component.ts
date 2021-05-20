import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {
  BubbleController,
  BubbleDataPoint,
  Chart,
  ChartConfiguration,
  ChartDataset,
  LogarithmicScale,
  PointElement,
  Tooltip,
  TooltipItem,
} from 'chart.js';
import { Subscription } from 'rxjs';
import { PercentChangePipe } from 'src/app/pipes/percent-change.pipe';
import { CoinMarketCapService, CryptoCurrency } from 'src/app/services/coin-market-cap.service';

Chart.register(BubbleController, LogarithmicScale, PointElement, Tooltip);

interface DataPoint extends BubbleDataPoint {
  currency: CryptoCurrency;
}

@Component({
  selector: 'app-liquidity',
  templateUrl: './liquidity.component.html',
  styleUrls: ['./liquidity.component.css'],
})
export class LiquidityComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private chart: Chart;
  private currenciesSubscription: Subscription;

  constructor(
    public coinMarketCapService: CoinMarketCapService,
    private percentChangePipe: PercentChangePipe,
    private currencyPipe: CurrencyPipe,
  ) {}

  ngAfterViewInit() {
    this.currenciesSubscription = this.coinMarketCapService.currencies.subscribe(() => {
      if (this.chart) {
        this.chart.destroy();
      }
      this.chart = new Chart(this.canvas.nativeElement, this.getChartConfig());
    });
  }

  ngOnDestroy() {
    this.currenciesSubscription?.unsubscribe();
  }

  getChartConfig(): ChartConfiguration<'bubble'> {
    return {
      type: 'bubble',
      data: {
        datasets: this.getDatasets(),
      },
      options: {
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: this.getLabel,
            },
          },
        },
        scales: {
          y: {
            offset: true,
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Volume',
            },
          },
          x: {
            offset: true,
            type: 'logarithmic',
            title: {
              display: true,
              text: 'Market Cap',
            },
          },
        },
      },
    };
  }

  getDatasets() {
    // red dots for + change, blue for - change
    const datasetPlus: ChartDataset<'bubble'> = {
      data: [],
      backgroundColor: 'rgb(255, 99, 132)',
    };
    const datasetMinus: ChartDataset<'bubble'> = {
      data: [],
      backgroundColor: 'rgb(99,200,255)',
    };

    for (const currency of this.coinMarketCapService.currencies.value) {
      const change = currency.quote.USD.percent_change_24h;
      const dataset = change < 0 ? datasetMinus : datasetPlus;
      const dataItem: DataPoint = {
        currency,
        x: currency.quote.USD.market_cap,
        y: currency.quote.USD.volume_24h,
        r: Math.max(5, Math.abs(change)), // add min value to prevent dot disappears
      };

      dataset.data.push(dataItem);
    }

    return [datasetPlus, datasetMinus];
  }

  getLabel = (tooltipItem: TooltipItem<'bubble'>) => {
    const { currency } = tooltipItem.raw as DataPoint;
    const quote = currency.quote.USD;
    const change = this.percentChangePipe.transform(quote.percent_change_24h);
    const marketCap = this.currencyPipe.transform(
      quote.percent_change_24h,
      'USD',
      'symbol',
      '1.0-0',
    );
    const volume = this.currencyPipe.transform(quote.volume_24h, 'USD', 'symbol', '1.0-0');

    return [
      `name: ${currency.name}`,
      `marketcap: ${marketCap}`,
      `volume: ${volume}`,
      `price change: ${change}`,
    ];
  };
}
