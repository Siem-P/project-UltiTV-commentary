
// Importeer express uit de node_modules map
import express from "express";
import bodyParser from "body-parser";
import fs from "fs"

// API URL's 
let rawGameData = fs.readFileSync("./private/api/game/943.json");
let rawStatsData = fs.readFileSync("./private/api/game/943/statistics.json");
let parsedGameData = JSON.parse(rawGameData);
let parsedStats = JSON.parse(rawStatsData);

const app = express();

app.set("view engine", "ejs");
app.set("views", "./view");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  // Lowercase country codes for flag API
  parsedGameData.team1CountryISO2Code = parsedGameData.team1CountryISO2Code.toLowerCase()
  parsedGameData.team2CountryISO2Code = parsedGameData.team2CountryISO2Code.toLowerCase() 
  res.render("index", {parsedGameData, parsedStats});
});


app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

// Function for fetching the API
async function fetchApi(url) {
  const data = await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
  return data;
}