function fetchCsvData() {
  let rawData =
 `Chapter,Step,Reward
Chapter 1,Go to the Burning Forest,
Chapter 1,The Keepers,"Experience,Gold,Passive"
Chapter 1,Go to The Fortress Gardens,
Chapter 1,Go to the Fortress Walls,
Chapter 1,Go to The Storerooms -> Storeroom Saboteurs,"Passive"
Chapter 1,Go to the The Keeper Vault -> The Keeper Vault,"Experience,Passive"
Chapter 1,Go to the Northern Road,
Chapter 1,Town Portal,
Chapter 1,Go to Ulatri Highlands,
Chapter 1,Go to The Osprix Warcamp,
Chapter 1,Go to The Summit,
Chapter 2,Go to Last Refuge Outskirts -> The Void Assault,"Experience,Gold,Idol"
Chapter 2,In Last Refuge Outskirts -> Evacuation,"Experience,Gold,Passive"
Chapter 2 ,Go to The Council Chambers,
Chapter 2 ,Go to The Last Archive,
Chapter 2 ,Go to Erza's Library -> Get Ledger,
Chapter 2,Go to Pannion's Study,
Chapter 2,Finding Pannion,"Experience,Gold,Passive"
Chapter 2,Town Portal,
Chapter 2 ,"Erza = Gloves (Ele Leech), Artem = Amulet (Crit)","Experience,Gold,Passive,Unique"
Chapter 2 ,Go to The Precipice,
Chapter 2 ,Go to The Armoury,
Chapter 2 ,Go to The Lower District,
Chapter 2 ,Go to The End of Time,
Chapter 2 ,The Power of Mastery,"Experience,Passive,Mastery"
Chapter 3 ,Skip all Sidequests,
Chapter 3 ,Go to Council Chamber,
Chapter 3 ,Go to The Sheltered Wood,
Chapter 3 ,Go to The Surface,
Chapter 3 ,Go to The Forsaken Trail,
Chapter 3 ,Go to Cultist Camp,
Chapter 3 ,Go to The Ruins of Welryn,
Chapter 3 ,Go to Welryn Undercity,
Chapter 3 ,Town Portal,
Chapter 3 ,Go to Welryn Docks,
Chapter 3 ,Go to Cultist Camp,
Chapter 3, Go to The Ritual Site,
Chapter 3 ,Go to The Shattered Valley (Skip Rift),
Chapter 3 ,Go to The Courtyard,
Chapter 3 ,Go to The Temple of Eterra,
Chapter 3 ,Go to The Lotus Halls,
Chapter 3 ,Go to The Sanctum Bastille,
Chapter 3, Go to The End of Time
Chapter 4 ,Go to The Outcast Camp,
Chapter 4 ,Go to Welryn Outskirts,
Chapter 4 ,Go to Imperial Welryn,
Chapter 4 ,Go to The Soul Wardens' Road,
Chapter 4 ,Go to The Risen Lake -> The Corrupted Lake (Rift),"Experience,Passive,Idol"
Chapter 4 ,Go to The Fallen Tower,
Chapter 4 ,Go to Imperial Thetima,
Chapter 4 ,Go to The Darkling Pier,
Chapter 4 ,Go to The Imperial Dreadnought,
Chapter 4 ,Go to The Dreadnought's Deck,
Chpater 4 ,Jump off the Deck! -> The Admiral's Dreadnought,"Experience,Gold,Idol"
Chapter 5 ,Go to The Shining Cove,
Chapter 5 ,Go to The Majasan Desert,
Chapter 5 ,Go to The Wraith Dunes -> Hidden Gems (bottom right),"Experience,Gold,Passive"
Chapter 5 ,Go to Maj'Elka,
Chapter 5 ,Go to The Oracles Abode,"Experience,Gold,Passive"
Chapter 5 ,Go to the Shining Cove and find the Time Rift,
Chapter 5 ,Go to the Ruined Coast (Rift) -> The Sapphire Tablet,"Experience,Passive,Idol" 
Chapter 5 ,Go to The Temporal Sanctum WP -> Back to The Oracle's Abode,
Chapter 5 ,Go to The Maj'Elkan Catacombs,
Chapter 5 ,Go to Titan's Canyon,
Chapter 5 ,Go to The Maj'Elka Waystation,
Chapter 6 ,Skip all Sidequests,
Chapter 6 ,Go to The Desert Waystation,
Chapter 6 ,Go to The Rust Lands,
Chapter 6 ,Go to The Lower Sewers,
Chapter 6 ,Go to The Barren Aqueduct,
Chapter 6 ,Go to Necropolis of the Deep,
Chapter 6 ,Go to Yulia's Haven -> Speak with NPC's,
Chapter 6 ,Go to The Upper Necropolis,
Chapter 6 ,Go to The Citadel Sewers,
Chapter 6 ,Go to The Immortal Summit,
Chapter 6 ,Go to The Immortal Citadel -> The Immortal Citadel,"Experience,Gold,Passive"
Chapter 6 ,Go to The Gates of Solarum (Rift),
Chapter 7 ,Go to The Burning Forest,
Chapter 7 ,Go to The Scorched Grove,
Chapter 7 ,Go to The Solemn Path,
Chapter 7 ,Go to Heoborea,
Chapter 7 ,Go to The Heoborean Forest,
Chapter 7 ,Go to The Nomad Camp,
Chapter 7 ,Go to The Wengeri Frotress -> Liberating The Nomads,"Experience,Gold,Idol"
Chapter 7 ,Town Portal,
Chapter 7 ,Go to The Tundra,
Chapter 7 ,Go to The Temple of Heorot,
Chapter 7 ,Go to Farwood,
Chapter 7 ,Go to The Frozen Roots,
Chapter 7 ,Go to The Tomb of Morditas -> The Lance of Heorot,"Experience,Gold,Idol"
Chapter 7 ,Town Portal,
Chapter 8 ,Go to The Northern Stream,
Chapter 8 ,Go to Deep Harbor,
Chapter 8 ,Go to The Burning Pier,
Chapter 8 ,Go to Deep Harbor,
Chapter 8 ,Go to Etendell,
Chapter 8 ,Go to Lake Liath,
Chapter 8 ,Go to Liath's Road,
Chapter 8 ,Go to Thetima,
Chapter 8 ,Go to Liath's Tower -> Liath's Tower,"Experience,Passive,Idol"
Chapter 8 ,Go back to Thetima,
Chapter 8 ,Go to Lagon's Isle,
Chapter 8 ,Go to Moonlit Shrine,
Chapter 8 ,Go to The Strand of Storms (fragment),
Chapter 8 ,Go back to Moonlit Shrine,
Chapter 8 ,Go to The Coral Pools (fragment),
Chapter 8 ,Go back to Moonlit Shrine,
Chapter 8 ,Go to The Temple of Lagon,
Chapter 8 ,Go to The Temple Depths,
Chapter 8 ,Go to Sanctum of the Architect,
Chapter 8 ,Go to Seafloor Colosseum -> Lagon,"Experience,Passive"
Chapter 9 ,Do Desert Treasure in Radiant Dunes (bottom right of the area),
Chapter 9 ,Go to Maj'Elka Sums and go to the top right basement for mainquest and left of that for the sidequest,
Chapter 9 ,Go to the Chamber of Vessel to fight Maj'Essa,
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
    if (matches.length === 3) {
        const [chapter, step, rewardString] = matches;
        const rewards = rewardString ? rewardString.split(',').map(r => r.trim()) : [];
        return { chapter, step, rewards };
    }
    return null;
}).filter(row => row !== null);

//    console.log(data);
  return data;
}

const rewardIconMapping = {
    "Passive": { src: "./pics/passive-icon.png", alt: "Passive Reward" },
    "Idol": { src: "./pics/idol-icon.png", alt: "Idol Reward" },
    "Gold": { src: "./pics/gold-icon.png", alt: "Gold Reward" },
    "Mastery": { src: "./pics/mastery-icon.png", alt: "Mastery Reward" },
    "Unique": { src: "./pics/unique-icon.png", alt: "Unique Reward" },
    "Experience": { src: "./pics/experience-icon.png", alt: "Experience Reward" },
};

function buildTableForChapter(chapterFilter, data) {
    let tableContent = data
        .filter(row => row.chapter === chapterFilter)
        .map(row => {
            const rewardIcons = row.rewards.map(rewardKey => {
                const rewardInfo = rewardIconMapping[rewardKey];
                return rewardInfo ? `<img src="${rewardInfo.src}" alt="${rewardInfo.alt}" class="reward-icon">` : '';
            }).join(' ');

            return `<tr><td>${row.chapter}</td><td>${row.step}</td><td>${rewardIcons}</td></tr>`;
        })
        .join('');

    return `<table>
                <thead>
                    <tr>
                        <th>Chapter</th>
                        <th>Step</th>
                        <th>Reward</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableContent}
                </tbody>
            </table>`;
}

document.addEventListener('DOMContentLoaded', function() {
  const data = fetchCsvData();

  let chapterCount = 7;
  for (let i = 1; i <= chapterCount; i++) {
      document.getElementById(`chapter${i}Section`).innerHTML = buildTableForChapter(`Chapter ${i}`, data);
  }
});

