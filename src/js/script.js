/*--------------INITIALIZATION--------------*/

document.addEventListener("DOMContentLoaded", () => {

    loadFormData();
    attachInputListeners();
    attachToggleListeners();
    attachModalListeners();

    updateTemplate();

});


/* --------------UPDATE TEMPLATE--------*/

function updateTemplate() {

    const toggleGroup = document.getElementById('toggleGroup');
    const toggleSubGroup = document.getElementById('toggleSubGroup');

    const fieldMap = {
        lab: ".lab-name-text",
        school: ".department-text",
        teacher1: ".teacher1-text",
        teacher2: ".teacher2-text",
        name: ".name-text",
        reg: ".regdno-text",
        branch: ".dept-text",
        semester: ".sem-text",
        section: ".sec-text"
    };

    const templates = document.querySelectorAll(".template");

    templates.forEach(template => {

        Object.entries(fieldMap).forEach(([id, selector]) => {

            const input = document.getElementById(id);
            const target = template.querySelector(selector);

            if (input && target) {
                target.textContent = input.value || " ";
            }

        });

        // SPECIAL HANDLING FOR SCHOOL/DEPARTMENT
        const schoolInput = document.getElementById("school");
        const schoolEl = template.querySelector(".department-text");

        if (schoolInput && schoolEl) {

            const value = schoolInput.value.trim();

            if (!value) {
                schoolEl.textContent = "School of";
            }
            else if (
                value.toLowerCase().includes("biotechnology") ||
                value.toLowerCase().includes("textile")
            ) {
                schoolEl.textContent = value + " Department";
            }
            else {
                schoolEl.textContent = "School of " + value;
            }

        }

        // GROUP
        const groupEl = template.querySelector(".group-text");
        if (groupEl) {
            groupEl.parentElement.style.display = toggleGroup.checked ? "block" : "none";
            groupEl.textContent = document.getElementById("group").value || "";
        }

        // SUBGROUP
        const subGroupEl = template.querySelector(".subgroup-text");
        if (subGroupEl) {
            subGroupEl.parentElement.style.display = toggleSubGroup.checked ? "block" : "none";
            subGroupEl.textContent = document.getElementById("sub-group").value || "";
        }

        // SECTION
        const secEl = template.querySelector(".sec-text");
        if (secEl) {
            secEl.parentElement.style.display = document.getElementById("toggleSec").checked ? "block" : "none";
            secEl.textContent = document.getElementById("section").value || "";
        }

    });

}


/* ---------INPUT LISTENERS---------------------*/

function attachInputListeners() {

    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {

        input.addEventListener("input", () => {

            saveFormData();
            updateTemplate();

        });

    });

}


/*--------------------TOGGLE LISTENERS----------------*/

function attachToggleListeners() {

    document.getElementById('toggleGroup').addEventListener('change', function () {

        const groupInput = document.getElementById('group');

        groupInput.disabled = !this.checked;

        if (!this.checked) groupInput.value = "";

        updateTemplate();
        saveFormData();

    });


    document.getElementById('toggleSubGroup').addEventListener('change', function () {

        const subGroupInput = document.getElementById('sub-group');

        subGroupInput.disabled = !this.checked;

        if (!this.checked) subGroupInput.value = "";

        updateTemplate();
        saveFormData();

    });

}


/*------------------CLEAR FORM----------------------*/

function clearFields() {

    document.getElementById("confirmModal").style.display = "flex";

}


function resetForm() {

    document.querySelectorAll("input[type='text']").forEach(input => {
        input.value = "";
    });

    localStorage.removeItem("labFormData");

    document.getElementById('toggleGroup').checked = true;
    document.getElementById('toggleSubGroup').checked = true;

    document.getElementById('group').disabled = false;
    document.getElementById('sub-group').disabled = false;

    updateTemplate();

}


/*---------------------MODAL LOGIC---------------------*/

function attachModalListeners() {

    const modal = document.getElementById("confirmModal");

    document.getElementById("confirmYes").onclick = () => {

        resetForm();
        modal.style.display = "none";

    };

    document.getElementById("confirmNo").onclick = () => {

        modal.style.display = "none";

    };

}


/*---------------------DOWNLOAD TEMPLATE---------------------*/

function downloadTemplate() {

    const selectedTemplate =
        document.querySelector('input[name="option"]:checked')
            ?.parentElement.querySelector(".template");

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


        // Build dynamic filename
        const nameInput = document.getElementById("name").value.trim();
        const labInput = document.getElementById("lab").value.trim();

        const firstName = nameInput.split(" ")[0] || "student";
        const firstLab = labInput.split(" ")[0] || "lab";

        const fileName = `${firstName}_${firstLab}_coverpage.pdf`;

        pdf.save(fileName);

    });

}


/*---------------LOCAL STORAGE----------------------*/

function saveFormData() {

    const fields = document.querySelectorAll("input");

    let formData = {};

    fields.forEach(field => {
        formData[field.id] = field.value;
    });

    localStorage.setItem("labFormData", JSON.stringify(formData));

}


function loadFormData() {

    const savedData = localStorage.getItem("labFormData");

    if (!savedData) return;

    const formData = JSON.parse(savedData);

    Object.keys(formData).forEach(id => {

        const field = document.getElementById(id);

        if (field) {
            field.value = formData[id];
        }

    });

}