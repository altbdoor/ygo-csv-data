#!/usr/bin/env python

from collections import OrderedDict
import csv
import json
import re
import sys


args = sys.argv[1:]
if len(args) != 1:
    print("Please pass in the path to cardinfo.php.json!")
    print(
        "You can get the JSON file from https://db.ygoprodeck.com/api-guide/ "
        ', look for "Get all cards"'
    )
    sys.exit(1)

data = None
pendulum_regex = re.compile(r"\[ Pendulum Effect \][\s\S]+?(-{40}|$)")

with open(args[0], "r", encoding="utf-8") as fp:
    data = json.load(fp)["data"]
    print(f"Found {len(data)} card data")

remapped_cards = []
for card in data:
    full_desc = card.get("desc", "").strip()

    if "Pendulum Effect" in full_desc:
        desc = re.sub(pendulum_regex, "", full_desc).strip()
        pendulum_match = re.search(pendulum_regex, full_desc)
        pendulum_effect = pendulum_match.group(0) if pendulum_match else ""
        pendulum_effect = re.sub(r"-{40}", "", pendulum_effect).strip()
    else:
        desc = full_desc
        pendulum_effect = ""

    new_card = OrderedDict(
        [
            ("id", card.get("id", None)),
            ("name", card.get("name", None)),
            ("type", card.get("type", None)),
            ("archetype", card.get("archetype", None)),
            ("desc", desc),
            ("race", card.get("race", None)),
            ("attribute", card.get("attribute", None)),
            ("atk", card.get("atk", None)),
            ("def", card.get("def", None)),
            ("level", card.get("level", None)),
            ("tcg_date", card.get("misc_info")[0].get("tcg_date", None)),
            ("ocg_date", card.get("misc_info")[0].get("ocg_date", None)),
            ("pendulum_effect", pendulum_effect),
            ("pendulum_scale", card.get("scale", None)),
            ("ban_tcg", card.get("banlist_info", {}).get("ban_tcg", None)),
            ("ban_ocg", card.get("banlist_info", {}).get("ban_ocg", None)),
            ("has_effect", card.get("misc_info")[0].get("has_effect", None)),
            ("linkval", card.get("linkval", None)),
            ("linkmarkers", ",".join(card.get("linkmarkers", []))),
        ]
    )

    remapped_cards.append(new_card)

with open("output.csv", "w", newline="", encoding="utf-8") as fp:
    # https://stackoverflow.com/q/9845681
    writer = csv.DictWriter(
        fp, fieldnames=remapped_cards[0].keys(), lineterminator="\n"
    )
    writer.writeheader()

    for card in remapped_cards:
        writer.writerow(card)

print("Done")
