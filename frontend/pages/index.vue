<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-gray-700 text-lg mb-2">
            Halo, Selamat Datang di Penelitian
          </h1>
          <h2 class="text-4xl font-bold text-cyan-600 mb-2">
            Penggunaan <span class="italic">Artificial Intelligence</span> (AI)
          </h2>
          <h2 class="text-4xl font-bold text-cyan-600">
            pada Dermatitis Atopik
          </h2>
        </div>

        <!-- AI Icon -->
        <div
          class="w-24 h-24 bg-cyan-100 rounded-lg flex items-center justify-center border-2 border-cyan-300"
        >
          <svg
            class="w-12 h-12 text-cyan-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 17.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5zM17 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
            />
          </svg>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex gap-8 items-start">
        <!-- Left Side - Description Card -->
        <div class="flex-1">
          <div
            class="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 border-4 border-black shadow-lg relative"
          >
            <!-- Decorative elements -->
            <div class="absolute top-4 right-4">
              <div class="flex gap-2">
                <div class="w-4 h-4 bg-teal-500 rounded-full"></div>
                <div class="w-4 h-4 bg-teal-500 rounded-full"></div>
                <div class="w-4 h-4 bg-teal-500 rounded-full"></div>
              </div>
            </div>

            <!-- Sparkle decorations -->
            <div class="absolute top-6 left-6">
              <svg
                class="w-6 h-6 text-yellow-400 transform rotate-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0l3.5 7.5L24 12l-8.5 4.5L12 24l-3.5-7.5L0 12l8.5-4.5z"
                />
              </svg>
            </div>

            <div class="absolute bottom-6 right-12">
              <svg
                class="w-8 h-8 text-yellow-400 transform -rotate-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0l3.5 7.5L24 12l-8.5 4.5L12 24l-3.5-7.5L0 12l8.5-4.5z"
                />
              </svg>
            </div>

            <div class="text-gray-800 text-lg leading-relaxed mb-6">
              <p class="mb-4">
                Penelitian ini dilakukan dengan mengembangkan aplikasi yang
                dapat membantu dokter dalam penegakan diagnosis dermatitis
                atopik.
              </p>
              <p>
                Dalam kuesioner ini, akan ditampilkan kasus penyakit kulit yang
                didiagnosis oleh AI serta alasan dibalik diagnosis tersebut.
                Anda kemudian akan diminta untuk mengisi kuesioner berdasarkan
                informasi yang diberikan.
              </p>
            </div>
          </div>
        </div>

        <!-- Right Side - Medical Professional and System -->
        <div class="flex-1 flex flex-col items-center gap-6">
          <!-- Doctor Character -->
          <div class="relative">
            <div
              class="w-32 h-32 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center"
            >
              <!-- Doctor illustration -->
              <div
                class="w-24 h-24 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full relative"
              >
                <!-- Hair -->
                <div
                  class="absolute -top-2 left-4 w-16 h-8 bg-red-400 rounded-full"
                ></div>
                <!-- Face -->
                <div
                  class="absolute top-2 left-2 w-20 h-20 bg-orange-200 rounded-full"
                >
                  <!-- Eyes -->
                  <div
                    class="absolute top-6 left-4 w-2 h-2 bg-black rounded-full"
                  ></div>
                  <div
                    class="absolute top-6 right-4 w-2 h-2 bg-black rounded-full"
                  ></div>
                  <!-- Nose -->
                  <div
                    class="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-300 rounded-full"
                  ></div>
                  <!-- Mouth -->
                  <div
                    class="absolute top-10 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-red-400 rounded-full"
                  ></div>
                </div>
              </div>
            </div>

            <!-- Arm with skin condition -->
            <div
              class="absolute -bottom-4 -left-8 w-16 h-8 bg-orange-200 rounded-lg"
            >
              <div
                class="w-3 h-3 bg-red-300 rounded-full absolute top-1 left-2"
              ></div>
              <div
                class="w-2 h-2 bg-red-400 rounded-full absolute top-3 left-6"
              ></div>
              <div
                class="w-2 h-2 bg-red-300 rounded-full absolute top-1 right-2"
              ></div>
            </div>
          </div>

          <!-- AI System Interface -->
          <div
            class="bg-white rounded-lg shadow-xl border-2 border-gray-200 p-4 w-80"
          >
            <div class="bg-gray-800 rounded-t-lg p-2 -mx-4 -mt-4 mb-4">
              <div class="text-white font-semibold text-center">
                Dermatitis AI
              </div>
              <div class="flex justify-center mt-1">
                <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                <div class="w-8 h-1 bg-blue-400 rounded-full ml-1"></div>
              </div>
            </div>

            <!-- Image analysis area -->
            <div
              class="bg-orange-200 rounded-lg h-32 mb-4 relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-br from-orange-200 to-red-300"
              >
                <div
                  class="w-4 h-4 bg-red-400 rounded-full absolute top-4 left-6"
                ></div>
                <div
                  class="w-3 h-3 bg-red-500 rounded-full absolute top-8 right-8"
                ></div>
                <div
                  class="w-2 h-2 bg-red-300 rounded-full absolute bottom-6 left-4"
                ></div>
                <div
                  class="w-5 h-5 bg-red-400 rounded-full absolute bottom-4 right-6"
                ></div>
              </div>
            </div>

            <!-- Diagnosis buttons -->
            <div class="space-y-2">
              <button
                class="w-full bg-red-100 border-2 border-red-300 rounded-lg p-2 text-sm font-medium text-red-700 hover:bg-red-200 transition-colors"
              >
                Dermatitis Atopik
              </button>
              <button
                class="w-full bg-gray-100 border-2 border-gray-300 rounded-lg p-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
              >
                Bukan Dermatitis Atopik
              </button>
            </div>
          </div>

          <!-- Medical Professional -->
          <div class="relative">
            <div class="w-24 h-32 bg-blue-900 rounded-t-full">
              <!-- Doctor's head -->
              <div class="w-16 h-16 bg-orange-200 rounded-full mx-auto mb-2">
                <!-- Hijab/Hair -->
                <div
                  class="w-20 h-12 bg-blue-900 rounded-full -mt-2 -mx-2"
                ></div>
                <!-- Face -->
                <div
                  class="w-14 h-14 bg-orange-200 rounded-full mx-auto relative"
                >
                  <div
                    class="absolute top-4 left-3 w-1 h-1 bg-black rounded-full"
                  ></div>
                  <div
                    class="absolute top-4 right-3 w-1 h-1 bg-black rounded-full"
                  ></div>
                </div>
              </div>
              <!-- Body -->
              <div class="w-20 h-16 bg-white rounded-t-lg mx-auto">
                <div class="w-full h-4 bg-blue-900 rounded-t-lg"></div>
              </div>
            </div>

            <!-- Clipboard -->
            <div
              class="absolute -right-6 top-8 w-8 h-10 bg-orange-100 rounded border-2 border-orange-300"
            >
              <div class="w-6 h-1 bg-gray-400 rounded mx-auto mt-1"></div>
              <div class="w-4 h-1 bg-gray-300 rounded mx-auto mt-1"></div>
              <div class="w-5 h-1 bg-gray-300 rounded mx-auto mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Questionnaire Section -->
      <div
        class="mt-16 bg-white rounded-2xl shadow-xl border border-gray-200 p-8"
      >
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">
            KUESIONER TINGKAT KEYAKINAN PENGGUNA
          </h2>
          <p class="text-gray-600 text-lg">
            Silahkan isi kuesioner di bawah ini
          </p>
        </div>

        <form @submit.prevent="submitForm" class="space-y-12">
          <!-- Bagian 1: Informasi Responden -->
          <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
            <h3
              class="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2"
            >
              Bagian 1: Informasi Responden
            </h3>

            <div class="space-y-6">
              <!-- Question 1 -->
              <div>
                <label class="block text-lg font-semibold text-gray-700 mb-3">
                  1. Apakah profesi Anda?
                </label>
                <div class="space-y-2">
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="profession"
                      value="dokter_umum"
                      v-model="formData.profession"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">Dokter Umum</span>
                  </label>
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="profession"
                      value="dokter_spesialis"
                      v-model="formData.profession"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">Dokter Spesialis DVE</span>
                  </label>
                </div>
              </div>

              <!-- Question 2 -->
              <div>
                <label class="block text-lg font-semibold text-gray-700 mb-3">
                  2. Berapa lama Anda telah bekerja/praktik dalam bidang medis?
                </label>
                <div class="space-y-2">
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="experience"
                      value="kurang_5_tahun"
                      v-model="formData.experience"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">Kurang dari 5 tahun</span>
                  </label>
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="experience"
                      value="5_10_tahun"
                      v-model="formData.experience"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">5 – 10 tahun</span>
                  </label>
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="experience"
                      value="lebih_10_tahun"
                      v-model="formData.experience"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">Lebih dari 10 tahun</span>
                  </label>
                </div>
              </div>

              <!-- Question 3 -->
              <div v-show="formData.profession === 'dokter_umum'">
                <label class="block text-lg font-semibold text-gray-700 mb-3">
                  3. Jika Anda Dokter Umum, apakah telah menyelesaikan
                  <em>internship</em>?
                </label>
                <div class="space-y-2">
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="internship"
                      value="ya"
                      v-model="formData.internship"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">Ya</span>
                  </label>
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="internship"
                      value="tidak"
                      v-model="formData.internship"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">Tidak</span>
                  </label>
                </div>
              </div>

              <!-- Question 4 -->
              <div
                v-show="
                  formData.profession === 'dokter_umum' &&
                  formData.internship === 'ya'
                "
              >
                <label class="block text-lg font-semibold text-gray-700 mb-3">
                  4. Jika iya, berapa lama Anda telah menyelesaikan
                  <em>internship</em>?
                </label>
                <div class="space-y-2">
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="internship_duration"
                      value="kurang_1_tahun"
                      v-model="formData.internshipDuration"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">Kurang dari 1 tahun</span>
                  </label>
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="internship_duration"
                      value="1_5_tahun"
                      v-model="formData.internshipDuration"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">1 – 5 tahun</span>
                  </label>
                  <label
                    class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name="internship_duration"
                      value="lebih_5_tahun"
                      v-model="formData.internshipDuration"
                      :disabled="isQuistionare1Submited"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <span class="ml-3 text-gray-700">> 5 tahun</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Bagian 2: Pengalaman Penggunaan Sistem AI -->
          <div
            class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6"
          >
            <h3
              class="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-2"
            >
              Bagian 2: Pengalaman Penggunaan Sistem AI
            </h3>

            <div>
              <label class="block text-lg font-semibold text-gray-700 mb-3">
                1. Seberapa sering Anda menggunakan sistem AI dalam praktik
                klinis Anda?
              </label>
              <div class="space-y-2">
                <label
                  class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="radio"
                    name="ai_usage"
                    value="sangat_sering"
                    v-model="formData.aiUsage"
                    :disabled="isQuistionare1Submited"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                  />
                  <span class="ml-3 text-gray-700">Sangat sering</span>
                </label>
                <label
                  class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="radio"
                    name="ai_usage"
                    value="sering"
                    v-model="formData.aiUsage"
                    :disabled="isQuistionare1Submited"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                  />
                  <span class="ml-3 text-gray-700">Sering</span>
                </label>
                <label
                  class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="radio"
                    name="ai_usage"
                    value="kadang_kadang"
                    v-model="formData.aiUsage"
                    :disabled="isQuistionare1Submited"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                  />
                  <span class="ml-3 text-gray-700">Kadang-kadang</span>
                </label>
                <label
                  class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="radio"
                    name="ai_usage"
                    value="jarang"
                    v-model="formData.aiUsage"
                    :disabled="isQuistionare1Submited"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                  />
                  <span class="ml-3 text-gray-700">Jarang</span>
                </label>
                <label
                  class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="radio"
                    name="ai_usage"
                    value="tidak_pernah"
                    v-model="formData.aiUsage"
                    :disabled="isQuistionare1Submited"
                    class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
                  />
                  <span class="ml-3 text-gray-700">Tidak pernah</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="text-center pt-6">
            <button
              type="submit"
              :disabled="!isFormValid"
              :class="[
                'font-bold py-4 px-12 rounded-xl shadow-lg transform transition-all duration-200 text-lg',
                isFormValid
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed',
              ]"
            >
              Selanjutnya
            </button>

            <!-- Form validation status -->
            <div class="mt-4 text-sm text-gray-600">
              <p v-if="!isFormValid" class="text-red-500">
                Mohon lengkapi semua pertanyaan yang diperlukan
              </p>
              <p v-else class="text-green-600">Form siap untuk dikirim</p>
            </div>

            <!-- Reset button -->
            <!--            <button-->
            <!--                type="button"-->
            <!--                @click="resetForm"-->
            <!--                class="mt-4 bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">-->
            <!--              Reset Form-->
            <!--            </button>-->
          </div>
        </form>
      </div>

      <div
        v-show="isQuistionare1Submited"
        ref="imagePredictRef"
        class="max-w-4xl mx-auto p-6 mt-[100px]"
      >
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-2">
            KLASIFIKASI DERMATITIS ATOPIK MULTIMODAL
          </h2>
          <p class="text-gray-600 text-lg">
            Silahkan pilih sampel data di bawah untuk melihat hasil prediksi
            dari sistem
          </p>
        </div>

        <div class="max-w-7xl mx-auto">
          <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">
            Sampel Kasus Dermatitis
          </h1>

          <!-- Image Grid -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
          >
            <div
              v-for="sample in samples"
              :key="sample.id"
              @click="selectImage(sample)"
              class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              <div
                class="aspect-square bg-gray-200 flex items-center justify-center"
              >
                <img
                  :src="sample.image"
                  :alt="`Case ${sample.id}`"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <div class="p-4">
                <h3 class="font-semibold text-gray-900 mb-2">
                  Case #{{ sample.id }}
                </h3>
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
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
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
                  <h3 class="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
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

          <!-- Prediction Probabilities -->
          <div v-if="predictionResult" class="mt-8">
            <div
              class="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
            >
              <!-- Result Header -->
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">
                    Case #{{ predictionResult.caseId }} - AI Prediction Result
                  </h3>
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center">
                      <span class="text-sm font-medium text-gray-600"
                        >Predicted Class:</span
                      >
                      <span
                        class="ml-2 px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800"
                      >
                        {{ predictionResult.predictedClass }}
                      </span>
                    </div>
                    <div class="flex items-center">
                      <span class="text-sm font-medium text-gray-600"
                        >Confidence:</span
                      >
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
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>

              <!-- Visual Results Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <!-- Original Image -->
                <div class="space-y-3">
                  <h4 class="font-semibold text-gray-800">Original Image</h4>
                  <div
                    class="bg-gray-100 rounded-lg overflow-hidden aspect-square"
                  >
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
                  <div
                    class="bg-gray-100 rounded-lg overflow-hidden aspect-square"
                  >
                    <img
                      :src="predictionResult.gradcamImage"
                      :alt="`GradCAM for Case ${predictionResult.caseId}`"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
                  <p class="text-xs text-gray-600">
                    Red areas indicate regions most influential for the AI's
                    decision
                  </p>
                </div>

                <!-- Force Bar Chart -->
                <div class="space-y-3">
                  <h4 class="font-semibold text-gray-800">
                    Feature Importance
                  </h4>
                  <div
                    class="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center"
                  >
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
                  <svg
                    class="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    ></path>
                  </svg>
                  AI Explanation (XAI)
                </h4>
                <div class="text-blue-800 space-y-2">
                  <p>
                    <strong>Model Decision:</strong>
                    {{ predictionResult.xaiExplanation.decision }}
                  </p>
                  <p>
                    <strong>Key Visual Features:</strong>
                    {{ predictionResult.xaiExplanation.keyFeatures }}
                  </p>
                  <p>
                    <strong>Confidence Reasoning:</strong>
                    {{ predictionResult.xaiExplanation.reasoning }}
                  </p>
                  <p>
                    <strong>Alternative Considerations:</strong>
                    {{ predictionResult.xaiExplanation.alternatives }}
                  </p>
                </div>
              </div>

              <!-- Prediction Probabilities -->
              <div class="mt-4">
                <h4 class="font-semibold text-gray-800 mb-3">
                  Class Probabilities
                </h4>
                <div class="space-y-2">
                  <div
                    v-for="prob in predictionResult.classProbabilities"
                    :key="prob.class"
                    class="flex items-center"
                  >
                    <span class="w-24 text-sm font-medium text-gray-700"
                      >{{ prob.class }}:</span
                    >
                    <div class="flex-1 bg-gray-200 rounded-full h-2 ml-3 mr-3">
                      <div
                        class="h-2 rounded-full transition-all duration-300"
                        :class="
                          prob.probability > 0.5
                            ? 'bg-green-500'
                            : 'bg-blue-500'
                        "
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
    </div>
  </div>
</template>

<script setup>
import { SAMPLES } from "~/constants/samples.ts";
import {nextTick, ref} from "vue";
// Page meta
useHead({
  title: "AI Dermatitis Research",
  meta: [
    {
      name: "description",
      content: "Research on AI application for atopic dermatitis diagnosis",
    },
  ],
});

const isQuistionare1Submited = ref(false);
const isCasePredicted = ref(false);

const samples = ref(SAMPLES);
// Form data using ref
const formData = ref({
  // Bagian 1: Informasi Responden
  profession: "",
  experience: "",
  internship: "",
  internshipDuration: "",

  // Bagian 2: Pengalaman Penggunaan Sistem AI
  aiUsage: "",
});

// Reactive state
const selectedImage = ref(null);
const selectedCases = ref([]);
const predictionResult = ref(null)
const imageDetailRef = ref(null);
const imagePredictRef = ref(null);

// Form submission handler
const submitForm = () => {
  console.log(formData.value);
  // Validate required fields
  if (
    !formData.value.profession ||
    !formData.value.experience ||
    !formData.value.aiUsage
  ) {
    alert("Mohon lengkapi semua pertanyaan yang wajib diisi");
    return;
  }

  // Additional validation for internship questions if profession is "dokter_umum"
  if (
    formData.value.profession === "dokter_umum" &&
    !formData.value.internship
  ) {
    alert("Mohon jawab pertanyaan tentang internship");
    return;
  }

  // If internship is "ya", then internshipDuration is required
  if (
    formData.value.internship === "ya" &&
    !formData.value.internshipDuration
  ) {
    alert("Mohon jawab pertanyaan tentang durasi internship");
    return;
  }

  isQuistionare1Submited.value = true;
  // Auto scroll to image detail after a short delay to ensure DOM is updated
  nextTick(() => {
    if (imagePredictRef.value) {
      imagePredictRef.value.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });

  // Log form data (in real app, you would send this to an API)
  console.log("Form Data:", formData.value);

  // Show success message
  // alert('Terima kasih! Kuesioner Anda telah berhasil dikirim.')

  // Reset form
  // resetForm()
};

// Reset form function
const resetForm = () => {
  formData.value = {
    profession: "",
    experience: "",
    internship: "",
    internshipDuration: "",
    aiUsage: "",
  };
};

// Computed property to check if form is valid
const isFormValid = computed(() => {
  const baseValid =
    formData.value.profession &&
    formData.value.experience &&
    formData.value.aiUsage;

  if (formData.value.profession === "dokter_umum") {
    if (!formData.value.internship) return false;
    if (
      formData.value.internship === "ya" &&
      !formData.value.internshipDuration
    )
      return false;
  }

  return baseValid;
});

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

// Watch for profession changes to reset internship fields
watch(
  () => formData.value.profession,
  (newVal) => {
    if (newVal !== "dokter_umum") {
      formData.value.internship = "";
      formData.value.internshipDuration = "";
    }
  }
);

// Watch for internship changes to reset duration if "tidak"
watch(
  () => formData.value.internship,
  (newVal) => {
    if (newVal === "tidak") {
      formData.value.internshipDuration = "";
    }
  }
);

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
/* Additional custom styles if needed */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>