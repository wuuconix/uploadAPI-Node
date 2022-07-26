import express from "express"
import multer from "multer"
import { statSync, createReadStream } from "node:fs"
import FormData from "form-data"
import fetch from "node-fetch"
import { userId, passport_ph, cookie, miGameLoginuuid, miGameToken } from "../config/api.mjs"

const upload = multer({ dest: "./uploads", limits: { fileSize: 1024 ** 2 * 10 }, fileFilter: (req, file, callback) => {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf-8')
    callback(null, true)
}})

/* 利用小米账户图片上传接口获得图片高速链接 */
async function uploadToMi(filename) {
    const path = `./uploads/${filename}`
    const { size } = statSync(path)
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
    }
    const response = await fetch("https://account.xiaomi.com:443/pass/auth/profile/requestUpload", options)
    const data = await response.json()
    return data
}

/* 小米游戏封面上传接口 */
async function uploadToMiGame(filename) {
    const path = `./uploads/${filename}`
    const { size } = statSync(path)
    const fileStream = createReadStream(path)
    const form = new FormData()
    form.append("file", fileStream, { knownLength: size, filename: `${filename}.jpg`, contentType: "image/jpeg" })
    const options = {
        method: 'POST',
        body: form,
        headers: {
            "Loginuuid": miGameLoginuuid, 
            "Token": miGameToken, 
        }
    }
    const response = await fetch("https://app.knights.mi.com:443/ksyun/api/upload/picture", options)
    console.log(response)
    console.log(response.status)
    console.log(response.statusText)
    const data = await response.json()
    return data
}

const app = express()

app.get("/", (req, res) => {
    res.json({msg: "hello"})
})

app.post('/upload', upload.single("file"), async (req, res) => {
    // console.log(req.file)
    // console.log(req.file?.originalname)
    const { Interface } = req.query
    let response = {}
    console.log(`Interfacae: ${Interface}`)
    try {
        if (Interface == 0) {
            const data = await uploadToMi(req.file.filename)
            console.log(data)
            const url = data.info.tempUrl
            response = { success: { message: "上传小米账号头像接口成功", url }, origin: data}
        } else if (Interface == 1) {
            const data = await uploadToMiGame(req.file.filename)
            console.log(data)
            const url = data.data.url
            response = { success: { message: "上传小米游戏帖子封面接口成功", url }, origin: data}
        }
    } catch(e) {
        response = { error: { message: e.toString() }}
    }
    console.log(response)
    res.json(response)
})

app.get('/upload', (req, res) => {
    res.json({msg: "post method required"})
})

app.listen(23333, "0.0.0.0", () => console.log("api run in http://127.0.0.1:23333"))