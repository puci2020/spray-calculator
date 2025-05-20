<template>
    <div class="min-h-screen bg-gray-900 text-gray-100 py-8">
      <div class="container mx-auto px-4 max-w-5xl">
        <h1 class="text-3xl font-bold mb-8 text-center text-purple-400">
          <font-awesome :icon="['fas', 'calculator']" class="mr-2" />Kalkulator Zwrotu z Inwestycji
        </h1>
  
        <!-- Individual Calculators -->
        <div v-for="(calc, index) in calculators" :key="index" class="mb-8 p-6 bg-gray-800 rounded-xl shadow-lg">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-semibold text-purple-400">Kalkulator {{ index + 1 }}: {{ calc.assetType || 'Aktywa' }}</h2>
            <button v-if="calculators.length > 1" @click="removeCalculator(index)" class="text-red-400 hover:text-red-500 transition-colors duration-200">
              <font-awesome :icon="['fas', 'trash-alt']" class="mr-1" /> Usuń
            </button>
          </div>
  
          <!-- Input Fields -->
          <div class="space-y-6">
            <!-- Investment Details -->
            <div>
              <h3 class="text-lg font-medium text-gray-300 mb-3">Szczegóły Inwestycji</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300">Rodzaj Aktywów</label>
                  <input v-model="calc.assetType" type="text" placeholder="np. Akcje, Obligacje" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300">Początkowa Inwestycja (PLN)</label>
                  <input v-model.number="calc.initialInvestment" type="number" min="0" step="0.01" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200" @input="calculateROI(index)">
                </div>
              </div>
            </div>
  
            <!-- Payment Settings -->
            <div>
              <h3 class="text-lg font-medium text-gray-300 mb-3">Ustawienia Wpłat</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300">Systematyczna Wpłata (PLN)</label>
                  <input v-model.number="calc.systematicPayment" type="number" min="0" step="0.01" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200" @input="calculateROI(index)">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300">Częstotliwość Wpłat</label>
                  <select v-model="calc.paymentFrequency" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200" @change="calculateROI(index)">
                    <option value="monthly">Miesięcznie</option>
                    <option value="quarterly">Kwartalnie</option>
                    <option value="annually">Rocznie</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300">Częstotliwość Kapitalizacji</label>
                  <select v-model="calc.compoundingFrequency" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200" @change="calculateROI(index)">
                    <option value="monthly">Miesięcznie</option>
                    <option value="quarterly">Kwartalnie</option>
                    <option value="annually">Rocznie</option>
                  </select>
                </div>
              </div>
            </div>
  
            <!-- Payment Increase Settings -->
            <div>
              <h3 class="text-lg font-medium text-gray-300 mb-3">Zwiększenie Wpłat</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300">Rodzaj Zwiększenia</label>
                  <select v-model="calc.increaseType" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200" @change="calculateROI(index)">
                    <option value="none">Brak</option>
                    <option value="percentage">Procentowo</option>
                    <option value="fixed">Stała Kwota</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300">{{ calc.increaseType === 'percentage' ? 'Procent Zwiększenia (%)' : 'Kwota Zwiększenia (PLN)' }}</label>
                  <input v-model.number="calc.increaseValue" type="number" min="0" step="0.01" :disabled="calc.increaseType === 'none'" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200 disabled:opacity-50" @input="calculateROI(index)">
                </div>
              </div>
            </div>
  
            <!-- Duration and Returns -->
            <div>
              <h3 class="text-lg font-medium text-gray-300 mb-3">Czas i Zwroty</h3>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300">Czas Trwania (Lata)</label>
                  <input v-model.number="calc.years" type="number" min="0" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200" @input="calculateROI(index)">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300">Czas Trwania (Miesiące)</label>
                  <input v-model.number="calc.months" type="number" min="0" max="11" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200" @input="calculateROI(index)">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300">Roczna Stopa Zwrotu (%)</label>
                  <input v-model.number="calc.rate" type="number" min="0" step="0.01" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200" @input="calculateROI(index)">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300">Podatek od Zysków Kapitałowych (%)</label>
                  <input v-model.number="calc.taxRate" type="number" min="0" max="100" step="0.01" class="mt-1 block w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200" @input="calculateROI(index)">
                </div>
              </div>
            </div>
          </div>
  
          <!-- Results -->
          <div class="mt-6 p-6 bg-gray-700 rounded-lg">
            <h3 class="text-lg font-medium text-purple-400 mb-4">Wyniki</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p><strong class="text-gray-300">Liczba Wpłat:</strong> {{ calc.results.contributions }}</p>
              <p><strong class="text-gray-300">Całkowite Wpłaty (PLN):</strong> {{ calc.results.totalContributions.toFixed(2) }}</p>
              <p><strong class="text-gray-300">Szacowany Zysk (PLN):</strong> {{ calc.results.profit.toFixed(2) }}</p>
              <p><strong class="text-gray-300">Zapłacony Podatek (PLN):</strong> {{ calc.results.taxPaid.toFixed(2) }}</p>
              <p><strong class="text-gray-300">Końcowa Wartość (PLN):</strong> {{ calc.results.finalValue.toFixed(2) }}</p>
            </div>
          </div>
        </div>
  
        <!-- Add Calculator Button -->
        <div class="text-center mb-8">
          <button @click="addCalculator" class="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors duration-200">
            <font-awesome :icon="['fas', 'plus']" class="mr-2" />Dodaj Kalkulator
          </button>
        </div>
  
        <!-- Summary -->
        <div v-if="calculators.length > 0" class="p-6 bg-gray-800 rounded-xl shadow-lg">
          <h2 class="text-xl font-semibold text-purple-400 mb-4">Połączone Wyniki</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p><strong class="text-gray-300">Całkowite Wpłaty (PLN):</strong> {{ summary.totalContributions.toFixed(2) }}</p>
            <p><strong class="text-gray-300">Całkowity Szacowany Zysk (PLN):</strong> {{ summary.totalProfit.toFixed(2) }}</p>
            <p><strong class="text-gray-300">Całkowity Zapłacony Podatek (PLN):</strong> {{ summary.totalTaxPaid.toFixed(2) }}</p>
            <p><strong class="text-gray-300">Całkowita Końcowa Wartość (PLN):</strong> {{ summary.totalFinalValue.toFixed(2) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { v4 as uuidv4 } from 'uuid';
  
  // State for calculators
  const calculators = ref([
    {
      id: uuidv4(),
      assetType: '',
      initialInvestment: 1000,
      systematicPayment: 100,
      paymentFrequency: 'monthly',
      compoundingFrequency: 'monthly',
      increaseType: 'none',
      increaseValue: 0,
      years: 5,
      months: 0,
      rate: 5,
      taxRate: 15,
      results: {
        contributions: 0,
        totalContributions: 0,
        profit: 0,
        taxPaid: 0,
        finalValue: 0,
      },
    },
  ]);
  
  // Calculate ROI for a single calculator
  const calculateROI = (index) => {
    const calc = calculators.value[index];
    const { initialInvestment, systematicPayment, paymentFrequency, compoundingFrequency, increaseType, increaseValue, years, months, rate, taxRate } = calc;
  
    // Calculate total months
    const totalMonths = years * 12 + months;
    if (totalMonths <= 0) {
      calc.results = {
        contributions: 0,
        totalContributions: 0,
        profit: 0,
        taxPaid: 0,
        finalValue: 0,
      };
      return;
    }
  
    // Determine compounding periods per year
    let compoundingPeriodsPerYear;
    switch (compoundingFrequency) {
      case 'monthly':
        compoundingPeriodsPerYear = 12;
        break;
      case 'quarterly':
        compoundingPeriodsPerYear = 4;
        break;
      case 'annually':
        compoundingPeriodsPerYear = 1;
        break;
      default:
        compoundingPeriodsPerYear = 12;
    }
  
    // Calculate period rate
    const periodRate = rate / 100 / compoundingPeriodsPerYear;
    const totalCompoundingPeriods = totalMonths * (compoundingPeriodsPerYear / 12);
  
    // Determine payment periods per year
    let paymentPeriodsPerYear;
    switch (paymentFrequency) {
      case 'monthly':
        paymentPeriodsPerYear = 12;
        break;
      case 'quarterly':
        paymentPeriodsPerYear = 4;
        break;
      case 'annually':
        paymentPeriodsPerYear = 1;
        break;
      default:
        paymentPeriodsPerYear = 12;
    }
  
    // Calculate total number of contributions
    const contributions = Math.floor(totalMonths * paymentPeriodsPerYear / 12);
  
    // Calculate future value of initial investment
    const fvInitial = initialInvestment * Math.pow(1 + periodRate, totalCompoundingPeriods);
  
    // Calculate future value of systematic payments with increases
    let fvSystematic = 0;
    let totalContributions = initialInvestment;
    if (systematicPayment > 0 && paymentPeriodsPerYear > 0) {
      const periodsPerPayment = compoundingPeriodsPerYear / paymentPeriodsPerYear;
      const paymentCompoundingPeriods = periodsPerPayment >= 1 ? periodsPerPayment : 1;
      const effectiveRate = periodRate * periodsPerPayment;
  
      for (let i = 0; i < contributions; i++) {
        // Calculate current payment with increase
        let currentPayment = systematicPayment;
        if (increaseType !== 'none') {
          if (increaseType === 'percentage') {
            currentPayment = systematicPayment * Math.pow(1 + increaseValue / 100, i);
          } else if (increaseType === 'fixed') {
            currentPayment = systematicPayment + increaseValue * i;
          }
        }
  
        // Ensure payment is non-negative
        currentPayment = Math.max(currentPayment, 0);
  
        // Calculate future value of this payment
        const periodsRemaining = totalCompoundingPeriods - (i * paymentCompoundingPeriods);
        if (periodsRemaining >= 0) {
          fvSystematic += currentPayment * Math.pow(1 + effectiveRate, periodsRemaining);
          totalContributions += currentPayment;
        }
      }
    }
  
    // Total future value
    const finalValueBeforeTax = fvInitial + fvSystematic;
  
    // Profit before tax
    const profitBeforeTax = finalValueBeforeTax - totalContributions;
  
    // Tax paid
    const taxPaid = profitBeforeTax > 0 ? profitBeforeTax * (taxRate / 100) : 0;
  
    // Final value after tax
    const finalValue = finalValueBeforeTax - taxPaid;
  
    // Update results
    calc.results = {
      contributions,
      totalContributions,
      profit: profitBeforeTax,
      taxPaid,
      finalValue,
    };
  };
  
  // Compute summary of all calculators
  const summary = computed(() => {
    return calculators.value.reduce(
      (acc, calc) => ({
        totalContributions: acc.totalContributions + calc.results.totalContributions,
        totalProfit: acc.totalProfit + calc.results.profit,
        totalTaxPaid: acc.totalTaxPaid + calc.results.taxPaid,
        totalFinalValue: acc.totalFinalValue + calc.results.finalValue,
      }),
      {
        totalContributions: 0,
        totalProfit: 0,
        totalTaxPaid: 0,
        totalFinalValue: 0,
      }
    );
  });
  
  // Add a new calculator
  const addCalculator = () => {
    calculators.value.push({
      id: uuidv4(),
      assetType: '',
      initialInvestment: 1000,
      systematicPayment: 100,
      paymentFrequency: 'monthly',
      compoundingFrequency: 'monthly',
      increaseType: 'none',
      increaseValue: 0,
      years: 5,
      months: 0,
      rate: 5,
      taxRate: 15,
      results: {
        contributions: 0,
        totalContributions: 0,
        profit: 0,
        taxPaid: 0,
        finalValue: 0,
      },
    });
    calculateROI(calculators.value.length - 1);
  };
  
  // Remove a calculator
  const removeCalculator = (index) => {
    calculators.value.splice(index, 1);
  };
  
  // Initialize calculations
  onMounted(() => {
    calculators.value.forEach((_, index) => calculateROI(index));
  });
  </script>
  
  <style scoped>
  /* Tailwind CSS is used directly in template */
  </style>