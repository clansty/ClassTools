<script setup lang="ts">
import lotsSettings from '../stores/lotsSettings';
import { ref } from 'vue';
import random from '../utils/random';

const rollType = ref<'' | 'single' | 'multi'>('');
const valueSingleLast = ref(0);
const valueSingle = ref(0);
const valueMulti = ref<number[]>([]);

const generateArray = (start: number, end: number) => {
  // 没有 python 的 range 好用
  return Array.from(new Array(end + 1).keys()).slice(start);
};
const rollSingle = () => {
  valueSingleLast.value = valueSingle.value;
  valueSingle.value = random.int(lotsSettings.value.min, lotsSettings.value.max);
  rollType.value = 'single';
};
const rollMulti = () => {
  valueMulti.value = random.shuffle(generateArray(lotsSettings.value.min, lotsSettings.value.max))
    .slice(0, lotsSettings.value.count);
  rollType.value = 'multi';
};
</script>

<template>
  <n-layout>
    <n-layout-content content-style="padding: 24px">
      <n-space vertical align="center" size="large">
        <div style="display: flex; justify-content: center; align-items: center">
          最小值
          <n-input-number v-model:value="lotsSettings.min" :max="lotsSettings.max" :show-button="false"
                          style="width: 70px; margin: 0 10px"/>
          最大值
          <n-input-number v-model:value="lotsSettings.max" :min="lotsSettings.min" :show-button="false"
                          style="width: 70px; margin-left: 10px"/>
        </div>
        <n-space>
          <n-button size="large" @click="rollSingle">
            单抽
          </n-button>
          <n-input-group size="large">
            <n-input-number v-model:value="lotsSettings.count" :min="1" :show-button="false"
                            style="width: 45px" size="large"/>
            <n-button size="large" @click="rollMulti">
              连抽
            </n-button>
          </n-input-group>
        </n-space>
        <div style="font-size: 3em">
          <n-number-animation v-if="rollType === 'single'" :from="valueSingleLast" :to="valueSingle" :duration="1000"/>
          <n-space v-if="rollType === 'multi'" justify="center">
            <span v-for="i in valueMulti">{{ i }}</span>
          </n-space>
        </div>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>
