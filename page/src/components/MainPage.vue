<template>
  <div class="main full">
    <el-row class="h-full" :gutter="12">
      <el-col class="h-full" :span="9">
        <div class="full container bg">
          <SearchComponent class="head" :list="palData" @search="search" />
          <ResultComponent class="body" v-model="result1" @select="getParentBreed" />
        </div>
      </el-col>
      <el-col class="h-full" :span="9">
        <div class="full bg">
          <ResultComponent class="body" v-model="result2" @select="confirmParentBreed" />
        </div>
      </el-col>
      <el-col class="h-full" :span="6">
        <div class="full bg">
          <BreedTree ref="btRef" v-model="breedTree" v-model:selected="breedTreeNode" @changeSelected="selectTreeNode" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { onMounted, ref, useTemplateRef } from 'vue'
import { getPalData, getBreedData } from '../utils/request'
import breedDataOrigin from '../assets/data/breed1'
import palData, {originData} from '../assets/data/pal1'

import SearchComponent from './SearchComponent.vue'
import ResultComponent from './ResultComponent.vue'
import BreedTree from './BreedTree.vue'

// import { isEmpty } from '../utils/index'

// getPalData()
// getBreedData().then(res => {
//   console.log(res);
// })

// const palData1 = originData.map(m=> {
//   return {
//     id: m.number,
//     name: m.name
//   }
// })
// console.log(palData1);

// 过滤塔主
// const breedData = JSON.parse(JSON.stringify(breedDataOrigin.filter(({ s1_sign, s2_sign }) => !s1_sign.includes('_Tower') && !s2_sign.includes('_Tower'))))
const breedData = JSON.parse(JSON.stringify(breedDataOrigin))

const result1 = ref([])
const result2 = ref([])

// [{group: 1, sort: 0,title: '1代' ...}]
const breedTree = ref([])
const breedTreeNode = ref({})

const btRef = useTemplateRef('btRef')

// s1 s2 ret
function search(val) {
  const { parent1: p1, parent2: p2, child: c } = val
  // breedData
  let r = []
  if (!p1 && !p2 && !c) {
    r = breedData
  } else if ((p1 || p2) && !(p1 && p2) && !c) { // 单父辈
    const p = p1 || p2
    r = breedData.filter(({ s1, s2 }) => s1 === p || s2 === p)
  } else if (p1 && p2 && !c) { // 双父辈
    r = breedData.filter(({ s1, s2 }) => ((s1 === p1 && s2 === p2) || (s1 === p2 && s2 === p1)))
  } else if (p1 && p2 && c) { // 双父辈+子代
    r = breedData.filter(({ s1, s2, ret }) => ((s1 === p1 && s2 === p2) || (s1 === p2 && s2 === p1) && (ret === c)))
  } else if ((p1 || p2) && !(p1 && p2) && c) { // 单父+子
    const p = p1 || p2
    r = breedData.filter(({ s1, s2, ret }) => ((s1 === p || s2 === p) && c === ret))
  } else if (!p1 && !p2 && c) { // 单子
    r = breedData.filter(f => f.ret === c)
  }
  result1.value = r
  clear()
}

function clear() {
  result2.value = []
  breedTree.value = []
  breedTreeNode.value = null
}

// 搜索结果 点击父辈
function getParentBreed(val, breed, sort) {
  result2.value = breedData.filter(f => f.ret === val)
  breedTree.value = [JSON.parse(JSON.stringify(breed))]

  // pnode, pid, sort, emit = true
  btRef.value.selectNode(breed, val, sort, false)
}

function confirmParentBreed(val, breed) {
  const { group, title, sort, id } = breedTreeNode.value
  const tar = breedTree.value.findIndex(f => f.group === group && f.sort === sort)
  if (tar !== -1) {
    breedTree.value[tar] = { ...breedTree.value[tar], ...breed }
  } else {
    breedTree.value.push({ group, sort, title, ...breed })
  }
}

function selectTreeNode() {
  // {group: 0, title: '0代', sort: 1, id: 109}
  const { group, title, sort, id } = breedTreeNode.value
  result2.value = breedData.filter(f => f.ret === id)
}

</script>

<style scoped lang="scss">
.h-full {
  height: 100%;
}

.full {
  height: 100%;
  width: 100%;
}

.main {
  overflow: hidden;
  padding: 8px;

  .bg {
    background-color: rgba($color: #65e9e2, $alpha: 0.15);
  }

  .container {
    display: flex;
    flex-direction: column;

    .head {}

    .body {
      height: 0;
      flex-grow: 1;
    }
  }
}
</style>