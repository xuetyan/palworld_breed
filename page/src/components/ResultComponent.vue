<template>
  <ul class="list_container">
    <li class="list_item" v-for="it in list" :key="it.s1_sign + it.s2_sign">
      <span @click="$emit('select', it.s1, it, 0)">{{ it.s1_name }}</span>
      <div class="list_item_sign">+</div>
      <span @click="$emit('select', it.s2, it, 1)">{{ it.s2_name }}</span>
      <div class="list_item_sign">=</div>
      <span>{{ it.ret_name }}</span>
    </li>
  </ul>
</template>

<script setup>
import { defineModel } from 'vue'

const list = defineModel()
</script>

<style scoped lang="scss">
.list_container {
  height: 100%;
  overflow-y: auto;
  .list_item {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    .list_item_sign {
      line-height: 50px;
    }
  }
}
span {
  --size: 18px;

  display: inline-block;
  min-width: 30%;
  font-size: var(--size);
  line-height: var(--size);
  padding: 8px 16px;
  margin: 8px;
  background-color: rgba($color: #ccc, $alpha: 0.4);
  color: #363133;
  border-radius: 5px;
  cursor: default;
  &:not(:last-child) {
    cursor: pointer;
    &:hover {
    color: #3aa4e2;
  }
  }
}
</style>