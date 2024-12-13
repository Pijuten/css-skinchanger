<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog';
import { ref } from 'vue';

const emit = defineEmits(['update-config']); // This must be defined at the top-level scope

// Reactive references
const isOpen = ref(false);

async function openDialog() {
  let folderName: string = "";
  if (!isOpen.value) {
    isOpen.value = true;
    const folder = await open({
      multiple: false,
      directory: true,
    });

    if (typeof folder === 'string') {
      folderName = folder;
      emit('update-config', 'path', folderName); // Emit the event with the correct arguments
    } else {
      console.log("No folder selected");
    }

    isOpen.value = false; // Reset isOpen after the dialog operation
  }
}
</script>


<template>
  <p>No Game folder specified</p>
  <button @click="openDialog">open</button>
</template>
