let students = [];
let sortDirection = 0;

const txtName = document.getElementById('txtName');
const txtScore = document.getElementById('txtScore');
const btnAdd = document.getElementById('btnAdd');
const tableBody = document.getElementById('studentTableBody');
const summaryArea = document.getElementById('summaryArea');

const searchInput = document.getElementById('searchName');
const filterRank = document.getElementById('filterRank');
const sortScoreBtn = document.getElementById('sortScoreBtn');


function getRank(score) {
    if (score >= 8.5) return "Giỏi";
    if (score >= 7.0) return "Khá";
    if (score >= 5.0) return "Trung bình";
    return "Yếu";
}


function applyFilters() {
    let filteredStudents = [...students];

    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";
    if (keyword !== "") {
        filteredStudents = filteredStudents.filter(sv => 
            sv.name.toLowerCase().includes(keyword)
        );
    }

    // Lọc theo xếp loại
    let selectedRank;
    if (filterRank) {
        selectedRank = filterRank.value;
    } else {
        selectedRank = "All";
    }

    if (selectedRank !== "All") {
        filteredStudents = filteredStudents.filter(sv => getRank(sv.score) === selectedRank);
    }

    // Sắp xếp điểm
    if (sortDirection === 1) {
        filteredStudents.sort((a, b) => a.score - b.score);
    } else if (sortDirection === 2) {
        filteredStudents.sort((a, b) => b.score - a.score);
    }

    renderTable(filteredStudents);
}


function renderTable(dataToDisplay) {
    tableBody.innerHTML = '';
    let totalScore = 0;

    if (dataToDisplay.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">Không có kết quả phù hợp</td></tr>';
    }

    dataToDisplay.forEach((sv, index) => {
        const row = document.createElement('tr');
        if (sv.score < 5) row.classList.add('bg-yellow');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.name}</td>
            <td>${sv.score.toFixed(1)}</td>
            <td>${getRank(sv.score)}</td>
            <td><button class="btn-delete" data-id="${sv.id}">Xóa</button></td>
        `;
        tableBody.appendChild(row);
        totalScore += sv.score;
    });

    const count = dataToDisplay.length;
    const avg = count > 0 ? (totalScore / count).toFixed(2) : 0;
    summaryArea.innerText = `Kết quả: ${count} | Điểm trung bình: ${avg}`;
}

function addStudent() {
    const name = txtName.value.trim();
    const score = parseFloat(txtScore.value);

    if (name === "" || isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập họ tên và điểm hợp lệ (0-10)!");
        return;
    }

    students.push({ 
        id: Date.now(), 
        name: name, 
        score: score 
    });

    applyFilters();

    txtName.value = "";
    txtScore.value = "";
    txtName.focus();
}

// Xử lý Xóa theo ID
tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-delete')) {
        const id = parseInt(e.target.getAttribute('data-id'));
        students = students.filter(sv => sv.id !== id);
        applyFilters();
    }
});

// Sự kiện Tìm kiếm & Lọc
if (searchInput) searchInput.addEventListener('input', applyFilters);
if (filterRank) filterRank.addEventListener('change', applyFilters);


const sortIcon = document.getElementById('sortIcon');
function handleSort() {
    sortDirection = (sortDirection + 1) % 3;
    
    const icons = ["↕", "▲", "▼"];
    if (sortIcon) sortIcon.innerText = icons[sortDirection];
    
    applyFilters();
}

btnAdd.addEventListener('click', addStudent);
txtScore.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addStudent();
});