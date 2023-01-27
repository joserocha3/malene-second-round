<script setup lang="ts">
import { watch } from 'vue'
/* eslint-disable */
const props = defineProps({
  album: Object,
  modalIsOpen: Boolean
})

watch(() => props.modalIsOpen, (newValue) => {
  if  (newValue){
    document.documentElement.style.overflow = 'hidden'
    return
  } else {
    document.documentElement.style.overflow = 'auto'
  }
})

</script>

<template>
  <div :class="{ hidden: !modalIsOpen }" class="relative">
    <div class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-neutral-100 w-[300px] h-[250px] z-20 border rounded-lg flex justify-center items-center shadow">
      <div class="text-center">
        <h1 class="text-xl font-bold">{{ album['im:name'].label }}</h1>
        <h2 class="font-bold pt-10">Album price:</h2>
        <p>{{ album['im:price'].label }}</p>
      </div>
      <button @click="modalIsOpen = false" class="absolute top-4 right-4 font-bold">
        X
      </button>
    </div>
    <div @click="modalIsOpen = false" class="fixed top-0 left-0 h-screen w-screen bg-gray-500 opacity-70 z-10">
    </div>
  </div>
</template>
