<template>
  <div>

    <section id="header" class="bg-[#99aace] h-screen pt-24">
      <div class="flex flex-col h-3/4 mx-auto max-w-6xl text-center mb-64">
        <span class="text-8xl text-[#f0cdff] font-opensauce font-bold">
          MULTIMODAL AI DERMATITIS ATOPIK
        </span>
        <div class="flex items-center justify-center h-full z-20">
          <AuthButton label="MASUK DENGAN GOOGLE" />
        </div>
      </div>
      <NuxtImg class="absolute bottom-[200px] left-1/2 -translate-x-1/2 w-2/5" src="/images/hands.svg" />
      <NuxtImg class="absolute bottom-0 w-screen z-10" src="/images/derm.svg" />
    </section>

    <section id="introduction" class="bg-[#fbf6f3] h-screen pt-24 pb-12">
      <div class="flex flex-col h-full mx-auto px-16">
        <div class="max-w-4xl text-center mx-auto">
      <span class="text-7xl text-[#f0cdff] font-opensauce font-bold">
        Apa itu Multimodal AI Dermatitis Atopik?
      </span>
        </div>
        <div class="flex items-center justify-evenly h-full px-48">
          <div class="flex items-center justify-center h-full w-1/2 px-8">
            <NuxtImg
                class="h-4/5 w-full object-contain"
                src="/images/digital-diag.png"
            />
          </div>
          <div class="flex items-center justify-center h-full w-[540px] px-8">
        <span class="font-alegreya text-xl text-justify">
          Multimodal AI Dermatitis Atopik adalah aplikasi berbasis kecerdasan buatan yang membantu dokter umum mengidentifikasi kemungkinan dermatitis atopik. Dengan menginput foto lesi dan anamnesis klinis, aplikasi ini mengklasifikasikan kasus sebagai <strong>dermatitis atopik</strong> atau <strong>bukan dermatitis atopik</strong>. Kategori "bukan dermatitis atopik" mencakup kumpulan diagnosis banding seperti psoriasis vulgaris, liken simpleks kronik, dermatitis numularis, dan dermatitis kontak. Hasil yang diberikan bukan diagnosis final, <strong>keputusan akhir tetap bergantung pada penilaian klinis oleh dokter</strong>.
        </span>
          </div>
        </div>
      </div>
    </section>

    <section id="howto" class="bg-[#99aace] h-screen pt-24 pb-12">
      <div class="flex flex-col h-full mx-auto px-8">
        <div class="max-w-6xl text-center mx-auto">
          <span class="text-6xl text-[#f0cdff] font-opensauce font-bold">
            Bagaimana cara penggunaannya?
          </span>
        </div>
        <div class="flex items-center justify-around h-full mt-24">

          <div class="flex flex-col h-full text-center items-center mx-7">
            <div class="bg-[#fbf6f3] h-[240px] w-[240px] rounded-full">
              <NuxtImg class="w-screen" src="/images/mobile-diag.png" />
            </div>
            <div class="flex flex-col px-8 mt-20">
              <span class="text-2xl font-opensauce font-bold">
                Ambil gambar lesi kulit
              </span>
              <span class="text-2xl font-alegreya text-justify mt-8">
                Pastikan mengambil foto dari jarak dekat, fokus, dan menampilkan lesi kulit dengan pencahayaan yang optimal
              </span>
            </div>
          </div>

          <div class="flex flex-col h-full text-center items-center mx-7">
            <div class="bg-[#fbf6f3] h-[240px] w-[240px] rounded-full">
              <NuxtImg class="w-screen" src="/images/mobile-icon.png" />
            </div>
            <div class="flex flex-col px-8 mt-20">
              <span class="text-2xl font-opensauce font-bold">
                Unggah gambar & masukkan hasil anamnesis
              </span>
              <span class="text-2xl font-alegreya text-justify mt-8">
                Masukkan foto yang telah diambil atau sudah disimpan kemudian lengkapi data anamnesis sesuai temuan klinis pasien
              </span>
            </div>
          </div>

          <div class="flex flex-col h-full text-center items-center mx-7">
            <div class="bg-[#fbf6f3] h-[240px] w-[240px] rounded-full">
              <NuxtImg class="w-screen" src="/images/pc.png" />
            </div>
            <div class="flex flex-col px-8 mt-20">
              <span class="text-2xl font-opensauce font-bold">
                Dapatkan Hasil
              </span>
              <span class="text-2xl font-alegreya text-justify mt-8">
                Hasil akan segera muncul menunjukkan hasil lesi termasuk <strong>dermatitis</strong> atopik atau <strong>bukan dermatitis atopik</strong>
              </span>
            </div>
          </div>

        </div>
        <div class="flex flex-col h-full text-center items-center mx-7 mt-16">
          <button
              :disabled="!loggedIn"
              :class="loggedIn ? 'bg-[#f6f6f6] text-black hover:bg-blue-300 active:bg-blue-500' : 'bg-gray-500 text-gray-300'"
              class="shadow-lg px-16 py-3 rounded-full font-opensauce">
            MULAI SEKARANG
          </button>
        </div>
      </div>
    </section>

    <section v-if="loggedIn" id="ai-forms" class="relative bg-[#fbf6f3] z-0 pt-24 pb-12">
      <NuxtImg class="absolute top-0 rotate-180 w-screen -z-10" src="/images/derm.svg" />
      <div class="flex flex-col h-3/4 mx-auto items-center text-center mb-64 z-10">
        <div class="max-w-3xl">
          <span class="text-6xl font-opensauce font-bold">
            MULTIMODAL AI DERMATITIS ATOPIK
          </span>
        </div>
        <div class="flex flex-col items-center justify-center h-full mt-32">
          <span class="text-3xl font-opensauce font-bold">
            Silakan unggah foto lesi kulit
          </span>
          <span class="text-2xl font-alegreya text-center mt-8 max-w-4xl">
            Sebagai perhatian, sistem kami hanya menerima foto berupa lesi kulit. Jika Anda mengunggah foto selain foto lesi kulit, akan memengaruhi akurasi prediksi model. Kami tidak akan menyimpan/menggunakan informasi yang sudah Anda unggah/berikan pada website ini.
          </span>

          <div class="flex flex-col items-center justify-center mt-16">
            <div class="flex max-w-lg">
              <NuxtImg class="h-[150px]" src="/images/lesion_example.png" />
              <div class="flex items-center pr-8">
                <span class="text-xl text-left font-alegreya pl-6">Contoh pengambilan gambar yang direkomendasikan</span>
              </div>
            </div>
            <div class="flex justify-start w-full mt-2">
<!--              <span class="text-left">sumber: https://dermnetz.org/</span>-->
              <p class="text-lg font-alegreya">sumber: https://dermnetz.org</p>
            </div>
          </div>

          <input
              type="file"
              accept="image/*"
              :class="imageUrl?'mt-6':'mt-8'"
              class="w-full max-w-sm cursor-pointer rounded-lg border border-gray-300 p-3 text-gray-700 bg-white shadow-sm hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 mt-8"
              @change="onImageChange"
          />
          <div v-if="imageUrl" class="preview mb-8 mt-10">
            <img :src="imageUrl" class="max-h-[300px]" alt="Image preview" />
          </div>

          <AuthState v-slot="{loggedIn, user}">
          <div v-if="imageUrl">
            <flat-form
              class="mt-12"
              type="radio"
              :options="JENIS_KELAMIN"
              label="Jenis Kelamin"
              v-model="formAnamnesys['jenis_kelamin']"
              />
            <flat-form
                class="mt-12"
                type="number"
                label="Usia"
                v-model="formAnamnesys['usia']"
            />
            <flat-form
                class="mt-12"
                type="text"
                label="Keluhan Utama dan Onset"
                is-multiline
                v-model="formAnamnesys['keluhan_utama_dan_onset']"
            />
            <flat-form
                class="mt-12"
                type="radio"
                :options="RIWAYAT_KONTAK"
                label="Riwayat Kontak dengan bahan Alergen atau Iritan"
                v-model="formAnamnesys['riwayat_kontak_dengan_bahan_alergen_atau_iritan']"
            />
            <flat-form
                class="mt-12"
                type="checkbox"
                :options="SUMBER_INFEKSI"
                label="Sumber Infeksi"
                v-model="formAnamnesys['sumber_infeksi']"
            />
            <flat-form
                v-if="formAnamnesys['sumber_infeksi'].includes('Lain-lain (sebutkan pada kolom berikutnya)')"
              class="mt-12"
              type="text"
              label="Sumber Infeksi Lainnya"
              v-model="formAnamnesys['sumber_infeksi_lainnya']"
            />
            <flat-form
              class="mt-12"
              type="text"
              label="Faktor Pencetus Penyakit Sekarang"
              v-model="formAnamnesys['faktor_pencetus_penyakit_sekarang']"
            />
            <flat-form
              class="mt-12"
              type="radio"
              :options="LAMA_SAKIT"
              label="Lama Sakit"
              v-model="formAnamnesys['lama_sakit']"
            />
            <flat-form
              class="mt-12"
              type="text"
              label="Lokasi Lesi"
              v-model="formAnamnesys['lokasi_lesi']"
            />
            <flat-form
              class="mt-12"
              type="checkbox"
              :options="KRITERIA_MAYOR"
              label="Kriteria Mayor"
              v-model="formAnamnesys['kriteria_mayor']"
            />
            <flat-form
                class="mt-12"
                type="checkbox"
                :options="KRITERIA_MINOR"
                label="Kriteria Minor"
                v-model="formAnamnesys['kriteria_minor']"
            />
            <flat-form
              class="mt-12"
              type="checkbox"
              :options="RIWAYAT_PENYAKIT_DAHULU"
              label="Riwayat Penyakit Dahulu"
              v-model="formAnamnesys['riwayat_penyakit_dahulu']"
            />
            <flat-form
              class="mt-12"
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
            :class="isLoading ? 'bg-gray-400' : 'bg-[#3954a3]'"
            class="mt-24 px-28 py-6 text-white font-opensans text-2xl font-bold rounded-[40px]">
          KIRIM
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  JENIS_KELAMIN,
  RIWAYAT_KONTAK,
  SUMBER_INFEKSI,
  LAMA_SAKIT,
  KRITERIA_MAYOR,
  KRITERIA_MINOR,
  RIWAYAT_PENYAKIT_DAHULU,
  RIWAYAT_PENYAKIT_KELUARGA
} from "~/constants/options";
import type AnamnesysForm from "~/types/anamnesys";
const runtimeConfig = useRuntimeConfig();
const { loggedIn } = useUserSession()

const formAnamnesys = ref<AnamnesysForm>({
  jenis_kelamin: "",
  usia: "",
  keluhan_utama_dan_onset: "",
  riwayat_kontak_dengan_bahan_alergen_atau_iritan: "",
  sumber_infeksi_lainnya: "",
  faktor_pencetus_penyakit_sekarang: "",
  lama_sakit: "",
  lokasi_lesi: "",
  sumber_infeksi: [],
  kriteria_mayor: [],
  kriteria_minor: [],
  riwayat_penyakit_dahulu: [],
  riwayat_penyakit_keluarga: [],
});
const imageUrl = ref("");
const filePath = ref("");
const isLoading = ref(false);
const error = ref(null);
const showResult = ref(false);
const result = ref<{ classname: string; confidence: number } | null>(null);

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

const createSummary = (form: typeof formAnamnesys.value): string => {
  let sumber_infeksi = form.sumber_infeksi;
  if(sumber_infeksi.includes("Lain-lain (sebutkan pada kolom berikutnya)")){
    sumber_infeksi = sumber_infeksi.filter(item => item !== 'Lain-lain (sebutkan pada kolom berikutnya)');
    sumber_infeksi.push(form.sumber_infeksi_lainnya);
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
      // `Apakah terdapat lesi di area tubuh lainnya: ${form.apakah_terdapat_lesi_di_area_tubuh_lainnya}. ` +
      `Kriteria mayor: ${form.kriteria_mayor.join(', ')}. ` +
      `Kriteria minor: ${form.kriteria_minor.join(', ')}. ` +
      `Riwayat penyakit dahulu: ${form.riwayat_penyakit_dahulu.join(', ')}. ` +
      `Riwayat penyakit keluarga: ${form.riwayat_penyakit_keluarga.join(', ')}.`
  );
};

const handleSubmit = async () => {
  try {
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
      confidence: data.percentage,
    };

    showResult.value = true;
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to submit form. Please try again later.");
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
      const err = await res.json();
      throw new Error(err?.message || "Upload failed");
    }

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

watch(loggedIn, (isLoggedIn) => {
  console.log(isLoggedIn)
}, { immediate: true })

watch(
    [
      () => formAnamnesys.value.sumber_infeksi,
      () => formAnamnesys.value.kriteria_mayor,
      () => formAnamnesys.value.kriteria_minor,
      () => formAnamnesys.value.riwayat_penyakit_dahulu,
      () => formAnamnesys.value.riwayat_penyakit_keluarga
    ],
    (
        [newSumberInfeksi, newKriteriaMayor, newKriteriaMinor, newRiwayatDahulu, newRiwayatKeluarga],
        [oldSumberInfeksi, oldKriteriaMayor, oldKriteriaMinor, oldRiwayatDahulu, oldRiwayatKeluarga],
    ) => {
      // Sumber Infeksi
      if(oldSumberInfeksi.includes('Tidak Ada') && newSumberInfeksi.length > 1){
        formAnamnesys.value.sumber_infeksi = newSumberInfeksi.filter(item => item !== 'Tidak Ada');
      }
      if(!oldSumberInfeksi.includes('Tidak Ada') && newSumberInfeksi.includes('Tidak Ada')){
        formAnamnesys.value.sumber_infeksi = newSumberInfeksi.filter(item => item === 'Tidak Ada');
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

</style>