function fetchCsvData() {
  let rawData =
 `Chapter,Step,Reward
Chapter 1,Go to the Burning Forest,
Chapter 1,The Keepers,Passive
Chapter 1,Go to The Fortress Gardens,
Chapter 1,Go to the Fortress Walls,
Chapter 1,Go to The Storerooms -> Storeroom Saboteurs,Passive
Chapter 1,Go to the The Keeper Vault -> The Keeper Vault,Passive
Chapter 1,Go to the Northern Road,
Chapter 1,Town Portal,
Chapter 1,Go to Ulatri Highlands,
Chapter 1,Go to The Osprix Warcamp,
Chapter 1,Go to The Summit,
Chapter 2,Go to Last Refuge Outskirts -> Evacuation,Passive
Chapter 2,In Last Refuge Outskirts -> The Void Assault,Idol
Chapter 2 ,Go to The Council Chambers,
Chapter 2 ,Go to The Last Archive,
Chapter 2 ,Go to Erza's Library -> Get Ledger,
Chapter 2,Go to Pannion's Study,
Chapter 2,Finding Pannion,Passive
Chapter 2,Town Portal,
Chapter 2 ,"Erza = Gloves (Ele Leech), Artem = Amulet (Crit)","Unique,Passive"
Chapter 2 ,Go to The Precipice,
Chapter 2 ,Go to The Armoury,
Chapter 2 ,Go to The Lower District,
Chapter 2 ,Go to The End of Time,
Chapter 2 ,The Power of Mastery,"Mastery,Passive"
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
Chapter 4 ,Go to Risen Lake and click Time Rift after Waypoint,
Chapter 4 ,Do The Corrupted Lake by killing Miniboss,
Chapter 5 ,Go to Maj'Elka Do Main Quest,
Chapter 5 ,Go to Oracle's Abode,
Chapter 5 ,Port to The Shining Cove and take Time Rift ,
Chapter 5 ,Kill Miniboss,
Chapter 5 ,Go to the Temporal Sanctum,
Chapter 5 ,(Optional for ultimate speed to skip straight to Chapter 9),
Chapter 5 ,Farm a Temporal Sanctum Key in Monoliths,
Chapter 5 ,Do Temporal Dungeon,
Chapter 6 ,Talk to 1 NPC un Yula's Heaven,
Chapter 7 ,Do Liberating the Nomads in Wengari Fortress by clicking on a NPC,
Chapter 7 ,Go back to Heobera and move on to The Temple of Heorot,
Chapter 7 ,Go to The Tomb of Morditas and kill Boss,
Chapter 8 ,Go to The Burnin Pier,
Chapter 8 ,Kill Liath in Liath's Road,
Chapter 8 ,Go to Thetima,
Chapter 8 ,Do Liath's Tower at Liath's Tower,
Chapter 8 ,Do the Lagon's Isle,
Chapter 8 ,Go to Moonlit Shrine and then go left and right for the Moon Fragments,
Chapter 8 ,Kill Lagoon,
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


// function buildTableForChapter(chapterFilter, data) {
//     let tableContent = data
//         .filter(row => row.chapter === chapterFilter)
//         .map(row => {
//             // Ensure reward is an array
//             const rewards = Array.isArray(row.reward) ? row.reward : [row.reward];

//             const rewardIcons = rewards.map(rewardKey => {
//                 const iconPath = rewardIconMapping[rewardKey];
//                 return iconPath ? `<img src="${iconPath}" alt="${rewardKey}" class="reward-icon">` : '';
//             }).join(' ');

//             return `<tr><td>${row.chapter}</td><td>${row.step}</td><td>${rewardIcons}</td></tr>`;
//         })
//         .join('');

//     return `<table>
//                 <thead>
//                     <tr>
//                         <th>Chapter</th>
//                         <th>Step</th>
//                         <th>Reward</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     ${tableContent}
//                 </tbody>
//             </table>`;
// }


// function buildTableForChapter(chapterFilter, data) {
//   let tableContent = data
//       .filter(row => row.chapter === chapterFilter)
//       .map(row => `<tr><td>${row.chapter}</td><td>${row.step}</td><td>${row.reward}</td></tr>`)
//       .join('');

//   return `<table>
//               <thead>
//                   <tr>
//                       <th>Chapter</th>
//                       <th>Step</th>
//                       <th>Reward</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   ${tableContent}
//               </tbody>
//           </table>`;
// }

document.addEventListener('DOMContentLoaded', function() {
  const data = fetchCsvData();

  let chapterCount = 2;
  for (let i = 1; i <= chapterCount; i++) {
      document.getElementById(`chapter${i}Section`).innerHTML = buildTableForChapter(`Chapter ${i}`, data);
  }
});

