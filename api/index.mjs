import express from "express"
import multer from "multer"
import { useMiGame } from "./interfaces.mjs"

const upload = multer({ dest: "./uploads", limits: { fileSize: 1024 ** 2 * 10 }, fileFilter: (req, file, callback) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8')
    callback(null, true)
}})

const app = express()

app.get("/", (req, res) => {
    res.json({msg: "hello"})
})

app.post('/upload', upload.single("file"), async (req, res) => {
    const { Interface } = req.query
    let response = {}
    console.log(`Interfacae: ${Interface}`)
    try {
        if (Interface == 0) {
            const { origin, url, message } = await useMiGame(req.file.filename)
            response = { success: { message, url }, origin }
        } else {
            response = { error: { message: "接口未开放" }} 
        }
    } catch(e) {
        response = { error: { message: e.toString() }}
    }
    console.log(response)
    res.json(response)
})

app.get('/upload', (req, res) => {
    res.json({ msg: "post method required" })
})

app.get("/interfaces", (req, res) => {
    res.json(["小米游戏帖子封面接口"])
})

app.listen(23333, "0.0.0.0", () => console.log("api run in http://127.0.0.1:23333"))