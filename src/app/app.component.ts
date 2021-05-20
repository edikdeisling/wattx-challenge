import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { distinctUntilKeyChanged, filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CoinMarketCapService } from 'src/app/services/coin-market-cap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private currenciesSubscription: Subscription;
  limit?: number;

  constructor(
    public coinMarketCapService: CoinMarketCapService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.currenciesSubscription = this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this.activatedRoute.queryParams.pipe(takeUntil(this.router.events))),
        distinctUntilKeyChanged('limit'),
        map(({ limit }) => (limit ? +limit : undefined)),
        tap((limit) => (this.limit = limit)),
        switchMap((limit) => this.coinMarketCapService.setCurrencies(limit)),
      )
      .subscribe();
  }

  onLimitChange(limit?: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: limit ? { limit } : null,
    });
  }

  ngOnDestroy() {
    this.currenciesSubscription.unsubscribe();
  }
}
