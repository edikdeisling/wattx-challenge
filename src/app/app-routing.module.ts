import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiquidityComponent } from 'src/app/views/liquidity/liquidity.component';
import { MarketOverviewComponent } from 'src/app/views/market-overview/market-overview.component';

const routes: Routes = [
  {
    path: '',
    component: MarketOverviewComponent,
  },
  {
    path: 'liquidity',
    component: LiquidityComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
