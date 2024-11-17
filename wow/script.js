// Token images centralized for easy updates
const tokenIcons = {
    "kiljaeden": "./kiljaeden-icon.png",
    "sargeras": "./sargeras-icon.png",
    "felArmament": "./fel-armament-icon.png",
    "arcaneTome": "./arcane-tome-icon.png",
    "firewing": "./firewing-icon.png",
    "sunfury": "./sunfury-icon.png",
};

// Dynamically set token images
document.getElementById("kiljaedenIcon").src = tokenIcons.kiljaeden;
document.getElementById("sargerasIcon").src = tokenIcons.sargeras;
document.getElementById("felArmamentIcon").src = tokenIcons.felArmament;
document.getElementById("arcaneTomeIcon").src = tokenIcons.arcaneTome;
document.getElementById("sunfuryIcon").src = tokenIcons.sunfury;
document.getElementById("firewingIcon").src = tokenIcons.firewing;

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

function calculateReputation() {
    const currentLevel = document.getElementById('currentReputationLevel').value;
    const pointsInCurrentLevel = parseInt(document.getElementById('pointsInCurrentLevel').value) || 0;
    const doubleMultiplier = document.getElementById('doubleMultiplier').checked;

    // Adjust token values based on multiplier
    const tokenGroups = {};
    for (const [key, value] of Object.entries(baseTokenGroups)) {
        tokenGroups[key] = {
            points: value.points * (doubleMultiplier ? 2 : 1),
            maxTier: value.maxTier
        };
    }

    let currentReputation = reputationLevels.find(level => level.name === currentLevel).points + pointsInCurrentLevel;
    let requiredReputation = 42000 - currentReputation;

    if (requiredReputation <= 0) {
        document.getElementById('results').innerHTML = `<p>You are already at Exalted!</p>`;
        return;
    }

    const tokensRequiredByRank = [];
    let totalTokens = {}; // Object to accumulate total tokens required
    let remainingReputation = requiredReputation;

    // Initialize totalTokens object with zero counts
    for (const token in tokenGroups) {
        totalTokens[token] = 0;
    }

    for (let i = 0; i < reputationLevels.length - 1 && remainingReputation > 0; i++) {
        const currentTier = reputationLevels[i];
        const nextTier = reputationLevels[i + 1];

        if (currentReputation >= nextTier.points) continue;

        const rankReputationNeeded = Math.min(remainingReputation, nextTier.points - currentReputation);

        const tokensForTier = {};
        for (const [group, data] of Object.entries(tokenGroups)) {
            if (data.maxTier === "honored" && nextTier.name !== "friendly" && nextTier.name !== "honored") {
                tokensForTier[group] = "Not usable";
            } else {
                const tokensNeeded = Math.ceil(rankReputationNeeded / data.points);
                tokensForTier[group] = tokensNeeded;

                // Add to the total count if usable
                if (tokensNeeded !== "Not usable") {
                    totalTokens[group] += tokensNeeded;
                }
            }
        }

        tokensRequiredByRank.push({ rank: nextTier.name, tokens: tokensForTier });
        remainingReputation -= rankReputationNeeded;
        currentReputation = nextTier.points;
    }

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
        <p>Current Reputation: ${currentReputation - remainingReputation} / 42000 (Exalted)</p>
        <p>Reputation Needed: ${requiredReputation}</p>
        ${tokensRequiredByRank
            .map(
                ({ rank, tokens }) => `
                <h3>Tokens Required for ${rank.charAt(0).toUpperCase() + rank.slice(1)}:</h3>
                ${Object.entries(tokens)
                    .map(([key, value]) => `<p>${key}: ${value}</p>`)
                    .join("")}
            `
            )
            .join("")}
        <h3>Total Tokens Required:</h3>
        ${Object.entries(totalTokens)
            .map(([key, value]) => `<p>${key}: ${value}</p>`)
            .join("")}
    `;
}
