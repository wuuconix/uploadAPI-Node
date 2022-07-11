import express from "express"
import multer from "multer"

const upload = multer({ dest: "./uploads"})
const app = express()

app.get("/", (req, res) => {
    res.json({msg: "hello"})
})

app.post('/upload', upload.single("file"), (req, res) => {
    console.log(req.file)
    res.json({ok: "ok"})
})

app.listen(23333, "0.0.0.0", () => console.log("api run in http://127.0.0.1:23333"))