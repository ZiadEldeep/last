// Initializing students from localStorage
let students = JSON.parse(localStorage.getItem('students')) || {};

function calculateAverageGrade(subjects) {
    if (subjects.length === 0) return '0.00';

    const totalGrades = subjects.reduce((acc, [_, midTerm, final]) => {
        const midTermGrade = parseFloat(midTerm) || 0;
        const finalGrade = parseFloat(final) || 0;
        return acc + (midTermGrade + finalGrade) / 2;
    }, 0);

    return (totalGrades / subjects.length).toFixed(2); // Overall average
}

function calculateOverallAverage() {
    const allGrades = [];
    for (const studentId in students) {
        const student = students[studentId];
        student.subjects.forEach(([_, midTerm, final]) => {
            allGrades.push(parseFloat(midTerm) || 0);
            allGrades.push(parseFloat(final) || 0);
        });
    }
    const total = allGrades.reduce((acc, grade) => acc + grade, 0);
    const overallAverage = allGrades.length ? (total / allGrades.length).toFixed(2) : '0.00';
    document.getElementById('overallAverage').innerText = overallAverage;

    // Update chart after calculating overall average
    updateChart();
    renderAllStudentsTable(); // Update the all students table
}

// Update the chart with average grades
function updateChart() {
    const averageGrades = Object.values(students).map(student => parseFloat(student.averageGrade) || 0);
    const studentNames = Object.values(students).map(student => student.name);

    const ctx = document.getElementById('averageGradesChart').getContext('2d');
    if (window.averageGradesChart) {
        window.averageGradesChart.destroy(); // Destroy the old chart instance if it exists
    }
    window.averageGradesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: studentNames,
            datasets: [{
                label: 'Average Grade',
                data: averageGrades,
                backgroundColor: 'rgba(30, 144, 255, 0.5)',
                borderColor: 'rgba(30, 144, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Render the all students table
function renderAllStudentsTable() {
    const allStudentsTableBody = document.querySelector('#allStudentsTable tbody');
    allStudentsTableBody.innerHTML = '';

    for (const id in students) {
        const student = students[id];
        const subjects = student.subjects.map(sub => sub[0]).join(', ');
        const midTerms = student.subjects.map(sub => sub[1]).join(', ');
        const finals = student.subjects.map(sub => sub[2]).join(', ');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${subjects}</td>
            <td>${midTerms}</td>
            <td>${finals}</td>
            <td>${student.averageGrade}</td>
        `;
        allStudentsTableBody.appendChild(row);
    }
}

// Event listener for form submission
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value || Date.now().toString();
    const studentName = document.getElementById('studentName').value;
    const subjects = [];
    const subjectElements = document.querySelectorAll('.subject');
    const midTermElements = document.querySelectorAll('.midTerm');
    const finalElements = document.querySelectorAll('.final');

    subjectElements.forEach((subjectEl, index) => {
        const subject = subjectEl.value;
        const midTerm = midTermElements[index].value;
        const final = finalElements[index].value;
        subjects.push([subject, midTerm, final]);
    });

    const averageGrade = calculateAverageGrade(subjects);
    students[studentId] = { name: studentName, subjects, averageGrade };

    localStorage.setItem('students', JSON.stringify(students));
    renderStudentTable();
    calculateOverallAverage(); // Update overall average
    clearForm();
});

// Render the student table
function renderStudentTable() {
    const studentTableBody = document.querySelector('#studentTable tbody');
    studentTableBody.innerHTML = '';

    for (const id in students) {
        const student = students[id];
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.subjects.map(sub => sub[0]).join(', ')}</td>
            <td>${student.averageGrade}</td>
            <td>
                <button onclick="editStudent('${id}')">Edit</button>
                <button onclick="deleteStudent('${id}')">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);
    }
}

// Clear the form after submission
function clearForm() {
    document.getElementById('studentId').value = '';
    document.getElementById('studentName').value = '';
    document.getElementById('subject-container').innerHTML = `
        <div class="subject-entry">
            <label for="subject">Subject:</label>
            <input type="text" class="subject" required>
            <label for="midTerm">Mid Term:</label>
            <input type="text" class="midTerm" required>
            <label for="final">Final:</label>
            <input type="text" class="final" required>
            <button type="button" class="remove-subject" onclick="removeSubject(this)">Remove Subject</button>
        </div>
    `;
}

// Add a new subject entry
function addSubject() {
    const subjectContainer = document.getElementById('subject-container');
    const entry = document.createElement('div');
    entry.className = 'subject-entry';
    entry.innerHTML = `
        <label for="subject">Subject:</label>
        <input type="text" class="subject" required>
        <label for="midTerm">Mid Term:</label>
        <input type="text" class="midTerm" required>
        <label for="final">Final:</label>
        <input type="text" class="final" required>
        <button type="button" class="remove-subject" onclick="removeSubject(this)">Remove Subject</button>
    `;
    subjectContainer.appendChild(entry);
}

// Remove a subject entry
function removeSubject(button) {
    button.parentElement.remove();
}

// Edit a student's details
function editStudent(id) {
    const student = students[id];
    document.getElementById('studentId').value = id;
    document.getElementById('studentName').value = student.name;

    const subjectContainer = document.getElementById('subject-container');
    subjectContainer.innerHTML = '';

    for (const [subject, midTerm, final] of student.subjects) {
        const entry = document.createElement('div');
        entry.className = 'subject-entry';
        entry.innerHTML = `
            <label for="subject">Subject:</label>
            <input type="text" class="subject" value="${subject}" required>
            <label for="midTerm">Mid Term:</label>
            <input type="text" class="midTerm" value="${midTerm}" required>
            <label for="final">Final:</label>
            <input type="text" class="final" value="${final}" required>
            <button type="button" class="remove-subject" onclick="removeSubject(this)">Remove Subject</button>
        `;
        subjectContainer.appendChild(entry);
    }
}

// Delete a student
function deleteStudent(id) {
    delete students[id];
    localStorage.setItem('students', JSON.stringify(students));
    renderStudentTable(); // Refresh table
    calculateOverallAverage(); // Update overall average
}

// Filter students based on search input
function filterStudents() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const studentTableBody = document.querySelector('#studentTable tbody');
    studentTableBody.innerHTML = '';

    for (const id in students) {
        const student = students[id];
        if (student.name.toLowerCase().includes(searchValue)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.subjects.map(sub => sub[0]).join(', ')}</td>
                <td>${student.averageGrade}</td>
                <td>
                    <button onclick="editStudent('${id}')">Edit</button>
                    <button onclick="deleteStudent('${id}')">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        }
    }
}

// Toggle dark mode
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.querySelector('.sidebar').classList.toggle('dark-mode');
    document.querySelector('.main-content').classList.toggle('dark-mode');
});

// Render the student table and overall average on page load
renderStudentTable();
calculateOverallAverage();
