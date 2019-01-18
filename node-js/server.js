const databaseFile = './.data/rbx-sqlite3-db003.db'; // If you need to reset EVERYTHING, you can change this.

const tables = [ // These are only created once, you cannot change them later unless you change the above value. Changing these without changing the database file can cause instability.
    "table1", // All tables have two rows, key and value
    "table2",
    "table3"
];

const ApiToken = "USE A PASSWORD GENERATOR"; // Highly recommended: https://www.grc.com/passwords.htm

const tableKeyLength = 150;
const tableValueLength = 3500;

const getAsyncAllowStar = true; // Allow "*" to be sent to the server to return all data from a table.

/*
  SETTINGS ABOVE
*/
var $stmt;
var fs = require('fs');

const sqlite3 = require('better-sqlite3');

var dbExists = fs.existsSync(databaseFile);
const Database = new sqlite3(databaseFile);
const json = JSON.stringify;

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
if (!dbExists) {
  /* fill database with tables */
  tables.forEach(function(v, i) {
    Database.prepare("CREATE TABLE "+v+" (key VARCHAR("+tableKeyLength+") PRIMARY KEY, value VARCHAR("+tableValueLength+") NOT NULL)").run();
  });
}
function isValidTable(tab) {
  return (tables.indexOf(tab) !== -1); // prepared statements don't allow you to specify a table, so we have to whitelist tables specified above.
}


app.delete("/deleteAsync", function(req, res) {
  if (req.headers["apitoken"] == ApiToken) {
    if (req.body.Key != null && req.body.Table != null) {
      if (isValidTable(req.body.Table)) {
        $stmt = Database.prepare("DELETE FROM `"+ req.body.Table +"` WHERE `key`=?");
        var data = $stmt.run(req.body.Key);
        res.status(200);
        res.send(json({
          Success: true,
          KeyDeleted: data.changes > 0
        }));
      } else {
        res.status(404);
        res.send(json({
          Success: false,
          Message: "Table doesn't exist"
        }));
      }
    } else {
      res.status(400);
      res.send(json({
        Success: false,
        Message: "Invalid request"
      }));
    }
  } else {
    res.status(403);
    res.send(json({
      Success: false,
      Message: "You are unauthorized to make requests to this host."
    }));
  }
});

app.post("/postAsync", function(req, res) {
  if (req.headers["apitoken"] == ApiToken) {
    if (req.body.Key != null && req.body.Value != null && req.body.Table != null) {
      if (isValidTable(req.body.Table)) {
        $stmt = Database.prepare("REPLACE INTO `"+ req.body.Table +"` (key, value) VALUES (?, ?)"); // Create value if not exist, change value if exist.
        var changes = $stmt.run(req.body.Key, req.body.Value).changes;
        res.status(200);
        res.send(json({
          Success: true,
          Changes: changes
        }));
      } else {
        res.status(404);
        res.send(json({
          Success: false,
          Message: "Table doesn't exist"
        }));
      }
    } else {
      res.status(400);
      res.send(json({
        Success: false,
        Message: "Invalid request"
      }));
    }
  } else {
    res.status(403);
    res.send(json({
      Success: false,
      Message: "You are unauthorized to make requests to this host."
    }));
  }
});

app.post("/getAsync", function(req, res) {
  if (req.headers["apitoken"] == ApiToken) {
    if (req.body.Key != null && req.body.Table != null) {
      if (isValidTable(req.body.Table)) {
        if (req.body.Key == "*" && getAsyncAllowStar) {
          $stmt = Database.prepare("SELECT * FROM `" + req.body.Table +"`");
          
          var data = $stmt.all();
          res.status(200);
          res.send(json({
            Success: true,
            ValueExists: data.length > 0,
            Value: data
          }));
        } else {
          $stmt = Database.prepare("SELECT * FROM `" + req.body.Table + "` WHERE `key`=?");
          var data = $stmt.get(req.body.Key);
          res.status(200);
          res.send(json({
            Success: true,
            ValueExists: (!data == null),
            Value: data
          }));
        }
      } else {
        res.status(404);
        res.send(json({
          Success: false,
          Message: "Table doesn't exist"
        }));
      }
    } else {
      res.status(400);
      res.send(json({
        Success: false,
        Message: "Invalid request"
      }));
    }
  } else {
    res.status(403);
    res.send(json({
      Success: false,
      Message: "You are unauthorized to make requests to this host."
    }));
  }
});

app.all("/", function(req, res) {
  res.send("Well, hello there Wanderer!");
});

var list = app.listen(process.env.PORT, function() {
  console.log('Server Online, Port ' + list.address().port);
});
