import express from "express"
import multer from "multer"
import { statSync, createReadStream } from "node:fs"
import FormData from "form-data"
import fetch from "node-fetch"
import { userId, passport_ph, cookie } from "../config/api.mjs"

const upload = multer({ dest: "./uploads", limits: { fileSize: 1024 ** 2 * 10 }, fileFilter: (req, file, callback) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8')
    callback(null, true)
}})

/* 利用小米账户图片上传接口获得图片高速链接 */
async function uploadToMi(filename) {
    const path = `./uploads/${filename}`
    const { size } = statSync(path)
    console.log(size)
    const fileStream = createReadStream(path)
    const form = new FormData()
    form.append("userfile", fileStream, { knownLength: size, filename: `${filename}.jpg`, contentType: "image/jpeg" })
    form.append("userId", userId)
    form.append("passport_ph", passport_ph)
    form.append("usercenter_ph", "")
    form.append("passportsecurity_ph", "")
    form.append("passToken", "")
    
    const options = {
        method: 'POST',
        credentials: 'include',
        body: form,
        headers: {
            "Cookie": cookie,
            "Accept": "text/plain; charset=utf-8",
            "Sec-Ch-Ua": "\"Chromium\";v=\"103\", \".Not/A)Brand\";v=\"99\"",
        }
    };
    
    const response = await fetch("https://account.xiaomi.com:443/pass/auth/profile/requestUpload", options)
    const data = await response.json()
    return data
}

const app = express()

app.get("/", (req, res) => {
    res.json({msg: "hello"})
})

app.post('/upload', upload.single("file"), async (req, res) => {
    console.log(req.file)
    console.log(req.file?.originalname)
    const data = await uploadToMi(req.file.filename)
    console.log(data)
    res.json(data)
})

app.get('/upload', (req, res) => {
    res.json({msg: "post method required"})
})

app.listen(23333, "0.0.0.0", () => console.log("api run in http://127.0.0.1:23333"))