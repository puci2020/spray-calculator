<template>
      <div v-if="isClient">
        <ins
      class="adsbygoogle"
      style="display:block"
      data-ad-client="ca-pub-1741709382102643"
      data-ad-slot="6888503638"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
        <!-- <ins
          class="adsbygoogle"
          style="display:inline-block"
          :data-ad-client="adClient"
          :data-ad-slot="adSlot"
          data-ad-format="auto"
          data-full-width-responsive="true"
        /> -->
</div>
</template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  defineProps({
    adClient: { type: String, required: true },
    adSlot: { type: String, required: true }
  })

  useHead({
  script: [
    {
      async: true,
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1741709382102643',
      crossorigin: 'anonymous',
    },
  ],
});
  
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