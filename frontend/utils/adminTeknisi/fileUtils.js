import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

/**
 * Fungsi handleFileUpload
 * Mengelola proses upload file dan parsing data dari file Excel.
 * 
 * - Membaca file yang diupload dan mengonversi isinya menjadi format JSON.
 * - Menyimpan data yang telah diparsing ke dalam state.
 * - Menampilkan notifikasi saat file berhasil diupload.
 * 
 * @param {Event} event - Event upload file.
 * @param {Function} setFileData - Setter untuk menyimpan data file.
 */
export const handleFileUpload = (event, setFileData) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            const headers = worksheet[0].map(header => header.trim());
            const rows = worksheet.slice(1);

            const parsedData = rows.map(row => {
                let rowData = {};
                headers.forEach((header, index) => {
                    rowData[header] = row[index] !== undefined ? row[index].toString().trim() : '';
                });
                return rowData;
            });

            console.log("Parsed Data:", parsedData);

            setFileData(parsedData);
            toast.success("File berhasil diupload. Silakan klik 'Submit' untuk menambahkan data.");
        };
        reader.readAsArrayBuffer(file);
    }
};

/**
 * Fungsi validateData
 * Memvalidasi data yang diupload untuk memastikan semua field yang diperlukan terisi.
 * 
 * @param {Object} data - Data yang akan divalidasi.
 * @returns {boolean} - True jika data valid, false jika tidak.
 */
export const validateData = (data) => {
    const requiredFields = ['nama', 'sektor', 'kodeCrew'];
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    return true;
};

/**
 * Fungsi handleFileSubmit
 * Mengelola proses pengiriman data yang diupload ke server.
 * 
 * - Memvalidasi data sebelum mengirim.
 * - Mengirim data ke server dan menampilkan notifikasi berdasarkan hasil.
 * 
 * @param {Array} fileData - Data yang diupload dari file.
 * @param {Object} crewIdMap - Mapping ID crew.
 * @param {Function} onSubmit - Fungsi untuk mengirim data.
 * @param {Function} setFileData - Setter untuk menyimpan data file.
 * @param {Object} fileInputRef - Referensi ke input file.
 * @param {Object} sectorNameMap - Mapping nama sektor ke ID sektor.
 */
export const handleFileSubmit = async (fileData, crewIdMap, onSubmit, setFileData, fileInputRef, sectorNameMap) => {
    if (fileData) {
        try {
            for (const data of fileData) {
                if (validateData(data)) {
                    const idCrew = crewIdMap[data.kodeCrew];
                    const sektor = sectorNameMap[data.sektor];
                    if (!idCrew) {
                        toast.error(`Kode Crew ${data.kodeCrew} tidak valid.`);
                        return;
                    }
                    if (!sektor) {
                        toast.error(`Nama Sektor ${data.sektor} tidak valid.`);
                        return;
                    }
                    const payload = { ...data, sektor: sektor, idCrew: idCrew };
                    delete payload.kodeCrew;
                    await onSubmit(payload, false, true);
                } else {
                    toast.error("Data tidak valid. Pastikan semua field terisi dengan benar.");
                    return;
                }
            }
            toast.success("Semua data dari file berhasil ditambahkan!");
            setFileData(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menambahkan data dari file.");
        }
    } else {
        toast.error("Tidak ada file yang diupload.");
    }
};
