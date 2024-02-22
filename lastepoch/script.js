function fetchCsvData() {
  let rawData =
 `Chapter,Step,Task,Reward
Chapter 1,1,Go to the Burning Forest -> Rescue Grael,
Chapter 1,2,The Keepers -> NPC Keeper Leena,"Experience,Gold,Passive"
Chapter 1,3,Go to The Fortress Gardens,
Chapter 1,4,Go to the Fortress Walls,
Chapter 1,5,Go to The Storerooms -> Storeroom Saboteurs,Passive
Chapter 1,6,Go to the The Keeper Vault -> The Keeper Vault,"Experience,Passive"
Chapter 1,7,Go to the Northern Road,
Chapter 1,8,Town Portal,
Chapter 1,9,Go to Ulatri Highlands,
Chapter 1,10,Go to The Osprix Warcamp,
Chapter 1,11,Go to The Summit,
Chapter 2,1,Go to Last Refuge Outskirts -> The Void Assault,"Experience,Gold,Idol"
Chapter 2,2,In Last Refuge Outskirts -> Evacuation,"Experience,Gold,Passive"
Chapter 2 ,3,Go to The Council Chambers,
Chapter 2 ,4,Go to The Last Archive,
Chapter 2 ,5,Go to Erza's Library -> Get Ledger,
Chapter 2,6,Go to Pannion's Study,
Chapter 2,7,Finding Pannion,"Experience,Gold,Passive"
Chapter 2,8,Town Portal,
Chapter 2 ,9,"Erza = Gloves (Ele Leech), Artem = Amulet (Crit)","Experience,Gold,Passive,Unique"
Chapter 2 ,10,Go to The Precipice,
Chapter 2 ,11,Go to The Armoury,
Chapter 2 ,12,Go to The Lower District,
Chapter 2 ,13,Go to The End of Time,
Chapter 2 ,14,The Power of Mastery,"Experience,Passive,Mastery"
Chapter 3 ,0,Skip all Sidequests,
Chapter 3 ,1,Go to Council Chamber,
Chapter 3 ,2,Go to The Sheltered Wood,
Chapter 3 ,3,Go to The Surface,
Chapter 3 ,4,Go to The Forsaken Trail,
Chapter 3 ,5,Go to Cultist Camp,
Chapter 3 ,6,Go to The Ruins of Welryn,
Chapter 3 ,7,Go to Welryn Undercity,
Chapter 3 ,8,Town Portal,
Chapter 3 ,9,Go to Welryn Docks,
Chapter 3 ,10,Go to Cultist Camp,
Chapter 3,11, Go to The Ritual Site,
Chapter 3 ,12,Go to The Shattered Valley (Skip Rift),
Chapter 3 ,13,Go to The Courtyard,
Chapter 3 ,14,Go to The Temple of Eterra,
Chapter 3 ,15,Go to The Lotus Halls,
Chapter 3 ,16,Go to The Sanctum Bastille,
Chapter 3,17, Go to The End of Time,
Chapter 4 ,1,Go to The Outcast Camp -> Speak to Outcast Queen,
Chapter 4 ,2,Go to Welryn Outskirts,
Chapter 4 ,3,Go to Imperial Welryn,
Chapter 4 ,4,Go to The Soul Wardens' Road,
Chapter 4 ,5,Go to The Risen Lake -> The Corrupted Lake (Rift),"Experience,Passive,Idol"
Chapter 4 ,6,Go to The Fallen Tower,
Chapter 4 ,7,Go to Imperial Thetima,
Chapter 4 ,8,Go to The Darkling Pier,
Chapter 4 ,9,Go to The Imperial Dreadnought,
Chapter 4 ,10,Go to The Dreadnought's Deck,
Chpater 4 ,11,Jump off the Deck! -> The Admiral's Dreadnought,"Experience,Gold,Idol"
Chapter 5 ,1,Go to The Shining Cove,
Chapter 5 ,2,Go to The Majasan Desert,
Chapter 5 ,3,Go to The Wraith Dunes -> Hidden Gems (bottom right),"Experience,Gold,Passive"
Chapter 5 ,4,Go to Maj'Elka,
Chapter 5 ,5,Go to The Oracles Abode,"Experience,Gold,Passive"
Chapter 5 ,6,Go to the Shining Cove and find the Time Rift,
Chapter 5 ,7,Go to the Ruined Coast (Rift) -> The Sapphire Tablet,"Experience,Passive,Idol "
Chapter 5 ,8,Go to The Temporal Sanctum WP -> Back to The Oracle's Abode,
Chapter 5 ,9,Go to The Maj'Elkan Catacombs,
Chapter 5 ,10,Go to Titan's Canyon,
Chapter 5 ,11,Go to The Maj'Elka Waystation,
Chapter 6 ,0,Skip all Sidequests,
Chapter 6 ,1,Go to The Desert Waystation,
Chapter 6 ,2,Go to The Rust Lands,
Chapter 6 ,3,Go to The Lower Sewers,
Chapter 6 ,4,Go to The Barren Aqueduct,
Chapter 6 ,5,Go to Necropolis of the Deep,
Chapter 6 ,6,Go to Yulia's Haven -> Speak with NPC's,
Chapter 6 ,7,Go to The Upper Necropolis,
Chapter 6 ,8,Go to The Citadel Sewers,
Chapter 6 ,9,Go to The Immortal Summit,
Chapter 6 ,10,Go to The Immortal Citadel -> The Immortal Citadel,"Experience,Gold,Passive"
Chapter 6 ,11,Go to The Gates of Solarum (Rift),
Chapter 7 ,1,Go to The Burning Forest,
Chapter 7 ,2,Go to The Scorched Grove,
Chapter 7 ,3,Go to The Solemn Path,
Chapter 7 ,4,Go to Heoborea,
Chapter 7 ,5,Go to The Heoborean Forest,
Chapter 7 ,6,Go to The Nomad Camp,
Chapter 7 ,7,Go to The Wengeri Frotress -> Liberating The Nomads,"Experience,Gold,Idol"
Chapter 7 ,8,Town Portal,
Chapter 7 ,9,Go to The Tundra,
Chapter 7 ,10,Go to The Temple of Heorot,
Chapter 7 ,11,Go to Farwood,
Chapter 7 ,12,Go to The Frozen Roots,
Chapter 7 ,13,Go to The Tomb of Morditas -> The Lance of Heorot,"Experience,Gold,Idol"
Chapter 7 ,14,Town Portal,
Chapter 8 ,1,Go to The Northern Stream,
Chapter 8 ,2,Go to Deep Harbor,
Chapter 8 ,3,Go to The Burning Pier,
Chapter 8 ,4,Go to Deep Harbor,
Chapter 8 ,5,Go to Etendell,
Chapter 8 ,6,Go to Lake Liath,
Chapter 8 ,7,Go to Liath's Road,
Chapter 8 ,8,Go to Thetima,
Chapter 8 ,9,Go to Liath's Tower -> Liath's Tower,"Experience,Passive,Idol"
Chapter 8 ,10,Go back to Thetima,
Chapter 8 ,11,Go to Lagon's Isle,
Chapter 8 ,12,Go to Moonlit Shrine,
Chapter 8 ,13,Go to The Strand of Storms (fragment),
Chapter 8 ,14,Go back to Moonlit Shrine,
Chapter 8 ,15,Go to The Coral Pools (fragment),
Chapter 8 ,16,Go back to Moonlit Shrine,
Chapter 8 ,17,Go to The Temple of Lagon,
Chapter 8 ,18,Go to The Temple Depths,
Chapter 8 ,19,Go to Sanctum of the Architect,
Chapter 8 ,20,Go to Seafloor Colosseum -> Lagon,"Experience,Passive"
Chapter 9 ,1,Go to Soreth'ka,
Chapter 9 ,2,Go to The Crossroads,
Chapter 9 ,3,Go to The Dry River,
Chapter 9 ,4,Go to The Radiant Dunes -> Bottom Right Area-Then Top Right,
Chapter 9 ,5,Go to Maj'Elka Upper District,
Chapter 9 ,6,Go to Maj'Elka Lower District,
Chapter 9 ,7,Go to Maj'Elka Slums -> Desert Treasure (First Top Right Basement),"Experience,Passive,Idol"
Chapter 9 ,8,Town Portal,
Chapter 9 ,9,Go to The Oasis,
Chapter 9 ,10,Go to The Crystal Mines,
Chapter 9 ,11,Go to The Aerie,
Chapter 9 ,12,Go to Majasan Heights (Flying),
Chapter 9 ,13,Go to The Temple Rooftops,
Chapter 9 ,14,Go to The Upper Temple,
Chapter 9 ,15,Go to The Lower Temple,
Chapter 9 ,16,Go to the Chamber of Vessel -> Apophis And Majasa,"Experience,Passive,Attributes"
`;


const data = rawData.trim().split('\n').slice(1).map(row => {
    // Split the row by commas, but ignore commas inside quotes
    const regex = /(?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*)/g;
    let matches = [];
    let match;
    while (match = regex.exec(row)) {
        matches.push(match[1]);
    }

    // Remove leading/trailing quotes and extra spaces
    matches = matches.map(field => field.trim().replace(/^"|"$/g, '').trim());

    // Assuming there are always 3 fields per row
    if (matches.length === 4) {
        const [chapter, step, task, rewardString] = matches;
        const rewards = rewardString ? rewardString.split(',').map(r => r.trim()) : [];
        return { chapter, step, task, rewards };
    }
    return null;
}).filter(row => row !== null);

//    console.log(data);
  return data;
}

function fetchBlessingsCsvData() {
    let blessingsRawData = 
    `Name,Blessing,Effect
Fall of the Empire,Grand Hope of the Beginning,15% to 25% Increased Prefix Shard Drop Rate
Fall of the Empire,Grand Safety of the Labyrinth,22% to 35% Increased Amulet Shard Drop Rate
Fall of the Empire,Grand Remnants of the Living,33% to 50% Increased Ring Shard Drop Rate
Fall of the Empire,Grand Visions of Death,40% to 60% Increased Two-Handed Spear Shard Drop Rate
Fall of the Empire,Grand Inevitability of the Void,30% to 45% Increased Two-Handed Staff Shard Drop Rate
Fall of the Empire,Grand Rot of the World,40% to 60% Increased Wand Shard Drop Rate
Fall of the Empire,Grand Boon of the Scarab,40% to 60% Increased Bow Shard Drop Rate
Fall of the Empire,Grand Shadows of Infinity,22% to 35% Increased Relic Shard Drop Rate
Fall of the Empire,Grand Despair of the Empire,45% to 70% Increased Ailment Shard Drop Rate
Fall of the Outcasts,Grand Pride of Rebellion,51% to 100% Increased Grand Idol Drop Rate
Fall of the Outcasts,Grand Sight of the Outcasts,51% to 100% Increased Large Idol Drop Rate
Fall of the Outcasts,Grand Curse of Flesh,51% to 100% Increased Huge Idol Drop Rate
Fall of the Outcasts,Grand Favor of Souls,51% to 100% Increased Ornate Idol Drop Rate
Fall of the Outcasts,Grand Mark of Agony,51% to 100% Increased Adorned Idol Drop Rate
Fall of the Outcasts,Grand Memory of the Living,16% to 25% Increased Glyph Drop Rate
Fall of the Outcasts,Grand Sign of Torment,16% to 25% Increased Rune Drop Rate
Fall of the Outcasts,Grand Winds of Fortune,16% to 22% Increased Unique Drop Rate
Fall of the Outcasts,Grand Strength of Mind,7% to 10% Increased Experience
Fall of the Outcasts,Grand Scales of Greed,45% to 70% Increased Gold Drop Rate
The Stolen Lance,Grand Arrogance of Argentus,22% to 50% Increased Helmet Drop Rate
The Stolen Lance,Grand Embrace of Ice,22% to 50% Increased Body Armour Drop Rate
The Stolen Lance,Grand Grip of the Lance,35% to 75% Increased Gloves Drop Rate
The Stolen Lance,Grand Right of Conquest,35% to 75% Increased Boots Drop Rate
The Stolen Lance,Grand Reach of Flame,35% to 75% Increased Off-Hand Catalyst Drop Rate
The Stolen Lance,Grand Binds of Sanctuary,35% to 75% Increased Shield Drop Rate
The Stolen Lance,Grand Slumber of Morditas,30% to 60% Increased Relic Drop Rate
The Stolen Lance,Grand Talon of Granduer,35% to 75% Increased Ring Drop Rate
The Stolen Lance,Grand Vision of the Aurora,35% to 75% Increased Amulet Drop Rate
The Stolen Lance,Grand Might of the Siege,35% to 75% Increased Belt Drop Rate
The Stolen Lance,Grand Apex of Fortune,41% to 60% Increased Quiver Drop Rate
The Black Sun,Grand Wrath of Rahyeh,+(3.1% to 5%) of Throwing Damage Leeched as Health
The Black Sun,Grand Whisper of Orobyss,+(65% to 100%) increased Void Damage
The Black Sun,Grand Flames of the Black Sun,+(65% to 100%) Chance to Ignite on Hit
The Black Sun,Grand Hunger of the Void,+(3.1% to 5%) of Spell Damage Leeched as Health
The Black Sun,Grand Strength of the Mountain,15 to 22 Health Gain on Block
The Black Sun,Grand Winds of Oblivion,+(51% to 80%) increased Critical Strike Chance
The Black Sun,Grand Depths of Infinity,+(25% to 50%) Chance to Shred Void Resistance on Hit
The Black Sun,Grand Greed of Darkness,15 to 22 Health Gain on Kill
The Black Sun,Grand Emptiness of Ash,+(27% to 40%) Critical Strike Multiplier
The Black Sun,Grand Thirst of the Sun,35% to 50% Increased Leech Rate
"Blood, Frost, and Death",Grand Cruelty of Formosus,50% to 90% Increased Wand Drop Rate
"Blood, Frost, and Death",Grand Savior of the North,50% to 90% Increased Sceptre Drop Rate
"Blood, Frost, and Death",Grand Chill of Death,50% to 90% Increased Two-Handed Staff Drop Rate
"Blood, Frost, and Death",Grand Enmity of the Clans,50% to 90% Increased One-Handed Sword Drop Rate
"Blood, Frost, and Death",Grand Ambition of the Empire,50% to 90% Increased Two-Handed Sword Drop Rate
"Blood, Frost, and Death",Grand Scars of Blood,50% to 90% Increased One-Handed Axe Drop Rate
"Blood, Frost, and Death",Grand Favor of the Wengari,50% to 90% Increased Two-Handed Axe Drop Rate
"Blood, Frost, and Death",Grand Resolve of Frost,50% to 90% Increased One-Handed Mace Drop Rate
"Blood, Frost, and Death",Grand Shards of Unity,50% to 90% Increased Two-Handed Mace Drop Rate
"Blood, Frost, and Death",Grand Remorse of Heorot,50% to 90% Increased Two-Handed Spear Drop Rate
"Blood, Frost, and Death",Grand Vigilance of the Damned,50% to 75% Increased Bow Drop Rate
"Blood, Frost, and Death",Grand Subtlety of Slaughter,50% to 75% Increased Dagger Drop Rate
Ending the Storm,Grand Bastion of Divinity,+(45% to 75%) Lightning Resistance
Ending the Storm,Grand Light of the Moon,+(51 to 80) Mana
Ending the Storm,Grand Rhythm of the Tide,+(120% to 200%) increased Health Regen
Ending the Storm,Grand Chaos of Lagon,+(65% to 100%) increased Lightning Damage
Ending the Storm,Grand Might of the Sea TItan,+(65% to 100%) increased Cold Damage
Ending the Storm,Grand Resonance of the Sea,+(30 to 42) Ward per Second
Ending the Storm,Grand Mysteries of the Deep,+(25% to 50%) Chance to Shred Lightning Resistance on Hit
Ending the Storm,Grand Cruelty of the Meruna,+(65% to 100%) Chance to Shock on Hit
Ending the Storm,Grand Weight of the Abyss,+(200% to 300%) Freeze Rate Multiplier
Ending the Storm,Grand Crash of the Waves,100% to 160% Increased Stun Chance
Ending the Storm,Grand Trance of the Sirens,15% to 22% Increased Shock Duration
Ending the Storm,Grand Intellect of Liath,30% to 50% Chance to Gain 30 Ward when Hit
Ending the Storm,Grand Grace of Water,80 to 130 Ward Gained on Potion Use
Reign of Dragons,Grand Binds of Nature,+(65% to 100%) increased Poison Damage
Reign of Dragons,Grand Despair of Flesh,+(65% to 100%) increased Necrotic Damage
Reign of Dragons,Grand Cruelty of Strength,+(65% to 100%) increased Physical Damage
Reign of Dragons,Grand Hemmorage of Marrow,+(65% to 100%) Chance to Bleed on Hit
Reign of Dragons,Grand Taste of Venom,+(55% to 85%) Chance to Poison on Hit
Reign of Dragons,Grand Hunger of Dragons,+(4.5% to 7%) of Melee Damage Leeched as Health
Reign of Dragons,Grand Virtue of Command,+(13% to 20%) to Minion All Resistances
Reign of Dragons,Grand Persistance of Will,+(45% to 75%) Poison Resistance
Reign of Dragons,Grand Guile of Wyrms,+(100% to 150%) Chance to Shred Poison Resistance on Hit
Reign of Dragons,Grand Allure of Apathy,+(65% to 100%) Chance to Slow on Hit
Reign of Dragons,Grand Resolve of Humanity,+(13% to 20%) to All Resistances
Reign of Dragons,Grand Survival of Might,+(50% to 70%) Critical Strike Avoidance
Reign of Dragons,Grand Dream of Eterra,+(45% to 75%) Necrotic Resistance
The Last Ruin,Grand Temple of the Mind,22% to 35% Increased Helmet Shard Drop Rate
The Last Ruin,Grand Bastion of the Heart,22% to 35% Increased Body Armour Shard Drop Rate
The Last Ruin,Grand Binding of Ruin,32% to 50% Increased Belt Shard Drop Rate
The Last Ruin,Grand Refuge of Despair,32% to 50% Increased Shield Shard Drop Rate
The Last Ruin,Grand Comfort of the End,22% to 35% Increased Suffix Shard Drop Rate
The Last Ruin,Grand Memory of Masters,20% to 30% Increased Class Specific Shard Drop Rate
The Last Ruin,Grand Grasp of Hope,32% to 50% Increased Gloves Shard Drop Rate
The Last Ruin,Grand Remnants of the Elders,32% to 50% Increased Off-Hand Catalyst Shard Drop Rate
The Last Ruin,Grand Knowledge of Skill,22% to 35% Increased Skill Shard Drop Rate
The Age of Winter,Grand Maw of Artor,+(65% to 100%) Chance to apply Frostbite on Hit
The Age of Winter,Grand Winds of Frost,+(55% to 80%) Freeze Rate per stack of Chill
The Age of Winter,Grand Rage of Winter,+(25% to 50%) Chance to Shred Cold Resistance on Hit
The Age of Winter,Grand Fury of the North,+(25% to 50%) Chance to Shred Physical Resistance on Hit
The Age of Winter,Grand Heart of Ice,+(40% to 60%) Chance to Chill on Hit
The Age of Winter,Grand Bones of Eternity,"+(5% to 8%) Block Chance, +(180 to 240) Block Effectiveness"
The Age of Winter,Grand Bulwark of the Tundra,+(40% to 70%) increased Armor
The Age of Winter,Grand Defiance of Yulia,+(11 to 20) Spell Cold Damage While Channelling
Spirits of Fire,Grand Embers of Immortality,+(15% to 27%) Endurance
Spirits of Fire,Grand Swiftness of Logi,+(40% to 70%) increased Dodge Rating
Spirits of Fire,Grand Breath of Cinders,+(25% to 50%) Chance to Shred Fire Resistance on Hit
Spirits of Fire,Grand Promise of Death,+(25% to 50%) Chance to Shred Necrotic Resistance on Hit
Spirits of Fire,Grand Spirit of Command,+(65% to 100%) increased Minion Damage
Spirits of Fire,Grand Might of Bhuldar,32% to 50% Increased Stun Duration
Spirits of Fire,Grand Flames of Calamity,+(65% to 100%) increased Fire Damage
Spirits of Fire,Grand Patience of Herkir,+(500 to 750) Armor While Channelling
Spirits of Fire,Grand Heart of the Caldera,+(45% to 75%) Fire Resistance
Spirits of Fire,Grand Body of Obsidian,+(200 to 320) Armor
Spirits of Fire,Grand Curse of Sulphur,+(40% to 60%) Chance to apply Frailty on Hit
`;
const rows = blessingsRawData.trim().split('\n').slice(1);
const data = rows.map(row => {
    const [name, blessing, effect] = parseCsvRow(row);
    return { name, blessing, effect };
});

    return data;
}
function parseCsvRow(row) {
    const regex = /(?:^|,)(\"(?:[^\"]*(?:\"\"[^\"]*)*)\"|[^,]*)/g;
    let columns = [];
    let match;
    while (match = regex.exec(row)) {
        let column = match[1].replace(/^"|"$/g, '').replace(/""/g, '"');
        columns.push(column.trim());
    }
    return columns;
}
const rewardIconMapping = {
    "Passive": { src: "./pics/passive-icon.png", alt: "Passive Reward" },
    "Idol": { src: "./pics/idol-icon.png", alt: "Idol Reward" },
    "Gold": { src: "./pics/gold-icon.png", alt: "Gold Reward" },
    "Mastery": { src: "./pics/mastery-icon.png", alt: "Mastery Reward" },
    "Unique": { src: "./pics/unique-icon.png", alt: "Unique Reward" },
    "Experience": { src: "./pics/experience-icon.png", alt: "Experience Reward" },
    "Attributes": { src: "./pics/attributes-icon.png", alt: "Attributes Reward" }
};

function buildTableForChapter(chapterFilter, data) {
    let tableContent = data
        .filter(row => row.chapter === chapterFilter)
        .map(row => {
            const rewardIcons = row.rewards.map(rewardKey => {
                const rewardInfo = rewardIconMapping[rewardKey];
                return rewardInfo ? `<img src="${rewardInfo.src}" alt="${rewardInfo.alt}" class="reward-icon">` : '';
            }).join(' ');

            return `<tr><td>${row.step}</td><td>${row.task}</td><td>${rewardIcons}</td></tr>`;
        })
        .join('');

    return `<p>Step numbers on cheatsheet DO NOT align with table</p><table>
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Task</th>
                        <th>Reward</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableContent}
                </tbody>
            </table>`;
}

function buildTableForBlessings(data) {
    let tableContent = data.map(row => {
        return `<tr><td>${row.name}</td><td>${row.blessing}</td><td>${row.effect}</td></tr>`;
    }).join('');

    return `<table id="blessingsTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blessing</th>
                        <th>Effect</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableContent}
                </tbody>
            </table>`;
}



document.addEventListener('DOMContentLoaded', function() {
    const data = fetchCsvData();

    let chapterCount = 9;
    for (let i = 1; i <= chapterCount; i++) {
        document.getElementById(`chapter${i}Section`).innerHTML = buildTableForChapter(`Chapter ${i}`, data);
    }

    let blessingData = fetchBlessingsCsvData();
    let tableHtml = buildTableForBlessings(blessingData);
    document.getElementById('blessingsTable').innerHTML = tableHtml;
});

function filterBlessingsTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("filterBlessingsInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("blessingsTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 1; i < tr.length; i++) { // Start from 1 to skip the header row
        td = tr[i].getElementsByTagName("td");
        var showRow = false;
        for (var j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                    break;
                }
            }       
        }
        tr[i].style.display = showRow ? "" : "none";
    }
}


function collapseChapterDetails() {
    // Select all <summary> elements with an ID containing 'chapter'
    const summaries = document.querySelectorAll('summary[id*="chapter"]');

    // Loop through each summary
    summaries.forEach(summary => {
        // Get the parent <details> element
        const details = summary.parentElement;

        // Check if the parent is a <details> element
        if (details && details.tagName === 'DETAILS') {
            // Collapse the <details> element
            details.open = false;
        }
    });
}

function expandChapterDetails() {
    // Select all <summary> elements with an ID containing 'chapter'
    const summaries = document.querySelectorAll('summary[id*="chapter"]');

    // Loop through each summary
    summaries.forEach(summary => {
        // Get the parent <details> element
        const details = summary.parentElement;

        // Check if the parent is a <details> element
        if (details && details.tagName === 'DETAILS') {
            // Collapse the <details> element
            details.open = true;
        }
    });
}



document.addEventListener("DOMContentLoaded", function() {

    let dungeonsRawData = `dungeon,reward,mod,reward increase,day
Temporal Sanctum,the dungeon boss drops a horde of Exalted Jewelry,"+90% increased Damage, +120% increased Health",Drop Count: 6-7,1
Temporal Sanctum,enemies drop substantially more exalted relics,"+90% increased Damage, +100% increased Health",Increased Chance: 7%,2
Temporal Sanctum,the dungeon boss drops a horde of Exalted Weapons,"+120% increased Damage, +90% increased Health",Drop Count: 6-7,3
Temporal Sanctum,the dungeon boss drops a horde of Runes,"+80% increased Damage, +110% increased Health",Drop Count: 7-8,4
Temporal Sanctum,enemies drop substantially more exalted amulets,"+100% increased Damage, +90% increased Health",Increased Chance: 7%,5
Temporal Sanctum,the dungeon boss drops a Glyph of Despair,"+120% increased Damage, +120% increased Health",Drop Count: 1,6
Temporal Sanctum,the dungeon boss drops a Unique Weapon,"+110% increased Damage, +110% increased Health",Drop Count: 1,7
Temporal Sanctum,enemies drop substantially more glyphs,"+90% increased Damage, +60% increased Health",Increased Chance: 7%,8
Temporal Sanctum,the dungeon boss drops 2 Unique Items,"+140% increased Damage, +140% increased Health",Drop Count: 2,9
Temporal Sanctum,enemies drop substantially more exalted helmets,"+90% increased Damage, +100% increased Health",Increased Chance: 7%,10
Temporal Sanctum,the dungeon boss drops a horde of Idols,"+90% increased Damage, +100% increased Health",Drop Count: 7-8,11
Temporal Sanctum,the dungeon boss drops a horde of Exalted Items,"+120% increased Damage, +120% increased Health",Drop Count: 6-7,12
Temporal Sanctum,enemies drop substantially more exalted rings,"+100% increased Damage, +90% increased Health",Increased Chance: 7%,13
Temporal Sanctum,the dungeon boss drops a horde of Glyphs,"+110% increased Damage, +80% increased Health",Drop Count: 6-7,14
Temporal Sanctum,enemies drop substantially more exalted weapons,"+110% increased Damage, +90% increased Health",Increased Chance: 7%,15
Temporal Sanctum,enemies drop substantially more runes,"+60% increased Damage, +90% increased Health",Increased Chance: 7%,16
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional axes,"+180% increased Damage, +180% increased Health",,10
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional belts,"+180% increased Damage, +180% increased Health",,11
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional body armours,"+180% increased Damage, +180% increased Health",,12
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional pairs of boots,"+180% increased Damage, +180% increased Health",,13
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional bows,"+180% increased Damage, +180% increased Health",,1
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional catalysts,"+180% increased Damage, +180% increased Health",,2
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional pairs of gloves,"+180% increased Damage, +180% increased Health",,3
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional helmets,"+180% increased Damage, +180% increased Health",,4
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional maces,"+180% increased Damage, +180% increased Health",,5
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional sceptres,"+180% increased Damage, +180% increased Health",,6
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional shields,"+180% increased Damage, +180% increased Health",,7
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional staves,"+180% increased Damage, +180% increased Health",,8
Soulfire Bastion,The Soul Gambler's inventory contains 4 additional swords,"+180% increased Damage, +180% increased Health",,9
Lightless Arbor,enemies drop substantially more exalted amulets,"+100% increased Damage, +90% increased Health",Increased Chance: 7%,8
Lightless Arbor,enemies drop substantially more exalted helmets,"+90% increased Damage, +100% increased Health",Increased Chance: 7%,9
Lightless Arbor,enemies drop substantially more exalted relics,"+90% increased Damage, +100% increased Health",Increased Chance: 7%,1
Lightless Arbor,enemies drop substantially more exalted rings,"+100% increased Damage, +90% increased Health",Increased Chance: 7%,2
Lightless Arbor,enemies drop substantially more exalted weapons,"+110% increased Damage, +90% increased Health",Increased Chance: 7%,3
Lightless Arbor,the dungeon boss drops a Unique Weapon,"+110% increased Damage, +110% increased Health",Drop Count: 1,4
Lightless Arbor,enemies drop substantially more glyphs,"+90% increased Damage, +60% increased Health",Increased Chance: 7%,5
Lightless Arbor,enemies drop substantially more runes,"+60% increased Damage, +90% increased Health",Increased Chance: 7%,6
Lightless Arbor,the dungeon boss drops a horde of Idols,"+90% increased Damage, +100% increased Health",Drop Count: 7-8,7
`;
   
    const rows =  dungeonsRawData.split('\n');
    const dungeons = {
        'Temporal Sanctum': { divId: 'dungeonTemporalSanctumTable', cycleLength: 7, data: [] },
        'Soulfire Bastion': { divId: 'dungeonSoulfireBastionTable', cycleLength: 10, data: [] },
        'Lightless Arbor': { divId: 'dungeonLightlessArborTable', cycleLength: 5, data: [] }
    };

    rows.forEach(row => {
        if (row.trim() === '') return;
        const columns = row.split(',');
        const dungeonName = columns[0];
        if (dungeons[dungeonName]) {
            dungeons[dungeonName].data.push(columns.slice(1));
        }
    });

    Object.keys(dungeons).forEach(dungeonName => {
        const dungeon = dungeons[dungeonName];
        const table = document.createElement('table');
        dungeon.data.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.id = dungeonName.replace(/\s/g, '') + 'day' + (index + 1);
            row.forEach(col => {
                const td = document.createElement('td');
                td.textContent = col;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        document.getElementById(dungeon.divId).appendChild(table);
        // displayCurrentEntry(dungeonName, dungeon.divId, dungeon.cycleLength);
    });

    function displayCurrentEntry(dungeonName, divId, cycleLength) {
        const today = new Date();
        const startDate = new Date('YYYY-MM-DD'); // Set your start date
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const rowId = dungeonName.replace(/\s/g, '') + 'Day' + (diffDays % cycleLength + 1);
        const rows = document.querySelectorAll(`#${divId} tr`);
        rows.forEach(row => row.style.display = 'none');
        const todayRow = document.getElementById(rowId);
        if (todayRow) {
            todayRow.style.display = '';
        }
    }
});