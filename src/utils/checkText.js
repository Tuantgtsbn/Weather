function tinhSoLanGoTelex_fixed(tuTiengViet) {
    if (!tuTiengViet || typeof tuTiengViet !== 'string') {
        return 0;
    }

    const NGUYEN_AM_CO_DAU = /[ăâđêôơư]/gi;
    const KY_TU_CO_DAU_THANH = /[áàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ]/gi;

    // --- BƯỚC 1: TÍNH SỐ LẦN GÕ CƠ BẢN ---
    const kyTuGoc = tuTiengViet.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    let soLanGo = kyTuGoc.length;

    // --- BƯỚC 2: TÍNH SỐ LẦN GÕ THÊM ---

    // **PHẦN SỬA LỖI BẮT ĐẦU TỪ ĐÂY**
    // Tạo một phiên bản của từ đã loại bỏ DẤU THANH nhưng giữ lại DẤU NGUYÊN ÂM.
    // Ví dụ: "việt" -> "viêt", "được" -> "đươc"
    const tuKhongDauThanh = tuTiengViet
        .normalize('NFD')
        .replace(/[\u0300\u0301\u0303\u0309\u0323]/g, '') // Chỉ xóa các dấu thanh
        .normalize('NFC'); // Ghép lại thành ký tự hoàn chỉnh

    // Đếm dấu nguyên âm trên phiên bản đã bỏ dấu thanh này.
    const soDauNguyenAm = (tuKhongDauThanh.match(NGUYEN_AM_CO_DAU) || []).length;
    soLanGo += soDauNguyenAm;

    // Đếm dấu thanh vẫn thực hiện trên từ gốc.
    const soDauThanh = (tuTiengViet.match(KY_TU_CO_DAU_THANH) || []).length;
    soLanGo += soDauThanh;
    if (tuKhongDauThanh.includes('ươ')) soLanGo -= 1;
    return soLanGo;
}

export const countLengthOfText = (text, language) => {
    if (language === 'vietnamese') return tinhSoLanGoTelex_fixed(text);
    if (language === 'english') return text.length; // Giả sử mỗi ký tự tiếng Anh là một lần gõ
};
