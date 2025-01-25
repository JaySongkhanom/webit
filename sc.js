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
        const uploadResponse = await fetch('https://api.imgbb.com/1/upload?key=8e776d224ede24f008f068a05666474a', {
            method: 'POST',
            body: formData
        });
        const uploadData = await uploadResponse.json();
        pictureUrl = uploadData.data.url;
    }

    // ส่งข้อมูลไปยัง Google Apps Script
    const response = await fetch('https://script.google.com/macros/s/AKfycbxZ-BbgUa1sEL80R3-IVMUE9KHMDkQlV-Tz3n3a-vAGDTuK36nwn1Nlb5HFhuQi7Rbt/exec', {
        method: 'POST',
        body: JSON.stringify({ name, department, issue, picture: pictureUrl }),
        headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.text();
    alert(result); // แสดงผลลัพธ์
});
