var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var cors = require("cors");

// Создание хранилища под файлы
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "../client/src/video");
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Подключение хранилища
var upload = multer({ storage: storage });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(cors());

// Роутер для загрузки файла
app.post("/", upload.single("file"), function(req, res, next) {
  res.sendStatus(200);
});

// Слушаем порт 3000
app.listen(3000, function() {
  console.log(".....");
});
