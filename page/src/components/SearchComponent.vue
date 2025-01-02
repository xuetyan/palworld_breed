<template>
  <div class="search">
    <el-select v-model="parent1" filterable clearable placeholder="父">
      <el-option v-for="{ id, name } in list" :key="id" :value="id" :label="name" />
    </el-select>
    <el-select v-model="parent2" filterable clearable placeholder="母">
      <el-option v-for="{ id, name } in list" :key="id" :value="id" :label="name" />
    </el-select>
    <el-select v-model="child" filterable clearable placeholder="子">
      <el-option v-for="{ id, name } in list" :key="id" :value="id" :label="name" />
    </el-select>
    <el-button type="primary" @click="$emit('search', { parent1, parent2, child })">搜索</el-button>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
const props = defineProps(['list'])

const list = computed(() => props.list)

const parent1 = ref('')
const parent2 = ref('')
const child = ref('')

</script>

<style scoped lang="scss">
.search {
  display: flex;

  .el-select {
    margin: 0 8px;
  }
}
</style>