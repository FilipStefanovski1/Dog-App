<template>
  <router-link :to="`/breed/${breed}`" class="card-link">
    <Card class="breed-card">
      <template #content>
        <div class="card-content">
          <h3>{{ formattedName }}</h3>
          <span class="hint">View details</span>
        </div>
      </template>
    </Card>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'
import Card from 'primevue/card'

const props = defineProps({
  breed: {
    type: String,
    required: true
  }
})

const formattedName = computed(() => {
  return props.breed.charAt(0).toUpperCase() + props.breed.slice(1)
})
</script>

<style scoped>
.card-link {
  display: block;
}
.breed-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  border: 1px solid #ececf0;
  background: #ffffff;
}
.breed-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.06);
  border-color: #d8dbe2;
}
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 8px;
}
h3 {
  font-size: 16px;
  font-weight: 600;
  color: #2b2f36;
  margin: 0;
}
.hint {
  font-size: 13px;
  font-weight: 400;
  color: #8a90a0;
}
</style>
