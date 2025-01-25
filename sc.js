const form = document.getElementById('ticket-form');

form.addEventListener('submit', async function(event) {
    event.preventDefault(); // ป้องกันการรีโหลดหน้า

    const name = document.getElementById('name').value;
    const department = document.getElementById('dropdown').value;
    const issue = document.getElementById('issue').value;
    const picture = document.getElementById('input-pic').files[0];

    // อัปโหลดรูปภาพ (ถ้ามี)
    let pictureUrl = '';
    if (picture) {
        const formData = new FormData();
        formData.append('file', picture);

        // ส่งรูปภาพไปยังบริการอัปโหลด (เช่น ImgBB)
        const uploadResponse = await fetch('https://api.imgbb.com/1/upload?key=1234567890abcdef1234567890abcdef', { // แทนที่ YOUR_IMGBB_API_KEY ด้วย API Key ของคุณ
            method: 'POST',
            body: formData
        });
        const uploadData = await uploadResponse.json();
        pictureUrl = uploadData.data.url;
    }

    // ส่งข้อมูลไปยัง Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890/exec', { // แทนที่ YOUR_GOOGLE_APPS_SCRIPT_URL ด้วย URL ของ Google Apps Script
        method: 'POST',
        body: JSON.stringify({ name, department, issue, picture: pictureUrl }),
        headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.text();
    alert(result); // แสดงผลลัพธ์
});
