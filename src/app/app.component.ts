import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilKeyChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { CoinMarketCapService } from 'src/app/services/coin-market-cap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  currenciesSubscription: Subscription;

  constructor(
    private coinMarketCapService: CoinMarketCapService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.currenciesSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this.route.queryParams.pipe(takeUntil(this.router.events))),
        distinctUntilKeyChanged('limit'),
        switchMap(({ limit }) => this.coinMarketCapService.setCurrencies(+limit)),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.currenciesSubscription.unsubscribe();
  }
}
