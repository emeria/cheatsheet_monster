/**
 * Utils
 * @returns 
 */
"use strict"; // hack to turn on type safety

/*
    https://stackoverflow.com/questions/6850164/get-the-device-width-in-javascript
*/
function getScreenSize() {
    var resolutions =
    {
        '(min-width: 1200px)': 'xl',
        '(min-width: 992px) and (max-width: 1199.98px)': 'lg',
        '(min-width: 768px) and (max-width: 991.98px)': 'md',
        '(min-width: 576px) and (max-width: 767.98px)': 'sm',
        '(max-width: 575.98px)': 'xs'
    };

    for (let size in resolutions)
        if (window.matchMedia(size).matches) {
            return resolutions[size];
        }

    return null;
}

function onLoad() {
    onResize();

    // iOS touch / hover
    document.addEventListener("touchstart", function () { }, false);

}

function onResize() {
    var dim = getScreenSize();
    console.log('Dimension: ' + dim);
    var debug = document.getElementById('screen-size');
    debug.innerText = dim;
    console.log(window.innerHeight);
    console.log(window.innerWidth);
    document.getElementById("overlay").style.maxwidth = window.innerWidth;
    document.getElementById("overlay").style.maxheight = window.innerHeigh;
}

// Overlay swap logic
function on(event) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay").getElementsByTagName('img')[0].src = event.src;
    console.log(event.dataset.enlargeHeight);
    if (event.dataset.enlargeHeight != "") {
        document.getElementById("overlay").getElementsByTagName('img')[0].style.maxHeight = event.dataset.enlargeHeight;
    } else {
        document.getElementById("overlay").getElementsByTagName('img')[0].style.maxHeight = "80%"
    }
    if (event.dataset.enlargeWidth != "") {
        document.getElementById("overlay").getElementsByTagName('img')[0].style.maxWidth = event.dataset.enlargeWidth;
    } else {
        document.getElementById("overlay").getElementsByTagName('img')[0].style.maxWidth = "90%"
    }
}

function off() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("overlay").getElementsByTagName('img')[0].src = "";
}

/**
 * Top Button Logic
 */
var topbutton = document.getElementById("top_btn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    var topbutton = document.getElementById("top_btn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topbutton.style.display = "block";
    } else {
        topbutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// Data logic
function fetchLevelingCsvData() {
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
Chapter 2,0,"Max: Phys, Some: Void Resistance",
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
Chapter 3 ,0,"Max: Phys & Void Resistance",
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
Chapter 4 ,11,Jump off the Deck! -> The Admiral's Dreadnought,"Experience,Gold,Idol"
Chapter 5 ,1,Go to The Shining Cove,
Chapter 5 ,2,Go to The Majasan Desert,
Chapter 5 ,3,Go to The Wraith Dunes -> Hidden Gems Pt. 1 (top left),"Experience,Gold,Passive"
Chapter 5 ,4,Go to Maj'Elka -> Hidden Gems Pt. 2 (bottom right),
Chapter 5 ,5,Go to The Oracles Abode,"Experience,Gold,Passive"
Chapter 5 ,6,Go to the Shining Cove and find the Time Rift,
Chapter 5 ,7,Go to the Ruined Coast (Rift) -> The Sapphire Tablet,"Experience,Passive,Idol "
Chapter 5 ,8,Go to The Temporal Sanctum WP -> Back to The Oracle's Abode,
Chapter 5 ,9,Go to The Maj'Elkan Catacombs,
Chapter 5 ,10,Go to Titan's Canyon,
Chapter 5 ,11,Go to The Maj'Elka Waystation,
Chapter 6 ,0,Skip all Sidequests,
Chapter 6 ,1,Go to The Desert Waystation,
Chapter 6 ,2,Go to The Rust Lands (Skip Rift),
Chapter 6 ,3,Go to The Lower Sewers -> Speak Alric,
Chapter 6 ,4,Go to The Barren Aqueduct,
Chapter 6 ,5,Go to Necropolis of the Deep,
Chapter 6 ,6,Go to Yulia's Haven -> Speak with NPC's,
Chapter 6 ,7,Go to The Upper Necropolis,
Chapter 6 ,8,Go to The Citadel Sewers,
Chapter 6 ,9,Go to The Immortal Summit,
Chapter 6 ,10,Go to The Immortal Citadel -> The Immortal Citadel,"Experience,Gold,Passive"
Chapter 6 ,11,Go to The Gates of Solarum (Rift),
Chapter 7 ,0,"Max: Phys,Void, Some: Cold,Light Resistance",
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
Chapter 7 ,15,Go to The Solemn Path,
Chapter 7 ,16,Go to The Scorched Grove -> Speak to Heorot,
Chapter 7 ,17,Use Heoborea Waypoint,
Chapter 8 ,0,"Max: Phys,Void,Cold,Light Resistance",
Chapter 8 ,1,Go to The Northern Stream,
Chapter 8 ,2,Go to Deep Harbor,
Chapter 8 ,3,Go to The Burning Pier,
Chapter 8 ,4,Go to Deep Harbor,
Chapter 8 ,5,Go to Lake Liath,
Chapter 8 ,6,Go to Liath's Road,
Chapter 8 ,7,Go to Thetima,
Chapter 8 ,8,Go to Liath's Tower -> Liath's Tower,"Experience,Passive,Idol"
Chapter 8 ,9,Go back to Thetima,
Chapter 8 ,10,Go to Lagon's Isle,
Chapter 8 ,11,Go to Moonlit Shrine,
Chapter 8 ,12,Go to The Strand of Storms (fragment),
Chapter 8 ,13,Go back to Moonlit Shrine,
Chapter 8 ,14,Go to The Coral Pools (fragment),
Chapter 8 ,15,Go back to Moonlit Shrine,
Chapter 8 ,16,Go to The Temple of Lagon,
Chapter 8 ,17,Go to The Temple Depths,
Chapter 8 ,18,Go to Sanctum of the Architect,
Chapter 8 ,19,Go to Seafloor Colosseum -> Lagon,"Experience,Passive"
Chapter 9 ,0,"Max: Phys,Void,Cold,Light,Poison Resistance",
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
Chapter 9,17,"Max: Phys,Void,Cold,Light,Necrotic Resistance",
Chapter 9,18,"HP: ~1k-1.2k starting Monoliths, aim for close to 2k ASAP",
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

    return data;
};


function fetchChapterSkipCsvData() {
    let rawSkipData =
        `Chapter,Step,Task,Reward
Chapter 0,1,"Acquire 3 Keys: Lightless Arbor, Soulfire Bastion, and Temporal Sanctum","Start"
Chapter 1,1,"'The Keepers' @ The Keepers Camp","Experience,Gold,Passive"
Chapter 1,2,"'The Keepers Vault' @ The Keepers Vault","Experience,Gold,Passive"
Chapter 1,3,"'Storeroom Sabotuers' @ The Storerooms","Experience,Gold,Passive"
Chapter 2,1,"'The Void Assault' @ Last Refuge Outskirts","Experience,Gold,Idol"
Chapter 2,2,"'Evacuation' @ Last Refuge Outskirts","Experience,Gold,Passive"
Chapter 2,3,"'Erza's Ledger' @ The Council Chambers (Artem or Erza)","Experience,Gold,Passive,Unique"
Chapter 2,4,"'Finding Pannion' @ The Council Chambers","Experience,Gold,Passive"
Chapter 2,5,"'The Power of Mastery' @ The Council Chambers","Experience,Passive,Mastery"
Chapter 2,6,"'The Upper District' @ The Upper District","Experience,Gold,Passive"
Chapter 3,1,"'The Lesser Refuge' @ The Council Chambers","Experience,Gold,Passive"
Chapter 3,2,"'An Ancient Hunt' @ The Council Chambers","Experience,Gold,Idol"
Chapter 3,3,"Go to 'The Surface' @ Ruined Era",
Chapter 3,4,"Go north to 'The Shrouded Ridge', north to 'The Lightless Arbor'",
Chapter 3,5,"Complete dungeon, go to the 'Corrupted Lake'",
Chapter 4,1,"'The Corrupted Lake' @ The Corrupted Lake","Experience,Passive,Idol"
Chapter 4,2,"Switch to 'Imperial Era' @ The Risen Lake",
Chapter 4,3,"Go to 'The Outcast Camp'",
Chapter 4,4,"'A Study in Time' @ The Outcast Camp","Experience,Passive"
Chapter 4,5,"Go back to 'The Risen Lake'",
Chapter 4,6,"'The Admiral's Dreadnought' @ The Admiral's Dreadnought","Experience,Gold,Idol"
Chapter 4,7,"Go to 'The Shining Cove', get waypoint",
Chapter 4,8,"Go to 'The Risen Lake'",
Chapter 4,9,"Go to 'The Fellwood', and then 'The Soulfire Bastion'",
Chapter 4,10,"Complete dungeon, go to the 'The Shining Cove'",
Chapter 5,1,"'The Oracle's Aid' @ The Shining Cove","Experience,Gold,Passive"
Chapter 5,2,"'Hidden Gems' @ The Majasan Desert","Experience,Gold,Passive"
Chapter 5,3,"'The Sapphire Tablet' @ The Oracle's Abode","Experience,Passive,Idol"
Chapter 5,4,"In 'Ruined Era', complete the 'Temporal Sanctum Dungeon'",
Chapter 9 ,16,"'Desert Treasure' @ The Radiant Dunes","Experience,Passive,Idol"
Chapter 9 ,16,"'Arjani, the Ruby Commander' @ Maj'Elka Upper District","Experience,Gold,Idol"
Chapter 9 ,16,"'Too Greedily, Too Deep' @ The Oasis","Experience,Passive,Idol"
Chapter 9 ,16,"Bonus: 'Apophis And Majasa @ Chamber of Vessel","Experience,Passive,Attributes"`;

    const data = rawSkipData.trim().split('\n').slice(1).map(row => {
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
};

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
};

function parseCsvRow(row) {
    const regex = /(?:^|,)(\"(?:[^\"]*(?:\"\"[^\"]*)*)\"|[^,]*)/g;
    let columns = [];
    let match;
    while (match = regex.exec(row)) {
        let column = match[1].replace(/^"|"$/g, '').replace(/""/g, '"');
        columns.push(column.trim());
    }
    return columns;
};

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
};
function buildTableForTLDR(data) {
    const rewardOrder = ['Passive', 'Idol', 'Experience', 'Gold', 'Unique', 'Mastery', 'Attributes'];
    const additionalRewards = ['Experience', 'Gold', 'Unique', 'Mastery', 'Attributes'];
    const rewardCounts = {};

    rewardOrder.forEach(rewardType => rewardCounts[rewardType] = 0);

    // Custom sorting function for chapters
    const sortChapters = (a, b) => {
        const chapterNumberA = parseInt(a.chapter.match(/\d+/), 10);
        const chapterNumberB = parseInt(b.chapter.match(/\d+/), 10);

        if (chapterNumberA !== chapterNumberB) {
            return chapterNumberA - chapterNumberB;
        }
        return a.step - b.step;
    };

    // Sort the data
    let sortedFilteredData = data
        .filter(row => row.step == 0 || (row.rewards && row.rewards.length > 0))
        .sort(sortChapters);
        
    let currentChapter = null;
    let tableContent = sortedFilteredData.map(row => {
        let chapterRow = '';
        if (row.chapter !== currentChapter) {
            currentChapter = row.chapter;
            chapterRow = `<tr><td colspan="10"><b>${currentChapter}</b></td></tr>`;
        }

        // Concatenate task to chapter row if step is 0
        if (row.step === 0) {
            chapterRow = `<tr><td colspan="10"><b>${currentChapter}: ${row.task}</b></td></tr>`;
            return chapterRow;
        }

        const rewardCells = rewardOrder.map(rewardType => {
            const isAdditionalReward = additionalRewards.includes(rewardType);
            const cellClass = isAdditionalReward ? 'additional-reward' : '';
            if (row.rewards.includes(rewardType)) {
                rewardCounts[rewardType]++;
                const rewardInfo = rewardIconMapping[rewardType];
                return `<td class="${cellClass}"><img src="${rewardInfo.src}" alt="${rewardInfo.alt}" class="reward-icon"><span class="reward-count">${rewardCounts[rewardType]}</span></td>`;
            }
            return `<td class="${cellClass}"></td>`; // Empty cell for missing reward
        }).join('');

        return chapterRow + `<tr><td>${row.step}</td><td>${row.task}</td>${rewardCells}</tr>`;
    }).join('');

    return `<table>
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Task</th>
                        ${rewardOrder.map(rewardType => `<th class="${additionalRewards.includes(rewardType) ? 'additional-reward' : ''}">${rewardType}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${tableContent}
                </tbody>
            </table>`;
}


function buildChapterSkipTable(data) {
    const rewardOrder = ['Passive', 'Idol', 'Experience', 'Gold', 'Unique', 'Mastery', 'Attributes'];
    const additionalRewards = ['Experience', 'Gold', 'Unique', 'Mastery', 'Attributes'];
    const rewardCounts = {};

    rewardOrder.forEach(rewardType => rewardCounts[rewardType] = 0);

    // Custom sorting function for chapters
    const sortChapters = (a, b) => {
        const chapterNumberA = parseInt(a.chapter.match(/\d+/), 10);
        const chapterNumberB = parseInt(b.chapter.match(/\d+/), 10);

        if (chapterNumberA !== chapterNumberB) {
            return chapterNumberA - chapterNumberB;
        }
        return a.step - b.step;
    };

    // Sort the data
    let sortedData = data.sort(sortChapters);

    let currentChapter = null;
    let stepCounter = 0;
    let tableContent = sortedData.map(row => {
        let chapterRow = '';
        if (row.chapter !== currentChapter) {
            currentChapter = row.chapter;
            chapterRow = `<tr><td colspan="10"><b>${currentChapter}</b></td></tr>`;
        }

        stepCounter++; // Increment step counter

        const rewardCells = rewardOrder.map(rewardType => {
            const isAdditionalReward = additionalRewards.includes(rewardType);
            const cellClass = isAdditionalReward ? 'additional-reward-skip' : '';
            if (row.rewards && row.rewards.includes(rewardType)) {
                rewardCounts[rewardType]++;
                const rewardInfo = rewardIconMapping[rewardType];
                return `<td class="${cellClass}"><img src="${rewardInfo.src}" alt="${rewardInfo.alt}" class="reward-icon"><span class="reward-count">${rewardCounts[rewardType]}</span></td>`;
            }
            return `<td class="${cellClass}"></td>`; // Empty cell for missing reward
        }).join('');

        return chapterRow + `<tr><td>${stepCounter}</td><td>${row.task}</td>${rewardCells}</tr>`;
    }).join('');

    return `<table>
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Task</th>
                        ${rewardOrder.map(rewardType => `<th class="${additionalRewards.includes(rewardType) ? 'additional-reward-skip' : ''}">${rewardType}</th>`).join('')}
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
};



document.addEventListener('DOMContentLoaded', function () {
    /**
     * Data used for:
     * Chapter Tables
     * TLDR Table
     */
    const data = fetchLevelingCsvData();

    /**
     * Chapter Tables
     */
    let chapterCount = 9;
    for (let i = 1; i <= chapterCount; i++) {
        document.getElementById(`chapter${i}Section`).innerHTML = buildTableForChapter(`Chapter ${i}`, data);
    }

    /**
     * TLDR Table
     */
    document.getElementById('chapterTldrSection').innerHTML = buildTableForTLDR(data);

    const checkbox = document.getElementById('toggleAdditionalRewards');
    checkbox.addEventListener('change', function() {
        const isVisible = checkbox.checked;
        const additionalRewardCells = document.querySelectorAll('.additional-reward');
        additionalRewardCells.forEach(cell => {
            cell.style.display = isVisible ? '' : 'none';
        });
    });
    checkbox.dispatchEvent(new Event('change'));


    /**
     * Chapter Skip Table
     */
    const dataForChapterSkip = fetchChapterSkipCsvData();
    document.getElementById('chapterSkipSection').innerHTML = buildChapterSkipTable(dataForChapterSkip);

    const checkboxToggleSkip = document.getElementById('toggleAdditionalRewardsSkip');
    checkboxToggleSkip.addEventListener('change', function() {
        const isVisible = checkboxToggleSkip.checked;
        const additionalRewardCells = document.querySelectorAll('.additional-reward-skip');
        additionalRewardCells.forEach(cell => {
            cell.style.display = isVisible ? '' : 'none';
        });
    });
    checkboxToggleSkip.dispatchEvent(new Event('change'));

    /**
     * Blessings Table
     */
    let blessingData = fetchBlessingsCsvData();
    let tableHtml = buildTableForBlessings(blessingData);
    document.getElementById('blessingsTable').innerHTML = tableHtml;

    /**
     * Dungeon Table
     */
    let dungeonsRawData = `﻿dungeon,tier,reward,mod,reward increase,day
Lightless Arbor,4,enemies drop substantially more exalted amulets,"+100% increased Damage, +90% increased Health",Increased Chance: 7%,8
Lightless Arbor,4,enemies drop substantially more exalted helmets,"+90% increased Damage, +100% increased Health",Increased Chance: 7%,9
Lightless Arbor,4,enemies drop substantially more exalted relics,"+90% increased Damage, +100% increased Health",Increased Chance: 7%,1
Lightless Arbor,4,enemies drop substantially more exalted rings,"+100% increased Damage, +90% increased Health",Increased Chance: 7%,2
Lightless Arbor,4,enemies drop substantially more exalted weapons,"+110% increased Damage, +90% increased Health",Increased Chance: 7%,3
Lightless Arbor,4,the dungeon boss drops a Unique Weapon,"+110% increased Damage, +110% increased Health",Drop Count: 1,4
Lightless Arbor,4,enemies drop substantially more glyphs,"+90% increased Damage, +60% increased Health",Increased Chance: 7%,5
Lightless Arbor,4,enemies drop substantially more runes,"+60% increased Damage, +90% increased Health",Increased Chance: 7%,6
Lightless Arbor,4,the dungeon boss drops a horde of Idols,"+90% increased Damage, +100% increased Health",Drop Count: 7-8,7
Lightless Arbor,3,enemies drop more exalted amulets,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,3
Lightless Arbor,3,enemies drop more exalted helmets,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,4
Lightless Arbor,3,enemies drop more exalted relics,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,5
Lightless Arbor,3,enemies drop more exalted rings,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,6
Lightless Arbor,3,enemies drop more exalted weapons,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,7
Lightless Arbor,3,enemies drop more glyphs,+40% increased Damage,Increased Chance: 5%,8
Lightless Arbor,3,enemies drop more runes,+40% increased Health,Increased Chance: 5%,9
Lightless Arbor,3,the dungeon boss drops a Unique Item,"+50% increased Damage, +50% increased Health",Drop Count: 1,1
Lightless Arbor,3,the dungeon boss drops many Idols,"+30% increased Damage, +30% increased Health",Drop Count: 5-6,2
Lightless Arbor,2,the dungeon boss drops Exalted Jewelry,"+20% increased Damage, +30% increased Health",Drop Count: 3,6
Lightless Arbor,2,the dungeon boss drops additional Exalted Items,"+30% increased Damage, +30% increased Health",Drop Count: 3,7
Lightless Arbor,2,the dungeon boss drops additional Exalted Weapons,"+30% increased Damage, +20% increased Health",Drop Count: 3,8
Lightless Arbor,2,the dungeon boss drops additional Glyphs,"+25% increased Damage, +15% increased Health",Drop Count: 3-4,9
Lightless Arbor,2,the dungeon boss drops additional Idols,"+20% increased Damage, +20% increased Health",Drop Count: 3-4,1
Lightless Arbor,2,the dungeon boss drops additional Runes,"+15% increased Damage, +25% increased Health",Drop Count: 3-4,2
Lightless Arbor,2,the dungeon boss drops a Set Item,"+30% increased Damage, +30% increased Health",Drop Count: 1,3
Lightless Arbor,2,the dungeon boss drops a Set Item,"+30% increased Damage, +30% increased Health",Drop Count: 1,4
Lightless Arbor,2,the dungeon boss drops additional Idols,"+20% increased Damage, +20% increased Health",Drop Count: 3-4,5
Lightless Arbor,1,N/A,"35% less Damage, 25% less Health",,1
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional axes,"+180% increased Damage, +180% increased Health",,1
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional belts,"+180% increased Damage, +180% increased Health",,2
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional body armours,"+180% increased Damage, +180% increased Health",,3
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional pairs of boots,"+180% increased Damage, +180% increased Health",,4
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional bows,"+180% increased Damage, +180% increased Health",,5
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional catalysts,"+180% increased Damage, +180% increased Health",,6
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional pairs of gloves,"+180% increased Damage, +180% increased Health",,7
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional helmets,"+180% increased Damage, +180% increased Health",,8
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional maces,"+180% increased Damage, +180% increased Health",,9
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional sceptres,"+180% increased Damage, +180% increased Health",,10
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional shields,"+180% increased Damage, +180% increased Health",,11
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional staves,"+180% increased Damage, +180% increased Health",,12
Soulfire Bastion,4,The Soul Gambler's inventory contains 4 additional swords,"+180% increased Damage, +180% increased Health",,13
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional axes,"+80% increased Damage, +80% increased Health",,1
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional belts,"+80% increased Damage, +80% increased Health",,2
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional body armours,"+80% increased Damage, +80% increased Health",,3
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional pairs of boots,"+80% increased Damage, +80% increased Health",,4
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional bows,"+80% increased Damage, +80% increased Health",,5
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional catalysts,"+80% increased Damage, +80% increased Health",,6
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional pairs of gloves,"+80% increased Damage, +80% increased Health",,7
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional helmets,"+80% increased Damage, +80% increased Health",,8
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional maces,"+80% increased Damage, +80% increased Health",,9
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional sceptres,"+80% increased Damage, +80% increased Health",,10
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional shields,"+80% increased Damage, +80% increased Health",,11
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional staves,"+80% increased Damage, +80% increased Health",,12
Soulfire Bastion,3,The Soul Gambler's inventory contains 3 additional swords,"+80% increased Damage, +80% increased Health",,13
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional axes,"+50% increased Damage, +50% increased Health",,1
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional belts,"+50% increased Damage, +50% increased Health",,2
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional body armours,"+50% increased Damage, +50% increased Health",,3
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional pairs of boots,"+50% increased Damage, +50% increased Health",,4
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional bows,"+50% increased Damage, +50% increased Health",,5
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional catalysts,"+50% increased Damage, +50% increased Health",,6
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional pairs of gloves,"+50% increased Damage, +50% increased Health",,7
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional helmets,"+50% increased Damage, +50% increased Health",,8
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional maces,"+50% increased Damage, +50% increased Health",,9
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional sceptres,"+50% increased Damage, +50% increased Health",,10
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional shields,"+50% increased Damage, +50% increased Health",,11
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional staves,"+50% increased Damage, +50% increased Health",,12
Soulfire Bastion,2,The Soul Gambler's inventory contains 2 additional swords,"+50% increased Damage, +50% increased Health",,13
Soulfire Bastion,1,N/A,"35% less Damage, 25% less Health",,1
Temporal Sanctum,4,the dungeon boss drops a horde of Exalted Jewelry,"+90% increased Damage, +120% increased Health",Drop Count: 6-7,1
Temporal Sanctum,4,enemies drop substantially more exalted relics,"+90% increased Damage, +100% increased Health",Increased Chance: 7%,2
Temporal Sanctum,4,the dungeon boss drops a horde of Exalted Weapons,"+120% increased Damage, +90% increased Health",Drop Count: 6-7,3
Temporal Sanctum,4,the dungeon boss drops a horde of Runes,"+80% increased Damage, +110% increased Health",Drop Count: 7-8,4
Temporal Sanctum,4,enemies drop substantially more exalted amulets,"+100% increased Damage, +90% increased Health",Increased Chance: 7%,5
Temporal Sanctum,4,the dungeon boss drops a Glyph of Despair,"+120% increased Damage, +120% increased Health",Drop Count: 1,6
Temporal Sanctum,4,the dungeon boss drops a Unique Weapon,"+110% increased Damage, +110% increased Health",Drop Count: 1,7
Temporal Sanctum,4,enemies drop substantially more glyphs,"+90% increased Damage, +60% increased Health",Increased Chance: 7%,8
Temporal Sanctum,4,the dungeon boss drops 2 Unique Items,"+140% increased Damage, +140% increased Health",Drop Count: 2,9
Temporal Sanctum,4,enemies drop substantially more exalted helmets,"+90% increased Damage, +100% increased Health",Increased Chance: 7%,10
Temporal Sanctum,4,the dungeon boss drops a horde of Idols,"+90% increased Damage, +100% increased Health",Drop Count: 7-8,11
Temporal Sanctum,4,the dungeon boss drops a horde of Exalted Items,"+120% increased Damage, +120% increased Health",Drop Count: 6-7,12
Temporal Sanctum,4,enemies drop substantially more exalted rings,"+100% increased Damage, +90% increased Health",Increased Chance: 7%,13
Temporal Sanctum,4,the dungeon boss drops a horde of Glyphs,"+110% increased Damage, +80% increased Health",Drop Count: 6-7,14
Temporal Sanctum,4,enemies drop substantially more exalted weapons,"+110% increased Damage, +90% increased Health",Increased Chance: 7%,15
Temporal Sanctum,4,enemies drop substantially more runes,"+60% increased Damage, +90% increased Health",Increased Chance: 7%,16
Temporal Sanctum,3,the dungeon boss drops much Exalted Jewelry,"+30% increased Damage, +50% increased Health",Drop Count: 4-5,1
Temporal Sanctum,3,enemies drop more glyphs,+40% increased Damage,Increased Chance: 5%,2
Temporal Sanctum,3,enemies drop more exalted relics,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,3
Temporal Sanctum,3,the dungeon boss drops many Idols,"+30% increased Damage, +30% increased Health",Drop Count: 5-6,4
Temporal Sanctum,3,enemies drop more exalted amulets,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,5
Temporal Sanctum,3,the dungeon boss drops many Exalted Weapons,"+50% increased Damage, +30% increased Health",Drop Count: 4-5,6
Temporal Sanctum,3,enemies drop more exalted helmets,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,7
Temporal Sanctum,3,the dungeon boss drops a Unique Item,"+50% increased Damage, +50% increased Health",Drop Count: 1,8
Temporal Sanctum,3,enemies drop more exalted rings,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,9
Temporal Sanctum,3,enemies drop more exalted weapons,"+40% increased Damage, +40% increased Health",Increased Chance: 5%,10
Temporal Sanctum,3,enemies drop more runes,+40% increased Health,Increased Chance: 5%,11
Temporal Sanctum,2,the dungeon boss drops Exalted Jewelry,"+20% increased Damage, +30% increased Health",Drop Count: 3,1
Temporal Sanctum,2,enemies drop slightly more glyphs,+20% increased Damage,Increased Chance: 3%,2
Temporal Sanctum,2,enemies drop slightly more exalted relics,"+20% increased Damage, +20% increased Health",Increased Chance: 3%,3
Temporal Sanctum,2,the dungeon boss drops additional Idols,"+20% increased Damage, +20% increased Health",Drop Count: 3-4,4
Temporal Sanctum,2,enemies drop slightly more exalted amulets,"+20% increased Damage, +20% increased Health",Increased Chance: 3%,5
Temporal Sanctum,2,the dungeon boss drops additional Exalted Weapons,"+30% increased Damage, +20% increased Health",Drop Count: 3,6
Temporal Sanctum,2,enemies drop slightly more exalted helmets,"+20% increased Damage, +20% increased Health",Increased Chance: 3%,7
Temporal Sanctum,2,the dungeon boss drops a Set Item,"+30% increased Damage, +30% increased Health",Drop Count: 1,8
Temporal Sanctum,2,enemies drop slightly more exalted rings,"+20% increased Damage, +20% increased Health",Increased Chance: 3%,9
Temporal Sanctum,2,enemies drop slightly more exalted weapons,"+10% increased Damage, +20% increased Health",Increased Chance: 3%,10
Temporal Sanctum,2,enemies drop slightly more runes,+20% increased Health,Increased Chance: 3%,11
Temporal Sanctum,1,N/A,"35% less Damage, 25% less Health",,Current Modifier
`;

    displayDungeons(dungeonsRawData);

});

/**
 * Filter for blessings table
 */
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
};


/**
 * Collapse chapters
 */
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
};

/**
 * Expand chapters
 */
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
};

/**
 * Used to rotate out the daily dungeon rewards
 * @param {*} dungeonName 
 * @param {*} divId 
 * @param {*} dungeonData 
 */
function displayCurrentEntry(dungeonName, divId, dungeonData) {
    // Hide all rows initially
    const rows = document.querySelectorAll(`#${divId} tr:not(:first-child)`);
    rows.forEach(row => row.style.display = 'none');

    // Display rows that match the current day for all tiers
    for (let tier = 1; tier <= 4; tier++) {
        // Use the specific cycle length and start date for each tier
        const cycleLength = dungeonData[dungeonName].tiers[tier].cycleLength;
        const startDate = new Date(dungeonData[dungeonName].tiers[tier].startDate);
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const currentDay = diffDays % cycleLength + 1;
        console.log(dungeonName + ' | ', tier + ' | ', cycleLength + ' | ', startDate + ' | ', today + ' | ', diffTime + ' | ', diffDays + ' | ', currentDay)
        console.log(`Current Day for Tier ${tier}: ${currentDay}`);

        const rowId = dungeonName.replace(/\s/g, '') + 'tier' + tier + 'day' + currentDay;
        console.log(`Looking for row with ID: ${rowId}`);
        const todayRow = document.getElementById(rowId);
        if (todayRow) {
            console.log(`Row found: ${rowId}`);
            todayRow.style.display = '';
        } else {
            console.log(`Row not found: ${rowId}`);
        }
    }
};

/**
 * Parsing dungeon data from CSV
 * @param {*} rawDungeonData 
 * @returns 
 */
function parseDungeonsCSVData(rawDungeonData) {
    const rows = rawDungeonData.split('\n');
    const dungeons = {
        // 'Temporal Sanctum': { divId: 'dungeonTemporalSanctumTable', tiers: { 1: { cycleLength: 1, startDate: '2024-02-20', data: [] }, 2: { cycleLength: 8,startDate: '2024-02-20', data: [] }, 3: { cycleLength: 11,startDate: '2024-02-19', data: [] }, 4: { cycleLength: 16,startDate: '2024-02-22', data: [] } } },

        // 'Soulfire Bastion': { divId: 'dungeonSoulfireBastionTable', tiers: { 1: { cycleLength: 1, startDate: '2024-02-20', data: [] }, 2: { cycleLength: 13,startDate: '2024-02-16', data: [] }, 3: { cycleLength: 13,startDate: '2024-02-19', data: [] }, 4: { cycleLength: 13,startDate: '2024-02-18', data: [] } } },

        // 'Lightless Arbor': { divId: 'dungeonLightlessArborTable', tiers: { 1: { cycleLength: 1, startDate: '2024-02-20', data: [] }, 2: { cycleLength:  9,startDate: '2024-02-18', data: [] }, 3: { cycleLength: 9,startDate: '2024-02-15', data: [] }, 4: { cycleLength: 9,startDate: '2024-02-20', data: [] } } }
        /**
         * t1 1
         * t2 11  | the dungeon boss drops a Set Item | 8
         * t3 11 | enemies drop more runes | 11
         * t4 16 | the dungeon boss drops a Glyph of Despair | 6
         * 
         */
        'Temporal Sanctum': { divId: 'dungeonTemporalSanctumTable', tiers: { 1: { cycleLength: 1, startDate: '2024-02-20', data: [] }, 2: { cycleLength: 11, startDate: '2024-02-20', data: [] }, 3: { cycleLength: 11, startDate: '2024-02-17', data: [] }, 4: { cycleLength: 16, startDate: '2024-02-22', data: [] } } },

        /**
         * t1 1
         * t2 13 | The Soul Gambler's inventory contains 2 additional staves | 12
         * t3 13 | The Soul Gambler's inventory contains 3 additional maces | 9
         * t4 13 | The Soul Gambler's inventory contains 4 additional sceptres | 10
         * 
         */
        'Soulfire Bastion': { divId: 'dungeonSoulfireBastionTable', tiers: { 1: { cycleLength: 1, startDate: '2024-02-20', data: [] }, 2: { cycleLength: 13, startDate: '2024-02-16', data: [] }, 3: { cycleLength: 13, startDate: '2024-02-19', data: [] }, 4: { cycleLength: 13, startDate: '2024-02-18', data: [] } } },

        /**
         * t1 1
         * t2 8 | the dungeon boss drops Exalted Jewelry | 1
         * t3 9| enemies drop more exalted rings | 4
         * t4 9| enemies drop substantially more runes | 8
         * 
         */
        'Lightless Arbor': { divId: 'dungeonLightlessArborTable', tiers: { 1: { cycleLength: 1, startDate: '2024-02-20', data: [] }, 2: { cycleLength: 9, startDate: '2024-02-18', data: [] }, 3: { cycleLength: 9, startDate: '2024-02-24', data: [] }, 4: { cycleLength: 9, startDate: '2024-02-20', data: [] } } }
    };

    rows.forEach((row, rowIndex) => {
        if (row.trim() === '') return;
        const columns = row.split(',').map(col => col.trim());
        // console.log(`Row ${rowIndex}:`, columns); // Debugging log

        const dungeonName = columns[0];
        const tier = parseInt(columns[1]);
        if (dungeons[dungeonName] && dungeons[dungeonName].tiers[tier]) {
            dungeons[dungeonName].tiers[tier].data.push(columns.slice(1));
        }
    });

    // console.log('Parsed Dungeons:', dungeons);
    return dungeons;
};

/**
 * Building a dungeon table for daily rewards
 * @param {*} dungeon 
 * @param {*} dungeonName 
 * @returns 
 */
function createTableFromData(dungeon, dungeonName) {
    const table = document.createElement('table');
    table.classList.add('dungeon-table');

    // Define your column names here, including 'Tier' as the first column
    const columnNames = ['Tier', 'Reward', 'Enemy Mod 1', 'Enemy Mod 2', 'Reward Scaling']; // Adjusted to include 'Tier'

    // Create and append the header row
    const headerRow = document.createElement('tr');
    columnNames.forEach(colName => {
        const th = document.createElement('th');
        th.textContent = colName;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Iterate over each tier and add data rows
    Object.keys(dungeon.tiers).forEach(tier => {
        const tierData = dungeon.tiers[tier];

        // Add data rows for this tier
        tierData.data.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.id = dungeonName.replace(/\s/g, '') + 'tier' + tier + 'day' + (index + 1);

            // Add other columns
            for (let i = 0; i < row.length - 1; i++) {
                const td = document.createElement('td');
                let cellText = removeQuotes(row[i]);
                cellText = capitalizeFirstLetter(cellText);
                td.textContent = cellText;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        });
    });

    return table;
}





// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    // Find the index of the first alphabetic character
    const firstLetterIndex = string.search(/[a-zA-Z]/);
    if (firstLetterIndex === -1) return string; // Return original string if no alphabetic character is found

    // Capitalize the first alphabetic character and concatenate the rest of the string
    return string.substring(0, firstLetterIndex) +
        string.charAt(firstLetterIndex).toUpperCase() +
        string.substring(firstLetterIndex + 1);
}

function removeQuotes(string) {
    return string.replace(/["']/g, ''); // Removes both single and double quotes
}


// Main function to process and display data
function displayDungeons(dungeonsRawData) {
    const dungeons = parseDungeonsCSVData(dungeonsRawData);

    Object.keys(dungeons).forEach(dungeonName => {
        const dungeon = dungeons[dungeonName];
        const table = createTableFromData(dungeon, dungeonName);
        const dungeonDiv = document.getElementById(dungeon.divId);
        if (dungeonDiv) {
            dungeonDiv.appendChild(table);
            displayCurrentEntry(dungeonName, dungeon.divId, dungeons);
        } else {
            console.error(`Div not found for ${dungeonName}`);
        }
    });
};

const darkTheme = {
    primaryColor: '#0f0',
    secondaryColor: '#E52A01',
    backgroundColor: '#000',
    textColor: '#fff',
    linkVisitedColor: '#E52A01',
    linkColor: '#0F0',
    buttonBgColor: '#ccc',
    buttonHoverBgColor: '#ddd',
    buttonActiveBgColor: '#ccc',
    tableHeaderBgColor: '#5d3b8e',
    tableRowOddBgColor: '#412b58',
    tableRowEvenBgColor: '#1a1a1a',
    tableRowHoverBgColor: '#302244',
    accordionBgColor: '#777',
    accordionHoverBgColor: '#555',
    accordionContentBgColor: '#050505',
    debugBorderColor: 'cyan',
    rulerBgColor: '#222',
    rulerBorderColor: 'skyblue',
    overlayBgColor: 'rgba(0,0,0,0.5)',
    tabBgColor: '#f1f1f1',
    tabBorderColor: '#ccc',
    tabContentBorderColor: '#ccc',
    topBtnBgColor: 'red',
    topBtnHoverBgColor: '#555',
    collapsibleBgColor: '#777',
    collapsibleHoverBgColor: '#555',
    contentBgColor: '#050505',
    tableBgColor: '#1a1a1a',
    thBgColor: '#5d3b8e',
    trOddBgColor: '#412b58',
    trEvenBgColor: '#1a1a1a',
    trHoverBgColor: '#302244',
    tdBorderColor: '#333',
    rewardIconSize: '20px',
    styledButtonBgColor: '#302244',
    styledButtonHoverBgColor: '#45a049',
    styledButtonFontSize: '16px',
    dungeonBgColor: '#f1f1f1',
    header: '#FF8',
    focusImageTextColor: '#5a5a03',
};

const normalTheme = {
    primaryColor: '#3366cc', // More balanced primary color
    secondaryColor: '#cc6633', // More balanced secondary color
    backgroundColor: '#d6d6d6', // Darker grey background
    textColor: '#333333', // Softer black for text
    linkVisitedColor: '#6a3ab2', // Softer purple for visited links
    linkColor: '#1a0dab', // Standard but slightly less bright link color
    buttonBgColor: '#d9d9d9', // Standard grey for buttons
    buttonHoverBgColor: '#c2c2c2', // Standard grey for button hover
    buttonActiveBgColor: '#ababab', // Standard grey for button active state
    tableHeaderBgColor: '#b8a0d1', // More balanced header background
    tableRowOddBgColor: '#f2f2f2', // Slightly darker for odd rows
    tableRowEvenBgColor: '#ffffff', // White for even rows
    tableRowHoverBgColor: '#e6e6e6', // Standard grey for hover
    accordionBgColor: '#e6e6e6', // Standard light grey for accordion
    accordionHoverBgColor: '#d9d9d9', // Standard grey for accordion hover
    accordionContentBgColor: '#ffffff', // White content background
    debugBorderColor: '#333333', // Softer black for debug border
    rulerBgColor: '#ededed', // Slightly darker ruler background
    rulerBorderColor: '#bfbfbf', // Standard grey for ruler border
    overlayBgColor: 'rgba(240,240,240,0.8)', // Slightly darker overlay
    tabBgColor: '#f5f5f5', // Slightly darker tab background
    tabBorderColor: '#d4d4d4', // Standard light grey for tab border
    tabContentBorderColor: '#c2c2c2', // Standard grey for tab content border
    topBtnBgColor: '#cc4c4c', // More balanced red for top button
    topBtnHoverBgColor: '#999999', // Standard grey for hover
    collapsibleBgColor: '#999999', // Standard medium grey
    collapsibleHoverBgColor: '#808080', // Darker grey for hover
    contentBgColor: '#ffffff', // White content background
    tableBgColor: '#ffffff', // White table background
    thBgColor: '#b8a0d1', // More balanced header background
    trOddBgColor: '#f7f7f7', // Almost white odd rows
    trEvenBgColor: '#ffffff', // White even rows
    trHoverBgColor: '#efefef', // Light grey for hover
    tdBorderColor: '#d4d4d4', // Standard light grey for table cells
    rewardIconSize: '20px', // Same icon size
    styledButtonBgColor: '#b8a0d1', // More balanced styled button background
    styledButtonHoverBgColor: '#a4c2a8', // More balanced green for hover
    dungeonBgColor: '#f5f5f5', // Slightly darker dungeon background
    header: '#6a6a3a', // More balanced header color
    focusImageTextColor: '#0000cc', // Standard blue, less bright
};



const lightTheme = {
    primaryColor: '#0055ff', // Example: a different primary color
    secondaryColor: '#ff5500', // Example: a different secondary color
    backgroundColor: '#f0f0f0', // Lighter background
    textColor: '#000', // Darker text for better readability
    linkVisitedColor: '#551a8b', // Darker shade for visited links
    linkColor: '#0000ee', // Standard link color
    buttonBgColor: '#e0e0e0', // Lighter button background
    buttonHoverBgColor: '#d0d0d0', // Slightly darker on hover
    buttonActiveBgColor: '#c0c0c0', // Even darker for active state
    tableHeaderBgColor: '#c3a5ec', // Lighter header background
    tableRowOddBgColor: '#e9e9e9', // Very light gray for odd rows
    tableRowEvenBgColor: '#f9f9f9', // Almost white for even rows
    tableRowHoverBgColor: '#dcdcdc', // Light gray for hover
    accordionBgColor: '#e2e2e2', // Light accordion background
    accordionHoverBgColor: '#d2d2d2', // Slightly darker on hover
    accordionContentBgColor: '#ffffff', // White content background
    debugBorderColor: 'black', // More visible debug border
    rulerBgColor: '#eaeaea', // Light ruler background
    rulerBorderColor: 'gray', // Visible ruler border
    overlayBgColor: 'rgba(255,255,255,0.5)', // Light overlay
    tabBgColor: '#f1f1f1', // Light tab background
    tabBorderColor: '#ddd', // Light border for tabs
    tabContentBorderColor: '#ccc', // Light border for tab content
    topBtnBgColor: 'red', // Light top button background
    topBtnHoverBgColor: '#555', // Slightly darker on hover
    collapsibleBgColor: '#777',
    collapsibleHoverBgColor: '#555',
    contentBgColor: '#ffffff', // White content background
    tableBgColor: '#ffffff', // White table background
    thBgColor: '#c3a5ec', // Very light header background
    trOddBgColor: '#f7f7f7', // Almost white odd rows
    trEvenBgColor: '#ffffff', // White even rows
    trHoverBgColor: '#efefef', // Light gray for hover
    tdBorderColor: '#ddd', // Light border for table cells
    rewardIconSize: '20px', // Same icon size
    styledButtonBgColor: '#c3a5ec', // Light styled button background
    styledButtonHoverBgColor: '#aae0ac', // Slightly darker on hover
    dungeonBgColor: '#fafafa', // Very light dungeon background
    header: '#5a5a03',
    focusImageTextColor: 'blue',
};

let currentTheme = darkTheme; // Default to dark theme
function switchTheme(targetTheme) {
    const root = document.documentElement;
    // const themeSwitchButton = document.getElementById('theme-switch');

    if (targetTheme === 'lightTheme') {
        currentTheme = lightTheme; // Update the current theme
        // themeSwitchButton.textContent = 'Switch to Light Theme';
    }
    if (targetTheme === 'darkTheme') {
        currentTheme = darkTheme; // Update the current theme
    }
    if (targetTheme === 'normalTheme') {
        currentTheme = normalTheme; // Update the current theme
    }

    root.style.setProperty('--primary-color', currentTheme.primaryColor);
    root.style.setProperty('--secondary-color', currentTheme.secondaryColor);
    root.style.setProperty('--background-color', currentTheme.backgroundColor);
    root.style.setProperty('--text-color', currentTheme.textColor);
    root.style.setProperty('--link-visited-color', currentTheme.linkVisitedColor);
    root.style.setProperty('--link-color', currentTheme.linkColor);
    root.style.setProperty('--button-bg-color', currentTheme.buttonBgColor);
    root.style.setProperty('--button-hover-bg-color', currentTheme.buttonHoverBgColor);
    root.style.setProperty('--button-active-bg-color', currentTheme.buttonActiveBgColor);
    root.style.setProperty('--table-header-bg-color', currentTheme.tableHeaderBgColor);
    root.style.setProperty('--table-row-odd-bg-color', currentTheme.tableRowOddBgColor);
    root.style.setProperty('--table-row-even-bg-color', currentTheme.tableRowEvenBgColor);
    root.style.setProperty('--table-row-hover-bg-color', currentTheme.tableRowHoverBgColor);
    root.style.setProperty('--accordion-bg-color', currentTheme.accordionBgColor);
    root.style.setProperty('--accordion-hover-bg-color', currentTheme.accordionHoverBgColor);
    root.style.setProperty('--accordion-content-bg-color', currentTheme.accordionContentBgColor);
    root.style.setProperty('--debug-border-color', currentTheme.debugBorderColor);
    root.style.setProperty('--ruler-bg-color', currentTheme.rulerBgColor);
    root.style.setProperty('--ruler-border-color', currentTheme.rulerBorderColor);
    root.style.setProperty('--overlay-bg-color', currentTheme.overlayBgColor);
    root.style.setProperty('--tab-bg-color', currentTheme.tabBgColor);
    root.style.setProperty('--tab-border-color', currentTheme.tabBorderColor);
    root.style.setProperty('--tab-content-border-color', currentTheme.tabContentBorderColor);
    root.style.setProperty('--top-btn-bg-color', currentTheme.topBtnBgColor);
    root.style.setProperty('--top-btn-hover-bg-color', currentTheme.topBtnHoverBgColor);
    root.style.setProperty('--collapsible-bg-color', currentTheme.collapsibleBgColor);
    root.style.setProperty('--collapsible-hover-bg-color', currentTheme.collapsibleHoverBgColor);
    root.style.setProperty('--content-bg-color', currentTheme.contentBgColor);
    root.style.setProperty('--table-bg-color', currentTheme.tableBgColor);
    root.style.setProperty('--th-bg-color', currentTheme.thBgColor);
    root.style.setProperty('--tr-odd-bg-color', currentTheme.trOddBgColor);
    root.style.setProperty('--tr-even-bg-color', currentTheme.trEvenBgColor);
    root.style.setProperty('--tr-hover-bg-color', currentTheme.trHoverBgColor);
    root.style.setProperty('--td-border-color', currentTheme.tdBorderColor);
    root.style.setProperty('--reward-icon-size', currentTheme.rewardIconSize);
    root.style.setProperty('--styled-button-bg-color', currentTheme.styledButtonBgColor);
    root.style.setProperty('--styled-button-hover-bg-color', currentTheme.styledButtonHoverBgColor);
    root.style.setProperty('--styled-button-font-size', currentTheme.styledButtonFontSize);
    root.style.setProperty('--dungeon-bg-color', currentTheme.dungeonBgColor);
    root.style.setProperty('--header', currentTheme.header);
    root.style.setProperty('--focus-image-text-color', currentTheme.focusImageTextColor);

}