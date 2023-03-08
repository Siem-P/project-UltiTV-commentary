
// Importeer express uit de node_modules map
import express, { json, urlencoded } from "express";
import bodyParser from "body-parser";
import fs from "fs"

// API URL
const url = "https://whois.fdnd.nl/api/v1/squad/";

let jsonData = fs.readFile('./public/api/game/943.json', 'utf8', handleJsonData);

function handleJsonData(err, data) {
  if (err) {
    console.error(err);
    return;
  }
  let jsonData = JSON.parse(data);
}

console.log(jsonData);

const app = express();

app.set("view engine", "ejs");
app.set("views", "./view");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index");
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