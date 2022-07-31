# ygo-csv-data

A small NodeJS/Python script to convert data from [YGOPRODeck API](https://db.ygoprodeck.com/api-guide/), to a CSV file.

To a friend! 🤝

## Setup for NodeJS

1. `cd nodejs`
1. Have NodeJS installed
    - I used Node 16, but fairly sure it works with slightly older versions
1. Install the dependencies with `npm install`
1. Build the script with `npm run build`, which will create `./dist/main.js`
1. Download the JSON response from YGOPRODeck API for all cards
    - Please visit <https://db.ygoprodeck.com/api-guide/> for more info
    - <https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes>
1. Run the script, against the JSON file
    - `node ./dist/main.js ./cardinfo.php.json`
1. Get `output.csv`, and have fun

## Setup for Python

1. `cd python`
1. Have Python 3.x installed
    - I used 3.9.7
1. No dependencies (yay, batteries included)
1. Download the JSON response from YGOPRODeck API for all cards
    - Please visit <https://db.ygoprodeck.com/api-guide/> for more info
    - <https://db.ygoprodeck.com/api/v7/cardinfo.php?misc=yes>
1. Run the script, against the JSON file
    - `python ./parse.py ./cardinfo.php.json`
1. Get `output.csv`, and have fun

## Notes

- The TypeScript interfaces were generated from the JSON file, with <https://github.com/jvilk/MakeTypes>
    - `npm run make-types` can be used to regenerate the `./nodejs/src/model.d.ts`
- The data extracted here is specific to the needs of a friend. Feel free to hack the `./nodejs/src/main.ts`!
- FWIW, I've tried my best to ensure that the output from NodeJS and Python are the same, via the `md5sum` hashes of their respective `output.csv`, but I cannot be fully sure of all edge cases
