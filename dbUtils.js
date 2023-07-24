const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, 'db.json');

// Function to read data from the db.json file
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return [];
  }
};

// Function to write data to the db.json file
const writeDataToFile = (data) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(dbFilePath, jsonData, 'utf8');
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
};

module.exports = {
  readDataFromFile,
  writeDataToFile,
};
