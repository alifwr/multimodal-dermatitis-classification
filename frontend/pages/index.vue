<template>
  <div>

    <section id="header" class="bg-[#99aace] h-screen pt-12 md:pt-24">
      <div class="flex flex-col h-3/4 mx-auto max-w-6xl text-center mb-32 md:mb-64 px-4">
        <span class="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-[#f0cdff] font-opensauce font-bold leading-tight">
          MULTIMODAL AI DERMATITIS ATOPIK
        </span>
        <div class="flex items-center justify-center h-full z-20 mt-8 md:mt-0">
          <AuthButton label="MASUK DENGAN GOOGLE" />
        </div>
      </div>
      <NuxtImg class="absolute bottom-[100px] md:bottom-[200px] left-1/2 -translate-x-1/2 w-3/5 md:w-2/5" src="/images/hands.svg" />
      <NuxtImg class="absolute bottom-0 w-screen z-10" src="/images/derm.svg" />
    </section>

    <section id="introduction" class="bg-[#fbf6f3] min-h-screen pt-12 md:pt-24 pb-12">
      <div class="flex flex-col h-full mx-auto px-4 md:px-16">
        <div class="max-w-4xl text-center mx-auto">
          <span class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#f0cdff] font-opensauce font-bold leading-tight">
            Apa itu Multimodal AI Dermatitis Atopik?
          </span>
        </div>
        <div class="flex flex-col lg:flex-row items-center justify-evenly h-full px-4 md:px-12 lg:px-48 mt-8 lg:mt-0">
          <div class="flex items-center justify-center h-full w-full lg:w-1/2 px-4 md:px-8 mb-8 lg:mb-0">
            <NuxtImg
                class="h-64 md:h-80 lg:h-4/5 w-full object-contain"
                src="/images/digital-diag.png"
            />
          </div>
          <div class="flex items-center justify-center h-full w-full lg:w-[540px] px-4 md:px-8">
            <span class="font-alegreya text-lg md:text-xl text-justify">
              Multimodal AI Dermatitis Atopik adalah aplikasi berbasis kecerdasan buatan yang membantu dokter umum mengidentifikasi kemungkinan dermatitis atopik. Dengan menginput foto lesi dan anamnesis klinis, aplikasi ini mengklasifikasikan kasus sebagai <strong>dermatitis atopik</strong> atau <strong>bukan dermatitis atopik</strong>. Kategori "bukan dermatitis atopik" mencakup kumpulan diagnosis banding seperti psoriasis vulgaris, liken simpleks kronik, dermatitis numularis, dan dermatitis kontak. Hasil yang diberikan bukan diagnosis final, <strong>keputusan akhir tetap bergantung pada penilaian klinis oleh dokter</strong>.
            </span>
          </div>
        </div>
      </div>
    </section>

    <section id="howto" class="bg-[#99aace] min-h-screen pt-12 md:pt-24 pb-12">
      <div class="flex flex-col h-full mx-auto px-4 md:px-8">
        <div class="max-w-6xl text-center mx-auto">
          <span class="text-4xl sm:text-5xl md:text-6xl text-[#f0cdff] font-opensauce font-bold leading-tight">
            Bagaimana cara penggunaannya?
          </span>
        </div>
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-around h-full mt-12 md:mt-24 space-y-12 lg:space-y-0">

          <div class="flex flex-col h-full text-center items-center mx-4 lg:mx-7">
            <div class="bg-[#fbf6f3] h-[180px] w-[180px] md:h-[240px] md:w-[240px] rounded-full flex items-center justify-center">
              <NuxtImg class="w-3/4 md:w-screen object-contain" src="/images/mobile-diag.png" />
            </div>
            <div class="flex flex-col px-4 md:px-8 mt-8 md:mt-20">
              <span class="text-xl md:text-2xl font-opensauce font-bold">
                Ambil gambar lesi kulit
              </span>
              <span class="text-lg md:text-2xl font-alegreya text-justify mt-4 md:mt-8">
                Pastikan mengambil foto dari jarak dekat, fokus, dan menampilkan lesi kulit dengan pencahayaan yang optimal
              </span>
            </div>
          </div>

          <div class="flex flex-col h-full text-center items-center mx-4 lg:mx-7">
            <div class="bg-[#fbf6f3] h-[180px] w-[180px] md:h-[240px] md:w-[240px] rounded-full flex items-center justify-center">
              <NuxtImg class="w-3/4 md:w-screen object-contain" src="/images/mobile-icon.png" />
            </div>
            <div class="flex flex-col px-4 md:px-8 mt-8 md:mt-20">
              <span class="text-xl md:text-2xl font-opensauce font-bold">
                Unggah gambar & masukkan hasil anamnesis
              </span>
              <span class="text-lg md:text-2xl font-alegreya text-justify mt-4 md:mt-8">
                Masukkan foto yang telah diambil atau sudah disimpan kemudian lengkapi data anamnesis sesuai temuan klinis pasien
              </span>
            </div>
          </div>

          <div class="flex flex-col h-full text-center items-center mx-4 lg:mx-7">
            <div class="bg-[#fbf6f3] h-[180px] w-[180px] md:h-[240px] md:w-[240px] rounded-full flex items-center justify-center">
              <NuxtImg class="w-3/4 md:w-screen object-contain" src="/images/pc.png" />
            </div>
            <div class="flex flex-col px-4 md:px-8 mt-8 md:mt-20">
              <span class="text-xl md:text-2xl font-opensauce font-bold">
                Dapatkan Hasil
              </span>
              <span class="text-lg md:text-2xl font-alegreya text-justify mt-4 md:mt-8">
                Hasil akan segera muncul menunjukkan hasil lesi termasuk <strong>dermatitis</strong> atopik atau <strong>bukan dermatitis atopik</strong>
              </span>
            </div>
          </div>

        </div>
        <div class="flex flex-col h-full text-center items-center mx-4 lg:mx-7 mt-12 md:mt-16">
          <button
              @click="startAssessment"
              :disabled="!loggedIn"
              :class="loggedIn ? 'bg-[#f6f6f6] text-black hover:bg-blue-300 active:bg-blue-500' : 'bg-gray-500 text-gray-300'"
              class="shadow-lg px-12 md:px-16 py-3 rounded-full font-opensauce text-sm md:text-base">
            MULAI SEKARANG
          </button>
        </div>
      </div>
    </section>

    <section v-if="isStarted" id="ai-forms" class="relative bg-[#fbf6f3] z-0 pt-12 md:pt-24 pb-12">
      <NuxtImg class="absolute top-0 rotate-180 w-screen -z-10" src="/images/derm.svg" />
      <div class="flex flex-col h-3/4 mx-auto items-center text-center mb-32 md:mb-64 z-10 px-4">
        <div class="max-w-3xl">
          <span class="text-4xl sm:text-5xl md:text-6xl font-opensauce font-bold leading-tight">
            MULTIMODAL AI DERMATITIS ATOPIK
          </span>
        </div>
        <div class="flex flex-col items-center justify-center h-full mt-16 md:mt-32">
          <span class="text-2xl md:text-3xl font-opensauce font-bold">
            Silakan unggah foto lesi kulit
          </span>
          <span class="text-lg md:text-2xl font-alegreya text-center mt-4 md:mt-8 max-w-4xl px-4">
            Sebagai perhatian, sistem kami hanya menerima foto berupa lesi kulit. Jika Anda mengunggah foto selain foto lesi kulit, akan memengaruhi akurasi prediksi model. Kami tidak akan menyimpan/menggunakan informasi yang sudah Anda unggah/berikan pada website ini.
          </span>

          <div class="flex flex-col items-center justify-center mt-8 md:mt-16 px-4">
            <div class="flex flex-col md:flex-row max-w-lg items-center">
              <NuxtImg class="h-[120px] md:h-[150px] mb-4 md:mb-0" src="/images/211_NonDA_Pso_LCP_lututcopy.jpg"/>
              <div class="flex items-center md:pr-8">
                <span class="text-lg md:text-xl text-center md:text-left font-alegreya md:pl-6">Contoh pengambilan gambar yang direkomendasikan</span>
              </div>
            </div>
          </div>

          <input
              type="file"
              accept="image/*"
              :class="imageUrl?'mt-6':'mt-8'"
              class="w-full max-w-sm cursor-pointer rounded-lg border border-gray-300 p-3 text-gray-700 bg-white shadow-sm hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm md:text-base"
              @change="onImageChange"
          />
          <span v-if="isImageErr" class="text-red-600 md:text-lg font-alegreya">Gambar yang Anda upload bukan gambar lesi kulit!!</span>
          <div v-if="imageUrl" class="preview mb-8 mt-10 px-4">
            <img :src="imageUrl" class="max-h-[250px] md:max-h-[300px] w-auto" alt="Image preview" />
          </div>

          <AuthState v-slot="{loggedIn, user}">
            <div v-if="imageUrl" class="w-full max-w-2xl px-4">
              <flat-form
                  class="mt-8 md:mt-12"
                  type="radio"
                  :options="JENIS_KELAMIN"
                  label="Jenis Kelamin"
                  v-model="formAnamnesys['jenis_kelamin']"
              />
              <flat-form
                  class="mt-8 md:mt-12"
                  type="number"
                  label="Usia"
                  v-model="formAnamnesys['usia']"
              />
              <flat-form
                  class="mt-8 md:mt-12"
                  type="text"
                  label="Keluhan Utama dan Onset"
                  is-multiline
                  v-model="formAnamnesys['keluhan_utama_dan_onset']"
              />
              <flat-form
                  class="mt-8 md:mt-12"
                  type="radio"
                  :options="RIWAYAT_KONTAK"
                  label="Riwayat Kontak dengan bahan Alergen atau Iritan"
                  v-model="formAnamnesys['riwayat_kontak_dengan_bahan_alergen_atau_iritan']"
              />
              <flat-form
                  class="mt-8 md:mt-12"
                  type="checkbox"
                  :options="SUMBER_INFEKSI"
                  label="Sumber Infeksi"
                  v-model="formAnamnesys['sumber_infeksi']"
              />
              <flat-form
                  v-if="formAnamnesys['sumber_infeksi'].includes('Lain-lain (sebutkan pada kolom berikutnya)')"
                  class="mt-8 md:mt-12"
                  type="text"
                  label="Sumber Infeksi Lainnya"
                  v-model="formAnamnesys['sumber_infeksi_lainnya']"
              />
              <flat-form
                  class="mt-8 md:mt-12"
                  type="text"
                  label="Faktor Pencetus Penyakit Sekarang"
                  v-model="formAnamnesys['faktor_pencetus_penyakit_sekarang']"
              />
              <flat-form
                  class="mt-8 md:mt-12"
                  type="radio"
                  :options="LAMA_SAKIT"
                  label="Lama Sakit"
                  v-model="formAnamnesys['lama_sakit']"
              />
              <flat-form
                  class="mt-8 md:mt-12"
                  type="text"
                  label="Lokasi Lesi"
                  v-model="formAnamnesys['lokasi_lesi']"
              />
              <flat-form
                  class="mt-8 md:mt-12"
                  type="checkbox"
                  :options="LESI_AREA_TUBUH_LAINNYA"
                  label="Apakah Terdapat Lesi di Area Tubuh Lainnya"
                  v-model="formAnamnesys['apakah_terdapat_lesi_di_area_tubuh_lainnya']"
              />
              <flat-form
                  v-if="formAnamnesys['apakah_terdapat_lesi_di_area_tubuh_lainnya'].includes('Ada (sebutkan pada kolom berikutnya)')"
                  class="mt-8 md:mt-12"
                  type="text"
                  label="Lesi di Area Tubuh Lainnya"
                  v-model="formAnamnesys['lesi_area_tubuh_lainnya']"
              />
              <flat-form
                  class="mt-8 md:mt-12 text-left-override"
                  type="checkbox"
                  :options="KRITERIA_MAYOR"
                  label="Kriteria Mayor"
                  v-model="formAnamnesys['kriteria_mayor']"
              />

              <flat-form
                  class="mt-8 md:mt-12 text-left-override"
                  type="checkbox"
                  :options="KRITERIA_MINOR"
                  label="Kriteria Minor"
                  v-model="formAnamnesys['kriteria_minor']"
              />

              <flat-form
                  class="mt-8 md:mt-12 text-left-override"
                  type="checkbox"
                  :options="RIWAYAT_PENYAKIT_DAHULU"
                  label="Riwayat Penyakit Dahulu"
                  v-model="formAnamnesys['riwayat_penyakit_dahulu']"
              />

              <flat-form
                  class="mt-8 md:mt-12 text-left-override"
                  type="checkbox"
                  :options="RIWAYAT_PENYAKIT_KELUARGA"
                  label="Riwayat Penyakit Keluarga"
                  v-model="formAnamnesys['riwayat_penyakit_keluarga']"
              />
            </div>
          </AuthState>
        </div>
        <button
            v-if="isFormFilled"
            @click="handleSubmit"
            :disabled="isLoading"
            :class="isLoading ? 'bg-gray-400' : 'hover:bg-[#193483] active:bg-[#5974c3] bg-[#3954a3]'"
            class="mt-16 md:mt-24 px-16 md:px-28 py-4 md:py-6 text-white font-opensans text-xl md:text-2xl font-bold rounded-[40px]">
          KIRIM
        </button>
      </div>
<!--      <div-->
<!--          v-if="result"-->
<!--          class="flex justify-center bg-[#fbf6f3] py-8 md:py-16 px-4"-->
<!--      >-->
<!--        <div-->
<!--            class="flex flex-col justify-center items-center text-center px-8 md:px-12 py-4 min-h-48 max-w-80 md:max-w-96 rounded-[40px]"-->
<!--            :class="result.classname==='DA'?'bg-[#b1d8b7]':'bg-[#b83143]'"-->
<!--        >-->
<!--          <span class="text-2xl md:text-3xl font-opensans font-bold">Hasil Prediksi</span>-->
<!--          <span class="text-lg md:text-xl font-opensans">Klasifikasi penyakit termasuk</span>-->
<!--          <span class="text-lg md:text-xl font-opensans">{{trimTwoDecimal(result?.classname)}}</span>-->
<!--          <span class="text-lg md:text-xl font-opensans">Multimodal AI menghasilkan jawaban tersebut dengan persentase {{result?.confidence}}%</span>-->
<!--        </div>-->
<!--      </div>-->
    </section>

  </div>

  <transition name="fade">
    <div
        v-if="showModal && result"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="showModal = false"
    >
      <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl xl:max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <button
            class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl z-10"
            @click="showModal = false"
        >
          &times;
        </button>

        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 pr-8">Hasil Prediksi</h2>
        <p class="mb-2 text-base sm:text-lg lg:text-xl">
          Klasifikasi penyakit termasuk
          <strong
          >{{ result?.classname }} ({{
              result?.classname == "DA"
                  ? "Dermatitis Atopik"
                  : "Non Dermatitis Atopik"
            }})</strong
          >
        </p>
        <p class="text-xl">
          Model AI menghasilkan jawaban tersebut dengan nilai persentase
          <strong>{{ (result?.confidence).toFixed(2) }} %</strong><br>
          Dengan nilai confidence pada input gambar sebesar <strong>{{ (result?.image_confidence).toFixed(2) }} % </strong>
          dan nilai confidence pada input text sebesar <strong>{{ (result?.text_confidence).toFixed(2) }} % </strong>
        </p>

        <p class="text-3xl font-semibold mt-10 mb-4 sm:mb-6 lg:mb-8">Hasil XAI dari gambar sebagai berikut:</p>

        <div v-if="xaiImageUrl" class="preview mb-8 px-4">
          <img :src="xaiImageUrl" class="max-h-[250px] md:max-h-[300px] w-auto" alt="Image preview" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import {
  JENIS_KELAMIN,
  RIWAYAT_KONTAK,
  SUMBER_INFEKSI,
  LAMA_SAKIT,
  LESI_AREA_TUBUH_LAINNYA,
  KRITERIA_MAYOR,
  KRITERIA_MINOR,
  RIWAYAT_PENYAKIT_DAHULU,
  RIWAYAT_PENYAKIT_KELUARGA
} from "~/constants/options";
import type AnamnesysForm from "~/types/anamnesys";
const runtimeConfig = useRuntimeConfig();
const { loggedIn, user } = useUserSession()

const createDefaultAnamnesysForm = () => ({
  jenis_kelamin: "",
  usia: "",
  keluhan_utama_dan_onset: "",
  riwayat_kontak_dengan_bahan_alergen_atau_iritan: "",
  sumber_infeksi_lainnya: "",
  faktor_pencetus_penyakit_sekarang: "",
  lama_sakit: "",
  lokasi_lesi: "",
  apakah_terdapat_lesi_di_area_tubuh_lainnya: "",
  lesi_area_tubuh_lainnya: "",
  sumber_infeksi: [],
  kriteria_mayor: [],
  kriteria_minor: [],
  riwayat_penyakit_dahulu: [],
  riwayat_penyakit_keluarga: [],
});

const formAnamnesys = ref<AnamnesysForm>(createDefaultAnamnesysForm());
const isImageErr = ref(false);
const imageUrl = ref("");
const xaiImageUrl = ref("");
const filePath = ref("");
const isLoading = ref(false);
const isStarted = ref(false);
const error = ref(null);
const showResult = ref(false);
const showModal = ref(false);
const result = ref<{ classname: string; image_confidence: string; text_confidence: string; confidence: number } | null>();

const isFormFilled = computed((): boolean => {
  // Define string fields
  const stringFields: (keyof AnamnesysForm)[] = [
    'jenis_kelamin',
    'usia',
    'keluhan_utama_dan_onset',
    'riwayat_kontak_dengan_bahan_alergen_atau_iritan',
    'faktor_pencetus_penyakit_sekarang',
    'lama_sakit',
    'lokasi_lesi',
  ];

  // Check if all string fields are non-empty
  const areStringsFilled = stringFields.every(key => {
        const str = formAnamnesys.value[key] as string;
        return str.trim() !== '';
      }
  );

  // Define array fields
  const arrayFields: (keyof AnamnesysForm)[] = [
    'sumber_infeksi',
    'kriteria_mayor',
    'kriteria_minor',
    'riwayat_penyakit_dahulu',
    'riwayat_penyakit_keluarga',
  ];

  // Check if all array fields are non-empty and contain no empty strings
  const areArraysFilled = arrayFields.every(key => {
    const array = formAnamnesys.value[key] as string[]; // Type assertion since these keys are string[]
    return array.length > 0;
  });

  return areStringsFilled && areArraysFilled;
});

const startAssessment = () => {
  isStarted.value = true;
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: 'smooth'
  })
}

const createSummary = (form: typeof formAnamnesys.value): string => {
  let sumber_infeksi = form.sumber_infeksi;
  if(sumber_infeksi.includes("Lain-lain (sebutkan pada kolom berikutnya)")){
    sumber_infeksi = sumber_infeksi.filter(item => item !== 'Lain-lain (sebutkan pada kolom berikutnya)');
    sumber_infeksi.push(form.sumber_infeksi_lainnya);
  }

  let apakah_terdapat_lesi_di_area_tubuh_lainnya = form.apakah_terdapat_lesi_di_area_tubuh_lainnya;
  if(apakah_terdapat_lesi_di_area_tubuh_lainnya.includes("Ada (sebutkan pada kolom berikutnya)")){
    apakah_terdapat_lesi_di_area_tubuh_lainnya = apakah_terdapat_lesi_di_area_tubuh_lainnya.filter(item => item !== 'Ada (sebutkan pada kolom berikutnya)');
    apakah_terdapat_lesi_di_area_tubuh_lainnya.push(form.lesi_area_tubuh_lainnya);
  }

  return (
      `Pasien dengan jenis kelamin: ${form.jenis_kelamin}, ` +
      `usia: ${form.usia}. ` +
      `Keluhan utama dan onset: ${form.keluhan_utama_dan_onset}. ` +
      `Riwayat kontak dengan bahan alergen atau iritan: ${form.riwayat_kontak_dengan_bahan_alergen_atau_iritan}. ` +
      `Sumber infeksi: ${sumber_infeksi.join(', ')}. ` +
      `Faktor pencetus penyakit saat ini: ${form.faktor_pencetus_penyakit_sekarang}. ` +
      `Lama sakit: ${form.lama_sakit}. ` +
      `Lokasi lesi: ${form.lokasi_lesi}. ` +
      `Apakah terdapat lesi di area tubuh lainnya: ${form.apakah_terdapat_lesi_di_area_tubuh_lainnya}. ` +
      `Kriteria mayor: ${form.kriteria_mayor.join(', ')}. ` +
      `Kriteria minor: ${form.kriteria_minor.join(', ')}. ` +
      `Riwayat penyakit dahulu: ${form.riwayat_penyakit_dahulu.join(', ')}. ` +
      `Riwayat penyakit keluarga: ${form.riwayat_penyakit_keluarga.join(', ')}.`
  );
};

const handleSubmit = async () => {
  const backendUrl = "https://dermatutus.alif.top";
  try {
    isLoading.value = true;
    // const externalUrl = `${runtimeConfig.public.backendUrl}/predict2?text=${createSummary(formAnamnesys.value)}&image_path=${file_path.value}`;
    const payload = {
      text: createSummary(formAnamnesys.value),
      image_path: filePath.value,
    };

    const res = await fetch("/api/predict", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    console.log(data)
    // Assuming the response has { classname: string, confidence: number }
    result.value = {
      classname: data.result,
      image_confidence: data.percentage_image,
      text_confidence: data.percentage_text,
      confidence: (data.percentage_image + data.percentage_text)/2,
    };
    xaiImageUrl.value = `${runtimeConfig.public.backendUrl}/${data.image_xai}`;
    console.log(xaiImageUrl.value);

    await nextTick();
    formAnamnesys.value = createDefaultAnamnesysForm();

    imageUrl.value = "";
    filePath.value = "";

    // showResult.value = true;
    showModal.value = true;
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to submit form. Please try again later.");
  }finally {
    isLoading.value = false;
  }
};

const onImageChange = async (event: any) => {
  const backendUrl = "https://dermatutus.alif.top";
  const file = event.target.files[0];

  if(!file) return;

  isLoading.value = true;
  error.value = null;
  imageUrl.value = "";
  filePath.value = "";

  try{
    const formData = new FormData();
    formData.append("file", file);
    const externalUrl = `${runtimeConfig.public.backendUrl}/upload-image`;///api/upload-image`;

    const res = await fetch(externalUrl, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      isImageErr.value = true;
      const err = await res.json();
      console.log(err)
      throw new Error(err?.message || "Upload failed");
    }

    isImageErr.value = false;
    const data = await res.json();
    console.log(data);
    imageUrl.value = `${backendUrl}/${data.url}`;
    filePath.value = data.file_path;
    console.log(imageUrl.value);
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
}

const trimTwoDecimal = (input: string) => {
  // const cleaned = input.trim();
  const num = parseFloat(input);

  if(isNaN(num)){
    throw new Error('Invalid number string provided');
  }

  return (Math.round(num * 100) / 100).toFixed(2);
}

watch(loggedIn, (isLoggedIn) => {
  console.log(isLoggedIn)
}, { immediate: true })

watch(user, (newUser, oldUser) => {
  console.log(newUser)
  console.log(oldUser)
})

watch(
    [
      () => formAnamnesys.value.sumber_infeksi,
      () => formAnamnesys.value.apakah_terdapat_lesi_di_area_tubuh_lainnya,
      () => formAnamnesys.value.kriteria_mayor,
      () => formAnamnesys.value.kriteria_minor,
      () => formAnamnesys.value.riwayat_penyakit_dahulu,
      () => formAnamnesys.value.riwayat_penyakit_keluarga
    ],
    (
        [newSumberInfeksi, newApakahTerdapatLesiDiAreaTubuhLainnya, newKriteriaMayor, newKriteriaMinor, newRiwayatDahulu, newRiwayatKeluarga],
        [oldSumberInfeksi, oldApakahTerdapatLesiDiAreaTubuhLainnya, oldKriteriaMayor, oldKriteriaMinor, oldRiwayatDahulu, oldRiwayatKeluarga],
    ) => {
      // Sumber Infeksi
      if(oldSumberInfeksi.includes('Tidak Ada') && newSumberInfeksi.length > 1){
        formAnamnesys.value.sumber_infeksi = newSumberInfeksi.filter(item => item !== 'Tidak Ada');
      }
      if(!oldSumberInfeksi.includes('Tidak Ada') && newSumberInfeksi.includes('Tidak Ada')){
        formAnamnesys.value.sumber_infeksi = newSumberInfeksi.filter(item => item === 'Tidak Ada');
      }

      // Apakah Terdapat Lesi di Area Tubuh Lainnya
      if(oldApakahTerdapatLesiDiAreaTubuhLainnya.includes('Tidak Ada') && newApakahTerdapatLesiDiAreaTubuhLainnya.length > 1){
        formAnamnesys.value.apakah_terdapat_lesi_di_area_tubuh_lainnya = newApakahTerdapatLesiDiAreaTubuhLainnya.filter(item => item !== 'Tidak Ada');
      }
      if(!oldApakahTerdapatLesiDiAreaTubuhLainnya.includes('Tidak Ada') && newApakahTerdapatLesiDiAreaTubuhLainnya.includes('Tidak Ada')){
        formAnamnesys.value.apakah_terdapat_lesi_di_area_tubuh_lainnya = newApakahTerdapatLesiDiAreaTubuhLainnya.filter(item => item === 'Tidak Ada');
      }

      // Kriteria Mayor
      if(oldKriteriaMayor.includes('Tidak Ada') && newKriteriaMayor.length > 1){
        formAnamnesys.value.kriteria_mayor = newKriteriaMayor.filter(item => item !== 'Tidak Ada');
      }
      if(!oldKriteriaMayor.includes('Tidak Ada') && newKriteriaMayor.includes('Tidak Ada')){
        formAnamnesys.value.kriteria_mayor = newKriteriaMayor.filter(item => item === 'Tidak Ada');
      }

      // Kriteria Minor
      if(oldKriteriaMinor.includes('Tidak Ada') && newKriteriaMinor.length > 1){
        formAnamnesys.value.kriteria_minor = newKriteriaMinor.filter(item => item !== 'Tidak Ada');
      }
      if(!oldKriteriaMinor.includes('Tidak Ada') && newKriteriaMinor.includes('Tidak Ada')){
        formAnamnesys.value.kriteria_minor = newKriteriaMinor.filter(item => item === 'Tidak Ada');
      }

      // Riwayat Dahulu
      if(oldRiwayatDahulu.includes('Tidak ada riwayat') && newRiwayatDahulu.length > 1){
        formAnamnesys.value.riwayat_penyakit_dahulu = newRiwayatDahulu.filter(item => item !== 'Tidak ada riwayat');
      }
      if(!oldRiwayatDahulu.includes('Tidak ada riwayat') && newRiwayatDahulu.includes('Tidak ada riwayat')){
        formAnamnesys.value.riwayat_penyakit_dahulu = newRiwayatDahulu.filter(item => item === 'Tidak ada riwayat');
      }

      // Riwayat Keluarga
      if(oldRiwayatKeluarga.includes('Tidak ada riwayat') && newRiwayatKeluarga.length > 1){
        formAnamnesys.value.riwayat_penyakit_keluarga = newRiwayatKeluarga.filter(item => item !== 'Tidak ada riwayat');
      }
      if(!oldRiwayatKeluarga.includes('Tidak ada riwayat') && newRiwayatKeluarga.includes('Tidak ada riwayat')){
        formAnamnesys.value.riwayat_penyakit_keluarga = newRiwayatKeluarga.filter(item => item === 'Tidak ada riwayat');
      }
    },
    { deep: true }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>