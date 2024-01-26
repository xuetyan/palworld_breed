<template>
  <div class="main">
    <div class="left">
      <div class="search_box">
        <el-input v-model="searchText" placeholder="输入名称或编号搜索" clearable />
      </div>
      <div class="seeds_box">
        <div v-for="seed in newSeeds" :key="seed.seed_id" class="img_box">
          <div class="seed_img" :style="{ backgroundImage: `url(${''&&seed.img})` }" @click="dropSeed(seed)">
            <div v-show="disabledSeed(seed)" class="check_mask" />
          </div>
          <div class="seed_name">
            {{ `${seed.seed_id}.${seed.name}` }}
          </div>
        </div>
      </div>
    </div>

    <!-- 培育推荐 -->
    <div class="right">
      <div class="search_box">
        <el-input v-model="pa1" style="width: 30%;" placeholder="输入名称或编号搜索 (父本1)" clearable />
        <el-input v-model="pa2" style="width: 30%;" placeholder="输入名称或编号搜索 (父本2)" clearable />
        <el-input v-model="targetSeed" style="width: 30%;" placeholder="输入名称或编号搜索 (目标)" clearable />
      </div>
      <div class="seeds_box">
        <div v-for="(breed, bIndex) in breedResult" :key="bIndex" class="breed_box">
          <el-icon style="color: #303133;font-size: 14px;">
            <Connection />
          </el-icon>
          <div class="breed_block">
            <div class="breed_content parent_1" :style="{ backgroundImage: `url(${''&&breed?.s1_img})`, '--shoadow-color': dropSeeds.has(breed.s1)?'#f76b6c':'#303133'}" />
            <div class="seed_name">
              {{ `${breed.s1}.${breed.s1_name}` }}
            </div>
          </div>
          <div class="plus">
            +
          </div>
          <div class="breed_block">
            <div class="breed_content parent_2" :style="{ backgroundImage: `url(${''&&breed?.s2_img})`, '--shoadow-color': dropSeeds.has(breed.s2)?'#f76b6c':'#303133' }" />
            <div class="seed_name">
              {{ `${breed.s2}.${breed.s2_name}` }}
            </div>
          </div>
          <div class="equals">
            =
          </div>
          <div class="breed_block">
            <div class="breed_content child" :style="{ backgroundImage: `url(${''&&breed?.ret_img})`, '--shoadow-color': '#303133' }" />
            <div class="seed_name">
              {{ `${breed.ret}.${breed.ret_name}` }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"

import request from "../utils/request"
import { o } from "../utils/t"

const breedData = {
  s1: 0,
  s2: 0,
  ret: 0,
  size: 2000,
  page: 1
}

// 帕鲁图鉴
const seeds = ref([])
// 帕鲁繁育
const allBreed = ref([])
// 搜索文本
const searchText = ref("")
// 禁选的seed
const dropSeeds = ref(new Set())
// 父本
const pa1 = ref("")
const pa2 = ref("")
// 目标帕鲁
const targetSeed = ref("")
// 分页
const page = ref(0)
const size = ref(20)
let timeout = null

onMounted(() => {
  const localData = window.localStorage.getItem('PAL')
  if(localData) {
    dropSeeds.value = new Set(JSON.parse(localData).map(m => String(m)))
  }

  request("palworld/get-breed", {
    method: "POST",
    dataType: "json",
    data: o(breedData)
  }).then(({ data }) => {
    allBreed.value = data.data.rows
  })

  request("palworld/get-seed", {
    method: "POST",
    dataType: "json",
    data: o({ timestamp: +new Date() })
  }).then(({ data }) => {
    seeds.value = data.data.sort((a, b) => a.seed_id - b.seed_id)
  })

  lazyRight()
})

const newSeeds = computed(() => {
  const list = seeds.value
  for (const seed of list) {
    seed.img =
      allBreed.value.find((d) => d.ret === seed.seed_id)?.ret_img ??
      allBreed.value.find((d) => d.s1 === seed.seed_id)?.s1_img ??
      allBreed.value.find((d) => d.s2 === seed.seed_id)?.s2_img
  }
  if (searchText.value && searchText.value !== 0) {
    return list.filter(
      (f) =>
        f.name.includes(searchText.value) ||
        String(f.seed_id) === searchText.value
    )
  }
  return list
})

// 繁育结果列表
const breedResult = computed(() => {
  let list = allBreed.value.filter((f) => {
    return (f.ret_name.includes(targetSeed.value) || String(f.ret) === targetSeed.value) && // 结果搜索
      (f.s1_name.includes(pa1.value) || String(f.s1) === pa1.value) && // 父本1
      (f.s2_name.includes(pa2.value) || String(f.s2) === pa2.value) // 父本1
  })
  const count = (page.value + 1) * size.value
  list = list.slice(0, count)

  return list
})

watch(breedResult, () => {
  page.value = 0
}, { deep: true })

// 监听滚动条
const lazyRight = () => {
  const dom = document.querySelector(".right")
  dom.addEventListener("scroll", (e) => {
    if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 12) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(() => {
        page.value++
      }, 120)
    }
  })
}

// 禁用图鉴
const dropSeed = (seed) => {
  if(dropSeeds.value.has(seed.seed_id)) {
    dropSeeds.value.delete(seed.seed_id)
  } else {
    dropSeeds.value.add(seed.seed_id)
  }
}

watch(dropSeeds, () => {
  window.localStorage.setItem('PAL', JSON.stringify([...dropSeeds.value]))
}, { deep: true })

const disabledSeed = (seed) => {
  return dropSeeds.value.has(seed.seed_id)
}
</script>

<style>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 6px;
}

.left,
.right {
  width: 36%;
  display: flex;
  flex-wrap: nowrap;
  margin-top: 12px;
  position: relative;
  height: calc(100% - 12px);
  flex-direction: column;
  overflow-y: auto;
}

.search_box {
  position: sticky;
  top: 0;
  height: 38px;
  width: 100%;
  background-color: #fff;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 6px;
}

.seeds_box {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
}

.img_box {
  padding: 8px;
  width: 20%;
  overflow: hidden;
}

.seed_img {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 6px;
  overflow: hidden;
  background: no-repeat center / contain;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  position: relative;
  cursor: pointer;
}

.check_mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.seed_name {
  margin-top: 2px;
  font-size: 14px;
  color: #303133;
}

.right {
  width: 0;
  flex-grow: 1;
}

.breed_box {
  position: relative;
  background-color: rgba(0, 0, 0, 0.08);
  width: calc(50% - 24px);
  height: fit-content;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 12px 6px;
  padding: 12px 0;
  border-radius: 12px;
}

.el-icon {
  position: absolute !important;
  top: 4px;
  right: 4px;
}

.breed_content {
  width: 76px;
  height: 76px;
  border-radius: 6px;
  background: no-repeat center / contain;
  /* box-shadow: 0 0 4px rgba(0, 0, 0, 0.4); */
  box-shadow: 0 0 4px var(--shoadow-color);
}
</style>
