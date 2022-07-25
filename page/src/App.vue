<template>
    <div class="outerWrapper" :class="{up}">
        <el-radio-group v-model="Interface">
            <el-radio label="0" size="large" border>小米账号头像接口</el-radio>
            <el-radio label="1" size="large" border>小米游戏帖子封面接口</el-radio>
        </el-radio-group>
        <el-upload class="upload-demo" drag
            :action="uploadURI"
            :on-success="handle_success"
            :on-error="handle_error"
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text"> 拖拽或者 <em>点击上传</em></div>
            <template #tip>
                <div class="el-upload__tip">支持10M以下的jpg或者png的图片</div>
            </template>
        </el-upload>
        <el-link type="primary" :href="imgSrc">{{ imgSrc }}</el-link>
        <el-image :src="imgSrc" :preview-src-list="[imgSrc]"/>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { apiURI } from '../../config/page'
import { componentSizes, ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const Interface = ref("0")
const uploadURI = computed(() => `${apiURI}?Interface=${Interface.value}`)
const imgSrc = ref("")
const up = ref(true)

onMounted(() => {
    Interface.value = new URL(location.href).searchParams.get("Interface") ?? "0"
})

function handle_success(res) {
    if (res.success) {
        imgSrc.value = res.success.url
        ElMessage.success(res.success.message)
    } else if (res.error) {
        console.log(res.error)
        ElMessage.error("未知错误")
    }
}

function handle_error(res) {
    ElMessage.error(res)
}

watch(imgSrc, src => {
    up.value = src != "" ? false : true
})

</script>

<style>
* {
    margin: 0;
    padding: 0;
}

html, body, #app, .outerWrapper {
    width: 100%;
    height: 100%;
}

#app {
    background-color: aliceblue;
}

.outerWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    overflow-x: hidden;
}

.up {
    transform: translateY(-100px);
}

.upload-demo {
    width: 800px;
}

.el-radio-group {
    margin-bottom: 20px;
}

.el-image {
    margin-top: 5px;
    max-height: 500px;
}
</style>
