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
    // onResize();

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

// Token images centralized for easy updates
const tokenIcons = {
    "kiljaeden": "./pics/kiljaeden-icon.png",
    "sargeras": "./pics/sargeras-icon.png",
    "felArmament": "./pics/fel-armament-icon.png",
    "arcaneTome": "./pics/arcane-tome-icon.png",
    "firewing": "./pics/firewing-icon.png",
    "sunfury": "./pics/sunfury-icon.png",
};

// Dynamically set token images
document.querySelectorAll(".kiljaedenIcon").forEach((element) => {
    element.src = tokenIcons.kiljaeden;
});
document.querySelectorAll(".sargerasIcon").forEach((element) => {
    element.src = tokenIcons.sargeras;
});
document.querySelectorAll(".felArmamentIcon").forEach((element) => {
    element.src = tokenIcons.felArmament;
});
document.querySelectorAll(".arcaneTomeIcon").forEach((element) => {
    element.src = tokenIcons.arcaneTome;
});
document.querySelectorAll(".sunfuryIcon").forEach((element) => {
    element.src = tokenIcons.sunfury;
});
document.querySelectorAll(".firewingIcon").forEach((element) => {
    element.src = tokenIcons.firewing;
});

const reputationLevels = [
    { name: "neutral", points: 0 },
    { name: "friendly", points: 3000 },
    { name: "honored", points: 9000 },
    { name: "revered", points: 21000 },
    { name: "exalted", points: 42000 }
];

const baseTokenGroups = {
    "Mark of Kil'jaeden / Firewing Signet": { points: 25, maxTier: "honored" },
    "Mark of Sargeras / Sunfury Signet": { points: 25, maxTier: "exalted" },
    "Fel Armament / Arcane Tome": { points: 350, maxTier: "exalted" }
};

const tokenGroups = {
    aldorScryerT1Token: { points: 25, maxTier: "honored" },
    aldorScryerT2Token: { points: 25, maxTier: "exalted" },
    aldorScryerT3Token: { points: 350, maxTier: "exalted" },
};

//calculate scryer/aldor rep
function calculateReputation() {
    const currentLevel = document.getElementById("currentReputationLevel").value;
    const pointsInCurrentLevel = parseInt(document.getElementById("pointsInCurrentLevelAldorScryer").value) || 0;
    const doubleMultiplier = document.getElementById("doubleMultiplier").checked;
    const dontUseKiljaeden = document.getElementById("dontUseKiljaeden").checked;

    // Reset token values to base before applying multiplier
    Object.keys(tokenGroups).forEach((token) => {
        tokenGroups[token].points = baseTokenGroups[formatTokenName(token)].points;
    });

    // Apply multiplier to token values if selected
    if (doubleMultiplier) {
        Object.keys(tokenGroups).forEach((token) => {
            tokenGroups[token].points *= 2;
        });
    }

    let currentReputation =
        reputationLevels.find((level) => level.name === currentLevel).points +
        pointsInCurrentLevel;
    let startingReputation = currentReputation;

    if (currentReputation >= 42000) {
        document.getElementById("results").innerHTML = `<p>You are already at Exalted!</p>`;
        return;
    }

    let remainingReputation = 42000 - currentReputation;

    const tokensRequiredByRank = [];
    const totalTokensRequired = {
        aldorScryerT1Token: 0,
        aldorScryerT2Token: 0,
        aldorScryerT3Token: 0,
    };

    // Get current tokens from user inputs
    const currentTokensOwned = {
        aldorScryerT1Token: parseInt(document.getElementById("aldorScryerT1Token").value) || 0,
        aldorScryerT2Token: parseInt(document.getElementById("aldorScryerT2Token").value) || 0,
        aldorScryerT3Token: parseInt(document.getElementById("aldorScryerT3Token").value) || 0,
    };

    // Loop through reputation levels
    for (let i = reputationLevels.findIndex((level) => level.name === currentLevel);
        i < reputationLevels.length - 1 && remainingReputation > 0;
        i++
    ) {
        const currentTier = reputationLevels[i];
        const nextTier = reputationLevels[i + 1];
        const rankReputationNeeded = Math.min(
            remainingReputation,
            nextTier.points - currentReputation
        );

        let rankReputationRemaining = rankReputationNeeded;
        const tokensForTier = {};

        let sargerasMarks = 0;
        let felTomes = 0;

        // Calculate token requirements
        for (const [tokenKey, data] of Object.entries(tokenGroups)) {
            // Skip Kil'jaeden/Firewing Signet if the checkbox is checked
            if (dontUseKiljaeden && tokenKey === "aldorScryerT1Token") {
                continue;
            }

            // Skip tokens not usable in this tier
            if (data.maxTier === "honored" && nextTier.name !== "friendly" && nextTier.name !== "honored") {
                if (tokenKey === "aldorScryerT1Token") continue; // Skip Kil'jaeden/Firewing Signet for Revered and Exalted
                tokensForTier[tokenKey] = "Not usable";
                continue;
            }

            let tokensNeeded = Math.ceil(rankReputationRemaining / data.points);

            // Subtract current tokens before adding to totals
            const tokensAfterCurrent = Math.max(0, tokensNeeded - currentTokensOwned[tokenKey]);
            currentTokensOwned[tokenKey] -= Math.min(tokensNeeded, currentTokensOwned[tokenKey]);

            // Handle interchangeable tokens
            if (tokenKey === "aldorScryerT2Token") {
                sargerasMarks = tokensAfterCurrent;
            } else if (tokenKey === "aldorScryerT3Token") {
                felTomes = tokensAfterCurrent;
            } else {
                rankReputationRemaining -= tokensAfterCurrent * data.points;
                totalTokensRequired[tokenKey] += tokensAfterCurrent;
                tokensForTier[tokenKey] = tokensAfterCurrent;
            }
        }

        // For interchangeable tokens, use the minimum count
        const minTokens = Math.min(sargerasMarks, felTomes);

        if (sargerasMarks > 0 || felTomes > 0) {
            totalTokensRequired["aldorScryerT2Token"] += sargerasMarks;
            totalTokensRequired["aldorScryerT3Token"] += felTomes;

            tokensForTier["Mark of Sargeras / Sunfury Signet OR Fel Armament / Arcane Tome"] = `${sargerasMarks} Marks/Signet OR ${felTomes} Armament/Tome`;
        } else {
            tokensForTier["Mark of Sargeras / Sunfury Signet OR Fel Armament / Arcane Tome"] = "Not needed";
        }

        tokensRequiredByRank.push({ rank: nextTier.name, tokens: tokensForTier });
        remainingReputation -= rankReputationNeeded;
        currentReputation += rankReputationNeeded;
    }

    // Generate results
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <p>Current Reputation: ${startingReputation} / 42000 (Exalted)</p>
        <p>Reputation Needed: ${42000 - startingReputation}</p>
        <h3>Total Tokens Required:</h3>
        <p><em>Mark of Kil'jaeden / Firewing Signet should be used first and cannot be used after Honored.</em></p>
        <p><em>You can use Mark of Sargeras / Sunfury Signet OR Fel Armament / Arcane Tome to reach Exalted.</em></p>
        <hr/>
        ${Object.entries(totalTokensRequired)
            .map(([key, value]) => {
                if ((key === "aldorScryerT1Token" && dontUseKiljaeden) || (key === "aldorScryerT1Token" && startingReputation >= 9000)) {
                    return ""; // Hide Kil'jaeden/Firewing Signet if not usable
                }
                return `<p>${formatTokenName(key)}: ${value}</p>`;
            })
            .join("")}
        <hr/>
        ${tokensRequiredByRank
            .map(
                ({ rank, tokens }) => `
                    <details>
                        <summary>Tokens Required for ${rank.charAt(0).toUpperCase() + rank.slice(1)}</summary>
                        ${Object.entries(tokens)
                            .map(([key, value]) => {
                                if ((key === "aldorScryerT1Token" && dontUseKiljaeden) || (key === "aldorScryerT1Token" && (rank === "revered" || rank === "exalted"))) {
                                    return ""; // Hide Kil'jaeden/Firewing for Revered and Exalted or when checkbox is checked
                                }
                                return `<p>${formatTokenName(key)}: ${value}</p>`;
                            })
                            .join("")}
                    </details>
                `
            )
            .join("")}
    `;
}


// Helper function to subtract current tokens
function subtractCurrentTokens(totalTokensRequired) {
    const tokenKeys = ["aldorScryerT1Token", "aldorScryerT2Token", "aldorScryerT3Token"];

    tokenKeys.forEach((tokenKey) => {
        const currentTokenInput = document.getElementById(`${tokenKey}Input`);
        const currentTokensOwned = parseInt(currentTokenInput?.value || 0);

        if (currentTokensOwned > 0) {
            totalTokensRequired[tokenKey] = Math.max(0, totalTokensRequired[tokenKey] - currentTokensOwned);
        }
    });
}

// Helper function to format token names
function formatTokenName(tokenKey) {
    const tokenNames = {
        aldorScryerT1Token: "Mark of Kil'jaeden / Firewing Signet",
        aldorScryerT2Token: "Mark of Sargeras / Sunfury Signet",
        aldorScryerT3Token: "Fel Armament / Arcane Tome",
    };
    return tokenNames[tokenKey] || tokenKey;
}


// Helper function to format token names
function formatTokenName(tokenKey) {
    const tokenNames = {
        aldorScryerT1Token: "Mark of Kil'jaeden / Firewing Signet",
        aldorScryerT2Token: "Mark of Sargeras / Sunfury Signet",
        aldorScryerT3Token: "Fel Armament / Arcane Tome",
    };
    return tokenNames[tokenKey] || tokenKey;
}


function calculateCenarionRep() {
    const reputationLevels = {
      neutral: 0,
      friendly: 3000,
      honored: 9000,
      revered: 21000,
      exalted: 42000,
    };
    
  
    const level = document.getElementById("currentRepLevel").value;
    const currentPoints = parseInt(document.getElementById("currentPoints").value, 10);
    let plantParts = parseInt(document.getElementById("plantParts").value, 10);
    let coilfangArmaments = parseInt(document.getElementById("coilfangArmaments").value, 10);
  
    // Token contribution values
    const plantPartsRep = 25; // 25 rep per plant part
    const coilfangRep = 75; // 75 rep per armament
  
    // Start with current total reputation
    let currentrep = reputationLevels[level] + currentPoints;
    let totalRep = currentrep;
  
    // Track tokens required
    let totalPlantPartsRequired = 0;
    let totalCoilfangRequired = 0;
  
    // Breakdown for each tier
    const breakdown = [];
  
    // Friendly Tier (Neutral to Friendly)
    if (currentrep < reputationLevels.friendly) {
      const repToFriendly = reputationLevels.friendly - currentrep;
      let plantPartsNeeded = Math.ceil(repToFriendly / plantPartsRep);

      let remainingPlants = plantParts - plantPartsNeeded;
      plantPartsNeeded = Math.max(0, plantPartsNeeded - plantParts);
      plantParts = Math.max(0, remainingPlants); // Update remaining Coilfang Armaments

      breakdown.push(
        `Tokens Required for Friendly:
          - Unidentified Plant Parts: ${Math.max(0, plantPartsNeeded - plantParts)}`
      );
  
      totalPlantPartsRequired = plantPartsNeeded; // Total required for Friendly
      totalRep = reputationLevels.friendly; // Update to Friendly tier
    }
  
    // Honored Tier (Friendly to Honored)
    if (currentrep < reputationLevels.honored) {
      const repToHonored = reputationLevels.honored - totalRep;
      let coilfangNeeded = Math.ceil(repToHonored / coilfangRep);
  
      // Calculate remaining tokens after applying current tier
      let remainingCoilfang = coilfangArmaments - coilfangNeeded;
      coilfangNeeded = Math.max(0, coilfangNeeded - coilfangArmaments);
      coilfangArmaments = Math.max(0, remainingCoilfang); // Update remaining Coilfang Armaments
  
      breakdown.push(
        `Tokens Required for Honored:
          - Coilfang Armaments: ${coilfangNeeded}`
      );
  
      totalCoilfangRequired += coilfangNeeded;
      totalRep = reputationLevels.honored; // Update to Honored tier
    }
  
    // Revered Tier (Honored to Revered)
    if (currentrep < reputationLevels.revered) {
      const repToRevered = reputationLevels.revered - totalRep;
      let coilfangNeeded = Math.ceil(repToRevered / coilfangRep);
  
      // Calculate remaining tokens after applying current tier
      let remainingCoilfang = coilfangArmaments - coilfangNeeded;
      coilfangNeeded = Math.max(0, coilfangNeeded - coilfangArmaments);
      coilfangArmaments = Math.max(0, remainingCoilfang); // Update remaining Coilfang Armaments
  
      breakdown.push(
        `Tokens Required for Revered:
          - Coilfang Armaments: ${coilfangNeeded}`
      );
  
      totalCoilfangRequired += coilfangNeeded;
      totalRep = reputationLevels.revered; // Update to Revered tier
    }
  
    // Exalted Tier (Revered to Exalted)
    if (currentrep < reputationLevels.exalted) {
      const repToExalted = reputationLevels.exalted - totalRep;
      let coilfangNeeded = Math.ceil(repToExalted / coilfangRep);
  
      // Calculate remaining tokens after applying current tier
      let remainingCoilfang = coilfangArmaments - coilfangNeeded;
      coilfangNeeded = Math.max(0, coilfangNeeded - coilfangArmaments);
      coilfangArmaments = Math.max(0, remainingCoilfang); // Update remaining Coilfang Armaments
  
      breakdown.push(
        `Tokens Required for Exalted:
          - Coilfang Armaments: ${coilfangNeeded}`
      );
  
      totalCoilfangRequired += coilfangNeeded;
    }
  
    // Display the results
    const resultsDiv = document.getElementById("cenarionResults");
    resultsDiv.innerHTML = `
      <h3>Results</h3>
      <p>Current Reputation: ${currentrep} / 42000 (Exalted)</p>
      <p>Reputation Needed: ${Math.max(0, reputationLevels.exalted - currentrep)}</p>
      <h4>Total Tokens Required:</h4>
      <p>- Unidentified Plant Parts: ${totalPlantPartsRequired}</p>
      <p>- Coilfang Armaments: ${totalCoilfangRequired}</p>
      <h4>Detailed Breakdown:</h4>
      <pre>${breakdown.join("\n")}</pre>
    `;
  }
 
//   function calculateSporeggarReputation() {
//     const currentLevel = document.getElementById("currentReputationLevelSporeggar").value;
//     const pointsInCurrentLevel = parseInt(document.getElementById("pointsInCurrentLevelSporeggar").value) || 0;
//     const doubleMultiplier = document.getElementById("doubleMultiplierSporeggar").checked;
//     const prioritizeGlowcap = document.getElementById("prioritizeGlowcap").checked;
  
//     const reputationLevels = [
//       { name: "neutral", points: 0 },
//       { name: "unfriendly", points: 3000 },
//       { name: "friendly", points: 6000 },
//       { name: "honored", points: 12000 },
//       { name: "revered", points: 24000 },
//       { name: "exalted", points: 42000 },
//     ];
  
//     let currentReputation =
//       reputationLevels.find((level) => level.name === currentLevel).points + pointsInCurrentLevel;
  
//     if (currentReputation >= 42000) {
//       document.getElementById("resultsSporeggar").innerHTML = `<p>You are already at Exalted!</p>`;
//       return;
//     }
  
//     const tokens = {
//       glowcap: {
//         points: doubleMultiplier ? 30 : 15,
//         usable: (tier) => tier !== "neutral" && tier !== "unfriendly", // Glowcap usable from Unfriendly onward
//         current: parseInt(document.getElementById("glowcap").value) || 0,
//       },
//       matureSporeSac: {
//         points: doubleMultiplier ? 150 : 75,
//         usable: (tier) => tier === "friendly" || tier === "revered",
//         current: parseInt(document.getElementById("matureSporeSac").value) || 0,
//       },
//       fertileSpore: {
//         points: doubleMultiplier ? 150 : 75,
//         usable: (tier) => tier === "exalted",
//         current: parseInt(document.getElementById("fertileSpore").value) || 0,
//       },
//       bogLordTendril: {
//         points: doubleMultiplier ? 20 : 10,
//         usable: (tier) => tier === "friendly" || tier === "honored",
//         current: parseInt(document.getElementById("bogLordTendril").value) || 0,
//       },
//     };
  
//     const tierTokenOptions = {
//       unfriendly: ["glowcap"],
//       friendly: prioritizeGlowcap ? ["glowcap"] : ["bogLordTendril", "matureSporeSac"],
//       honored: prioritizeGlowcap ? ["glowcap"] : ["bogLordTendril", "glowcap"],
//       revered: prioritizeGlowcap ? ["glowcap"] : ["glowcap", "matureSporeSac"],
//       exalted: prioritizeGlowcap ? ["glowcap"] : ["glowcap", "fertileSpore"],
//     };
  
//     const results = [];
//     for (let i = reputationLevels.findIndex((level) => level.name === currentLevel); i < reputationLevels.length - 1; i++) {
//       const currentTier = reputationLevels[i];
//       const nextTier = reputationLevels[i + 1];
//       const pointsToNextTier = Math.max(0, nextTier.points - currentReputation);
  
//       const tokenOptions = tierTokenOptions[nextTier.name] || [];
//       let tierResults = { tier: nextTier.name, tokenUsage: [] };
  
//       let remainingReputation = pointsToNextTier;
  
//       for (const tokenKey of tokenOptions) {
//         const token = tokens[tokenKey];
//         if (!token.usable(nextTier.name)) continue;
  
//         const tokensFromInventory = Math.min(
//           Math.ceil(remainingReputation / token.points),
//           token.current
//         );
//         remainingReputation -= tokensFromInventory * token.points;
//         token.current -= tokensFromInventory;
  
//         const additionalTokensNeeded = Math.max(
//           0,
//           Math.ceil(remainingReputation / token.points)
//         );
  
//         tierResults.tokenUsage.push({
//           token: tokenKey,
//           fromOwned: tokensFromInventory,
//           additionalRequired: additionalTokensNeeded,
//           totalNeeded: tokensFromInventory + additionalTokensNeeded,
//         });
  
//         if (remainingReputation <= 0) break;
//       }
  
//       results.push(tierResults);
//       currentReputation = nextTier.points - remainingReputation;
//     }
  
//     const resultsDiv = document.getElementById("resultsSporeggar");
//     resultsDiv.innerHTML = `
//       <h3>Reputation Progress</h3>
//       ${results
//         .map(
//           ({ tier, tokenUsage }) =>
//             `<details>
//                <summary>${tier.charAt(0).toUpperCase() + tier.slice(1)}</summary>
//                ${tokenUsage.length > 0
//                  ? tokenUsage
//                      .map(
//                        ({ token, fromOwned, additionalRequired, totalNeeded }) =>
//                          `<p>${formatTokenNameS(token)}: 
//                             <strong>${totalNeeded}</strong> 
//                             (Owned: ${fromOwned}, Additional: ${additionalRequired})</p>`
//                      )
//                      .join("")
//                  : `<p>No tokens usable for this tier.</p>`}
//              </details>`
//         )
//         .join("")}
//     `;
//   }
  
//   function formatTokenNameS(tokenKey) {
//     const tokenNames = {
//       glowcap: "Glowcap",
//       matureSporeSac: "Mature Spore Sac",
//       fertileSpore: "Fertile Spore",
//       bogLordTendril: "Bog Lord Tendril",
//     };
//     return tokenNames[tokenKey] || tokenKey;
//   }


// // version 2
// function calculateSporeggarReputation() {
//     const currentLevel = document.getElementById("currentReputationLevelSporeggar").value;
//     const pointsInCurrentLevel = parseInt(document.getElementById("pointsInCurrentLevelSporeggar").value) || 0;
//     const doubleMultiplier = document.getElementById("doubleMultiplierSporeggar").checked;
  
//     const tokens = {
//       bogLordTendril: {
//         name: "Bog Lord Tendrils",
//         points: doubleMultiplier ? 1500 / 6 : 750 / 6,
//         usable: (tier) => tier === "unfriendly" || tier === "neutral",
//         current: parseInt(document.getElementById("bogLordTendril").value) || 0,
//       },
//       matureSporeSac: {
//         name: "Mature Spore Sacs",
//         points: doubleMultiplier ? 1500 / 10 : 750 / 10,
//         usable: (tier) => tier === "unfriendly" || tier === "neutral",
//         current: parseInt(document.getElementById("matureSporeSac").value) || 0,
//       },
//       fertileSpore: {
//         name: "Fertile Spores",
//         points: doubleMultiplier ? 1500 / 6 : 750 / 6,
//         usable: (tier) => tier !== "unfriendly",
//         current: parseInt(document.getElementById("fertileSpore").value) || 0,
//       },
//       sanguineHibiscus: {
//         name: "Sanguine Hibiscus",
//         points: doubleMultiplier ? 1500 / 5 : 750 / 5,
//         usable: (tier) => tier !== "unfriendly" && tier !== "neutral",
//         current: parseInt(document.getElementById("sanguineHibiscus").value) || 0,
//       },
//       nowThatWereFriends: {
//         name: "Now That We're Friends...",
//         points: doubleMultiplier ? 1500 : 750,
//         usable: (tier) => tier === "honored" || tier === "revered",
//         current: parseInt(document.getElementById("nowThatWereFriends").value) || 0,
//       },
//     };
  
//     const reputationLevels = [
//       { name: "unfriendly", points: 0 },
//       { name: "neutral", points: 3000 },
//       { name: "friendly", points: 6000 },
//       { name: "honored", points: 12000 },
//       { name: "revered", points: 21000 },
//       { name: "exalted", points: 42000 },
//     ];
  
//     let currentReputation =
//       reputationLevels.find((level) => level.name === currentLevel).points + pointsInCurrentLevel;
  
//     if (currentReputation >= 42000) {
//       document.getElementById("resultsSporeggar").innerHTML = `<p>You are already at Exalted!</p>`;
//       return;
//     }
  
//     const totalTokens = {}; // Object to aggregate total tokens used
//     const results = [];
//     const tokenInventory = { ...tokens }; // Track tokens for incremental updates across tiers
  
//     for (let i = reputationLevels.findIndex((level) => level.name === currentLevel); i < reputationLevels.length - 1; i++) {
//       const currentTier = reputationLevels[i];
//       const nextTier = reputationLevels[i + 1];
//       const pointsToNextTier = Math.max(0, nextTier.points - currentReputation);
  
//       const tokenOptions = Object.keys(tokens).filter((key) =>
//         tokens[key].usable(nextTier.name)
//       );
//       let tierResults = { tier: nextTier.name, tokenUsage: [] };
  
//       let remainingReputation = pointsToNextTier;
  
//       for (const tokenKey of tokenOptions) {
//         const token = tokenInventory[tokenKey];
  
//         const tokensFromInventory = Math.min(
//           Math.ceil(remainingReputation / token.points),
//           token.current
//         );
//         remainingReputation -= tokensFromInventory * token.points;
  
//         // Update token inventory for future tiers
//         tokenInventory[tokenKey].current -= tokensFromInventory;
  
//         // Calculate additional tokens required for this tier
//         const additionalTokensNeeded = Math.max(
//           0,
//           Math.ceil(remainingReputation / token.points)
//         );
  
//         const totalNeeded = tokensFromInventory + additionalTokensNeeded;
  
//         if (!totalTokens[tokenKey]) {
//           totalTokens[tokenKey] = totalNeeded;
//         } else {
//           totalTokens[tokenKey] += totalNeeded;
//         }
  
//         tierResults.tokenUsage.push({
//           token: tokenKey,
//           fromOwned: tokensFromInventory,
//           additionalRequired: additionalTokensNeeded,
//           totalNeeded,
//         });
  
//         if (remainingReputation <= 0) break;
//       }
  
//       results.push(tierResults);
//       currentReputation = nextTier.points - remainingReputation;
//     }
  
//     const resultsDiv = document.getElementById("resultsSporeggar");
//     resultsDiv.innerHTML = `
//       <h3>Reputation Progress</h3>
//       ${results
//         .map(
//           ({ tier, tokenUsage }) =>
//             `<details>
//                <summary>Tokens Required for ${tier.charAt(0).toUpperCase() + tier.slice(1)}</summary>
//                ${tokenUsage
//                  .map(
//                    ({ token, fromOwned, additionalRequired, totalNeeded }) =>
//                      `<p>${formatTokenNameSporeggar(token)}: 
//                         <strong>${totalNeeded}</strong> 
//                         (Owned: ${fromOwned}, Additional: ${additionalRequired})</p>`
//                  )
//                  .join("")}
//              </details>`
//         )
//         .join("")}
//       <h3>Total Tokens Required</h3>
//       <ul>
//         ${Object.entries(totalTokens)
//           .map(
//             ([tokenKey, total]) =>
//               `<li>${formatTokenNameSporeggar(tokenKey)}: <strong>${total}</strong></li>`
//           )
//           .join("")}
//       </ul>
//     `;
//   }
  
//   function formatTokenNameSporeggar(tokenKey) {
//     const tokenNames = {
//       bogLordTendril: "Bog Lord Tendrils",
//       matureSporeSac: "Mature Spore Sacs",
//       fertileSpore: "Fertile Spores",
//       sanguineHibiscus: "Sanguine Hibiscus",
//       nowThatWereFriends: "Now That We're Friends...",
//     };
//     return tokenNames[tokenKey] || tokenKey;
//   }
function calculateSporeggarReputation() {
    const currentLevel = document.getElementById("currentReputationLevelSporeggar").value;
    const pointsInCurrentLevel = parseInt(document.getElementById("pointsInCurrentLevelSporeggar").value) || 0;
    const doubleMultiplier = document.getElementById("doubleMultiplierSporeggar").checked;
  
    const tokens = {
      bogLordTendril: {
        name: "Bog Lord Tendrils",
        points: doubleMultiplier ? 1500 / 6 : 750 / 6,
        usable: (tier) => tier === "unfriendly" || tier === "neutral",
        current: parseInt(document.getElementById("bogLordTendril").value) || 0,
      },
      matureSporeSac: {
        name: "Mature Spore Sacs",
        points: doubleMultiplier ? 1500 / 10 : 750 / 10,
        usable: (tier) => tier === "unfriendly" || tier === "neutral",
        current: parseInt(document.getElementById("matureSporeSac").value) || 0,
      },
      fertileSpore: {
        name: "Fertile Spores",
        points: doubleMultiplier ? 1500 / 6 : 750 / 6,
        usable: (tier) => tier !== "unfriendly",
        current: parseInt(document.getElementById("fertileSpore").value) || 0,
      },
      sanguineHibiscus: {
        name: "Sanguine Hibiscus",
        points: doubleMultiplier ? 1500 / 5 : 750 / 5,
        usable: (tier) => tier !== "unfriendly" && tier !== "neutral",
        current: parseInt(document.getElementById("sanguineHibiscus").value) || 0,
      },
      nowThatWereFriends: {
        name: "Now That We're Friends...",
        points: doubleMultiplier ? 1500 : 750,
        usable: (tier) => tier === "honored" || tier === "revered",
        current: parseInt(document.getElementById("nowThatWereFriends").value) || 0,
      },
    };
  
    const reputationLevels = [
      { name: "unfriendly", points: 0 },
      { name: "neutral", points: 3000 },
      { name: "friendly", points: 6000 },
      { name: "honored", points: 12000 },
      { name: "revered", points: 21000 },
      { name: "exalted", points: 42000 },
    ];
  
    let currentReputation =
      reputationLevels.find((level) => level.name === currentLevel).points + pointsInCurrentLevel;
  
    if (currentReputation >= 42000) {
      document.getElementById("resultsSporeggar").innerHTML = `<p>You are already at Exalted!</p>`;
      return;
    }
  
    const totalTokens = {}; // Object to aggregate total tokens used
    const results = [];
    const tokenInventory = { ...tokens }; // Track tokens independently for each tier
  
    for (let i = reputationLevels.findIndex((level) => level.name === currentLevel); i < reputationLevels.length - 1; i++) {
      const currentTier = reputationLevels[i];
      const nextTier = reputationLevels[i + 1];
      const pointsToNextTier = Math.max(0, nextTier.points - currentReputation);
  
      const tokenOptions = Object.keys(tokens).filter((key) =>
        tokens[key].usable(nextTier.name)
      );
      let tierResults = { tier: nextTier.name, tokenUsage: [] };
  
      let remainingReputation = pointsToNextTier;
  
      for (const tokenKey of tokenOptions) {
        const token = tokenInventory[tokenKey];
  
        // Fixed token requirement for this tier
        const tokensRequiredForTier = Math.ceil(pointsToNextTier / token.points);
  
        // Tokens used from inventory for this tier only
        const tokensFromInventory = Math.min(tokensRequiredForTier, token.current);
  
        // Remaining tokens required after inventory usage
        const additionalTokensNeeded = Math.max(
          0,
          tokensRequiredForTier - tokensFromInventory
        );
  
        // Deduct only for this tier
        tokenInventory[tokenKey].current -= tokensFromInventory;
  
        // Aggregate results per tier
        tierResults.tokenUsage.push({
          token: tokenKey,
          fromOwned: tokensFromInventory,
          additionalRequired: additionalTokensNeeded,
          totalNeeded: tokensRequiredForTier,
        });
  
        // Aggregate totals for overall summary
        if (!totalTokens[tokenKey]) {
          totalTokens[tokenKey] = tokensRequiredForTier;
        } else {
          totalTokens[tokenKey] += tokensRequiredForTier;
        }
  
        remainingReputation -= tokensRequiredForTier * token.points;
      }
  
      results.push(tierResults);
      currentReputation = nextTier.points - remainingReputation;
    }
  
    // Generate results output
    const resultsDiv = document.getElementById("resultsSporeggar");
    resultsDiv.innerHTML = `
      <h3>Reputation Progress</h3>
      ${results
        .map(
          ({ tier, tokenUsage }) =>
            `<details>
               <summary>Tokens Required for ${tier.charAt(0).toUpperCase() + tier.slice(1)}</summary>
               ${tokenUsage
                 .map(
                   ({ token, fromOwned, additionalRequired, totalNeeded }) =>
                     `<p>${formatTokenNameSporeggar(token)}: 
                        <strong>${totalNeeded}</strong> 
                        (Owned: ${fromOwned}, Additional: ${additionalRequired})</p>`
                 )
                 .join("")}
             </details>`
        )
        .join("")}
      <h3>Total Tokens Required</h3>
      <ul>
        ${Object.entries(totalTokens)
          .map(
            ([tokenKey, total]) =>
              `<li>${formatTokenNameSporeggar(tokenKey)}: <strong>${total}</strong></li>`
          )
          .join("")}
      </ul>
    `;
  }
  
  function formatTokenNameSporeggar(tokenKey) {
    const tokenNames = {
      bogLordTendril: "Bog Lord Tendrils",
      matureSporeSac: "Mature Spore Sacs",
      fertileSpore: "Fertile Spores",
      sanguineHibiscus: "Sanguine Hibiscus",
      nowThatWereFriends: "Now That We're Friends...",
    };
    return tokenNames[tokenKey] || tokenKey;
  }
  