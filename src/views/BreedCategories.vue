<template>
  <section class="categories-page">
    <div class="page-title">
      <h1>Breed Categories</h1>
      <p>Browse breeds grouped by size or by country of origin.</p>
    </div>

    <div v-if="isLoading" class="state">
      <ProgressSpinner />
      <p>Loading breeds...</p>
    </div>

    <div v-else-if="isError" class="state">
      <Message severity="error" :closable="false">
        Could not load breeds. Please try again.
      </Message>
    </div>

    <div v-else>
      <TabView>
        <TabPanel header="By Size">
          <div class="sections">
            <Card
              v-for="section in sizeSections"
              :key="section.title"
              class="section-card"
            >
              <template #title>
                <div class="section-header">
                  <span class="section-title">{{ section.title }}</span>
                  <span class="section-badge">{{ section.breeds.length }}</span>
                </div>
              </template>
              <template #content>
                <div class="chips">
                  <router-link
                    v-for="breed in section.breeds"
                    :key="breed"
                    :to="`/breed/${breed}`"
                    class="chip"
                  >
                    {{ formatName(breed) }}
                  </router-link>
                </div>
              </template>
            </Card>
          </div>
        </TabPanel>

        <TabPanel header="By Origin">
          <div class="sections">
            <Card
              v-for="section in continentSections"
              :key="section.title"
              class="section-card"
            >
              <template #title>
                <div class="section-header">
                  <span class="section-title">{{ section.title }}</span>
                  <span class="section-badge">{{ section.breeds.length }}</span>
                </div>
              </template>
              <template #content>
                <div class="chips">
                  <router-link
                    v-for="breed in section.breeds"
                    :key="breed"
                    :to="`/breed/${breed}`"
                    class="chip"
                  >
                    {{ formatName(breed) }}
                  </router-link>
                </div>
              </template>
            </Card>
          </div>
        </TabPanel>
      </TabView>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Card from 'primevue/card'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'

import { getBreeds } from '../services/api.js'
import { sizeMap, continentMap } from '../data/breedCategories.js'

const { data: breeds, isLoading, isError } = useQuery({
  queryKey: ['breeds'],
  queryFn: getBreeds,
  staleTime: 1000 * 60 * 10
})

function buildSections(categoryMap, unknownLabel) {
  if (!breeds.value) return []

  const allMapped = new Set(Object.values(categoryMap).flat())
  const unknown = breeds.value.filter((b) => !allMapped.has(b))

  const sections = Object.entries(categoryMap)
    .map(([title, list]) => ({
      title,
      breeds: list.filter((b) => breeds.value.includes(b))
    }))
    .filter((s) => s.breeds.length > 0)

  if (unknown.length > 0) {
    sections.push({ title: unknownLabel, breeds: unknown })
  }

  return sections
}

const sizeSections = computed(() =>
  buildSections(sizeMap, 'Mixed / Unknown Size')
)
const continentSections = computed(() =>
  buildSections(continentMap, 'Mixed / Unknown Origin')
)

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
</script>

<style scoped>
.categories-page {
  padding-bottom: 60px;
}

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
}

:deep(.p-tabview-nav) {
  display: flex;
  gap: 6px;
  border-bottom: 2px solid #e5e7ed;
  padding-bottom: 0;
  background: transparent;
  margin-bottom: 32px;
}

:deep(.p-tabview-nav li) {
  list-style: none;
  margin-bottom: -2px;
}

:deep(.p-tabview-nav-link) {
  display: block;
  padding: 10px 22px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  border: none;
  border-bottom: 2px solid transparent;
  background: transparent;
  cursor: pointer;
  border-radius: 6px 6px 0 0;
  transition: color 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  text-decoration: none;
  outline: none;
  box-shadow: none !important;
}

:deep(.p-tabview-nav-link:hover) {
  color: #2b2f36;
  background: #f4f6fb;
}

:deep(.p-highlight .p-tabview-nav-link) {
  color: #2b2f36;
  font-weight: 600;
  border-bottom: 2px solid #2b2f36;
  background: transparent;
}

:deep(.p-tabview-ink-bar) {
  display: none;
}

:deep(.p-tabview-panels) {
  padding: 0;
  background: transparent;
}

:deep(.p-tabview-panel) {
  padding: 0;
}

.sections {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

:deep(.section-card.p-card) {
  border: 1px solid #e5e7ed;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
}

:deep(.section-card .p-card-body) {
  padding: 20px 22px;
}

:deep(.section-card .p-card-title) {
  margin-bottom: 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f2f6;
}

:deep(.section-card .p-card-content) {
  padding: 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}
.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #2b2f36;
}
.section-badge {
  font-size: 11px;
  font-weight: 500;
  color: #6b7280;
  background: #f0f2f6;
  padding: 2px 9px;
  border-radius: 999px;
  flex-shrink: 0;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.chip {
  display: inline-block;
  padding: 5px 13px;
  background: #f7f8fa;
  border: 1px solid #e5e7ed;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  color: #3b4250;
  transition: background 0.15s ease, border-color 0.15s ease;
  white-space: nowrap;
}
.chip:hover {
  background: #eef1f6;
  border-color: #c8cdd8;
}

.state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 80px 20px;
  color: #6b7280;
}

@media (max-width: 600px) {
  .sections {
    grid-template-columns: 1fr;
  }

  :deep(.p-tabview-nav-link) {
    padding: 10px 16px;
  }
}
</style>
