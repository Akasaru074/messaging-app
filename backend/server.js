const express = require('express');
const app = express();
const PORT = 3000;

app.get("*", (req, resp)=>{
    resp.send("<h1>Hello world</h1>");
});

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}...`);
});