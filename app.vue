<template>
  <div>
    <ClientOnly>
    <AdSense
      :key="'adsense-' + Math.random()"
        ad-client="ca-pub-1741709382102643"
        ad-slot="6888503638"
      /> 
    </ClientOnly>
</div>
  <VitePwaManifest/>
    <NuxtRouteAnnouncer />
    <SprayCalculator/>
  </template>
