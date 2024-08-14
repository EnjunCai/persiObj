<template>
  <h2>文件分片上传</h2>
  <h3>1、首先选择文件，获取选择文件的数据</h3>
  <h3>
    2、当点击开始上传的时候，对选择的文件进行分片，然后每一片都去执行一次请求存储起来
  </h3>

  <h2>断点续传</h2>
  <h3>
    1、在分片上传的基础上，加一个请求，请求后端是否存在这个文件的分片，并且没有完成，那么就拿到这些已上传的分片，然后过滤，上传未上传的分片
  </h3>

  <input type="file" @change="handleFileChange" />
  <button @click="uploadFile" :disabled="!file">Upload</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SparkMD5 from "spark-md5";

interface FileChunk {
  file: Blob;
  hash: string;
}

const CHUNK_SIZE = 1 * 1024 * 1024;
const file = ref<File | null>(null);
const uploadProgress = ref<number>(-1);

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    console.log(input.files[0]);

    file.value = input.files[0];
  }
};

const calculateHash = async (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const spark = new SparkMD5.ArrayBuffer();
      spark.append(reader.result as ArrayBuffer);
      resolve(spark.end());
    };
    reader.onerror = () => {
      reject(new Error("File read error."));
    };
    reader.readAsArrayBuffer(blob);
  });
};

const createChunks = async (file: File): Promise<FileChunk[]> => {
  const chunks: FileChunk[] = [];
  let current = 0;

  //   循环分片，将每一片定义一个hash和file
  while (current < file.size) {
    const chunk = file.slice(current, current + CHUNK_SIZE);
    const hash = await calculateHash(chunk);

    chunks.push({ file: chunk, hash });
    current += CHUNK_SIZE;
  }
  console.log(chunks);

  return chunks;
};
const uploadChunk = async (
  chunk: FileChunk,
  index: number,
  totalChunks: number
) => {
  const formData = new FormData();
  formData.append("file", chunk.file);
  formData.append("hash", chunk.hash);
  formData.append("index", String(index));
  formData.append("total", String(totalChunks));
  console.log(formData);
  console.log(formData.get("file"));
  //   await axios.post("http://localhost:3000/upload-chunk", formData, {
  //     onUploadProgress: (progressEvent) => {
  //       if (progressEvent.total) {
  //         uploadProgress.value = Math.round((index / totalChunks) * 100);
  //       }
  //     },
  //   });
};
const uploadFile = async () => {
  if (!file.value) return;

  //   const fileHash = await calculateHash(file.value);
  const chunks = await createChunks(file.value);
  const totalChunks = chunks.length;

  for (let i = 0; i < totalChunks; i++) {
    await uploadChunk(chunks[i], i, totalChunks);
  }

  //   await mergeChunks(fileHash, totalChunks);
  uploadProgress.value = 100;
  //   alert("Upload complete!");
};
</script>

<style></style>
