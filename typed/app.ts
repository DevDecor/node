import express from "express";

var app: express.Application = express();

app.get('/', (req: any, res: any) => {
    res.header("Content-Type", "application/json")
    res.send({ name: "OLASADISAM", id: 12, alert: `All is well!` })
})

app.listen(5000, () => console.log('port = 5000'));