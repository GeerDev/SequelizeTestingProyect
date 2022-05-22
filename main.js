const express = require("express");
const app = express();
const port = 8080;

app.use(express.json())

app.use('/users',require('./routes/users'))
app.use('/posts',require('./routes/posts'))

app.listen(port, () => console.log("Server running in port " + port));
