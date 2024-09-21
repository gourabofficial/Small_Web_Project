// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the form and the image container
    const form = document.querySelector('form');
    const imgContainer = document.querySelector('.img-container');

    // Add event listener for the form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from refreshing the page

        const query = document.querySelector('input[name="search"]').value.trim(); // Get the search query

        if (query) {
            // Display a loading message
            imgContainer.innerHTML = '<h2>Loading...</h2>';

            // Fetch images from the API
            fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=QMQo0posgsKIeITDhEbXUzz3M-HB9X-iuzQS5SiU5NA`)
                
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        imgContainer.innerHTML = ''; // Clear the loading message
                        data.results.forEach(photo => {
                            const imgElement = document.createElement('img');
                            imgElement.src = photo.urls.small;
                            imgElement.alt = photo.alt_description || 'Image';
                            imgElement.style.width = '100%';
                            imgElement.style.marginBottom = '10px';
                            imgContainer.appendChild(imgElement);
                        });
                    } else {
                        imgContainer.innerHTML = '<h2>No photos found</h2>';
                    }
                })
                .catch(error => {
                    console.error('Error fetching images:', error);
                    imgContainer.innerHTML = '<h2>Error fetching images</h2>';
                });
        } else {
            imgContainer.innerHTML = '<h2>Please enter a search term</h2>';
        }
    });
});
