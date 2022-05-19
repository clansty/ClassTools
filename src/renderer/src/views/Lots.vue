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
      <n-space vertical align="center" :size="20">
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
            <n-input-number v-model:value="lotsSettings.count" :min="1" :max="lotsSettings.max - lotsSettings.min + 1"
                            :show-button="false" style="width: 45px" size="large"/>
            <n-button size="large" @click="rollMulti">
              连抽
            </n-button>
          </n-input-group>
        </n-space>
        <div style="font-size: 3em">
          <n-number-animation v-if="rollType === 'single'" :from="valueSingleLast" :to="valueSingle" :duration="1000"/>
          <transition name="animation" mode="out-in">
            <!-- 要是把 v-if 放在 transition 上，会导致第一次没有动画，因为 transition 在里面元素已经加载的时候确实不会有动画 -->
            <!-- 这个 key 是为了每随机一次，这个元素对于 transition 来说都不一样，让 transition 重新进行一次 -->
            <n-space v-if="rollType === 'multi'" justify="center" :size="20" :key="valueMulti.join(',')"
                     style="overflow: hidden">
              <!-- overflow: hidden 不加，动画的时候会出滚动条 -->
              <span v-for="(i,index) in valueMulti" class="number"
                    :style="{ transitionDelay: `${index * 0.1}s` }">{{ i }}</span>
            </n-space>
          </transition>
        </div>
      </n-space>
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang="sass">
.animation-enter-from
  .number
    opacity: 0
    transform: translateY(100%)

.number
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)
  display: inline-block // 这行不加，translateY 不起作用
</style>
