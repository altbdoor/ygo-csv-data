import { createObjectCsvWriter } from "csv-writer";
import { existsSync, readFileSync } from "fs";
import { exit } from "process";
import { YGOData } from "./model";

const args = process.argv.slice(2);

if (!existsSync(args[0])) {
  console.error("Please pass in the path to cardinfo.php.json!");
  console.error(
    'You can get the JSON file from https://db.ygoprodeck.com/api-guide/ , look for "Get all cards"'
  );
  exit(1);
}

const jsonFile: YGOData = JSON.parse(readFileSync(args[0], "utf8"));
const cards = jsonFile.data!;
console.log(`Found ${cards.length} card data`);

const pendulumRegex = /\[ Pendulum Effect \][\s\S]+?(-{40}|$)/;

const cardsRemapped = cards.map((card) => {
  const pendulumEffect = card.desc.match(pendulumRegex);

  const remapped = {
    id: card.id,
    name: card.name,
    type: card.type,
    archetype: card.archetype ?? null,
    desc: card.desc.replace(pendulumRegex, "").trim(),
    race: card.race,
    attribute: card.attribute ?? null,
    atk: card.atk ?? null,
    def: card.def ?? null,
    level: card.level ?? null,
    tcg_date: card.misc_info![0].tcg_date ?? null,
    ocg_date: card.misc_info![0].ocg_date ?? null,
    pendulum_effect: pendulumEffect
      ? pendulumEffect[0].replace(/-{40}/, "").trim()
      : "",
    pendulum_scale: card.scale ?? null,
    ban_tcg: card.banlist_info?.ban_tcg ?? null,
    ban_ocg: card.banlist_info?.ban_ocg ?? null,
    has_effect: card.misc_info![0].has_effect ?? null,
    linkval: card.linkval ?? null,
    linkmarkers: (card.linkmarkers || []).join(","),
  };

  return remapped;
});

const csvWriter = createObjectCsvWriter({
  path: "./output.csv",
  header: [
    ...Object.keys(cardsRemapped[0]).map((val) => ({ id: val, title: val })),
  ],
});
csvWriter.writeRecords(cardsRemapped);
console.log("Done");
