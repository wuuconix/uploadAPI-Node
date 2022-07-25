<template>
    <div class="outerWrapper">
        <el-upload class="upload-demo" drag
            :action="apiURI"
            :on-success="handle_success"
            :on-error="handle_error"
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text"> 拖拽或者 <em>点击上传</em></div>
            <template #tip>
                <div class="el-upload__tip">支持10M以下的jpg或者png的图片</div>
            </template>
        </el-upload>
        <a :href="imgSrc">{{ imgSrc }}</a>
        <img :src="imgSrc">
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { apiURI } from '../../config/page'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const imgSrc = ref("")
function handle_success(res) {
    imgSrc.value = res.info.tempUrl
    ElMessage.success("上传成功")
}
function handle_error(res) {
    ElMessage.error(res)
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
}

html, body, #app, .outerWrapper {
    width: 100%;
    height: 100%;
}

.outerWrapper {
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.upload-demo {
    width: 800px;
    margin-top: -100px;
}

img {
    width: 500px;
}
</style>
