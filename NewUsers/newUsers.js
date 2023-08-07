const fs = require("fs").promises;
// UPDATE EVERY HOUR
class Participant {
  static tierMap = new Map([
    ["IRON", 1000],
    ["BRONZE", 2000],
    ["SILVER", 3000],
    ["GOLD", 4000],
    ["PLATINUM", 5000],
    ["DIAMOND", 6000], 
    ["MASTER", 7000],
    ["GRANDMASTER", 7000],
    ["CHALLENGER", 7000]
  ]);
  static rankMap = new Map([
    ["IV", 100],
    ["III", 200],
    ["II", 300],
    ["I", 400]
  ])
  constructor(username, tier, rank, LP, orderingScore, snapshotPoints = 0) {
    this.username = username;
    this.tier = tier;
    this.rank = rank;
    this.LP = LP;
    this.orderingScore = orderingScore;
    this.snapshotPoints = snapshotPoints;
  }
  tierMapping(tier) {
    return tierMap[tier];
  }
  rankMapping(rank) {
    rankMap(rank);
  }
  static compareFn(a, b) {
    if (a.orderingScore > b.orderingScore) {
      return -1;
    }
    if (a.orderingScore < b.orderingScore) {
      return 1;
    }
    return 0;
  }
}

const apiKey = "?api_key=RGAPI-3a0c6c96-05a4-44c9-97e5-c5850421f33b";

async function readFileToList(filePath) {
  try {
    const data = await fs.readFile(filePath);
    return data.toString().split(' ');
    
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

// function for getting stats of people
async function getStats(username) {
  const link = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}${apiKey}`;
  // console.log(link);
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
      let statLink =
        `https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${user.id}${apiKey}`;

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

// adding people to the leaderboard.
readFileToList("playerList.txt")
  .then((playerList) => {
    let playerListWithStats = [];
    playerList.forEach(function (person) {
      getStats(person)
        .then((user) => {
          const userMap = new Map();
          const userScore =
          Participant.tierMap.get(user.tier) + Participant.rankMap.get(user.rank) + user.leaguePoints;
          userMap.set(user.summonerName, [
            user.tier,
            user.rank,
            user.leaguePoints,
            userScore,
          ]);
          let player = new Participant(
            user.summonerName,
            user.tier,
            user.rank,
            user.leaguePoints,
            userScore
          );
          playerListWithStats.push(player);
    
          // sorting the array
          if (playerListWithStats.length == playerList.length) {
            playerListWithStats.sort(Participant.compareFn);
            // console.log(playerListWithStats);
    
            // saving data in JSON
            let jsonData = JSON.stringify(playerListWithStats);
            // console.log(jsonData);
    
            // writing to json file
            fs.writeFile("../tft.json", jsonData, function (err) {
              if (err) {
                return console.log(err);
              }
              console.log("The summonerStats were saved!");
            });
            return jsonData;
          }
        })
        .catch((err) => console.log(err));
    });
  })

