// THIS IS THE BACKEND FILE FOR THE RASPBERRY PI VERSION OF "TonyCQin.github.io"

const fs = require("fs").promises;
module.exports.path = "../TonyCQin.github.io/tft.json"
module.exports.tierMap = new Map([
    ["IRON", 1000],
    ["BRONZE", 2000],
    ["SILVER", 3000],
    ["GOLD", 4000],
    ["PLATINUM", 5000],
    ["DIAMOND", 6000],
    ["MASTER", 7000],
    ["GRANDMASTER", 7000],
    ["CHALLENGER", 7000],
  ]);
  module.exports.rankMap = new Map([
    ["IV", 100],
    ["III", 200],
    ["II", 300],
    ["I", 400],
  ]);

// Fetch Data from a API Link
module.exports.fetchData = async (link) => {
  const response = await fetch(link);
  if (!response.ok) {
    throw new Error("Network response was not ok for link: " + link);
  }
  const data = await response.json();
  return data;
};

// Fetch the API Key from the config file
module.exports.fetchAPIKey = async () => {
  const data = await fs.readFile("config.json", (err) => {
    if (err) {
        return console.error("Error reading the file:" , err);
    }
  });
  return JSON.parse(data).API_KEY;
}

