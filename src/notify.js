import axios from "axios";
import fs from "fs";
import { SocksProxyAgent } from "socks-proxy-agent";
import {
  MOBILE_PROXY_ROTATE_URL,
  NOTIFY_SLEEP_BETWEEN_ACCS_SEC,
  NOTIFY_TG_BOT_TOKEN,
  NOTIFY_TG_ID,
} from "../config.js";

const encoding = "utf-8";

const sleep = (/** @type {number} */ ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const readFile = (/** @type {string} */ name) =>
  fs.readFileSync(name, { encoding });

const readFileLines = (/** @type {string} */ name) =>
  readFile(name).split("\n");

const randomChoice = (/** @type {any[]} */ array) =>
  array[Math.floor(Math.random() * array.length)];

const getProxyAgent = (proxyStr) => {
  const [host, port, username, password] = proxyStr.split(":");
  const formattedProxy = `socks5://${username}:${password}@${host}:${port}`;

  return new SocksProxyAgent(formattedProxy);
};

const now = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
};

const getBalance = async (address, userAgent, proxyAgent) => {
  try {
    const res = await axios.get(
      `https://api.explorer.aleo.org/v1/testnet3/program/credits.aleo/mapping/account/${address}`,
      {
        headers: { "User-Agent": userAgent },
        httpAgent: proxyAgent,
        httpsAgent: proxyAgent,
      },
    );

    return { error: null, balance: res.data || "0" };
  } catch (error) {
    return { error: error.message || "undefined error", balance: null };
  }
};

const sendTelegramMessage = async (text) => {
  const query = new URLSearchParams({
    chat_id: NOTIFY_TG_ID,
    text,
    parse_mode: "Markdown",
  }).toString();

  await axios.get(
    `https://api.telegram.org/bot${NOTIFY_TG_BOT_TOKEN}/sendMessage?${query}`,
  );
};

const main = async () => {
  const addresses = readFileLines("input/addresses.txt").filter(Boolean);
  const proxies = readFileLines("input/proxies.txt").filter(Boolean);

  const userAgents = readFileLines("assets/userAgents.txt").filter(Boolean);

  console.log(
    `found ${addresses.length} addresses and ${proxies.length} proxies`,
  );

  await sleep(10 * 1000);

  while (addresses.length) {
    const address = addresses.shift();

    const userAgent = randomChoice(userAgents);
    const proxyAgent = proxies.length
      ? getProxyAgent(randomChoice(proxies))
      : undefined;

    const { error, balance } = await getBalance(address, userAgent, proxyAgent);

    if (error) {
      await sendTelegramMessage(`\`${address}\`\n\n${error}`);
      addresses.push(address);
    } else {
      if (balance !== "0") {
        await sendTelegramMessage(
          `\`${address}\`\n\n${balance}\n\n${addresses.length} left`,
        );
      } else {
        addresses.push(address);
      }
    }

    console.log(`${address} - ${balance} | ${addresses.length} left`);

    if (MOBILE_PROXY_ROTATE_URL) await axios.get(MOBILE_PROXY_ROTATE_URL);

    if (addresses.length) await sleep(NOTIFY_SLEEP_BETWEEN_ACCS_SEC * 1000);
  }
};

main();
