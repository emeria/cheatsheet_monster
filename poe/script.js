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
        `Act,Step,Task,Reward
Act 1,1,Go to the Burning Forest -> Rescue Grael,
Act 1,2,The Keepers -> NPC Keeper Leena,"Experience,Gold,Passive"
Act 1,3,Go to The Fortress Gardens,
Act 1,4,Go to the Fortress Walls,
Act 1,5,Go to The Storerooms -> Storeroom Saboteurs,Passive
Act 1,6,Go to the The Keeper Vault -> The Keeper Vault,"Experience,Passive"
Act 1,7,Go to the Northern Road,
Act 1,8,Town Portal,
Act 1,9,Go to Ulatri Highlands,
Act 1,10,Go to The Osprix Warcamp,
Act 1,11,Go to The Summit,
Act 2,0,"Max: Phys, Some: Void Resistance",
Act 2,1,Go to Last Refuge Outskirts -> The Void Assault,"Experience,Gold,Idol"
Act 2,2,In Last Refuge Outskirts -> Evacuation,"Experience,Gold,Passive"
Act 2 ,3,Go to The Council Chambers,
Act 2 ,4,Go to The Last Archive,
Act 2 ,5,Go to Erza's Library -> Get Ledger,
Act 2,6,Go to Pannion's Study,
Act 2,7,Finding Pannion,"Experience,Gold,Passive"
Act 2,8,Town Portal,
Act 2 ,9,"Erza = Gloves (Ele Leech), Artem = Amulet (Crit)","Experience,Gold,Passive,Unique"
Act 2 ,10,Go to The Precipice,
Act 2 ,11,Go to The Armoury,
Act 2 ,12,Go to The Lower District,
Act 2 ,13,Go to The End of Time,
Act 2 ,14,The Power of Mastery,"Experience,Passive,Mastery"
Act 3 ,0,"Max: Phys & Void Resistance",
Act 3 ,0,Skip all Sidequests,
Act 3 ,1,Go to Council Chamber,
Act 3 ,2,Go to The Sheltered Wood,
Act 3 ,3,Go to The Surface,
Act 3 ,4,Go to The Forsaken Trail,
Act 3 ,5,Go to Cultist Camp,
Act 3 ,6,Go to The Ruins of Welryn,
Act 3 ,7,Go to Welryn Undercity,
Act 3 ,8,Town Portal,
Act 3 ,9,Go to Welryn Docks,
Act 3 ,10,Go to Cultist Camp,
Act 3,11, Go to The Ritual Site,
Act 3 ,12,Go to The Shattered Valley (Skip Rift),
Act 3 ,13,Go to The Courtyard,
Act 3 ,14,Go to The Temple of Eterra,
Act 3 ,15,Go to The Lotus Halls,
Act 3 ,16,Go to The Sanctum Bastille,
Act 3,17, Go to The End of Time,
Act 4 ,1,Go to The Outcast Camp -> Speak to Outcast Queen,
Act 4 ,2,Go to Welryn Outskirts,
Act 4 ,3,Go to Imperial Welryn,
Act 4 ,4,Go to The Soul Wardens' Road,
Act 4 ,5,Go to The Risen Lake -> The Corrupted Lake (Rift),"Experience,Passive,Idol"
Act 4 ,6,Go to The Fallen Tower,
Act 4 ,7,Go to Imperial Thetima,
Act 4 ,8,Go to The Darkling Pier,
Act 4 ,9,Go to The Imperial Dreadnought,
Act 4 ,10,Go to The Dreadnought's Deck,
Act 4 ,11,Jump off the Deck! -> The Admiral's Dreadnought,"Experience,Gold,Idol"
Act 5 ,1,Go to The Shining Cove,
Act 5 ,2,Go to The Majasan Desert,
Act 5 ,3,Go to The Wraith Dunes -> Hidden Gems Pt. 1 (top left),"Experience,Gold,Passive"
Act 5 ,4,Go to Maj'Elka -> Hidden Gems Pt. 2 (bottom right),
Act 5 ,5,Go to The Oracles Abode,"Experience,Gold,Passive"
Act 5 ,6,Go to the Shining Cove and find the Time Rift,
Act 5 ,7,Go to the Ruined Coast (Rift) -> The Sapphire Tablet,"Experience,Passive,Idol "
Act 5 ,8,Go to The Temporal Sanctum WP -> Back to The Oracle's Abode,
Act 5 ,9,Go to The Maj'Elkan Catacombs,
Act 5 ,10,Go to Titan's Canyon,
Act 5 ,11,Go to The Maj'Elka Waystation,
Act 6 ,0,Skip all Sidequests,
Act 6 ,1,Go to The Desert Waystation,
Act 6 ,2,Go to The Rust Lands (Skip Rift),
Act 6 ,3,Go to The Lower Sewers -> Speak Alric,
Act 6 ,4,Go to The Barren Aqueduct,
Act 6 ,5,Go to Necropolis of the Deep,
Act 6 ,6,Go to Yulia's Haven -> Speak with NPC's,
Act 6 ,7,Go to The Upper Necropolis,
Act 6 ,8,Go to The Citadel Sewers,
Act 6 ,9,Go to The Immortal Summit,
Act 6 ,10,Go to The Immortal Citadel -> The Immortal Citadel,"Experience,Gold,Passive"
Act 6 ,11,Go to The Gates of Solarum (Rift),
Act 7 ,0,"Max: Phys,Void, Some: Cold,Light Resistance",
Act 7 ,1,Go to The Burning Forest,
Act 7 ,2,Go to The Scorched Grove,
Act 7 ,3,Go to The Solemn Path,
Act 7 ,4,Go to Heoborea,
Act 7 ,5,Go to The Heoborean Forest,
Act 7 ,6,Go to The Nomad Camp,
Act 7 ,7,Go to The Wengeri Frotress -> Liberating The Nomads,"Experience,Gold,Idol"
Act 7 ,8,Town Portal,
Act 7 ,9,Go to The Tundra,
Act 7 ,10,Go to The Temple of Heorot,
Act 7 ,11,Go to Farwood,
Act 7 ,12,Go to The Frozen Roots,
Act 7 ,13,Go to The Tomb of Morditas -> The Lance of Heorot,"Experience,Gold,Idol"
Act 7 ,14,Town Portal,
Act 7 ,15,Go to The Solemn Path,
Act 7 ,16,Go to The Scorched Grove -> Speak to Heorot,
Act 7 ,17,Use Heoborea Waypoint,
Act 8 ,0,"Max: Phys,Void,Cold,Light Resistance",
Act 8 ,1,Go to The Northern Stream,
Act 8 ,2,Go to Deep Harbor,
Act 8 ,3,Go to The Burning Pier,
Act 8 ,4,Go to Deep Harbor,
Act 8 ,5,Go to Lake Liath,
Act 8 ,6,Go to Liath's Road,
Act 8 ,7,Go to Thetima,
Act 8 ,8,Go to Liath's Tower -> Liath's Tower,"Experience,Passive,Idol"
Act 8 ,9,Go back to Thetima,
Act 8 ,10,Go to Lagon's Isle,
Act 8 ,11,Go to Moonlit Shrine,
Act 8 ,12,Go to The Strand of Storms (fragment),
Act 8 ,13,Go back to Moonlit Shrine,
Act 8 ,14,Go to The Coral Pools (fragment),
Act 8 ,15,Go back to Moonlit Shrine,
Act 8 ,16,Go to The Temple of Lagon,
Act 8 ,17,Go to The Temple Depths,
Act 8 ,18,Go to Sanctum of the Architect,
Act 8 ,19,Go to Seafloor Colosseum -> Lagon,"Experience,Passive"
Act 9 ,0,"Max: Phys,Void,Cold,Light,Poison Resistance",
Act 9 ,1,Go to Soreth'ka,
Act 9 ,2,Go to The Crossroads,
Act 9 ,3,Go to The Dry River,
Act 9 ,4,Go to The Radiant Dunes -> Bottom Right Area-Then Top Right,
Act 9 ,5,Go to Maj'Elka Upper District,
Act 9 ,6,Go to Maj'Elka Lower District,
Act 9 ,7,Go to Maj'Elka Slums -> Desert Treasure (First Top Right Basement),"Experience,Passive,Idol"
Act 9 ,8,Town Portal,
Act 9 ,9,Go to The Oasis,
Act 9 ,10,Go to The Crystal Mines,
Act 9 ,11,Go to The Aerie,
Act 9 ,12,Go to Majasan Heights (Flying),
Act 9 ,13,Go to The Temple Rooftops,
Act 9 ,14,Go to The Upper Temple,
Act 9 ,15,Go to The Lower Temple,
Act 9 ,16,Go to the Chamber of Vessel -> Apophis And Majasa,"Experience,Passive,Attributes"
Act 9,17,"Max: Phys,Void,Cold,Light,Necrotic Resistance",
Act 9,18,"HP: ~1k-1.2k starting Monoliths, aim for close to 2k ASAP",
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
            const [act, step, task, rewardString] = matches;
            const rewards = rewardString ? rewardString.split(',').map(r => r.trim()) : [];
            return { act, step, task, rewards };
        }
        return null;
    }).filter(row => row !== null);

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

function buildTableForAct(actFilter, data) {
    let tableContent = data
        .filter(row => row.act === actFilter)
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

    // Custom sorting function for acts
    const sortActs = (a, b) => {
        const actsNumberA = parseInt(a.act.match(/\d+/), 10);
        const actsNumberB = parseInt(b.act.match(/\d+/), 10);

        if (actNumberA !== actNumberB) {
            return actNumberA - actNumberB;
        }
        return a.step - b.step;
    };

    // Sort the data
    let sortedFilteredData = data
        .filter(row => row.step == 0 || (row.rewards && row.rewards.length > 0))
        .sort(sortActs);
        
    let currentAct = null;
    let tableContent = sortedFilteredData.map(row => {
        let actRow = '';
        if (row.act !== currentAct) {
            currentAct = row.act;
            actRow = `<tr><td colspan="10"><b>${currentAct}</b></td></tr>`;
        }

        // Concatenate task to act row if step is 0
        if (row.step === 0) {
            actRow = `<tr><td colspan="10"><b>${currentAct}: ${row.task}</b></td></tr>`;
            return actRow;
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

        return actRow + `<tr><td>${row.step}</td><td>${row.task}</td>${rewardCells}</tr>`;
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


document.addEventListener('DOMContentLoaded', function () {
    /**
     * Data used for:
     * Act Tables
     * TLDR Table
     */
    const data = fetchLevelingCsvData();

    /**
     * Act Tables
     */
    let actCount = 10;
    for (let i = 1; i <= actCount; i++) {
        document.getElementById(`act${i}Section`).innerHTML = buildTableForAct(`Act ${i}`, data);
    }

    /**
     * TLDR Table
     */
    document.getElementById('actTldrSection').innerHTML = buildTableForTLDR(data);

    const checkbox = document.getElementById('toggleAdditionalRewards');
    checkbox.addEventListener('change', function() {
        const isVisible = checkbox.checked;
        const additionalRewardCells = document.querySelectorAll('.additional-reward');
        additionalRewardCells.forEach(cell => {
            cell.style.display = isVisible ? '' : 'none';
        });
    });
    checkbox.dispatchEvent(new Event('change'));


});


/**
 * Collapse acts
 */
function collapseActDetails() {
    // Select all <summary> elements with an ID containing 'act'
    const summaries = document.querySelectorAll('summary[id*="act"]');

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
 * Expand acts
 */
function expandActDetails() {
    // Select all <summary> elements with an ID containing 'act'
    const summaries = document.querySelectorAll('summary[id*="act"]');

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