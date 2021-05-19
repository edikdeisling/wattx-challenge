import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

interface CryptoResponse<Data> {
  data?: Data;
  status: {
    error_code: number;
    error_message: string | null;
  };
}

interface CryptoQuote {
  price: number;
  volume_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  last_updated: string;
}

export interface CryptoCurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number;
  circulating_supply: number;
  total_supply: number;
  cmc_rank: number;
  last_updated: string;
  quote: Record<string, CryptoQuote>;
}

@Injectable({
  providedIn: 'root',
})
export class CoinMarketCapService {
  currencies: CryptoCurrency[];

  constructor(private httpClient: HttpClient) {}

  getCurrencies(limit?: number) {
    const params = limit ? { limit } : undefined;

    return this.httpClient
      .request<CryptoResponse<CryptoCurrency[]>>('GET', 'api/v1/cryptocurrency/listings/latest', {
        params,
      })
      .pipe(
        switchMap(({ status, data }) => {
          if (status.error_code !== 0) {
            // if we have error_code - throw error
            return throwError(new Error('Cryptocurrency error'));
          }

          // data exists if no error
          return of(data!);
        }),
      );
  }

  setCurrencies(limit?: number) {
    return this.getCurrencies(limit).pipe(tap((currencies) => (this.currencies = currencies)));
  }
}
