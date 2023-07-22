// dbUtils.js

const fs = require('fs');
const path = require('path');

const dbFilePath = path.resolve(__dirname, 'db.json');

// Function to read and parse the JSON data from db.json
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If the file does not exist or is empty, return an empty array
    return [];
  }
};

// Function to write and save the JSON data to db.json
const writeDataToFile = (data) => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    throw new Error('Unable to write data to the file.');
  }
};

module.exports = {
  readDataFromFile,
  writeDataToFile,
};
