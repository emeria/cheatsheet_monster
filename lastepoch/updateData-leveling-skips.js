const fs = require('fs');

const csvFilePath = './data/leveling-skips.csv'; 
const jsFilePath = './script.js'; 

// Read the new CSV file
fs.readFile(csvFilePath, 'utf8', (err, newCsvData) => {
    if (err) {
        console.error("Failed to read CSV file:", err);
        return;
    }

    // Escape backticks in new CSV data
    const escapedCsvData = newCsvData.replace(/`/g, '\\`');

    // Read the JavaScript file
    fs.readFile(jsFilePath, 'utf8', (err, jsContent) => {
        if (err) {
            console.error("Failed to read JavaScript file:", err);
            return;
        }

        // Regex to find the rawData variable and replace its content
        const regex = /(let rawSkipData\s*=\s*`)[\s\S]*?(`;)/;
        const updatedJSContent = jsContent.replace(regex, `$1${escapedCsvData}$2`);

        // Write the updated content back to the JavaScript file
        fs.writeFile(jsFilePath, updatedJSContent, 'utf8', (err) => {
            if (err) {
                console.error("Failed to write to JavaScript file:", err);
            } else {
                console.log("JavaScript file successfully updated with new CSV data.");
            }
        });
    });
});