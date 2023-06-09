const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const client = require("../connection/connection");

router.use(bodyParser.json());

router.use((req, res, next) => {
  console.log("Time : ", Date.now());
  next();
});

router.get("/", (req, res) => {
  client.query(`SELECT * FROM humidity ORDER BY id_thermo`, (err, result) => {
    if (!err) {
      res.send(result.rows);
    }
  });
});

router.post("/", (req, res) => {
  const { id_thermo, suhu, kelembaban } = req.body;
  client.query(
    `INSERT INTO humidity
  (id_thermo, suhu, kelembaban) VALUES
  ('${id_thermo}', '${suhu}', '${kelembaban}')`,
    (err) => {
      if (id_thermo < 1) {
        res.status(402).json({ error: "id Thermometer must greater then 0" });
      } else {
        res.send("Insert Thermometer Succes");
      }
    }
  );
});

router.put("/:id", (req, res) => {
  const { id_thermo, suhu, kelembaban } = req.body;
  client.query(
    `UPDATE humidity
  SET suhu = '${suhu}', kelembaban = '${kelembaban}' 
  WHERE id_thermo = ${req.params.id_thermo}`,
    (err) => {
      if (!err) {
        res.send("Update Thermometer Succes");
      } else {
        res.send(err.message);
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  client.query(
    `DELETE FROM humidity WHERE id_thermo = '${req.params.id_thermo}'`,
    (err) => {
      if (!err) {
        res.send("Delete Thermometer Succes");
      } else {
        res.send(err.message);
      }
    }
  );
});

module.exports = router;
