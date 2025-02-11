function updateTemplate() {
    document.querySelector('.lab-name span').textContent = document.getElementById('lab').value || "[NOT SET]";
    document.getElementById('department-text').textContent = document.getElementById('school').value || "[NOT SET]";
    document.getElementById('teacher1-text').textContent = document.getElementById('teacher1').value || "[NOT SET]";
    document.getElementById('teacher2-text').textContent = document.getElementById('teacher2').value || "[NOT SET]";
    document.getElementById('name-text').textContent = document.getElementById('name').value || "[NOT SET]";
    document.getElementById('regdno-text').textContent = document.getElementById('reg').value || "[NOT SET]";
    document.getElementById('dept-text').textContent = document.getElementById('branch').value || "[NOT SET]";
    document.getElementById('sem-text').textContent = document.getElementById('semester').value || "[NOT SET]";
    document.getElementById('sec-text').textContent = document.getElementById('section').value || "[NOT SET]";
    document.getElementById('group-text').textContent = document.getElementById('group').value || "[NOT SET]";
}


function clearFields() {
    if (confirm("Are you sure you want to clear all fields?")) {
        document.querySelectorAll("input").forEach(input => input.value = "");
        updateTemplate();
    }
}


function downloadTemplate() {
    const { jsPDF } = window.jspdf;  // Load jsPDF
    let doc = new jsPDF({
        orientation: 'portrait',  // or 'landscape'
        unit: 'mm',
        format: 'a4'  // Standard page size
    });

    let element = document.getElementById("template"); // Select the cover page

    html2canvas(element, { scale: 3 }).then(canvas => {
        let imgData = canvas.toDataURL("image/png"); // Convert to image
        let imgWidth = 210; // A4 width in mm
        let imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
        
        doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight); // Add image to PDF
        doc.save("Lab_Record_Cover.pdf"); // Download the file
    });
}

