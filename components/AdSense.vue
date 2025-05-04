<template>
      <div v-if="isClient">

        <ins
          class="adsbygoogle"
          style="display:inline-block"
          :data-ad-client="adClient"
          :data-ad-slot="adSlot"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
</div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  defineProps({
    adClient: { type: String, required: true },
    adSlot: { type: String, required: true }
  })
  
  const isClient = ref(false)


onMounted(() => {
    isClient.value = true

    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        try {
      window.adsbygoogle.push({})
    } catch (e) {
      console.error('Adsbygoogle error:', e)
    }
  }
})
 </script>