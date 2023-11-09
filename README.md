# Aleo wallets generator

## Install
1. Download and install [Node.js](https://nodejs.org/en/download)
1. Install yarn using `npm install -g yarn`
1. Install dependencies using `yarn` command in project root
1. Create `input/` folder in project root
1. Create `output/` folder in project root
1. Create `config.js` file and fill it as in `config.example.js` example file

## Generate wallets
1. `config.js` is not used by this mode
1. Run `yarn gen <count>` (e.g. `yarn gen 20`)
1. Generated wallets will be in `output/` folder

## Check balance
1. Set `CHECK_BAL_SLEEP_BETWEEN_ACCS_SEC` and `MOBILE_PROXY_ROTATE_URL` in `config.js` file
1. Create `addresses.txt` file in `input/` folder and fill it with aleo addresses (each from new line)
1. Create `proxies.txt` file in `input/` folder and fill it with your **__SOCKS5__** proxies (host:port:username:password) (empty if no proxies)
1. Run `yarn check-balances`
1. Balances with be saved in `output/balances.txt`

## Notify on balance
1. Set `NOTIFY_SLEEP_BETWEEN_ACCS_SEC`, `NOTIFY_TG_BOT_KEY`, `NOTIFY_TG_ID` and `MOBILE_PROXY_ROTATE_URL` in `config.js` file
1. To get `NOTIFY_TG_BOT_KEY` use https://t.me/BotFather
1. To get `NOTIFY_TG_ID` use https://t.me/my_id_bot
1. You must start your bot from your telegram account to make it work
1. Create `addresses.txt` file in `input/` folder and fill it with aleo addresses (each from new line)
1. Create `proxies.txt` file in `input/` folder and fill it with your **__SOCKS5__** proxies (host:port:username:password) (empty if no proxies)
1. Run `yarn notify`


Explore more scripts on our Telegram channel [alfar](https://t.me/+FozX3VZA0RIyNWY6)
