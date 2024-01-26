<template>
  <div>
    <div class="main_breed">
      <div>
        <div class="breed_content parent_1" :style="{ backgroundImage: `url(${props.target?.s1_img})`, '--shoadow-color': dropSeeds.has(props.target.s1)?'#f76b6c':'#303133'}" />
        <div class="seed_name">
          {{ `${props.target.s1}.${props.target.s1_name}` }}
        </div>
      </div>
      <div class="plus">
        +
      </div>
      <div>
        <div class="breed_content parent_2" :style="{ backgroundImage: `url(${props.target?.s2_img})`, '--shoadow-color': dropSeeds.has(props.target.s2)?'#f76b6c':'#303133' }" />
        <div class="seed_name">
          {{ `${props.target.s2}.${props.target.s2_name}` }}
        </div>
      </div>
      <div class="equals">
        =
      </div>
      <div>
        <div class="breed_content child" :style="{ backgroundImage: `url(${props.target?.ret_img})`, '--shoadow-color': '#303133' }" />
        <div class="seed_name">
          {{ `${props.target.ret}.${props.target.ret_name}` }}
        </div>
      </div>
    </div>

    <div class="detail">
      <!--  -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue"

const props = defineProps({
  target: {
    type: Object,
    default: () => {}
  },
  seeds: {
    type: Array,
    default: () => []
  },
  allBreed: {
    type: Array,
    default: () => []
  },
  dropSeeds: {
    type: Set,
    default: () => new Set()
  },
})
onMounted(() => {
  console.log(props.target)
})
</script>

<style>
.breed_content {
  width: 76px;
  height: 76px;
  border-radius: 6px;
  background: no-repeat center / contain;
  box-shadow: 0 0 4px var(--shoadow-color);
}

.main_breed {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
}
</style>