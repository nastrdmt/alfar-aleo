# Aleo wallets generator

## Install
1. Download and install [Node.js](https://nodejs.org/en/download)
1. Install yarn using `npm install -g yarn`
1. Install dependencies using `yarn` command in project root
1. Create `input/` folder in project root
1. Create `output/` folder in project root
1. Create `config.js` file and fill it as in `config.example.js` example file

## Generate wallets
1. Run `yarn gen <count>` (e.g. `yarn gen 20`)
1. Generated wallets will be in `output/` folder

## Check balance
1. Create `addresses.txt` file in `input/` folder and fill it with aleo addresses (each from new line)
1. Create `proxies.txt` file in `input/` folder and fill it with your **__SOCKS5__** proxies (host:port:username:password) (empty if no proxies)
1. Configure script in `config.js` file
1. Run `yarn check-balances`
1. Balances with be saved in `output/balances.txt`

Explore more scripts on our Telegram channel [alfar](https://t.me/+FozX3VZA0RIyNWY6)
