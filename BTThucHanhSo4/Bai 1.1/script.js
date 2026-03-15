let students = [];

const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const summaryArea = document.getElementById('summaryArea');

// Hàm tính xếp loại
function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}

// Hàm hiển thị (Render) bảng và thống kê
function renderTable() {
    tableBody.innerHTML = '';
    let totalScore = 0;

    students.forEach((sv, index) => {
        const row = document.createElement('tr');
        
        // Thêm class tô màu vàng nếu điểm dưới 5
        if (sv.score < 5) row.classList.add('bg-yellow');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score.toFixed(1)}</td>
            <td>${getRank(sv.score)}</td>
            <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
        `;
        tableBody.appendChild(row);
        totalScore += sv.score;
    });

    // Cập nhật thống kê
    let avg;
    if (students.length === 0) {
        avg = 0;
    } else {
        avg = (totalScore / students.length).toFixed(2);
    }
    summaryArea.innerText = `Tổng số: ${students.length} | Điểm trung bình: ${avg}`;
}

// Hàm xử lý thêm sinh viên
function addStudent() {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    // Kiểm tra hợp lệ
    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    // Thêm vào mảng
    students.push({ name, score });

    // Cập nhật giao diện
    renderTable();

    // Xóa trắng và focus
    txtName.value = "";
    txtScore.value = "";
    txtName.focus();
}

// Gắn sự kiện
btnAdd.addEventListener('click', addStudent);

// Nhấn Enter ở ô điểm để thêm
txtScore.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});

// Xử lý nút Xóa
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const index = e.target.getAttribute('data-index');
        students.splice(index, 1);
        renderTable();
    }
});