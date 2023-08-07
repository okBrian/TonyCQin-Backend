const fs = require("fs").promises;
// UPDATE EVERY HOUR

const apiKey = "?api_key=RGAPI-f269ccff-d965-484f-9c77-2b460b1ba117";

class Participant {
  constructor(username, tier, rank, LP, orderingScore, snapshotPoints = 0) {
    this.username = username;
    this.tier = tier;
    this.rank = rank;
    this.LP = LP;
    this.orderingScore = orderingScore;
    this.snapshotPoints = snapshotPoints;
  }
  static tierMap = new Map([
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
  static rankMap = new Map([
    ["IV", 100],
    ["III", 200],
    ["II", 300],
    ["I", 400],
  ]);
  static compareFn(a, b) {
    if (a.orderingScore > b.orderingScore) {
      return -1;
    }
    if (a.orderingScore < b.orderingScore) {
      return 1;
    }
    return 0;
  }
  addSnapshotPoints(n) {
    this.snapshotPoints += n;
  }
}

// function for getting stats of people
async function getStats(username) {
  const link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}${apiKey}`;
  // Anon Function to Fetch Data from API
  const fetchData = async (link) => {
    const response = await fetch(link);
    if (!response.ok) {
      throw new Error("Network response was not ok for link: " + link);
    }
    const data = await response.json();
    return data;
  };

  // Final Data to be returned
  let finalData;

  // Get Summoner ID
  await fetchData(link)
    .then(async (user) => {
      let statLink = `https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${user.id}${apiKey}`;

      // Get Summoner Stats
      await fetchData(statLink)
        .then(async (userData) => {
          finalData = userData;
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  return finalData[0];
}

// IF NECESSARY
async function readFile(filePath) {
  try {
    const data = await fs.readFile(filePath);
    let personJSON = JSON.parse(data.toString());
    personJSON.forEach((person) => {
      getStats(person.username)
        .then((user) => {
          const userScore =
            Participant.tierMap.get(user.tier) +
            Participant.rankMap.get(user.rank) +
            user.leaguePoints;
          person.tier = user.tier;
          person.rank = user.rank;
          person.LP = user.leaguePoints;
          person.orderingScore = userScore;
          let jsonData = JSON.stringify(personJSON);
          fs.writeFile("../../TonyCQin.github.io/tft.json", jsonData, function (err) {
            if (err) {
              return console.log(err);
            }
            console.log("The snapshotPoints were saved!");
          });
        })
        .catch((err) => console.log(err));
    });
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

readFile("../../TonyCQin.github.io/tft.json");
