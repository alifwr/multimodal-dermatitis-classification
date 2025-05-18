<script setup lang="ts">
interface AnamnesysForm {
  jenis_kelamin: string;
  usia: string;
  klasifikasi_usia: string;
  keluhan_utama_dan_onset: string;
  riwayat_kontak_dengan_bahan_alergen_atau_iritan: string;
  sumber_infeksi: string;
  faktor_pencetus_penyakit_sekarang: string;
  lama_sakit: string;
  lokasi_lesi: string;
  // apakah_terdapat_lesi_di_area_tubuh_lainnya: boolean;
  kriteria_mayor: string;
  kriteria_minor: string;
  riwayat_penyakit_dahulu: string;
  riwayat_penyakit_keluarga: string;
}

const formAnamnesys = ref<AnamnesysForm>({
  jenis_kelamin: "",
  usia: "",
  klasifikasi_usia: "",
  keluhan_utama_dan_onset: "",
  riwayat_kontak_dengan_bahan_alergen_atau_iritan: "",
  sumber_infeksi: "",
  faktor_pencetus_penyakit_sekarang: "",
  lama_sakit: "",
  lokasi_lesi: "",
  // apakah_terdapat_lesi_di_area_tubuh_lainnya: false,
  kriteria_mayor: "",
  kriteria_minor: "",
  riwayat_penyakit_dahulu: "",
  riwayat_penyakit_keluarga: "",
});

const runtimeConfig = useRuntimeConfig();
const imageUrl = ref("");
const formKeys = computed(
  () => Object.keys(formAnamnesys.value) as (keyof AnamnesysForm)[]
);
const file_path = ref("");
const error = ref(null);
const isLoading = ref(false);
const errors = ref<Partial<Record<keyof AnamnesysForm, string>>>({});
const result = ref<{ classname: string; confidence: number } | null>(null);
const showModal = ref(false);

const createSummary = (form: typeof formAnamnesys.value): string => {
  return (
    `Pasien dengan jenis kelamin: ${form.jenis_kelamin}, ` +
    `usia: ${form.usia} (klasifikasi usia: ${form.klasifikasi_usia}). ` +
    `Keluhan utama dan onset: ${form.keluhan_utama_dan_onset}. ` +
    `Riwayat kontak dengan bahan alergen atau iritan: ${form.riwayat_kontak_dengan_bahan_alergen_atau_iritan}. ` +
    `Sumber infeksi: ${form.sumber_infeksi}. ` +
    `Faktor pencetus penyakit saat ini: ${form.faktor_pencetus_penyakit_sekarang}. ` +
    `Lama sakit: ${form.lama_sakit}. ` +
    `Lokasi lesi: ${form.lokasi_lesi}. ` +
    // `Apakah terdapat lesi di area tubuh lainnya: ${form.apakah_terdapat_lesi_di_area_tubuh_lainnya}. ` +
    `Kriteria mayor: ${form.kriteria_mayor}. ` +
    `Kriteria minor: ${form.kriteria_minor}. ` +
    `Riwayat penyakit dahulu: ${form.riwayat_penyakit_dahulu}. ` +
    `Riwayat penyakit keluarga: ${form.riwayat_penyakit_keluarga}.`
  );
};

const formatLabel = (key: keyof AnamnesysForm): string =>
  key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const getInputType = (key: keyof AnamnesysForm): string => {
  if (
    key.includes("riwayat") ||
    key.includes("keluhan") ||
    key.includes("kriteria")
  )
    return "textarea";
  // if (key === "apakah_terdapat_lesi_di_area_tubuh_lainnya") return "checkbox";
  return "text";
};

const onFileChange = async (event: any) => {
  console.log("uploading");
  const file = event.target.files[0];
  if (!file) return;

  isLoading.value = true;
  error.value = null;
  imageUrl.value = "";
  file_path.value = "";

  try {
    const formData = new FormData();
    formData.append("file", file);
    const externalUrl = `${runtimeConfig.public.backendUrl}/upload-image`;

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
    imageUrl.value = `${runtimeConfig.public.backendUrl}/${data.url}`;
    file_path.value = data.file_path;
    console.log(imageUrl.value);
  } catch (e) {
    error.value = e.message;
  } finally {
    isLoading.value = false;
  }
};

const validateForm = (): boolean => {
  errors.value = {};
  if (!formAnamnesys.value.jenis_kelamin) {
    errors.value.jenis_kelamin = "Jenis Kelamin harus diisi";
  }
  if (!formAnamnesys.value.usia || Number(formAnamnesys.value.usia) <= 0) {
    errors.value.usia = "Usia harus diisi dan lebih dari 0";
  }
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (true) {
    // validateForm()
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
  } else {
    alert("Please fix form errors.");
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
          v-for="key in formKeys"
          class="flex items-center justify-between w-full py-2 px-8"
        >
          <label class="w-[20%] font-bold" :for="key">{{
            formatLabel(key)
          }}</label>
          <span class="text-center w-[2%]">:</span>
          <input
            :id="key"
            v-model="formAnamnesys[key]"
            :type="getInputType(key)"
            class="form-input w-full py-2 px-4 border rounded-lg"
            :placeholder="formatLabel(key)"
          />
        </div>

        <button
          @click="handleSubmit"
          v-if="imageUrl"
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