<template>
      <div class="w-full lg:w-1/4 max-w-md bg-white bg-opacity-90 rounded-2xl shadow-lg p-6 space-y-6">
      <h1 class="text-2xl font-bold text-center text-green-700">Kalkulator oprysku</h1>
      <h2 class="font-bold text-center text-green-700">Oblicz ilość środka na hektar oraz liczbę napełnień opryskiwacza!</h2>
      <p class="text-gray-700 text-center mb-4">Nasz kalkulator pomaga w szybkim i dokładnym planowaniu oprysków.</p>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Dawka środka [l/ha]</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <font-awesome :icon="['fas', 'droplet']" class="text-gray-400" />
            </span>
            <input
              v-model.number="dosePerHa"
              type="number"
              step="0.01"
              min="0"
              class="p-3 pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Powierzchnia [ha]</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <font-awesome :icon="['fas', 'ruler']" class="text-gray-400" />
            </span>
            <input
              v-model.number="areaHa"
              type="number"
              step="0.01"
              min="0"
              class="p-3 pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Zalecana ilość wody [l/ha]</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <font-awesome :icon="['fas', 'water']" class="text-gray-400" />
            </span>
            <input
              v-model.number="waterPerHa"
              type="number"
              step="0.01"
              min="0"
              class="p-3 pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Pojemność opryskiwacza [l] (opcjonalne)</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <font-awesome :icon="['fas', 'spray-can']" class="text-gray-400" />
            </span>
            <input
              v-model.number="sprayerCapacity"
              type="number"
              step="0.01"
              min="0"
              class="p-3 pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150 ease-in-out"
              placeholder="0"
            />
          </div>
        </div>


        <button
          @click="calculate"
          class="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition duration-200 ease-in-out transform hover:scale-105"
        >
          Oblicz
        </button>
      </div>

      <div v-if="result" class="bg-green-50 p-4 rounded-lg border border-green-200 space-y-2 animate-fade-in">
        <p class="flex items-center text-gray-800">
          <font-awesome :icon="['fas', 'vial']" class="text-green-600 mr-2" />
          <span><strong>Całkowita ilość środka:</strong> {{ result.totalProduct.toFixed(2) }} l</span>
        </p>
        <p class="flex items-center text-gray-800">
          <font-awesome :icon="['fas', 'water']" class="text-green-600 mr-2" />
          <span><strong>Całkowita ilość wody:</strong> {{ result.totalWater.toFixed(2) }} l</span>
        </p>
        <!-- Szczegóły napełnień, jeśli podano pojemność opryskiwacza -->
        <div v-if="result.fills && result.fills.length > 0" class="space-y-2 mt-2">
          <p class="text-gray-800 font-semibold">Szczegóły napełnień:</p>
          <div v-for="(fill, index) in result.fills" :key="index" class="pl-4">
            <p class="flex items-center text-gray-800">
              <font-awesome :icon="['fas', 'spray-can']" class="text-green-600 mr-2" />
              <span><strong>Napełnienie {{ index + 1 }}:</strong> {{ fill.water.toFixed(2) }} l wody</span>
            </p>
            <p class="flex items-center text-gray-800 pl-6">
              <font-awesome :icon="['fas', 'vial']" class="text-green-600 mr-2" />
              <span><strong>Środek:</strong> {{ fill.product.toFixed(2) }} l</span>
            </p>
          </div>
        </div>
      </div>

    </div>    
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'


const dosePerHa = ref<number>(0)
const areaHa = ref<number>(0)
const waterPerHa = ref<number>(0)
const sprayerCapacity = ref<number | null>(null)

const result = ref<{
  totalProduct: number
  totalWater: number
  fills?: Array<{ water: number; product: number }>
} | null>(null)

// Walidacja: Zapobiegaj ujemnym wartościom
watch([dosePerHa, areaHa, waterPerHa, sprayerCapacity], ([newDose, newArea, newWater, newCapacity]) => {
  if (newDose < 0) dosePerHa.value = 0
  if (newArea < 0) areaHa.value = 0
  if (newWater < 0) waterPerHa.value = 0
  if (newCapacity !== null && newCapacity < 0) sprayerCapacity.value = 0
})

function round(value: number, decimals = 2) {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
}

function calculate() {
  const totalProduct = round(dosePerHa.value * areaHa.value)
  const totalWater = round(waterPerHa.value * areaHa.value)

  // Obliczenia dla napełnień opryskiwacza (bazując na totalWater)
  let fills: Array<{ water: number; product: number }> = []

  if (sprayerCapacity.value && sprayerCapacity.value > 0) {
    let remainingWater = totalWater
    const capacity = sprayerCapacity.value
    const productPerLiter = totalWater > 0 ? totalProduct / totalWater : 0 // Proporcja środka na litr wody

    while (remainingWater > 0) {
      // Ilość wody na to napełnienie (pełna pojemność lub reszta)
      const waterForFill = Math.min(remainingWater, capacity)
      // Ilość środka proporcjonalna do ilości wody w tym napełnieniu
      const productForFill = round(waterForFill * productPerLiter)

      fills.push({
        water: waterForFill,
        product: productForFill,
      })

      remainingWater -= waterForFill
    }
  }

  result.value = {
    totalProduct,
    totalWater,
    ...(fills.length > 0 ? { fills } : {}),
  }
}
</script>

<style scoped>
/* Animacja pojawiania się wyniku */
.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}
</style>
