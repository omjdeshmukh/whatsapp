// importing
import express from "express";
import mongoose from "mongoose";
import Messages from  './dbMessages';

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware

// DB config
const connection_url =
  "mongodb+srv://admin:rV4uX6oQW1fhysvO@cluster0.6yek2.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// api routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/api/v1/message/new", (req, res) => {
  const dbMessage = req.body;

  MessageChannel.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data} `);
    }
  });
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
