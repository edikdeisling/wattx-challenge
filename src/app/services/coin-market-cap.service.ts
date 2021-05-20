import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, throwError } from 'rxjs';
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
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  cmc_rank: number;
  last_updated: string;
  platform: {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    token_address: string;
  } | null;
  quote: Record<string, CryptoQuote>;
}

@Injectable({
  providedIn: 'root',
})
export class CoinMarketCapService {
  currencies = new BehaviorSubject<CryptoCurrency[]>([]);

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // getCurrencies(limit?: number) {
  //   return of<CryptoCurrency[]>([
  //     {
  //       id: 1,
  //       name: 'Bitcoin',
  //       symbol: 'BTC',
  //       slug: 'bitcoin',
  //       num_market_pairs: 9555,
  //       date_added: '2013-04-28T00:00:00.000Z',
  //       tags: [
  //         'mineable',
  //         'pow',
  //         'sha-256',
  //         'store-of-value',
  //         'state-channels',
  //         'coinbase-ventures-portfolio',
  //         'three-arrows-capital-portfolio',
  //         'polychain-capital-portfolio',
  //         'binance-labs-portfolio',
  //         'arrington-xrp-capital',
  //         'blockchain-capital-portfolio',
  //         'boostvc-portfolio',
  //         'cms-holdings-portfolio',
  //         'dcg-portfolio',
  //         'dragonfly-capital-portfolio',
  //         'electric-capital-portfolio',
  //         'fabric-ventures-portfolio',
  //         'framework-ventures',
  //         'galaxy-digital-portfolio',
  //         'huobi-capital',
  //         'alameda-research-portfolio',
  //         'a16z-portfolio',
  //         '1confirmation-portfolio',
  //         'winklevoss-capital',
  //         'usv-portfolio',
  //         'placeholder-ventures-portfolio',
  //         'pantera-capital-portfolio',
  //         'multicoin-capital-portfolio',
  //         'paradigm-xzy-screener',
  //       ],
  //       max_supply: 21000000,
  //       circulating_supply: 18713700,
  //       total_supply: 18713700,
  //       platform: null,
  //       cmc_rank: 1,
  //       last_updated: '2021-05-20T07:51:02.000Z',
  //       quote: {
  //         USD: {
  //           price: 40150.05811916039,
  //           volume_24h: 131803095801.62367,
  //           percent_change_1h: 0.5027298,
  //           percent_change_24h: -0.19699633,
  //           percent_change_7d: -20.9273752,
  //           percent_change_30d: -26.04458171,
  //           percent_change_60d: -29.80493775,
  //           percent_change_90d: -22.49056598,
  //           market_cap: 751356142624.5319,
  //           last_updated: '2021-05-20T07:51:02.000Z',
  //         },
  //       },
  //     },
  //     {
  //       id: 1027,
  //       name: 'Ethereum',
  //       symbol: 'ETH',
  //       slug: 'ethereum',
  //       num_market_pairs: 5908,
  //       date_added: '2015-08-07T00:00:00.000Z',
  //       tags: [
  //         'mineable',
  //         'pow',
  //         'smart-contracts',
  //         'ethereum',
  //         'coinbase-ventures-portfolio',
  //         'three-arrows-capital-portfolio',
  //         'polychain-capital-portfolio',
  //         'binance-labs-portfolio',
  //         'arrington-xrp-capital',
  //         'blockchain-capital-portfolio',
  //         'boostvc-portfolio',
  //         'cms-holdings-portfolio',
  //         'dcg-portfolio',
  //         'dragonfly-capital-portfolio',
  //         'electric-capital-portfolio',
  //         'fabric-ventures-portfolio',
  //         'framework-ventures',
  //         'hashkey-capital-portfolio',
  //         'kinetic-capital',
  //         'huobi-capital',
  //         'alameda-research-portfolio',
  //         'a16z-portfolio',
  //         '1confirmation-portfolio',
  //         'winklevoss-capital',
  //         'usv-portfolio',
  //         'placeholder-ventures-portfolio',
  //         'pantera-capital-portfolio',
  //         'multicoin-capital-portfolio',
  //         'paradigm-xzy-screener',
  //       ],
  //       max_supply: null,
  //       circulating_supply: 115947508.249,
  //       total_supply: 115947508.249,
  //       platform: null,
  //       cmc_rank: 2,
  //       last_updated: '2021-05-20T07:51:02.000Z',
  //       quote: {
  //         USD: {
  //           price: 2732.5850689820027,
  //           volume_24h: 93697220129.2551,
  //           percent_change_1h: 2.73399113,
  //           percent_change_24h: -8.21977592,
  //           percent_change_7d: -31.02328299,
  //           percent_change_30d: 30.56293541,
  //           percent_change_60d: 53.14500721,
  //           percent_change_90d: 41.9830376,
  //           market_cap: 316836429826.885,
  //           last_updated: '2021-05-20T07:51:02.000Z',
  //         },
  //       },
  //     },
  //     {
  //       id: 825,
  //       name: 'Tether',
  //       symbol: 'USDT',
  //       slug: 'tether',
  //       num_market_pairs: 12947,
  //       date_added: '2015-02-25T00:00:00.000Z',
  //       tags: [
  //         'store-of-value',
  //         'payments',
  //         'stablecoin',
  //         'stablecoin-asset-backed',
  //         'solana-ecosystem',
  //       ],
  //       max_supply: null,
  //       circulating_supply: 58019510515.37168,
  //       total_supply: 60476291004.32977,
  //       platform: {
  //         id: 1027,
  //         name: 'Ethereum',
  //         symbol: 'ETH',
  //         slug: 'ethereum',
  //         token_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
  //       },
  //       cmc_rank: 3,
  //       last_updated: '2021-05-20T07:50:08.000Z',
  //       quote: {
  //         USD: {
  //           price: 1.00170832353138,
  //           volume_24h: 295540694875.1784,
  //           percent_change_1h: -0.0050336,
  //           percent_change_24h: 0.18113723,
  //           percent_change_7d: 0.17380624,
  //           percent_change_30d: 0.16520945,
  //           percent_change_60d: 0.15963657,
  //           percent_change_90d: 0.2204479,
  //           market_cap: 58118626610.46423,
  //           last_updated: '2021-05-20T07:50:08.000Z',
  //         },
  //       },
  //     },
  //     {
  //       id: 1839,
  //       name: 'Binance Coin',
  //       symbol: 'BNB',
  //       slug: 'binance-coin',
  //       num_market_pairs: 598,
  //       date_added: '2017-07-25T00:00:00.000Z',
  //       tags: [
  //         'marketplace',
  //         'centralized-exchange',
  //         'payments',
  //         'binance-smart-chain',
  //         'alameda-research-portfolio',
  //         'multicoin-capital-portfolio',
  //       ],
  //       max_supply: 170532785,
  //       circulating_supply: 153432897,
  //       total_supply: 169432897,
  //       platform: null,
  //       cmc_rank: 4,
  //       last_updated: '2021-05-20T07:50:08.000Z',
  //       quote: {
  //         USD: {
  //           price: 373.9151454764097,
  //           volume_24h: 9847490364.355547,
  //           percent_change_1h: 3.09323005,
  //           percent_change_24h: -14.68652355,
  //           percent_change_7d: -40.0656868,
  //           percent_change_30d: -24.03885499,
  //           percent_change_60d: 41.94716004,
  //           percent_change_90d: 42.1194119,
  //           market_cap: 57370884002.62199,
  //           last_updated: '2021-05-20T07:50:08.000Z',
  //         },
  //       },
  //     },
  //     {
  //       id: 2010,
  //       name: 'Cardano',
  //       symbol: 'ADA',
  //       slug: 'cardano',
  //       num_market_pairs: 263,
  //       date_added: '2017-10-01T00:00:00.000Z',
  //       tags: [
  //         'mineable',
  //         'dpos',
  //         'pos',
  //         'platform',
  //         'research',
  //         'smart-contracts',
  //         'staking',
  //         'binance-chain',
  //       ],
  //       max_supply: 45000000000,
  //       circulating_supply: 31948309440.7478,
  //       total_supply: 45000000000,
  //       platform: null,
  //       cmc_rank: 5,
  //       last_updated: '2021-05-20T07:50:09.000Z',
  //       quote: {
  //         USD: {
  //           price: 1.70262058272573,
  //           volume_24h: 16648459460.563309,
  //           percent_change_1h: 4.16882203,
  //           percent_change_24h: -4.21011563,
  //           percent_change_7d: -0.73910744,
  //           percent_change_30d: 47.1411344,
  //           percent_change_60d: 40.82697095,
  //           percent_change_90d: 85.9984323,
  //           market_cap: 54395849237.107956,
  //           last_updated: '2021-05-20T07:50:09.000Z',
  //         },
  //       },
  //     },
  //     {
  //       id: 74,
  //       name: 'Dogecoin',
  //       symbol: 'DOGE',
  //       slug: 'dogecoin',
  //       num_market_pairs: 361,
  //       date_added: '2013-12-15T00:00:00.000Z',
  //       tags: ['mineable', 'pow', 'scrypt', 'medium-of-exchange', 'memes', 'payments'],
  //       max_supply: null,
  //       circulating_supply: 129666593990.80733,
  //       total_supply: 129666593990.80733,
  //       platform: null,
  //       cmc_rank: 6,
  //       last_updated: '2021-05-20T07:51:03.000Z',
  //       quote: {
  //         USD: {
  //           price: 0.37429964431207,
  //           volume_24h: 15882216282.050093,
  //           percent_change_1h: 3.37812983,
  //           percent_change_24h: -10.53327864,
  //           percent_change_7d: -12.90405972,
  //           percent_change_30d: -8.27211813,
  //           percent_change_60d: 547.02442289,
  //           percent_change_90d: 560.76883852,
  //           market_cap: 48534160009.91678,
  //           last_updated: '2021-05-20T07:51:03.000Z',
  //         },
  //       },
  //     },
  //     {
  //       id: 52,
  //       name: 'XRP',
  //       symbol: 'XRP',
  //       slug: 'xrp',
  //       num_market_pairs: 673,
  //       date_added: '2013-08-04T00:00:00.000Z',
  //       tags: [
  //         'medium-of-exchange',
  //         'enterprise-solutions',
  //         'binance-chain',
  //         'arrington-xrp-capital',
  //         'galaxy-digital-portfolio',
  //         'a16z-portfolio',
  //         'pantera-capital-portfolio',
  //       ],
  //       max_supply: 100000000000,
  //       circulating_supply: 35108326973,
  //       total_supply: 99997364318,
  //       platform: null,
  //       cmc_rank: 7,
  //       last_updated: '2021-05-20T07:51:02.000Z',
  //       quote: {
  //         USD: {
  //           price: 1.19608658041059,
  //           volume_24h: 21409766085.126392,
  //           percent_change_1h: 2.97636464,
  //           percent_change_24h: -18.608369,
  //           percent_change_7d: -12.21505437,
  //           percent_change_30d: -3.8344449,
  //           percent_change_60d: 130.53913768,
  //           percent_change_90d: 122.02485076,
  //           market_cap: 41992598753.07245,
  //           last_updated: '2021-05-20T07:51:02.000Z',
  //         },
  //       },
  //     },
  //     {
  //       id: 6636,
  //       name: 'Polkadot',
  //       symbol: 'DOT',
  //       slug: 'polkadot-new',
  //       num_market_pairs: 195,
  //       date_added: '2020-08-19T00:00:00.000Z',
  //       tags: [
  //         'substrate',
  //         'polkadot',
  //         'binance-chain',
  //         'polkadot-ecosystem',
  //         'three-arrows-capital-portfolio',
  //         'polychain-capital-portfolio',
  //         'blockchain-capital-portfolio',
  //         'boostvc-portfolio',
  //         'cms-holdings-portfolio',
  //         'coinfund-portfolio',
  //         'fabric-ventures-portfolio',
  //         'fenbushi-capital-portfolio',
  //         'hashkey-capital-portfolio',
  //         'kinetic-capital',
  //         '1confirmation-portfolio',
  //         'placeholder-ventures-portfolio',
  //         'pantera-capital-portfolio',
  //         'exnetwork-capital-portfolio',
  //       ],
  //       max_supply: null,
  //       circulating_supply: 939293488.9855525,
  //       total_supply: 1074817603.8397403,
  //       platform: null,
  //       cmc_rank: 8,
  //       last_updated: '2021-05-20T07:51:07.000Z',
  //       quote: {
  //         USD: {
  //           price: 28.35459226713931,
  //           volume_24h: 11373967882.738657,
  //           percent_change_1h: 3.29785312,
  //           percent_change_24h: -23.84238833,
  //           percent_change_7d: -29.65895524,
  //           percent_change_30d: -12.14076603,
  //           percent_change_60d: -23.32157338,
  //           percent_change_90d: -9.72960537,
  //           market_cap: 26633283899.36405,
  //           last_updated: '2021-05-20T07:51:07.000Z',
  //         },
  //       },
  //     },
  //     {
  //       id: 8916,
  //       name: 'Internet Computer',
  //       symbol: 'ICP',
  //       slug: 'internet-computer',
  //       num_market_pairs: 30,
  //       date_added: '2021-03-23T00:00:00.000Z',
  //       tags: [
  //         'platform',
  //         'distributed-computing',
  //         'polychain-capital-portfolio',
  //         'exnetwork-capital-portfolio',
  //       ],
  //       max_supply: null,
  //       circulating_supply: 123949677.8,
  //       total_supply: 469213678.2958,
  //       platform: null,
  //       cmc_rank: 9,
  //       last_updated: '2021-05-20T07:50:10.000Z',
  //       quote: {
  //         USD: {
  //           price: 184.4456013664189,
  //           volume_24h: 1325680547.5046065,
  //           percent_change_1h: 5.05593991,
  //           percent_change_24h: 27.56704538,
  //           percent_change_7d: -40.71925523,
  //           percent_change_30d: 0,
  //           percent_change_60d: 0,
  //           percent_change_90d: 0,
  //           market_cap: 22861972860.99486,
  //           last_updated: '2021-05-20T07:50:10.000Z',
  //         },
  //       },
  //     },
  //     {
  //       id: 1831,
  //       name: 'Bitcoin Cash',
  //       symbol: 'BCH',
  //       slug: 'bitcoin-cash',
  //       num_market_pairs: 592,
  //       date_added: '2017-07-23T00:00:00.000Z',
  //       tags: [
  //         'mineable',
  //         'pow',
  //         'sha-256',
  //         'marketplace',
  //         'medium-of-exchange',
  //         'store-of-value',
  //         'enterprise-solutions',
  //         'payments',
  //         'binance-chain',
  //       ],
  //       max_supply: 21000000,
  //       circulating_supply: 18741600,
  //       total_supply: 18741600,
  //       platform: null,
  //       cmc_rank: 10,
  //       last_updated: '2021-05-20T07:50:09.000Z',
  //       quote: {
  //         USD: {
  //           price: 815.834202563131,
  //           volume_24h: 11342107544.720985,
  //           percent_change_1h: 4.60206005,
  //           percent_change_24h: -15.05975061,
  //           percent_change_7d: -38.10694083,
  //           percent_change_30d: -6.39649348,
  //           percent_change_60d: 54.04782709,
  //           percent_change_90d: 13.94223367,
  //           market_cap: 15290038290.757177,
  //           last_updated: '2021-05-20T07:50:09.000Z',
  //         },
  //       },
  //     },
  //   ]);
  // }

  setCurrencies(limit?: number) {
    return this.getCurrencies(limit).pipe(tap((currencies) => this.currencies.next(currencies)));
  }
}
