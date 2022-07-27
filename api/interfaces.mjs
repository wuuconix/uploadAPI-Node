import { statSync, createReadStream } from "node:fs"
import FormData from "form-data"
import { userId, passport_ph, cookie, miGameLoginuuid, miGameToken } from "../config/api.mjs"
import fetch from "node-fetch"

/* 利用小米账户图片上传接口获得图片高速链接 */
async function useMiAccount(filename) {
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
    const url = data.info.tempUrl
    return { origin: data, url, message: "上传小米账号头像接口成功" }
}

/* 小米游戏封面上传接口 */
async function useMiGame(filename) {
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
    const url = data.data.url
    return { origin: data, url, message: "上传小米游戏帖子封面接口成功" }
}

export { useMiAccount, useMiGame }