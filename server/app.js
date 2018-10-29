const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const videoFolder = "../client/src/video";

// Создание хранилища под файлы
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../client/src/video");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Подключение хранилища
const upload = multer({ storage: storage });

// Решение проблемы с Access-Control-Allow-Origin---------------------------------------------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
//
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:8080" }));
// Роутер для загрузки файла
app.post("/", upload.single("file"), function(req, res, next) {
  res.sendStatus(200);
  res.end;
});

// Читаем файлы и передаем на клиент
app.get("/nameFiles", function(req, res) {
  fs.readdir(videoFolder, function(err, files) {
    res.json(files);
  });
});

// Слушаем порт 3000
app.listen(3000, function() {
  console.log(".....");
});
