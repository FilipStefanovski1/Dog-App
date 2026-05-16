<template>
  <section>
    <div class="back-row">
      <Button
        label="Back to breeds"
        icon="pi pi-arrow-left"
        text
        @click="goBack"
      />
    </div>

    <h1 class="title">{{ displayName }}</h1>

    <div v-if="isLoading" class="state">
      <ProgressSpinner />
      <p>Loading image...</p>
    </div>

    <div v-else-if="isError" class="state">
      <Message severity="error" :closable="false">
        Could not load image for this breed.
      </Message>
      <Button label="Try again" icon="pi pi-refresh" @click="refetch" />
    </div>

    <div v-else class="image-wrap">
      <img
        :src="data"
        :alt="displayName"
        class="img-fade"
        :class="{ loaded: imgLoaded }"
        @load="imgLoaded = true"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Button from 'primevue/button'

import { getImage } from '../services/api.js'

const route = useRoute()
const router = useRouter()

const name = computed(() => route.params.name)
const displayName = computed(() => {
  let n = name.value || ''
  return n.charAt(0).toUpperCase() + n.slice(1)
})

const imgLoaded = ref(false)

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['breed-image', name],
  queryFn: () => getImage(name.value),
  staleTime: Infinity
})

watch(name, () => {
  imgLoaded.value = false
})

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.back-row {
  margin-bottom: 16px;
}
.title {
  text-align: center;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 28px;
  color: #2b2f36;
  letter-spacing: 0.2px;
}
.image-wrap {
  display: flex;
  justify-content: center;
}
.image-wrap img {
  max-width: 100%;
  max-height: 540px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  object-fit: cover;
  background: #ffffff;
  padding: 6px;
  border: 1px solid #ececf0;
}
.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 80px 20px;
  color: #6b7280;
}
</style>
