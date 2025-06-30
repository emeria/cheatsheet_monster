/**
 * Utils
 * @returns
 */
"use strict"; // hack to turn on type safety

/*
    https://stackoverflow.com/questions/6850164/get-the-device-width-in-javascript
*/
function getScreenSize() {
  var resolutions = {
    "(min-width: 1200px)": "xl",
    "(min-width: 992px) and (max-width: 1199.98px)": "lg",
    "(min-width: 768px) and (max-width: 991.98px)": "md",
    "(min-width: 576px) and (max-width: 767.98px)": "sm",
    "(max-width: 575.98px)": "xs",
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
  document.addEventListener("touchstart", function () {}, false);
}

document.addEventListener("DOMContentLoaded", () => {
  renderSupporterPackTable(supporterPackData);
});

function onResize() {
  var dim = getScreenSize();
  console.log("Dimension: " + dim);
  var debug = document.getElementById("screen-size");
  debug.innerText = dim;
  console.log(window.innerHeight);
  console.log(window.innerWidth);
  document.getElementById("overlay").style.maxWidth = window.innerWidth + "px";
  document.getElementById("overlay").style.maxHeight =
    window.innerHeight + "px";
}

// Overlay swap logic
function on(event) {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("overlay").getElementsByTagName("img")[0].src =
    event.src;
  console.log(event.dataset.enlargeHeight);
  if (event.dataset.enlargeHeight != "") {
    document
      .getElementById("overlay")
      .getElementsByTagName("img")[0].style.maxHeight =
      event.dataset.enlargeHeight;
  } else {
    document
      .getElementById("overlay")
      .getElementsByTagName("img")[0].style.maxHeight = "80%";
  }
  if (event.dataset.enlargeWidth != "") {
    document
      .getElementById("overlay")
      .getElementsByTagName("img")[0].style.maxWidth =
      event.dataset.enlargeWidth;
  } else {
    document
      .getElementById("overlay")
      .getElementsByTagName("img")[0].style.maxWidth = "90%";
  }
}

function off() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("overlay").getElementsByTagName("img")[0].src = "";
}

/**
 * Top Button Logic
 */
var topbutton = document.getElementById("top_btn");

window.onscroll = function () {
  scrollFunction();
};

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
  let rawData = `Act,Step,Task,Reward
Act 1,1,Enemy at the Gate (Twilight Strand) -> Kill Hillock,"Gems"
Act 1,2,The Coast -> Waypoint,
Act 1,3,Breaking Some Eggs (Mud Flats) -> Find the Glyphs,"Gems"
Act 1,4,The Submerged Passage -> Waypoint,
Act 1,5,The Ledge -> Waypoint,
Act 1,6,Take Waypoint to the Submerged Passage -> Find the Flooded Depths,
Act 1,7,The Dweller of the Deep (Flooded Depths)-> Kill The Dweller of the Deep and go to town,"Book of Skill"
Act 1,8,Take Waypoint to The Ledge -> Find the Climb,
Act 1,9,The Climb -> Waypoint,
Act 1,10,The Lower Prison -> Waypoint,
Act 1,11,The Lower Prison -> Do the Trial,
Act 1,12,The Upper Prison -> Find the Warden's Quarters,
Act 1,13,The Caged Brute (The Wardens Quarters) -> Kill Brutus and log out,"Gems"
Act 1,14,Take The Prisoner's Gate Waypoint,
Act 1,15,The Ship Graveyard -> Waypoint,
Act 1,16,The Marooned Mariner (The Ship Graveyard Cave) -> Get the AllFlame and log out,"Book of Skill"
ACt 1,17,Find the Cavern of Wrath -> Waypoint,
Act 1,18,The Siren's Cadence (The Cavern of Anger) -> Kill Merveil -> Act 2,"Gems"

`;

  const data = rawData
    .trim()
    .split("\n")
    .slice(1)
    .map((row) => {
      // Split the row by commas, but ignore commas inside quotes
      const regex = /(?:^|,)(\"(?:[^\"]+|\"\")*\"|[^,]*)/g;
      let matches = [];
      let match;
      while ((match = regex.exec(row))) {
        matches.push(match[1]);
      }

      // Remove leading/trailing quotes and extra spaces
      matches = matches.map((field) =>
        field.trim().replace(/^"|"$/g, "").trim(),
      );

      // Assuming there are always 3 fields per row
      if (matches.length === 4) {
        const [act, step, task, rewardString] = matches;
        const rewards = rewardString
          ? rewardString.split(",").map((r) => r.trim())
          : [];
        return { act, step, task, rewards };
      }
      return null;
    })
    .filter((row) => row !== null);

  return data;
}

function parseCsvRow(row) {
  const regex = /(?:^|,)(\"(?:[^\"]*(?:\"\"[^\"]*)*)\"|[^,]*)/g;
  let columns = [];
  let match;
  while ((match = regex.exec(row))) {
    let column = match[1].replace(/^"|"$/g, "").replace(/""/g, '"');
    columns.push(column.trim());
  }
  return columns;
}

const rewardIconMapping = {
  Passive: { src: "./pics/passive-icon.png", alt: "Passive Reward" },
  Idol: { src: "./pics/idol-icon.png", alt: "Idol Reward" },
  Gold: { src: "./pics/gold-icon.png", alt: "Gold Reward" },
  Mastery: { src: "./pics/mastery-icon.png", alt: "Mastery Reward" },
  Unique: { src: "./pics/unique-icon.png", alt: "Unique Reward" },
  Experience: { src: "./pics/experience-icon.png", alt: "Experience Reward" },
  Attributes: { src: "./pics/attributes-icon.png", alt: "Attributes Reward" },
};

function buildTableForAct(actFilter, data) {
  let tableContent = data
    .filter((row) => row.act === actFilter)
    .map((row) => {
      const rewardIcons = row.rewards
        .map((rewardKey) => {
          const rewardInfo = rewardIconMapping[rewardKey];
          return rewardInfo
            ? `<img src="${rewardInfo.src}" alt="${rewardInfo.alt}" class="reward-icon">`
            : "";
        })
        .join(" ");

      return `<tr><td>${row.step}</td><td>${row.task}</td><td>${rewardIcons}</td></tr>`;
    })
    .join("");

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

function buildTableForTLDR(data) {
  const rewardOrder = [
    "Passive",
    "Idol",
    "Experience",
    "Gold",
    "Unique",
    "Mastery",
    "Attributes",
  ];
  const additionalRewards = [
    "Experience",
    "Gold",
    "Unique",
    "Mastery",
    "Attributes",
  ];
  const rewardCounts = {};

  rewardOrder.forEach((rewardType) => (rewardCounts[rewardType] = 0));

  // Custom sorting function for acts
  const sortActs = (a, b) => {
    const actNumberA = parseInt(a.act.match(/\d+/), 10);
    const actNumberB = parseInt(b.act.match(/\d+/), 10);

    if (actNumberA !== actNumberB) {
      return actNumberA - actNumberB;
    }
    return a.step - b.step;
  };

  // Sort the data
  let sortedFilteredData = data
    .filter((row) => row.step == 0 || (row.rewards && row.rewards.length > 0))
    .sort(sortActs);

  let currentAct = null;
  let tableContent = sortedFilteredData
    .map((row) => {
      let actRow = "";
      if (row.act !== currentAct) {
        currentAct = row.act;
        actRow = `<tr><td colspan="10"><b>${currentAct}</b></td></tr>`;
      }

      // Concatenate task to act row if step is 0
      if (row.step === 0) {
        actRow = `<tr><td colspan="10"><b>${currentAct}: ${row.task}</b></td></tr>`;
        return actRow;
      }

      const rewardCells = rewardOrder
        .map((rewardType) => {
          const isAdditionalReward = additionalRewards.includes(rewardType);
          const cellClass = isAdditionalReward ? "additional-reward" : "";
          if (row.rewards.includes(rewardType)) {
            rewardCounts[rewardType]++;
            const rewardInfo = rewardIconMapping[rewardType];
            return `<td class="${cellClass}"><img src="${rewardInfo.src}" alt="${rewardInfo.alt}" class="reward-icon"><span class="reward-count">${rewardCounts[rewardType]}</span></td>`;
          }
          return `<td class="${cellClass}"></td>`; // Empty cell for missing reward
        })
        .join("");

      return (
        actRow +
        `<tr><td>${row.step}</td><td>${row.task}</td>${rewardCells}</tr>`
      );
    })
    .join("");

  return `<table>
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Task</th>
                        ${rewardOrder.map((rewardType) => `<th class="${additionalRewards.includes(rewardType) ? "additional-reward" : ""}">${rewardType}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${tableContent}
                </tbody>
            </table>`;
}

document.addEventListener("DOMContentLoaded", function () {
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
    document.getElementById(`act${i}Section`).innerHTML = buildTableForAct(
      `Act ${i}`,
      data,
    );
  }

  /**
   * TLDR Table
   */
  document.getElementById("actTldrSection").innerHTML = buildTableForTLDR(data);

  const checkbox = document.getElementById("toggleAdditionalRewards");
  checkbox.addEventListener("change", function () {
    const isVisible = checkbox.checked;
    const additionalRewardCells =
      document.querySelectorAll(".additional-reward");
    additionalRewardCells.forEach((cell) => {
      cell.style.display = isVisible ? "" : "none";
    });
  });
  checkbox.dispatchEvent(new Event("change"));
});

/**
 * Collapse acts
 */
function collapseActDetails() {
  // Select all <summary> elements with an ID containing 'act'
  const summaries = document.querySelectorAll('summary[id*="act"]');

  // Loop through each summary
  summaries.forEach((summary) => {
    // Get the parent <details> element
    const details = summary.parentElement;

    // Check if the parent is a <details> element
    if (details && details.tagName === "DETAILS") {
      // Collapse the <details> element
      details.open = false;
    }
  });
}

/**
 * Expand acts
 */
function expandActDetails() {
  // Select all <summary> elements with an ID containing 'act'
  const summaries = document.querySelectorAll('summary[id*="act"]');

  // Loop through each summary
  summaries.forEach((summary) => {
    // Get the parent <details> element
    const details = summary.parentElement;

    // Check if the parent is a <details> element
    if (details && details.tagName === "DETAILS") {
      // Collapse the <details> element
      details.open = true;
    }
  });
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  // Find the index of the first alphabetic character
  const firstLetterIndex = string.search(/[a-zA-Z]/);
  if (firstLetterIndex === -1) return string; // Return original string if no alphabetic character is found

  // Capitalize the first alphabetic character and concatenate the rest of the string
  return (
    string.substring(0, firstLetterIndex) +
    string.charAt(firstLetterIndex).toUpperCase() +
    string.substring(firstLetterIndex + 1)
  );
}

function removeQuotes(string) {
  return string.replace(/["']/g, ""); // Removes both single and double quotes
}

const darkTheme = {
  primaryColor: "#0f0",
  secondaryColor: "#E52A01",
  backgroundColor: "#000",
  textColor: "#fff",
  linkVisitedColor: "#E52A01",
  linkColor: "#0F0",
  buttonBgColor: "#ccc",
  buttonHoverBgColor: "#ddd",
  buttonActiveBgColor: "#ccc",
  tableHeaderBgColor: "#5d3b8e",
  tableRowOddBgColor: "#412b58",
  tableRowEvenBgColor: "#1a1a1a",
  tableRowHoverBgColor: "#302244",
  accordionBgColor: "#777",
  accordionHoverBgColor: "#555",
  accordionContentBgColor: "#050505",
  debugBorderColor: "cyan",
  rulerBgColor: "#222",
  rulerBorderColor: "skyblue",
  overlayBgColor: "rgba(0,0,0,0.5)",
  tabBgColor: "#f1f1f1",
  tabBorderColor: "#ccc",
  tabContentBorderColor: "#ccc",
  topBtnBgColor: "red",
  topBtnHoverBgColor: "#555",
  collapsibleBgColor: "#777",
  collapsibleHoverBgColor: "#555",
  contentBgColor: "#050505",
  tableBgColor: "#1a1a1a",
  thBgColor: "#5d3b8e",
  trOddBgColor: "#412b58",
  trEvenBgColor: "#1a1a1a",
  trHoverBgColor: "#302244",
  tdBorderColor: "#333",
  rewardIconSize: "20px",
  styledButtonBgColor: "#302244",
  styledButtonHoverBgColor: "#45a049",
  styledButtonFontSize: "16px",
  dungeonBgColor: "#f1f1f1",
  header: "#FF8",
  focusImageTextColor: "#5a5a03",
};

const normalTheme = {
  primaryColor: "#3366cc", // More balanced primary color
  secondaryColor: "#cc6633", // More balanced secondary color
  backgroundColor: "#d6d6d6", // Darker grey background
  textColor: "#333333", // Softer black for text
  linkVisitedColor: "#6a3ab2", // Softer purple for visited links
  linkColor: "#1a0dab", // Standard but slightly less bright link color
  buttonBgColor: "#d9d9d9", // Standard grey for buttons
  buttonHoverBgColor: "#c2c2c2", // Standard grey for button hover
  buttonActiveBgColor: "#ababab", // Standard grey for button active state
  tableHeaderBgColor: "#b8a0d1", // More balanced header background
  tableRowOddBgColor: "#f2f2f2", // Slightly darker for odd rows
  tableRowEvenBgColor: "#ffffff", // White for even rows
  tableRowHoverBgColor: "#e6e6e6", // Standard grey for hover
  accordionBgColor: "#e6e6e6", // Standard light grey for accordion
  accordionHoverBgColor: "#d9d9d9", // Standard grey for accordion hover
  accordionContentBgColor: "#ffffff", // White content background
  debugBorderColor: "#333333", // Softer black for debug border
  rulerBgColor: "#ededed", // Slightly darker ruler background
  rulerBorderColor: "#bfbfbf", // Standard grey for ruler border
  overlayBgColor: "rgba(240,240,240,0.8)", // Slightly darker overlay
  tabBgColor: "#f5f5f5", // Slightly darker tab background
  tabBorderColor: "#d4d4d4", // Standard light grey for tab border
  tabContentBorderColor: "#c2c2c2", // Standard grey for tab content border
  topBtnBgColor: "#cc4c4c", // More balanced red for top button
  topBtnHoverBgColor: "#999999", // Standard grey for hover
  collapsibleBgColor: "#999999", // Standard medium grey
  collapsibleHoverBgColor: "#808080", // Darker grey for hover
  contentBgColor: "#ffffff", // White content background
  tableBgColor: "#ffffff", // White table background
  thBgColor: "#b8a0d1", // More balanced header background
  trOddBgColor: "#f7f7f7", // Almost white odd rows
  trEvenBgColor: "#ffffff", // White even rows
  trHoverBgColor: "#efefef", // Light grey for hover
  tdBorderColor: "#d4d4d4", // Standard light grey for table cells
  rewardIconSize: "20px", // Same icon size
  styledButtonBgColor: "#b8a0d1", // More balanced styled button background
  styledButtonHoverBgColor: "#a4c2a8", // More balanced green for hover
  dungeonBgColor: "#f5f5f5", // Slightly darker dungeon background
  header: "#6a6a3a", // More balanced header color
  focusImageTextColor: "#0000cc", // Standard blue, less bright
};

const lightTheme = {
  primaryColor: "#0055ff", // Example: a different primary color
  secondaryColor: "#ff5500", // Example: a different secondary color
  backgroundColor: "#f0f0f0", // Lighter background
  textColor: "#000", // Darker text for better readability
  linkVisitedColor: "#551a8b", // Darker shade for visited links
  linkColor: "#0000ee", // Standard link color
  buttonBgColor: "#e0e0e0", // Lighter button background
  buttonHoverBgColor: "#d0d0d0", // Slightly darker on hover
  buttonActiveBgColor: "#c0c0c0", // Even darker for active state
  tableHeaderBgColor: "#c3a5ec", // Lighter header background
  tableRowOddBgColor: "#e9e9e9", // Very light gray for odd rows
  tableRowEvenBgColor: "#f9f9f9", // Almost white for even rows
  tableRowHoverBgColor: "#dcdcdc", // Light gray for hover
  accordionBgColor: "#e2e2e2", // Light accordion background
  accordionHoverBgColor: "#d2d2d2", // Slightly darker on hover
  accordionContentBgColor: "#ffffff", // White content background
  debugBorderColor: "black", // More visible debug border
  rulerBgColor: "#eaeaea", // Light ruler background
  rulerBorderColor: "gray", // Visible ruler border
  overlayBgColor: "rgba(255,255,255,0.5)", // Light overlay
  tabBgColor: "#f1f1f1", // Light tab background
  tabBorderColor: "#ddd", // Light border for tabs
  tabContentBorderColor: "#ccc", // Light border for tab content
  topBtnBgColor: "red", // Light top button background
  topBtnHoverBgColor: "#555", // Slightly darker on hover
  collapsibleBgColor: "#777",
  collapsibleHoverBgColor: "#555",
  contentBgColor: "#ffffff", // White content background
  tableBgColor: "#ffffff", // White table background
  thBgColor: "#c3a5ec", // Very light header background
  trOddBgColor: "#f7f7f7", // Almost white odd rows
  trEvenBgColor: "#ffffff", // White even rows
  trHoverBgColor: "#efefef", // Light gray for hover
  tdBorderColor: "#ddd", // Light border for table cells
  rewardIconSize: "20px", // Same icon size
  styledButtonBgColor: "#c3a5ec", // Light styled button background
  styledButtonHoverBgColor: "#aae0ac", // Slightly darker on hover
  dungeonBgColor: "#fafafa", // Very light dungeon background
  header: "#5a5a03",
  focusImageTextColor: "blue",
};

let currentTheme = darkTheme; // Default to dark theme
function switchTheme(targetTheme) {
  const root = document.documentElement;
  // const themeSwitchButton = document.getElementById('theme-switch');

  if (targetTheme === "lightTheme") {
    currentTheme = lightTheme; // Update the current theme
    // themeSwitchButton.textContent = 'Switch to Light Theme';
  }
  if (targetTheme === "darkTheme") {
    currentTheme = darkTheme; // Update the current theme
  }
  if (targetTheme === "normalTheme") {
    currentTheme = normalTheme; // Update the current theme
  }

  root.style.setProperty("--primary-color", currentTheme.primaryColor);
  root.style.setProperty("--secondary-color", currentTheme.secondaryColor);
  root.style.setProperty("--background-color", currentTheme.backgroundColor);
  root.style.setProperty("--text-color", currentTheme.textColor);
  root.style.setProperty("--link-visited-color", currentTheme.linkVisitedColor);
  root.style.setProperty("--link-color", currentTheme.linkColor);
  root.style.setProperty("--button-bg-color", currentTheme.buttonBgColor);
  root.style.setProperty(
    "--button-hover-bg-color",
    currentTheme.buttonHoverBgColor,
  );
  root.style.setProperty(
    "--button-active-bg-color",
    currentTheme.buttonActiveBgColor,
  );
  root.style.setProperty(
    "--table-header-bg-color",
    currentTheme.tableHeaderBgColor,
  );
  root.style.setProperty(
    "--table-row-odd-bg-color",
    currentTheme.tableRowOddBgColor,
  );
  root.style.setProperty(
    "--table-row-even-bg-color",
    currentTheme.tableRowEvenBgColor,
  );
  root.style.setProperty(
    "--table-row-hover-bg-color",
    currentTheme.tableRowHoverBgColor,
  );
  root.style.setProperty("--accordion-bg-color", currentTheme.accordionBgColor);
  root.style.setProperty(
    "--accordion-hover-bg-color",
    currentTheme.accordionHoverBgColor,
  );
  root.style.setProperty(
    "--accordion-content-bg-color",
    currentTheme.accordionContentBgColor,
  );
  root.style.setProperty("--debug-border-color", currentTheme.debugBorderColor);
  root.style.setProperty("--ruler-bg-color", currentTheme.rulerBgColor);
  root.style.setProperty("--ruler-border-color", currentTheme.rulerBorderColor);
  root.style.setProperty("--overlay-bg-color", currentTheme.overlayBgColor);
  root.style.setProperty("--tab-bg-color", currentTheme.tabBgColor);
  root.style.setProperty("--tab-border-color", currentTheme.tabBorderColor);
  root.style.setProperty(
    "--tab-content-border-color",
    currentTheme.tabContentBorderColor,
  );
  root.style.setProperty("--top-btn-bg-color", currentTheme.topBtnBgColor);
  root.style.setProperty(
    "--top-btn-hover-bg-color",
    currentTheme.topBtnHoverBgColor,
  );
  root.style.setProperty(
    "--collapsible-bg-color",
    currentTheme.collapsibleBgColor,
  );
  root.style.setProperty(
    "--collapsible-hover-bg-color",
    currentTheme.collapsibleHoverBgColor,
  );
  root.style.setProperty("--content-bg-color", currentTheme.contentBgColor);
  root.style.setProperty("--table-bg-color", currentTheme.tableBgColor);
  root.style.setProperty("--th-bg-color", currentTheme.thBgColor);
  root.style.setProperty("--tr-odd-bg-color", currentTheme.trOddBgColor);
  root.style.setProperty("--tr-even-bg-color", currentTheme.trEvenBgColor);
  root.style.setProperty("--tr-hover-bg-color", currentTheme.trHoverBgColor);
  root.style.setProperty("--td-border-color", currentTheme.tdBorderColor);
  root.style.setProperty("--reward-icon-size", currentTheme.rewardIconSize);
  root.style.setProperty(
    "--styled-button-bg-color",
    currentTheme.styledButtonBgColor,
  );
  root.style.setProperty(
    "--styled-button-hover-bg-color",
    currentTheme.styledButtonHoverBgColor,
  );
  root.style.setProperty(
    "--styled-button-font-size",
    currentTheme.styledButtonFontSize,
  );
  root.style.setProperty("--dungeon-bg-color", currentTheme.dungeonBgColor);
  root.style.setProperty("--header", currentTheme.header);
  root.style.setProperty(
    "--focus-image-text-color",
    currentTheme.focusImageTextColor,
  );
}

const supporterPackData = [
  {
    series: "2024 Core",
    packs: [
      { name: "Kalguuran Runesmith", price: 60 },
      { name: "Shackled Immortal", price: 100 },
      { name: "Vaal Serpent-God", price: 160 },
      { name: "Karui Elemancer", price: 240 },
      { name: "Sandwraith Assassin", price: 480 },
    ],
  },
  // {
  //   "series": "Path of Exile 2",
  //   "packs": [
  //     { "name": "Early Access", "price": 30 },
  //     { "name": "Lord of Ogham", "price": 60 },
  //     { "name": "King of the Faridun", "price": 100 },
  //     { "name": "Thaumaturge of the Vaal", "price": 160 },
  //     { "name": "Warlord of the Karui", "price": 240 },
  //     { "name": "Liberator of Wraeclast", "price": 480 }
  //   ]
  // },
  {
    series: "2023 Core",
    packs: [
      { name: "Tormentor", price: 60 },
      { name: "Hellfire", price: 100 },
      { name: "Bloodthirsty", price: 160 },
      { name: "Chronomancer", price: 240 },
      { name: "Voidborn", price: 480 },
    ],
  },
  {
    series: "2022 Core",
    packs: [
      { name: "Imperator", price: 60 },
      { name: "Nullifier", price: 100 },
      { name: "Annihilator", price: 160 },
      { name: "Ravager", price: 240 },
      { name: "Incinerator", price: 480 },
    ],
  },
  {
    series: "2021 Core",
    packs: [
      { name: "Delve", price: 60 },
      { name: "Breach", price: 100 },
      { name: "Abyss", price: 160 },
      { name: "Harvest", price: 240 },
      { name: "Heist", price: 480 },
    ],
  },
  {
    series: "2020 Core",
    packs: [
      { name: "Orion", price: 60 },
      { name: "Basilisk", price: 100 },
      { name: "Hydra", price: 160 },
      { name: "Phoenix", price: 240 },
      { name: "Minotaur", price: 480 },
    ],
  },
  {
    series: "2019 Core",
    packs: [
      { name: "Sunspire", price: 60 },
      { name: "Doomguard", price: 100 },
      { name: "Crucible", price: 160 },
      { name: "Eyrie", price: 240 },
      { name: "Council", price: 480 },
    ],
  },
  {
    series: "2018 Core",
    packs: [
      { name: "Conquest", price: 60 },
      { name: "Crucible", price: 100 },
      { name: "Eyrie", price: 160 },
      { name: "Council", price: 240 },
      { name: "Empyrean", price: 480 },
    ],
  },
  {
    series: "2017 Core",
    packs: [
      { name: "Orion", price: 60 },
      { name: "Basilisk", price: 100 },
      { name: "Hydra", price: 160 },
      { name: "Phoenix", price: 240 },
      { name: "Minotaur", price: 480 },
    ],
  },
  {
    series: "2016 Core",
    packs: [
      { name: "Sunspire", price: 60 },
      { name: "Doomguard", price: 100 },
      { name: "Crucible", price: 160 },
      { name: "Eyrie", price: 240 },
      { name: "Council", price: 480 },
    ],
  },
  {
    series: "2015 Core",
    packs: [
      { name: "Conquest", price: 60 },
      { name: "Crucible", price: 100 },
      { name: "Eyrie", price: 160 },
      { name: "Council", price: 240 },
      { name: "Empyrean", price: 480 },
    ],
  },
  {
    series: "2014 Core",
    packs: [
      { name: "Orion", price: 60 },
      { name: "Basilisk", price: 100 },
      { name: "Hydra", price: 160 },
      { name: "Phoenix", price: 240 },
      { name: "Minotaur", price: 480 },
    ],
  },
  {
    series: "2013 Core",
    packs: [
      { name: "Sunspire", price: 60 },
      { name: "Doomguard", price: 100 },
      { name: "Crucible", price: 160 },
      { name: "Eyrie", price: 240 },
      { name: "Council", price: 480 },
    ],
  },
  {
    series: "Closed Beta (2012)",
    packs: [
      { name: "Kiwi Pack", price: 10 },
      { name: "Bronze Pack", price: 25 },
      { name: "Silver Pack", price: 50 },
      { name: "Gold Pack", price: 100 },
      { name: "Diamond Pack", price: 1000 },
    ],
  },
  {
    series: "Open Beta (2013)",
    packs: [
      { name: "Open Beta Supporter $10", price: 10 },
      { name: "Open Beta Supporter $25", price: 25 },
      { name: "Open Beta Supporter $50", price: 50 },
      { name: "Open Beta Supporter $100", price: 100 },
      { name: "Open Beta Supporter $250", price: 250 },
      { name: "Open Beta Supporter $1,000", price: 1000 },
    ],
  },
  {
    series: "2012",
    packs: [{ name: "Early Access", price: 10 }],
  },
];

const packList = document.getElementById("packList");
const totalCostElement = document.getElementById("totalCost");

// Calculate and update the total cost
function updateLifetimeTotal() {
  const checkboxes = document.querySelectorAll(
    "#supporterPackTable input[type='checkbox']",
  );
  let total = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      total += parseFloat(checkbox.dataset.price); // Use `pricePaid`
    }
  });

  const totalCostElement = document.getElementById("totalCost");
  if (totalCostElement) {
    totalCostElement.textContent = total.toFixed(2);
  }
}

function renderSupporterPackTable(data) {
  const tableContainer = document.getElementById("supporterPackTable");
  if (!tableContainer) {
    console.error("Container with ID 'supporterPackTable' not found!");
    return;
  }

  // Helper function to calculate price-paid based on the direct previous pack
  function calculatePricePaid(seriesPacks) {
    return seriesPacks.map((pack, index) => {
      const previousPrice = index > 0 ? seriesPacks[index - 1].price : 0;
      const pricePaid = pack.price - previousPrice;
      return { ...pack, pricePaid }; // Add pricePaid to the pack object
    });
  }

  const tableHtml = `
    <table>
        <thead>
            <tr>
                <th>Supporter Pack Series</th>
                <th>Pack Name</th>
                <th>Price (USD)</th>
                <th>Price Paid (USD)</th>
                <th>Select</th>
            </tr>
        </thead>
        <tbody>
            ${data
              .map((series) => {
                const packsWithPricePaid = calculatePricePaid(series.packs); // Adjust prices
                return packsWithPricePaid
                  .map(
                    (pack) => `
                    <tr onclick="toggleRowSelection(this)">
                        <td>${series.series}</td>
                        <td>${pack.name}</td>
                        <td>$${pack.price.toFixed(2)}</td>
                        <td>$${pack.pricePaid.toFixed(2)}</td>
                        <td><input type="checkbox" data-price="${pack.pricePaid}" onclick="event.stopPropagation()"></td>
                    </tr>
                `,
                  )
                  .join("");
              })
              .join("")}
        </tbody>
    </table>
`;

  tableContainer.innerHTML = tableHtml;
}

function toggleRowSelection(row) {
  const checkbox = row.querySelector("input[type='checkbox']");
  if (!checkbox) return;

  const isChecked = !checkbox.checked; // Determine if the row is being selected
  checkbox.checked = isChecked;

  // Get the current series
  const series = row.querySelector("td").textContent.trim(); // Assuming the series is in the first cell

  // Get all rows in the table
  const rows = Array.from(
    document.querySelectorAll(`#supporterPackTable tbody tr`),
  );

  // Filter rows belonging to the same series
  const seriesRows = rows.filter((r) => {
    const currentSeries = r.querySelector("td").textContent.trim();
    return currentSeries === series;
  });

  // Find the current row's index in the filtered rows
  const currentIndex = seriesRows.indexOf(row);

  // Select/Deselect this row and all rows before it in the series
  for (let i = 0; i <= currentIndex; i++) {
    const currentCheckbox = seriesRows[i].querySelector(
      "input[type='checkbox']",
    );
    if (currentCheckbox) {
      currentCheckbox.checked = isChecked; // Match the selection state
      if (isChecked) {
        seriesRows[i].classList.add("selected"); // Optional: Add selected styling
      } else {
        seriesRows[i].classList.remove("selected"); // Optional: Remove selected styling
      }
    }
  }

  // Update the total cost
  updateLifetimeTotal();
}
