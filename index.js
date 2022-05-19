import fs from "fs"
import path from "path";

const jsonsInDir = fs.readdirSync('./json').filter(file => path.extname(file) === '.json');
const categories = {};
const categoryPercents = {};
jsonsInDir.forEach(file => {
    const fileData = fs.readFileSync(path.join('./json', file));
    const json = JSON.parse(fileData.toString());

    for (let i = 0; i < json.attributes.length; i++) {
        const trait = json.attributes[i];
        if (!categories[trait.trait_type]) categories[trait.trait_type] = {};
        if (!categories[trait.trait_type][trait.value]) categories[trait.trait_type][trait.value] = 0;
        categories[trait.trait_type][trait.value]++;
    }

    for (const category in categories) {
        if (!categoryPercents[category]) categoryPercents[category] = {};
        const traits = categories[category];
        for (const trait in traits) {
            const count = traits[trait];
            categoryPercents[category][trait] = (count / jsonsInDir.length) * 100;
        }

    }
});
fs.writeFileSync('results3.json', JSON.stringify(categoryPercents));
console.log("Wrote to file");
