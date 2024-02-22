const fs = require('fs');

const blessingsCsvFilePath = './data/le_blessings.csv'; 
const jsFilePath = './script.js'; 


fs.readFile(blessingsCsvFilePath, 'utf8', (err, newCsvData) => {
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

        // console.log(jsContent);
        // Regex to find the rawData variable and replace its content
        const regex = /(let blessingsRawData\s*=\s*`)[\s\S]*?(`;)/;
        const updatedJSContent = jsContent.replace(regex, `$1${escapedCsvData}$2`);
        // console.log('into');
        // console.log(updatedJSContent);
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

