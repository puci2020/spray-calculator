<template>
  <div class="relative min-h-screen w-full flex items-center justify-center">
    <NuxtImg
      src="/images/background-image.webp"
      alt="Tło pola"
      class="fixed inset-0 w-full h-full object-cover z-[-1]"
      width="1920"
      height="1080"
      sizes="(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px"
      format="webp"
      quality="70"
      loading="lazy"
    />
    <div class="w-full relative z-10 min-h-screen flex flex-col justify-between">

        <div class="p-2 w-full flex-1 flex flex-col items-center justify-center">
            <NuxtPage />
        </div>

      <footer class="w-full text-center text-sm text-gray-700 bg-white bg-opacity-60 backdrop-blur-sm py-2 shadow-inner">
        © {{ new Date().getFullYear() }} Kalkulator oprysku | 
        <NuxtLink to="/polityka-prywatnosci" class="text-green-700 hover:underline ml-1">
          Polityka prywatności
        </NuxtLink>
      </footer>
    </div>
</div>
</template>
