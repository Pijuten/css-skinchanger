<script setup lang="ts">
import { ref, onMounted } from 'vue';
import SelectGame from './components/SelectGame.vue';
import {loadConfig} from './scripts/importConfig.ts';
import {updateJson} from './scripts/updateJson.ts';
import {writeToConfig} from './scripts/writeToConfig.ts';

const config = ref<Record<string, any> | null>(null);
const validGamePath = ref<boolean>(true);

async function fetchConfig() {
  config.value = await loadConfig();
  if (config.value) {
    validGamePath.value = hasGamePath(config.value, 'path');

  }
}

function hasGamePath(configJson: Record<string, any>, key: string): boolean {
  return configJson.hasOwnProperty(key) && configJson[key] !== null && configJson[key] !== "";
}


function updateConfig(key: string, value: string) {
  if (config.value) {
    config.value = updateJson(config.value, key, value);
    writeToConfig(config.value);
    validGamePath.value = hasGamePath(config.value, 'path');
  }
}


// Fetch the configuration on component mount
onMounted(() => {
  fetchConfig();
});
</script>
<template>
  <main class="container">
    <SelectGame @update-config="updateConfig" v-if="!validGamePath"></SelectGame>
    
  </main>
</template>
