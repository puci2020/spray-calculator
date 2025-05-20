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
    <!-- <div class="w-full flex flex-col sm:flex-row items-center justify-center gap-2"> -->
    <SprayCalculator/>
    <ContentInfo/>

    <!-- <ROICalculator/> -->
<!-- </div> -->

</template>