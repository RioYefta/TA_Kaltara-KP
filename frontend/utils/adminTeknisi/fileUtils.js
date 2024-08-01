import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

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

export const validateData = (data) => {
    const requiredFields = ['nama', 'sektor', 'kodeCrew'];
    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    return true;
};

export const handleFileSubmit = async (fileData, crewIdMap, onSubmit, setFileData, fileInputRef, sectorNameMap) => {
    if (fileData) {
        let hasInvalidCrew = false;
        const updatedFileData = [...fileData];
        
        try {
            for (let i = 0; i < updatedFileData.length; i++) {
                const data = updatedFileData[i];
                if (validateData(data)) {
                    const idCrew = crewIdMap[data.kodeCrew];
                    const sektor = sectorNameMap[data.sektor];
                    if (!idCrew) {
                        hasInvalidCrew = true;
                        updatedFileData[i].invalidCrew = true;
                    } else {
                        updatedFileData[i].invalidCrew = false;
                    }
                    if (!sektor) {
                        toast.error(`Nama Sektor ${data.sektor} tidak valid.`);
                        return;
                    }
                    const payload = { ...data, sektor: sektor, idCrew: idCrew || null };
                    delete payload.kodeCrew;
                    await onSubmit(payload, false, true);
                } else {
                    toast.error("Data tidak valid. Pastikan semua field terisi dengan benar.");
                    return;
                }
            }
            if (hasInvalidCrew) {
                toast.warning("Beberapa teknisi yang diinput, memiliki crew yang belum tersedia di database.");
            } else {
                toast.success("Semua data dari file berhasil ditambahkan!");
            }
            setFileData(updatedFileData);
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
