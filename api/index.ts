import express from "express"
import multer from "multer"

const upload = multer({ dest: "./uploads", limits: { fileSize: 1024 ** 2 * 5 }})
const app = express()

app.get("/", (req, res) => {
    res.json({msg: "hello"})
})

app.post('/upload', upload.single("file"), (req, res) => {
    console.log(req.file)
    console.log(req.file?.originalname)
    res.json({ok: "ok"})
})

app.get('/upload', (req, res) => {
    res.json({msg: "post method required"})
})

app.listen(23333, "0.0.0.0", () => console.log("api run in http://127.0.0.1:23333"))