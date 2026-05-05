<template>
  <section>
    <div class="page-title">
      <h1>Dog Breeds</h1>
      <p>Pick a breed to see a random picture.</p>
    </div>

    <div v-if="isLoading" class="state">
      <ProgressSpinner />
      <p>Loading breeds...</p>
    </div>

    <div v-else-if="isError" class="state">
      <Message severity="error" :closable="false">
        Could not load breeds. Please try again.
      </Message>
      <Button label="Retry" icon="pi pi-refresh" @click="refetch" />
    </div>

    <div v-else class="grid">
      <BreedCard v-for="breed in data" :key="breed" :breed="breed" />
    </div>
  </section>
</template>

<script setup>
import { useQuery } from '@tanstack/vue-query'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import Button from 'primevue/button'

import BreedCard from '../components/BreedCard.vue'
import { getBreeds } from '../services/api.js'

const { data, isLoading, isError, refetch } = useQuery({
  queryKey: ['breeds'],
  queryFn: getBreeds,
  staleTime: 1000 * 60 * 10 // 10 minutes
})
</script>

<style scoped>
.page-title {
  text-align: center;
  margin-bottom: 36px;
}
.page-title h1 {
  font-size: 30px;
  font-weight: 600;
  color: #2b2f36;
  margin-bottom: 8px;
  letter-spacing: 0.2px;
}
.page-title p {
  color: #6b7280;
  font-size: 15px;
  font-weight: 400;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
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
