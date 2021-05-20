import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LiquidityComponent } from './views/liquidity/liquidity.component';
import { MarketOverviewComponent } from './views/market-overview/market-overview.component';

@NgModule({
  declarations: [AppComponent, MarketOverviewComponent, LiquidityComponent, HeaderComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
