<template>
    <div class="outerWrapper">
        <el-upload class="upload-demo" drag
            :action="apiURI"
            multiple
        >
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text"> 拖拽或者 <em>点击上传</em></div>
            <template #tip>
                <div class="el-upload__tip">支持5M以下的jpg或者png的图片</div>
            </template>
        </el-upload>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { apiURI } from '../../config/page'

export default defineComponent({
    name: 'App',
    setup() {
        return {
            apiURI
        }
    }
})


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
    justify-content: center;
    align-items: center;
}

.upload-demo {
    width: 800px;
    margin-top: -100px;
}
</style>
