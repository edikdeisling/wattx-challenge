# WATTx challenge

- .env.local
- mobile
- UI + fonts
- pwa

docker build -t wattx-challenge .
docker run --env-file=".env" --env API_KEY="" --rm -p 8080:80 -it wattx-challenge:latest
