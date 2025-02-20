function updateTemplate() {
    // Retrieve input values with fallback to "[NOT SET]"
    const labValue = document.getElementById('lab').value || "[NOT SET]";
    const schoolValue = document.getElementById('school').value || "[NOT SET]";
    const teacher1Value = document.getElementById('teacher1').value || "[NOT SET]";
    const teacher2Value = document.getElementById('teacher2').value || "[NOT SET]";
    const nameValue = document.getElementById('name').value || "[NOT SET]";
    const regValue = document.getElementById('reg').value || "[NOT SET]";
    const branchValue = document.getElementById('branch').value || "[NOT SET]";
    const semValue = document.getElementById('semester').value || "[NOT SET]";
    const secValue = document.getElementById('section').value || "[NOT SET]";
    const groupValue = document.getElementById('group').value || "[NOT SET]";
    const subgroupValue = document.getElementById('sub-group').value || "[NOT SET]";

    // Select all templates (each with class .template)
    const templates = document.querySelectorAll('.template');

    templates.forEach(template => {
        // Update lab name
        const labNameEl = template.querySelector('.lab-name-text');
        if (labNameEl) {
            labNameEl.textContent = labValue;
        }

        // Update department (School)
        const deptEl = template.querySelector('.department-text');
        if (deptEl) {
            deptEl.textContent = schoolValue;
        }

        // Update teacher1
        const teacher1El = template.querySelector('.teacher1-text');
        if (teacher1El) {
            teacher1El.textContent = teacher1Value;
        }

        // Update teacher2 (if exists)
        const teacher2El = template.querySelector('.teacher2-text');
        if (teacher2El) {
            teacher2El.textContent = teacher2Value;
        }

        // Update name
        const nameEl = template.querySelector('.name-text');
        if (nameEl) {
            nameEl.textContent = nameValue;
        }

        // Update registration number
        const regEl = template.querySelector('.regdno-text');
        if (regEl) {
            regEl.textContent = regValue;
        }

        // Update branch
        const branchEl = template.querySelector('.dept-text');
        if (branchEl) {
            branchEl.textContent = branchValue;
        }

        // Update semester
        const semEl = template.querySelector('.sem-text');
        if (semEl) {
            semEl.textContent = semValue;
        }

        // Update section
        const secEl = template.querySelector('.sec-text');
        if (secEl) {
            secEl.textContent = secValue;
        }

        // Update group
        const groupEl = template.querySelector('.group-text');
        if (groupEl) {
            groupEl.textContent = groupValue;
        }

        // Update sub-group
        const subgroupEl = template.querySelector('.subgroup-text');
        if (subgroupEl) {
            subgroupEl.textContent = subgroupValue;
        }
    });
}

// Clear All Fields 

function clearFields() {
    if (confirm("Clear all fields?")) {
        document.querySelectorAll("input").forEach(input => input.value = "");
        updateTemplate();
    }
}

// Download Template 

function downloadTemplate() {
    const selectedTemplate = document.querySelector('input[name="option"]:checked').parentElement.querySelector(".template");

    if (!selectedTemplate) {
        alert("No template selected!");
        return;
    }

    html2canvas(selectedTemplate, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("Lab_Cover_Page.pdf");
    });
}