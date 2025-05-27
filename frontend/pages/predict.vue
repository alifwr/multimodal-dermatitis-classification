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

const formAnamnesys = ref<AnamnesysForm>({
  jenis_kelamin: "",
  usia: "",
  keluhan_utama_dan_onset: "",
  riwayat_kontak_dengan_bahan_alergen_atau_iritan: "",
  sumber_infeksi_lainnya: "",
  faktor_pencetus_penyakit_sekarang: "",
  lama_sakit: "",
  lokasi_lesi: "",
  // apakah_terdapat_lesi_di_area_tubuh_lainnya: false,
  sumber_infeksi: [],
  kriteria_mayor: [],
  kriteria_minor: [],
  riwayat_penyakit_dahulu: [],
  riwayat_penyakit_keluarga: [],
});

const runtimeConfig = useRuntimeConfig();
const imageUrl = ref("");
const file_path = ref("");
const error = ref(null);
const isLoading = ref(false);
const result = ref<{ classname: string; confidence: number } | null>(null);
const showModal = ref(false);

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

const onFileChange = async (event: any) => {
  console.log("uploading");
  const backendUrl = "https://dermatutus.alif.top";
  const file = event.target.files[0];
  if (!file) return;

  isLoading.value = true;
  error.value = null;
  imageUrl.value = "";
  file_path.value = "";

  try {
    const formData = new FormData();
    formData.append("file", file);
    const externalUrl = `/api/upload-image`;

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
    file_path.value = data.file_path;
    console.log(imageUrl.value);
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async () => {
  try {
    // const externalUrl = `${runtimeConfig.public.backendUrl}/predict2?text=${createSummary(formAnamnesys.value)}&image_path=${file_path.value}`;
    const payload = {
      text: createSummary(formAnamnesys.value),
      image_path: file_path.value,
    };

    // const formData = new FormData();
    // formData.append('text', createSummary(formAnamnesys.value));
    // formData.append('image_path', file_path.value);
    // console.log(payload);

    const res = await fetch("/api/predict", {
      method: "POST",
      // headers: {
        // accept: "application/x-www-form-urlencoded",
        // "Content-Type": "application/json",
      // },
      body: JSON.stringify(payload),
      // keepalive: true,
    });

    const data = await res.json();

    console.log(data)

    // const res = await fetch(externalUrl, {
    //   method: 'POST',
    //   body: {
    //     text: createSummary(formAnamnesys.value),
    //     image_path: file_path.value
    //   }
    // });

    // Assuming the response has { classname: string, confidence: number }
    result.value = {
      classname: data.result,
      confidence: data.percentage,
    };

    showModal.value = true;
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to submit form. Please try again later.");
  }
};
</script>

<template>
  <div class="mx-auto flex flex-col items-center justify-evenly">
    <div class="container flex flex-col items-center justify-evenly p-4">
      <span class="text-7xl py-4">Dermatitis AI</span>
      <Icon
        v-if="isLoading"
        name="eos-icons:three-dots-loading"
        size="100"
        style="color: black"
      />
      <div class="flex flex-col items-center w-full justify-center">
        <label
          class="block text-xl font-semibold text-gray-800 mb-4 cursor-pointer hover:text-indigo-600 transition-colors duration-300"
        >
          Tolong upload foto lesi kulit
        </label>
        <input
          :class="imageUrl ? 'mt-6 mb-3' : 'my-8'"
          type="file"
          accept="image/*"
          @change="onFileChange"
          class="w-full max-w-sm cursor-pointer rounded-lg border border-gray-300 p-3 text-gray-700 shadow-sm hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div v-if="imageUrl" class="preview mb-8">
          <img :src="imageUrl" class="max-h-[400px]" alt="Image preview" />
        </div>

        <div
          v-if="imageUrl"
          class="flex flex-col items-left self-center justify-between py-2 px-8"
        >
          <FormKit
              v-model="formAnamnesys['jenis_kelamin']"
              type="radio"
              name="jenis_kelamin"
              id="jenis_kelamin"
              label="Jenis Kelamin"
              help="Pilih Jenis Kelamin"
              placeholder="“Jenis Kelamin”"
              :options="JENIS_KELAMIN"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['usia']"
              type="text"
              name="usia"
              id="usia"
              label="Usia"
              help="Masukkan Usia"
              placeholder="“Usia”"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['keluhan_utama_dan_onset']"
              type="text"
              name="keluhan_utama_dan_onset"
              id="keluhan_utama_dan_onset"
              label="Keluhan Utama dan Onset"
              help="Masukkan Keluhan Utama dan Onset"
              placeholder="“Keluhan Utama dan Onset”"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['riwayat_kontak_dengan_bahan_alergen_atau_iritan']"
              type="radio"
              name="riwayat_kontak_dengan_bahan_alergen_atau_iritan"
              id="riwayat_kontak_dengan_bahan_alergen_atau_iritan"
              label="Riwayat Kontak dengan bahan Alergen atau Iritan"
              help="Masukkan Riwayat Kontak dengan bahan Alergen atau Iritan"
              placeholder="“Riwayat Kontak dengan bahan Alergen atau Iritan”"
              :options="RIWAYAT_KONTAK"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['sumber_infeksi']"
              type="checkbox"
              name="sumber_infeksi"
              id="sumber_infeksi"
              label="Sumber Infeksi"
              help="Masukkan Sumber Infeksi"
              placeholder="“Sumber Infeksi”"
              :options="SUMBER_INFEKSI"
          />
          <FormKit
              v-if="formAnamnesys['sumber_infeksi'].includes('Lain-lain (sebutkan pada kolom berikutnya)')"
              v-model="formAnamnesys['sumber_infeksi_lainnya']"
              type="text"
              name="sumber_infeksi_lainnya"
              id="sumber_infeksi_lainnya"
              label="Sumber Infeksi Lainnya"
              help="Masukkan Sumber Infeksi Lainnya"
              placeholder="“Sumber Infeksi Lainnya”"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['faktor_pencetus_penyakit_sekarang']"
              type="text"
              name="faktor_pencetus_penyakit_sekarang"
              id="faktor_pencetus_penyakit_sekarang"
              label="Faktor Pencetus Penyakit Sekarang"
              help="Masukkan Faktor Pencetus Penyakit Sekarang"
              placeholder="“Faktor Pencetus Penyakit Sekarang”"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['lama_sakit']"
              type="radio"
              name="lama_sakit"
              id="lama_sakit"
              label="Lama Sakit"
              help="Masukkan Lama Sakit"
              placeholder="“Lama Sakit”"
              :options="LAMA_SAKIT"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['lokasi_lesi']"
              type="text"
              name="lokasi_lesi"
              id="lokasi_lesi"
              label="Lokasi Lesi"
              help="Masukkan Lokasi Lesi"
              placeholder="“Lokasi Lesi”"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['kriteria_mayor']"
              type="checkbox"
              name="kriteria_mayor"
              id="kriteria_mayor"
              label="Kriteria Mayor"
              help="Masukkan Kriteria Mayor"
              placeholder="“Kriteria Mayor”"
              :options="KRITERIA_MAYOR"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['kriteria_minor']"
              type="checkbox"
              name="kriteria_minor"
              id="kriteria_minor"
              label="Kriteria Minor"
              help="Masukkan Kriteria Minor"
              placeholder="“Kriteria Minor”"
              :options="KRITERIA_MINOR"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['riwayat_penyakit_dahulu']"
              type="checkbox"
              name="riwayat_penyakit_dahulu"
              id="riwayat_penyakit_dahulu"
              label="Riwayat Penyakit Dahulu"
              help="Masukkan Riwayat Penyakit Dahulu"
              placeholder="“Riwayat Penyakit Dahulu”"
              :options="RIWAYAT_PENYAKIT_DAHULU"
          />
          <hr class="my-2" />
          <FormKit
              v-model="formAnamnesys['riwayat_penyakit_keluarga']"
              type="checkbox"
              name="riwayat_penyakit_keluarga"
              id="riwayat_penyakit_keluarga"
              label="Riwayat Penyakit Keluarga"
              help="Masukkan Riwayat Penyakit Keluarga"
              placeholder="“Riwayat Penyakit Keluarga”"
              :options="RIWAYAT_PENYAKIT_KELUARGA"
          />
          <hr class="my-2" />
<!--          <label class="w-[20%] font-bold" :for="key">{{-->
<!--            formatLabel(key)-->
<!--          }}</label>-->
<!--          <span class="text-center w-[2%]">:</span>-->
<!--          <input-->
<!--            :id="key"-->
<!--            v-model="formAnamnesys[key]"-->
<!--            :type="getInputType(key)"-->
<!--            class="form-input w-full py-2 px-4 border rounded-lg"-->
<!--            :placeholder="formatLabel(key)"-->
<!--          />-->
        </div>

        <button
          @click="handleSubmit"
          v-if="isFormFilled"
          :disabled="isLoading"
          :class="isLoading ? 'bg-gray-400' : 'bg-blue-400'"
          class="py-2 px-8 h-full rounded-tr-lg rounded-lg my-8"
        >
          Send
        </button>
      </div>
    </div>
  </div>
  <transition name="fade">
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="showModal = false"
    >
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full relative">
        <button
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
          @click="showModal = false"
        >
          &times;
        </button>

        <h2 class="text-4xl font-semibold mb-4">Hasil Prediksi</h2>
        <p class="mb-2 text-xl">
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
          Model AI menghasilkan jawaban tersebut dengan nilai prosentase
          <strong>{{ (result?.confidence).toFixed(2) }} %</strong>
        </p>
      </div>
    </div>
  </transition>
</template>

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