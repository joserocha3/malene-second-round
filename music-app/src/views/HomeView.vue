<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import AlbumCard from '@/components/AlbumCard.vue'

const albumData = reactive({})
const searchTerm = ref('')
const favoriteFilter = ref(false)

async function fetchAlbumData () {
  // Fetching the albums from the itunes API.
  albumData.value = await (await fetch('https://itunes.apple.com/us/rss/topalbums/limit=100/json')).json()

  // If the fetch is successful and the data has been saved to the state,
  // reasign the value to only be the actual album entries, and
  // add a favorite key to each album with the default value of false.
  if (albumData.value) {
    albumData.value = albumData.value.feed.entry
    albumData.value.forEach(album => {
      album.favorite = false
    })
  }
}

// Running the function to fetch the album data on component mount.
fetchAlbumData()

// Filtering the album data from user search term and favorite filter.
const filteredAlbumData = computed(() => {
  if (favoriteFilter.value) {
    return albumData.value.filter(album => album.favorite === true && album.title.label.toLowerCase().includes(searchTerm.value.toLowerCase()))
  } else {
    return albumData.value.filter(album => album.title.label.toLowerCase().includes(searchTerm.value.toLowerCase()))
  }
})
</script>

<template>
  <div class="pt-12 bg-gradient-to-tl from-green-200 via-green-300 to-blue-500 min-h-screen">
    <div class="p-8 md:p-20">
      <h1 class="font-bold text-5xl md:text-6xl text-center text-neutral-100">White Rabbit Music</h1>
      <h2 class="mt-12 mb-8 text-2xl text-center font-medium text-neutral-100">Browse the top albums on itunes right now!</h2>
      <input class="mt-8 w-full px-4 py-2 border rounded flex-shrink" v-model="searchTerm" placeholder="Search album titles...">
      <div class="flex gap-2 mt-4">
        <input id="favorite-filter" class="hidden peer" type="checkbox" v-model="favoriteFilter">
        <label for="favorite-filter" class="duration-500 transform hover:-translate-y-1">
          <div v-if="favoriteFilter" class="px-6 py-3 rounded-lg bg-neutral-100 border bg-opacity-90 hover:bg-opacity-100 text-sm">
            <h2>Show all</h2>
          </div>
          <div v-if="!favoriteFilter" class="px-6 py-3 rounded-lg bg-neutral-100 border bg-opacity-90 hover:bg-opacity-100 flex gap-2 items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e22e26" class="w-5 h-5">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <h2>Show only favorites</h2>
          </div>
        </label>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
        <div v-for="album in filteredAlbumData" :key="album.id.attributes['im:id']">
          <AlbumCard :album="album"/>
        </div>
      </div>
    </div>
  </div>
</template>
