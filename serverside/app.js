const express = require("express");
const bodyParser = require("body-parser");
const app = express();


const mongoose = require("mongoose");
const Student = require("./models/student");
mongoose
  .connect("mongodb://localhost:27017/IT6203", { useNewUrlParser: true })
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error connecting");
  });


app.use((req, res, next) => {
  console.log("This line is always called");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, OPTIONS, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/students", (req, res, next) => {
  Student.find()
    .then(data => res.status(200).json(data))
    .catch(err => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
});

app.get("/students/:id", (req, res, next) => {
  Student.findById(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

app.post("/students", (req, res, next) => {
  const student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  student
    .save()
    .then(() => {
      console.log("Success");
      res.status(200).json();
    })
    .catch(err => {
      console.log("Error:" + err);
    });
});

app.put("/students/:id", (req, res, next) => {
  console.log("id: " + req.params.id);
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Student.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }
      },
      { new: true }
    )
      .then(student => {
        if (student) {
          console.log(student);
          res.status(204).json();
        } else {
          console.log("no data exist for this id");
          res.status(404).json();
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json();
      });
  } else {
    console.log("please provide correct id");
  }
});

app.delete("/students/:id", (req, res, next) => {
  Student.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(204).json("Deleted!");
  });
});

module.exports = app;
