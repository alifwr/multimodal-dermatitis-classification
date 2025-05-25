<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">
        Medical Cases Gallery
      </h1>

      <!-- Image Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div
            v-for="sample in SAMPLES"
            :key="sample.id"
            @click="selectImage(sample)"
            class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <div class="aspect-square bg-gray-200 flex items-center justify-center">
            <img
                :src="sample.image"
                :alt="`Case ${sample.id}`"
                class="w-full h-full object-cover"
                @error="handleImageError"
            />
          </div>
          <div class="p-4">
            <h3 class="font-semibold text-gray-900 mb-2">Case #{{ sample.id }}</h3>
            <p class="text-sm text-gray-600 line-clamp-3">
              {{ sample.description.substring(0, 100) }}...
            </p>
          </div>
        </div>
      </div>

      <!-- Image Detail Modal/Section -->
      <div
          v-if="selectedImage"
          ref="imageDetailRef"
          class="bg-white rounded-lg shadow-xl p-6 max-w-4xl mx-auto"
      >
        <div class="flex justify-between items-start mb-4">
          <h2 class="text-2xl font-bold text-gray-900">
            Case #{{ selectedImage.id }} Details
          </h2>
          <button
              @click="closeDetail"
              class="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Image Display -->
          <div class="bg-gray-100 rounded-lg overflow-hidden">
            <img
                :src="selectedImage.image"
                :alt="`Case ${selectedImage.id}`"
                class="w-full h-auto object-contain max-h-96"
                @error="handleImageError"
            />
          </div>

          <!-- Description and Actions -->
          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p class="text-gray-700 leading-relaxed">
                {{ selectedImage.description }}
              </p>
            </div>

            <!-- Select Button -->
            <div class="pt-4 border-t">
              <button
                  @click="selectCase(selectedImage)"
                  class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Select This Case
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Prediction Result Display -->
      <div v-if="predictionResult" class="mt-8">
        <div class="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
          <!-- Result Header -->
          <div class="flex justify-between items-start mb-6">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 mb-2">
                Case #{{ predictionResult.caseId }} - AI Prediction Result
              </h3>
              <div class="flex items-center space-x-4">
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-600">Predicted Class:</span>
                  <span class="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    {{ predictionResult.predictedClass }}
                  </span>
                </div>
                <div class="flex items-center">
                  <span class="text-sm font-medium text-gray-600">Confidence:</span>
                  <span class="ml-2 text-lg font-bold text-green-600">
                    {{ (predictionResult.confidence * 100).toFixed(1) }}%
                  </span>
                </div>
              </div>
            </div>
            <button
                @click="clearPredictionResult"
                class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Visual Results Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <!-- Original Image -->
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-800">Original Image</h4>
              <div class="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                    :src="predictionResult.originalImage"
                    :alt="`Original Case ${predictionResult.caseId}`"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                />
              </div>
            </div>

            <!-- GradCAM Visualization -->
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-800">GradCAM Heatmap</h4>
              <div class="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                    :src="predictionResult.gradcamImage"
                    :alt="`GradCAM for Case ${predictionResult.caseId}`"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                />
              </div>
              <p class="text-xs text-gray-600">
                Red areas indicate regions most influential for the AI's decision
              </p>
            </div>

            <!-- Force Bar Chart -->
            <div class="space-y-3">
              <h4 class="font-semibold text-gray-800">Feature Importance</h4>
              <div class="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                <img
                    :src="predictionResult.forceBarImage"
                    :alt="`Force bar chart for Case ${predictionResult.caseId}`"
                    class="w-full h-full object-contain"
                    @error="handleImageError"
                />
              </div>
              <p class="text-xs text-gray-600">
                Feature contributions to the prediction decision
              </p>
            </div>
          </div>

          <!-- XAI Explanation -->
          <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
            <h4 class="font-semibold text-blue-900 mb-3 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              AI Explanation (XAI)
            </h4>
            <div class="text-blue-800 space-y-2">
              <p>
                <strong>Model Decision:</strong> {{ predictionResult.xaiExplanation.decision }}
              </p>
              <p>
                <strong>Key Visual Features:</strong> {{ predictionResult.xaiExplanation.keyFeatures }}
              </p>
              <p>
                <strong>Confidence Reasoning:</strong> {{ predictionResult.xaiExplanation.reasoning }}
              </p>
              <p>
                <strong>Alternative Considerations:</strong> {{ predictionResult.xaiExplanation.alternatives }}
              </p>
            </div>
          </div>

          <!-- Prediction Probabilities -->
          <div class="mt-4">
            <h4 class="font-semibold text-gray-800 mb-3">Class Probabilities</h4>
            <div class="space-y-2">
              <div
                  v-for="prob in predictionResult.classProbabilities"
                  :key="prob.class"
                  class="flex items-center"
              >
                <span class="w-24 text-sm font-medium text-gray-700">{{ prob.class }}:</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2 ml-3 mr-3">
                  <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="prob.probability > 0.5 ? 'bg-green-500' : 'bg-blue-500'"
                      :style="{ width: `${prob.probability * 100}%` }"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-900">
                  {{ (prob.probability * 100).toFixed(1) }}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, nextTick, watch} from 'vue'

// Sample data
const SAMPLES = [
  {
    id: 1,
    image: "/samples/69_NonDA_Pso_AIP_K1_tungkai-kanan.jpeg",
    description: "Perempuan berusia 24 tahun, datang untuk kontrol pasca foto terapi, saat ini keluhan bercak merah terasa gatal di area paha dan perut. Keluhan pertama kali muncul berupa bercak kemerahan yang gatal di badan sejak usia 18 tahun (5 tahun yang lalu(> 4minggu)). Faktor pencetus tidak diketahui. Riwayat keluhan serupa pada keluarga disangkal."
  },
  {
    id: 2,
    image: "/samples/738_NonDA_DN_YKL_K2_punggung-kaki-kiri.jpeg",
    description: "Laki-laki berusia 21 tahun datang untuk kontrol 1 minggu dengan keluhan gatal pada punggung kaki kiri sudah berkurang. Keluhan pertama kali muncul bercak yang gatal pada tungkai dan punggung kaki kiri sejak 1 bulan yang lalu (> 4minggu). Saat ini pasien memiliki riwayat infeksi gigi dan gusi (gingivitis, cheilitis). Riwayat alergi makanan dan asma bronkiale diakui pasien. Riwayat keluhan serupa pada pasien dan asma bronkiale pada keluarga diakui."
  },
  {
    id: 3,
    image: "/samples/787_NonDA_DK_JP_K1_telapak-tangan-kiri.jpeg",
    description: "Perempuan usia 41 tahun, datang dengan bercak merah disertai kulit yang kering dan pecah-pecah pada tangan yang memberat sejak 4 bulan terakhir (> 4minggu). Keluhan timbul bila pasien memakai sarung tangan latex, sabun cuci piring cair, detergen cair. Pasien memiliki alergi makanan dan hipertensi. Riwayat alergi dan penyakit serupa pada keluarga disangkal."
  },
  {
    id: 4,
    image: "/samples/809_NonDA_LSK_ML2_lutut-kanan.jpeg",
    description: "Laki-laki usia 46 tahun datang dengan keluhan bercak gelap tebal bersisik di kedua lipat lutut dan kedua kaki sejak 4 tahun lalu (> 4minggu). Keluhan awal berupa gatal yang digaruk hingga menebal. Riwayat serupa pada keluarga disangkal."
  },
  {
    id: 5,
    image: "/samples/1085_DA_AFL_lipat-lutut-kiri.jpeg",
    description: "Laki-laki usia 6 tahun, datang dengan keluhan bercak merah gatal dan membasah di lipat lutut kiri. Bercak juga ditemukan pada dahi, leher, lipat siku, lutut, punggung, pinggang, lipat paha, paha, dada, dan ketiak sejak setahun yang lalu. Keluhan dirasakan sejak satu tahun yang lalu (> 4minggu).. Keluhan memberat bila pasien berkeringat. Keluarga pasien tidak memiliki Riwayat yang sama dengan pasien. Kriteria Mayor: pruritus, likenifikasi fleksural / linearitas pada pasien dewasa, keterlibatan area wajah / ekstensor pada pasien bayi dan anak, dermatitis kronik / kronis berulang, Kriteria Minor: xerosis, gatal bila berkeringat, perjalanan penyakit dipengaruhi oleh faktor lingkungan dan emosi."
  },
  {
    id: 6,
    image: "/samples/1088_DA_AFL_lipat-siku-kiri.jpeg",
    description: "Laki-laki usia 6 tahun, datang dengan keluhan bercak merah gatal dan membasah di lipat siku kiri. Bercak juga ditemukan pada dahi, leher, lipat lutut, lutut, punggung, pinggang, lipat paha, paha, dada, dan ketiak sejak setahun yang lalu (> 4 minggu). Keluhan dirasakan  sejak satu tahun yang lalu. Keluhan memberat bila pasien berkeringat. Keluarga pasien tidak memiliki riwayat yang sama dengan pasien. Kriteria Mayor: pruritus, likenifikasi fleksural / linearitas pada pasien dewasa, keterlibatan area wajah / ekstensor pada pasien bayi dan anak, dermatitis kronik / kronis berulang. Kriteria Minor: xerosis, gatal bila berkeringat, perjalanan penyakit dipengaruhi oleh faktor lingkungan dan emosi."
  },
  {
    id: 7,
    image: "/samples/1146_DA_AZL_pipi.jpeg",
    description: "Laki-laki berusia 1 tahun 3 bulan, datang untuk kontrol 2 minggu. Keluhan pertama kali muncul bintil dan bercak muncul  di kedua pipi dan terasa gatal setelah 1 bulan mengkonsumsi susu sapi (susu formula bebelac). Keluhan sudah dirasakan >4 minggu. Selain di pipi bercak ditemukan di lipat siku, tungkai, dada, perut, punggung, lipat paha. Keluhan memberat bila pasien berkeringat, makan keju, ikan salmon dan ikan dori. Keluarga pasien memiliki riwayat rhinitis alergi. Kriteria Mayor: pruritus, likenifikasi fleksural / linearitas pada pasien dewasa, keterlibatan area wajah / ekstensor pada pasien bayi dan anak, dermatitis kronik / kronis berulang, riwayat atopi pada diri / keluarga (asma bronkial, rinitis alergi, dermatitis atopik). Kriteria Minor: xerosis, awitan pada usia dini, gatal bila berkeringat, intoleransi makanan."
  }
]

// Reactive state
const selectedImage = ref(null)
const selectedCases = ref([])
const predictionResult = ref(null)
const imageDetailRef = ref(null)

// Methods
const selectImage = (sample) => {
  selectedImage.value = sample

  // Auto scroll to image detail after a short delay to ensure DOM is updated
  nextTick(() => {
    if (imageDetailRef.value) {
      imageDetailRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  })
}

const closeDetail = () => {
  selectedImage.value = null
}

const selectCase = (sample) => {
  // Call your custom function here
  onCaseSelected(sample)

  // Optionally close the detail view
  // closeDetail()
}

const removeSelectedCase = (caseId) => {
  selectedCases.value = selectedCases.value.filter(id => id !== caseId)
}

const clearSelectedCases = () => {
  selectedCases.value = []
}

const removePredictionResult = (caseId) => {
  predictionResult.value = null
}

const clearPredictionResult = () => {
  predictionResult.value = null
}

const handleImageError = (event) => {
  // Replace broken image with placeholder
  event.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5Ij5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+PC9zdmc+'
}

// Custom function that gets called when a case is selected
const onCaseSelected = async (sample) => {
  console.log('Case selected:', sample)

  // Add to selected cases if not already selected
  if (!selectedCases.value.includes(sample.id)) {
    selectedCases.value.push(sample.id)
  }

  // Clear previous result and set new one (only one result at a time)
  predictionResult.value = null

  // Simulate AI prediction process
  try {
    // Here you would normally call your AI prediction API
    // const newPredictionResult = await predictCase(sample)

    // Mock prediction result for demonstration
    const mockPredictionResult = {
      caseId: sample.id,
      originalImage: sample.image,
      gradcamImage: `/gradcam/gradcam_case_${sample.id}.png`, // Path to GradCAM heatmap
      forceBarImage: `/forcebar/forcebar_case_${sample.id}.png`, // Path to force bar chart
      predictedClass: sample.id <= 4 ? 'Non-Dermatitis Atopik' : 'Dermatitis Atopik',
      confidence: 0.85 + Math.random() * 0.14, // Random confidence between 0.85-0.99
      classProbabilities: [
        {
          class: 'Dermatitis Atopik',
          probability: sample.id > 4 ? 0.85 + Math.random() * 0.14 : 0.1 + Math.random() * 0.3
        },
        {
          class: 'Non-Dermatitis Atopik',
          probability: sample.id <= 4 ? 0.85 + Math.random() * 0.14 : 0.1 + Math.random() * 0.3
        }
      ],
      xaiExplanation: {
        decision: `The AI model classified this case as ${sample.id <= 4 ? 'Non-Dermatitis Atopik' : 'Dermatitis Atopik'} based on analysis of skin texture, lesion patterns, and morphological features.`,
        keyFeatures: sample.id > 4
            ? 'Eczematous patches, lichenification in flexural areas, erythematous lesions with scaling'
            : 'Isolated lesions, absence of typical atopic distribution, different morphological characteristics',
        reasoning: `High confidence due to clear presence of ${sample.id > 4 ? 'typical atopic dermatitis features including chronic inflammation patterns and characteristic distribution' : 'non-atopic features with distinct lesion morphology'}.`,
        alternatives: sample.id > 4
            ? 'Alternative diagnoses like contact dermatitis were considered but ruled out due to distribution pattern and chronicity.'
            : 'Psoriasis and contact dermatitis were considered as differential diagnoses based on lesion characteristics.'
      }
    }

    // Set the new result (replaces any previous result)
    predictionResult.value = mockPredictionResult

    console.log('Prediction completed:', mockPredictionResult)

  } catch (error) {
    console.error('Prediction failed:', error)
    alert('Failed to get AI prediction. Please try again.')
  }
}

// Optional: Watch for changes in selected cases
watch(selectedCases, (newCases) => {
  console.log('Selected cases updated:', newCases)
}, {deep: true})

// Watch for changes in prediction result
watch(predictionResult, (newResult) => {
  console.log('Prediction result updated:', newResult)
}, {deep: true})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>