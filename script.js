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
    document.querySelectorAll("input").forEach(input => input.value = "");
    updateTemplate();  // Reset template after clearing inputs
}

function downloadTemplate() {
    let template = document.getElementById("template");

    html2canvas(template, {
        scale: 3,  // Higher scale = better quality PNG
        useCORS: true,  // Ensure images load properly
        backgroundColor: null  // Keep transparent background
    }).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");  // Convert to PNG format
        link.download = "lab_cover.png";
        link.click();
    });
}
