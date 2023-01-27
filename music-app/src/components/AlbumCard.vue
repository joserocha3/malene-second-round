<script setup lang="ts">
import { watch, onMounted, ref } from 'vue'
import AlbumModal from '@/components/AlbumModal.vue'

/* eslint-disable */
const props = defineProps({
  album: Object
})

const modalIsOpen = ref(false)

// Watch function that saves the album favorite value to localStorage if the user has favorited the album.
watch(props.album, (newValue) => {
  if (newValue.favorite === true) {
    localStorage.setItem(props.album.id.attributes['im:id'], JSON.stringify(newValue.favorite))
  } else if (localStorage.getItem(props.album.id.attributes['im:id'])) {
    localStorage.removeItem(props.album.id.attributes['im:id'])
  }
})

// Setting the favorite value to true, if the album is saved in localStorage.
onMounted(() => {
  if (localStorage.getItem(props.album.id.attributes['im:id'])) {
    props.album.favorite = true
  }
})

const shareData = {
  title: props.album.title.label,
  text: 'Hey friend 👋 Check out this top album on itunes!',
  url: props.album.link.attributes.href
}

async function shareAlbum(data) {
  try {
    await navigator.share(data)
  } catch (err) {
    console.log(`Error: ${err}`)
  }
}

function toggleModal() {
  modalIsOpen.value = !modalIsOpen.value
}

</script>

<template>
  <div class="relative p-12 rounded-lg bg-neutral-100 shadow">
    <div class="pt-4 pb-8">
      <h1 class="font-bold mb-2 text-lg">{{ album['im:name'].label }}</h1>
      <h2 class=" mb-2">{{ album['im:artist'].label }}</h2>
      <p class="text-sm italic">{{ album['im:releaseDate'].attributes.label }}</p>
    </div>
    <div class="absolute top-4 right-4 flex gap-2">
      <button class="duration-500 transform hover:-translate-y-1" @click="shareAlbum(shareData)">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
      </button>
      <div class="cursor-pointer duration-500 transform hover:-translate-y-1">
        <input :id="album.title.label" class="hidden peer w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" type="checkbox" v-model="props.album.favorite">
        <label :for="album.title.label">
          <svg v-if="album.favorite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e22e26" class="w-6 h-6">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#e22e26" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </label>
      </div>
    </div>
    <div class="flex gap-4">
      <a class="text-sm px-4 py-2 rounded-lg bg-neutral-300 border bg-opacity-60 hover:bg-opacity-100" target="_blank" :href="props.album.link.attributes.href">
        Learn More
      </a>
    </div>
    <button class="mt-2 text-sm px-4 py-2 rounded-lg bg-neutral-300 border bg-opacity-60 hover:bg-opacity-100" @click="toggleModal">
      Price Info
    </button>
  </div>
  <AlbumModal :album="album" :modalIsOpen="modalIsOpen"/>
</template>
