const form = document.getElementById('registerForm');
const successMsg = document.getElementById('successMsg');

// Hàm tiện ích
const showError = (id, message) => {
    document.getElementById(`${id}Error`).innerText = message;
};
const clearError = (id) => {
    document.getElementById(`${id}Error`).innerText = "";
};

// Các hàm Validate
const validateFullname = () => {
    const val = document.getElementById('fullname').value.trim();
    const regex = /^[a-zA-ZÀ-ỹ\s]{3,}$/;
    if (val === "") { showError('fullname', "Họ tên không được trống"); return false; }
    if (!regex.test(val)) { showError('fullname', "Ít nhất 3 ký tự, chỉ chứa chữ cái"); return false; }
    clearError('fullname'); return true;
};

const validateEmail = () => {
    const val = document.getElementById('email').value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (val === "") { showError('email', "Email không được trống"); return false; }
    if (!regex.test(val)) { showError('email', "Email không đúng định dạng"); return false; }
    clearError('email'); return true;
};

const validatePhone = () => {
    const val = document.getElementById('phone').value.trim();
    const regex = /^0\d{9}$/;
    if (!regex.test(val)) { showError('phone', "Phải có 10 số và bắt đầu bằng số 0"); return false; }
    clearError('phone'); return true;
};

const validatePassword = () => {
    const val = document.getElementById('password').value;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!regex.test(val)) { showError('password', "Tối thiểu 8 ký tự, 1 hoa, 1 thường, 1 số"); return false; }
    clearError('password'); return true;
};

const validateConfirm = () => {
    const pass = document.getElementById('password').value;
    const confirm = document.getElementById('confirmPassword').value;
    if (confirm !== pass || confirm === "") { showError('confirmPassword', "Mật khẩu xác nhận không khớp"); return false; }
    clearError('confirmPassword'); return true;
};

const validateGender = () => {
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) { showError('gender', "Vui lòng chọn giới tính"); return false; }
    clearError('gender'); return true;
};

const validateTerms = () => {
    const checked = document.getElementById('terms').checked;
    if (!checked) { showError('terms', "Bạn phải đồng ý với điều khoản"); return false; }
    clearError('terms'); return true;
};

// Gán sự kiện Blur & Input
const fields = ['fullname', 'email', 'phone', 'password', 'confirmPassword'];
fields.forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener('blur', () => {
        if (id === 'fullname') validateFullname();
        if (id === 'email') validateEmail();
        if (id === 'phone') validatePhone();
        if (id === 'password') validatePassword();
        if (id === 'confirmPassword') validateConfirm();
    });
    input.addEventListener('input', () => clearError(id));
});

// Xử lý Submit
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValid = validateFullname() & validateEmail() & validatePhone() & 
    validatePassword() & validateConfirm() & validateGender() & validateTerms();

    if (isValid) {
        form.classList.add('hidden');
        successMsg.classList.remove('hidden');
        document.getElementById('displayUsername').innerText = document.getElementById('fullname').value;
    }
});