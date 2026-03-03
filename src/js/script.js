// -------------------------
// UPDATE TEMPLATE FUNCTION
// -------------------------

function updateTemplate() {

    // Toggle references
    const toggleGroup = document.getElementById('toggleGroup');
    const toggleSubGroup = document.getElementById('toggleSubGroup');

    // Retrieve input values
    const labValue = document.getElementById('lab').value || "[NOT SET]";
    const schoolValue = document.getElementById('school').value || "[NOT SET]";
    const teacher1Value = document.getElementById('teacher1').value || "[NOT SET]";
    const teacher2Value = document.getElementById('teacher2').value || "[NOT SET]";
    const nameValue = document.getElementById('name').value || "[NOT SET]";
    const regValue = document.getElementById('reg').value || "[NOT SET]";
    const branchValue = document.getElementById('branch').value || "[NOT SET]";
    const semValue = document.getElementById('semester').value || "[NOT SET]";
    const secValue = document.getElementById('section').value || "[NOT SET]";

    // Conditional values for Group & Subgroup
    const groupValue = toggleGroup.checked
        ? (document.getElementById('group').value || "[NOT SET]")
        : "";

    const subgroupValue = toggleSubGroup.checked
        ? (document.getElementById('sub-group').value || "[NOT SET]")
        : "";

    // Select all templates
    const templates = document.querySelectorAll('.template');

    templates.forEach(template => {

        const setText = (selector, value) => {
            const el = template.querySelector(selector);
            if (el) el.textContent = value;
        };

        setText('.lab-name-text', labValue);
        setText('.department-text', schoolValue);
        setText('.teacher1-text', teacher1Value);
        setText('.teacher2-text', teacher2Value);
        setText('.name-text', nameValue);
        setText('.regdno-text', regValue);
        setText('.dept-text', branchValue);
        setText('.sem-text', semValue);
        setText('.sec-text', secValue);

        // Handle Group
        const groupEl = template.querySelector('.group-text');
        if (groupEl) {
            if (toggleGroup.checked) {
                groupEl.textContent = groupValue;
                groupEl.parentElement.style.display = "block";
            } else {
                groupEl.parentElement.style.display = "none";
            }
        }

        // Handle Subgroup
        const subgroupEl = template.querySelector('.subgroup-text');
        if (subgroupEl) {
            if (toggleSubGroup.checked) {
                subgroupEl.textContent = subgroupValue;
                subgroupEl.parentElement.style.display = "block";
            } else {
                subgroupEl.parentElement.style.display = "none";
            }
        }

    });
}


// -------------------------
// AUTO UPDATE ON TOGGLE
// -------------------------

document.getElementById('toggleGroup').addEventListener('change', function () {
    document.getElementById('group').disabled = !this.checked;
    if (!this.checked) document.getElementById('group').value = "";
    updateTemplate();
});

document.getElementById('toggleSubGroup').addEventListener('change', function () {
    document.getElementById('sub-group').disabled = !this.checked;
    if (!this.checked) document.getElementById('sub-group').value = "";
    updateTemplate();
});


// -------------------------
// CLEAR ALL FIELDS
// -------------------------

function clearFields() {
    if (confirm("Clear all fields?")) {

        document.querySelectorAll("input[type='text']").forEach(input => {
            input.value = "";
        });

        // Reset toggles to checked
        document.getElementById('toggleGroup').checked = true;
        document.getElementById('toggleSubGroup').checked = true;

        document.getElementById('group').disabled = false;
        document.getElementById('sub-group').disabled = false;

        updateTemplate();
    }
}


// -------------------------
// DOWNLOAD TEMPLATE
// -------------------------

function downloadTemplate() {

    const selectedTemplate = document.querySelector('input[name="option"]:checked')?.parentElement.querySelector(".template");

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

        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save("Lab_Cover_Page.pdf");
    });
}