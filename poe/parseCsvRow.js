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

module.exports = parseCsvRow;
