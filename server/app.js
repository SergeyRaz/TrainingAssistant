var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(express.static("public"));

app.use("/", function(req, res) {
  res.send(__dirname + "../client/index.html");
});

app.listen(3000, function() {
  console.log(".....");
});
