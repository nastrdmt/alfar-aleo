import { writeFileSync } from "fs";

import { Account } from "@aleohq/sdk";
import { derivePath } from "@demox-labs/aleo-hd-key";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";

const COUNT = 10;

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

const accounts = Array.from({ length: COUNT })
  .map(() => {
    const mnemonic = generateMnemonic(128);

    const hexSeed = mnemonicToSeedSync(mnemonic).toString("hex");

    const { seed } = derivePath("m/44'/0'/0'/0'", hexSeed);

    const aleoAccount = new Account({ seed });

    const privateKey = aleoAccount.privateKey().to_string();
    const viewKey = aleoAccount.viewKey().to_string();
    const address = aleoAccount.address().to_string();

    return [mnemonic, privateKey, viewKey, address].join(";");
  })
  .join("\n");

writeFileSync(`./output/accounts_${now()}.txt`, accounts);
