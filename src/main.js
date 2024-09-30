const fs = require('fs');
const { convertBase } = require('./utils');
const { lagrangeInterpolation } = require('./polynomial');

// Read JSON file
fs.readFile('test_cases.json', 'utf8', (err, data) => {
    if (err) throw err;
    
    // Log the raw data read from the file
    console.log("Raw data from test_cases.json:", data);
    
    const testCases = JSON.parse(data);
    
    // Log the parsed JSON object
    console.log("Parsed testCases object:", testCases);

    for (const [testCaseName, testCase] of Object.entries(testCases)) {
        const { n, k, keys } = testCase;

        let points = [];
        for (const key in keys) {
            if (key !== "n" && key !== "k") { // Skip n and k
                const base = parseInt(keys[key].base);
                const value = convertBase(keys[key].value, base);
                points.push([parseInt(key), value]);
            }
        }
        
        // Log the points being used for interpolation
        console.log(`Points for ${testCaseName}:`, points);

        // Find constant term c using Lagrange Interpolation
        const secret = lagrangeInterpolation(points);
        console.log(`Secret for ${testCaseName}: ${secret}`);

        // Identify wrong points if applicable
        if (n > k) {
            let wrongPoints = [];
            points.forEach(([x, y]) => {
                let calculatedY = lagrangeInterpolation(points.filter(([px]) => px !== x));
                if (calculatedY !== y) {
                    wrongPoints.push([x, y]);
                }
            });
            console.log(`Wrong points in ${testCaseName}: ${JSON.stringify(wrongPoints)}`);
        }
    }
});
