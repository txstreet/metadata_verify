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
        const trait_type = trait.trait_type;
        const trait_value = trait.value.replace(/[0-9]/g, '').trim();
        if (!categories[trait_type]) categories[trait_type] = {};
        if (!categories[trait_type][trait_value]) categories[trait_type][trait_value] = 0;
        categories[trait_type][trait_value]++;
    }

    for (const category in categories) {
        if (!categoryPercents[category]) categoryPercents[category] = {};
        const traits = categories[category];
        for (const trait in traits) {
            const trait_type = trait;
            const count = traits[trait_type];
            categoryPercents[category][trait_type] = (count / jsonsInDir.length) * 100;
        }

    }
});
fs.writeFileSync('results4.json', JSON.stringify(categoryPercents));
console.log("Wrote to file");
