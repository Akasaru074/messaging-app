const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

const messages = [{
    uuid: crypto.randomUUID(),
    content: 'First message'
}];

app.use(express.json());

app.get("/api/messages", async(_, resp)=>{
    resp.send(messages);
});

app.post("/api/messages", async(req, resp)=>{

    if (!req.body || !req.body.content) return resp.sendStatus(400);
    const uuid = crypto.randomUUID();
    const content = req.body.content;
    
    messages.push({uuid: uuid, content: content});
    resp.status(200).send(`UUID: ${uuid}, content: ${content}`);

});

app.use(express.static(__dirname + "/public/"));

app.get('*', (_, resp) => {
  resp.status(404).sendFile(__dirname + "/notFound.html");
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}...`);
});