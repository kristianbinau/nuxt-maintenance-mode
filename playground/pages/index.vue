<template>
  <div>
    <h1>Home</h1>
    <p>Welcome to the playground!</p>
    <NuxtLink to="/blog">Go to blog</NuxtLink>

    <div>
      <button @click="refresh()">
        Refresh
      </button>
      <button @click="clear()">
        Clear
      </button>

      <div>
        <p>Is under maintenance: {{ isUnderMaintenance }}</p>
        <p>Is blog under maintenance: {{ isUnderMaintenanceBlog }}</p>
      </div>

      <div>
        <p>Status: {{ status }}</p>
        <p>Data: {{ data }}</p>
        <p>Error: {{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data, status, error, refresh, clear } = await useFetch('/api/test')

const url = useRequestURL()
const { isUnderMaintenance } = useMaintenance(url.pathname)
const { isUnderMaintenance: isUnderMaintenanceBlog } = useMaintenance('/blog')
</script>
