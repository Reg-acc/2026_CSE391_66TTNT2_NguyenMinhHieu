const prices = {
    "laptop": 25000000,
    "phone": 12000000,
    "headphone": 1500000
};

const form = document.getElementById('orderForm');
const modal = document.getElementById('confirmModal');

// Tự động tính tiền 
const calculateTotal = () => {
    const product = document.getElementById('product').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 0;
    const total = (prices[product] || 0) * quantity;
    document.getElementById('totalDisplay').innerText = total.toLocaleString("vi-VN");
    return total;
};

document.getElementById('product').addEventListener('change', calculateTotal);
document.getElementById('quantity').addEventListener('input', calculateTotal);

// Đếm ký tự realtime
document.getElementById('note').addEventListener('input', function() {
    const len = this.value.length;
    const countDisplay = document.getElementById('currentChar');
    countDisplay.innerText = len;
    
    if (len > 200) {
        countDisplay.parentElement.classList.add('char-limit');
        document.getElementById('noteError').innerText = "Vượt quá 200 ký tự cho phép!";
    } else {
        countDisplay.parentElement.classList.remove('char-limit');
        document.getElementById('noteError').innerText = "";
    }
});

// Hàm validate chi tiết
const validateOrder = () => {
    let isValid = true;
    const showError = (id, msg) => { document.getElementById(id + 'Error').innerText = msg; isValid = false; };
    const clearError = (id) => document.getElementById(id + 'Error').innerText = "";

    // Sản phẩm
    if (!document.getElementById('product').value) showError('product', "Vui lòng chọn sản phẩm");
    else clearError('product');

    // Số lượng
    const qty = document.getElementById('quantity').value;
    if (qty < 1 || qty > 99) showError('quantity', "Số lượng từ 1-99");
    else clearError('quantity');

    // Ngày giao hàng
    const dateVal = new Date(document.getElementById('deliveryDate').value);
    const today = new Date();
    today.setHours(0,0,0,0);
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);

    if (isNaN(dateVal.getTime())) showError('deliveryDate', "Vui lòng chọn ngày");
    else if (dateVal < today) showError('deliveryDate', "Không được chọn ngày quá khứ");
    else if (dateVal > maxDate) showError('deliveryDate', "Không quá 30 ngày kể từ hôm nay");
    else clearError('deliveryDate');

    // Địa chỉ
    if (document.getElementById('address').value.trim().length < 10) showError('address', "Địa chỉ ít nhất 10 ký tự");
    else clearError('address');

    // Thanh toán
    if (!document.querySelector('input[name="payment"]:checked')) showError('payment', "Vui lòng chọn phương thức");
    else clearError('payment');

    return isValid;
};

// Xử lý Submit & Modal
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateOrder()) {
        const summary = `
            <p><b>Sản phẩm:</b> ${document.getElementById('product').options[document.getElementById('product').selectedIndex].text}</p>
            <p><b>Số lượng:</b> ${document.getElementById('quantity').value}</p>
            <p><b>Tổng tiền:</b> ${calculateTotal().toLocaleString("vi-VN")} VNĐ</p>
            <p><b>Ngày giao:</b> ${document.getElementById('deliveryDate').value}</p>
        `;
        document.getElementById('orderSummary').innerHTML = summary;
        modal.classList.remove('hidden');
    }
});

document.getElementById('btnCancel').onclick = () => modal.classList.add('hidden');

document.getElementById('btnConfirm').onclick = () => {
    modal.classList.add('hidden');
    form.classList.add('hidden');
    document.getElementById('finalSuccess').classList.remove('hidden');
};