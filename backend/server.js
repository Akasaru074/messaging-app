const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

const messages = [];

app.use(express.json());

app.get("/api/messages", async(_, resp)=>{
    resp.send(messages);
});

app.post("/api/messages", async(req, resp)=>{

    if (!req.body || !req.body.content) return resp.sendStatus(400);
    const uuid = crypto.randomUUID();
    const author = req.body.author;
    const content = req.body.content;
    const date = new Date(new Date().toLocaleString("russian", {timeZone: "Asia/Vladivostok"}));
    const message = {
        "uuid": uuid,
        "author": author,
        "content": content,
        "date": `${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours() < 10 ? '0' : ''}${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`
    }

    messages.push(message); 
    resp.status(200).send(message);

});

app.use(express.static(__dirname + "/public/"));

app.get('*', (_, resp) => {
  resp.status(404).sendFile(__dirname + "/notFound.html");
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}...`);
});