import express from "express";
import cors from "cors";
import indexRouter from "./routes/index"

const app = express();

app.use(cors())
app.use(express.json())


app.use('/api', indexRouter)


let PORT = 3000;
app.listen(PORT, () => {
    console.log(`Service running port... : ${PORT}`)
})
