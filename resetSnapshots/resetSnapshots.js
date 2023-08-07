const fs = require("fs").promises;
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    let personJSON = JSON.parse(data.toString());
    const len = personJSON.length;
    for (let i = 0; i < len; i++) {
      personJSON[i].snapshotPoints = 0;
    }
    let jsonData = JSON.stringify(personJSON);
    fs.writeFile("./tft.json", jsonData, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The snapshotPoints were saved!");
    });
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

readFile("../../tft.json");