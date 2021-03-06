// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Data========================================================
// Routes
// =============================================================
// * The following HTML routes should be created:

//   * GET `/notes` - Should return the `notes.html` file.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

// * The application should have a `db.json` file on the backend that
// will be used to store and retrieve notes using the`fs` module.

var rawData = fs.readFileSync("./db/db.json") || [];
var notes = JSON.parse(rawData);

var lastId = notes.length || 0;

// * The following API routes should be created:

//   * GET `/api/notes` - Should read the `db.json` file
// and return all saved notes as JSON.
app.get("/api/notes", async (req, res) => {
  res.json(notes);
});

//   * POST `/api/notes` - Should receive a
// new note to save on the request body, add it to the`db.json`
// file, and then return the new note to the client.
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  res.json(newNote);
  var lastId = notes.length || 0;
  newNote.id = lastId;
  console.log(newNote.id);
  notes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(notes));
  return newNote;
});
// * DELETE `/api/notes/:id` - Should receive a query parameter
// containing the id of a note to delete.This means you'll need
// to find a way to give each note a unique`id` when it's saved.
// In order to delete a note, you'll need to read all notes from
// the`db.json` file, remove the note with the given`id` property,
// and then rewrite the notes to the`db.json` file.
app.delete("/api/notes/:id", function (req, res) {
  const requestId = req.params.id;
  notes.splice(requestId, 1);
  res.send("/notes");
});
// * GET `*` - Should return the `index.html` file
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
////// listen function to start listening
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
  console.log(notes);
});
