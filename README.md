# WATTx challenge

[Challenge link](https://github.com/WATTx/code-challenges/blob/master/frontend-engineer-challenge-top-coins.md)

## Solution

The application contains 2 pages: Market overview and Liquidity analysis page.

I used the `@angular/router` to handle page resolve. It's not so necessary here, but
in most application it's better to use router because of application support simplicity
in future.

To handle with chart I used `chart.js`. This library is building charts by using canvas.
This way charts is rendered way much faster, but they are not so interactive in most cases.
In this application using canvas charts is not a problem.

To simplify deployment I used Docker.

On top of it in this application a lot of development stuff, such as linters and
commit hooks. They make developer life easier.

For component testing I used karma, just because it is installed by default. If I had
more time I would choose Cypress for component tests.

For e2e tests I used Cypress. This tool is extremely handy, have good interface and
a lot of good points, such as screenshot on failure, module system and so on.

## Run application

### You can run application using docker

```shell
docker build -t wattx-challenge .
docker run --env-file=".env" --env API_KEY="..." --rm -p 8080:80 -it wattx-challenge:latest
```

The application will be available at http://localhost:8080

> Important! You need API_KEY to run application
> You can find it on [coinmarketcap api page](https://coinmarketcap.com/api/)

### You can run application using dev server

You have to set API_KEY to environment and run server
```shell
API_KEY=... npm run start
# or for windows
set API_KEY=... && npm run start
```

Or you can create file `.env.local` alongside `.env` with this content:
```dotenv
API_KEY=...
```
And run server without any needs to set API_KEY to environment
```shell
npm run start
```

## What haven't done
- UI - there is no pretty design, fonts etc.
- PWA hasn't done
- Loading/Error states
- Responsive for chart
- Haven't done correct way to writing css @media queries
- No aria-labels
- .env file works only for dev proxy now. It isn't change process.env now
- No correct meta tags, such as theme-color, og:*, description, etc.
- ...and a lot of other stuff

I decided to stop at this point.
If you don't mind I can explain how to do that things in call.
