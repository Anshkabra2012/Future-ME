async function processPhoto() {
    const fileInput = document.getElementById('photoInput');
    const originalPhoto = document.getElementById('originalPhoto');
    const agedPhoto = document.getElementById('agedPhoto');
    const futureStory = document.getElementById('futureStory');

    if (!fileInput.files[0]) {
        alert('Please upload a photo!');
        return;
    }

    // Display the original photo
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        originalPhoto.src = e.target.result;
    };
    reader.readAsDataURL(file);

    // Your DeepAI API key
    const apiKey = '0d2ab545-89a5-4413-b295-9a3870fc1ed2';
    const formData = new FormData();
    formData.append('image', file);

    try {
        // Call the DeepAI API for face aging
        const response = await fetch('https://api.deepai.org/api/age-progression', {
            method: 'POST',
            headers: {
                'Api-Key': apiKey
            },
            body: formData 
        });

        const data = await response.json();
        if (data.output_url) {
            agedPhoto.src = data.output_url; // Set the aged photo
        } else {
            throw new Error('Failed to get aged photo. Please try again.');
        } 

        // Simulate a future story (for now, until you integrate a story API)
        futureStory.textContent = "In 10 years, you'll be living your best life on a tropical island!";
    } catch (error) {
        console.error('Error processing photo:', error);
        alert('get trolled.');
    }
}
