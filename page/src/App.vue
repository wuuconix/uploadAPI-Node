<template>
    <div class="outerWrapper">
        <el-radio-group v-model="Interface">
            <el-radio v-for="(item, index) in list" :label="`${index}`" size="large" border>{{ item }}</el-radio>
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
import { ref, computed, onMounted } from 'vue'
import { baseURI } from '../../config/page'
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'

const Interface = ref("0")
const uploadURI = computed(() => `${baseURI}/upload?Interface=${Interface.value}`)
const imgSrc = ref("")
const up = ref(true)
const list = ref([])

onMounted(async () => {
    const response = await fetch(`${baseURI}/interfaces`)
    list.value = await response.json()
    Interface.value = new URL(location.href).searchParams.get("Interface") ?? "0"

})

function handle_success(res) {
    if (res.success) {
        imgSrc.value = res.success.url
        up.value = false
        ElMessage.success(res.success.message)
    } else if (res.error) {
        console.log(res.error)
        ElMessage.error("未知错误")
    }
}

function handle_error(res) {
    ElMessage.error(res)
}

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

.upload-demo {
    width: 800px;
}

.el-radio-group {
    margin-bottom: 20px;
}

.el-image {
    margin-top: 5px;
    max-height: 500px;
    min-height: 100px;
    border-radius: 5px;
}

</style>
