function updateTemplate() {
    // Get all templates
    const templates = document.querySelectorAll('.template');

    templates.forEach(template => {
        template.querySelector('.lab-name span').textContent = document.getElementById('lab').value || "[NOT SET]";
        template.querySelector('#department-text').textContent = document.getElementById('school').value || "[NOT SET]";
        template.querySelector('#teacher1-text').textContent = document.getElementById('teacher1').value || "[NOT SET]";
        template.querySelector('#teacher2-text').textContent = document.getElementById('teacher2').value || "[NOT SET]";
        template.querySelector('#name-text').textContent = document.getElementById('name').value || "[NOT SET]";
        template.querySelector('#regdno-text').textContent = document.getElementById('reg').value || "[NOT SET]";
        template.querySelector('#dept-text').textContent = document.getElementById('branch').value || "[NOT SET]";
        template.querySelector('#sem-text').textContent = document.getElementById('semester').value || "[NOT SET]";
        template.querySelector('#sec-text').textContent = document.getElementById('section').value || "[NOT SET]";
        template.querySelector('#group-text').textContent = document.getElementById('group').value || "[NOT SET]";
    });
}



function clearFields() {
    if (confirm("Are you sure you want to clear all fields?")) {
        document.querySelectorAll("input").forEach(input => input.value = "");
        updateTemplate();
    }
}


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








