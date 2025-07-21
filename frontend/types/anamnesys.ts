export default interface AnamnesysForm {
    jenis_kelamin: string;
    usia: string;
    keluhan_utama_dan_onset: string;
    riwayat_kontak_dengan_bahan_alergen_atau_iritan: string;
    sumber_infeksi: string[];
    sumber_infeksi_lainnya: string;
    faktor_pencetus_penyakit_sekarang: string;
    lama_sakit: string;
    lokasi_lesi: string;
    apakah_terdapat_lesi_di_area_tubuh_lainnya: boolean;
    kriteria_mayor: string[];
    kriteria_minor: string[];
    riwayat_penyakit_dahulu: string[];
    riwayat_penyakit_keluarga: string[];
}