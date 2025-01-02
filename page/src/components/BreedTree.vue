<template>
  <div>
    <el-button type="warning" @click="clear">清空</el-button>
    <ul class="list_container">
      <li v-for="(it, iti) in _list" class="list_item" :key="'' + iti + Date.now()">
        <template v-if="it">
          <span class="title">{{ it.title || '目标' }}</span>
          <span class="span" @click="selectNode(it, it.s1, 0)">{{ it.s1_name }}</span>
          <div class="list_item_sign">+</div>
          <span class="span" @click="selectNode(it, it.s2, 1)">{{ it.s2_name }}</span>
          <div class="list_item_sign">=</div>
          <span class="span">{{ it.ret_name }}</span>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, defineModel } from 'vue'

const list = defineModel()
const selected = defineModel('selected')

const emits = defineEmits(['changeSelected'])

const _list = computed(() => {
  let r = JSON.parse(JSON.stringify(list.value))
  r = r.sort((a,b) => a.group - b.group)
  return r
})

function selectNode(pnode, pid, sort, emit = true) {
  const group = pnode.group ? pnode.group + 1 : 1
  const title = group + '代'
  selected.value = { group, title, sort, id: pid }
  if(emit) {
    emits('changeSelected');
  }
}

defineExpose({
  selectNode
})

function clear() {
  list.value = []
  selected.value = null
}
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

.title {
  font-size: 20px;
  font-weight: 600;
  white-space: nowrap;
  line-height: 50px;
  color: #fd5fbb;
}

.span {
  white-space: nowrap;
  display: inline-block;
  min-width: 20%;
  font-size: 14px;
  line-height: 18px;
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