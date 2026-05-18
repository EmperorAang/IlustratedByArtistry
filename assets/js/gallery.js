document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('gallery-container');
    const videoGalleryContainer = document.getElementById('video-gallery-container');
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = document.getElementById('lightbox-content');

    function createGalleryItem(item) {
        const container = document.createElement('div');
        container.className = 'flex w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-1 md:p-2';
        container.setAttribute('data-aos', 'fade-up');

        if (item.media_type === 'image') {
            const img = document.createElement('img');
            img.alt = item.title;
            img.className = 'block h-full w-full rounded-lg object-cover object-center cursor-pointer';
            img.src = item.image_url;
            img.addEventListener('click', () => openLightbox(item));
            container.appendChild(img);
        } else if (item.media_type === 'video') {
            const video = document.createElement('video');
            video.className = 'block h-full w-full rounded-lg object-cover object-center cursor-pointer';
            video.src = item.image_url;
            video.setAttribute('playsinline', '');
            video.setAttribute('muted', '');
            video.setAttribute('loop', '');
            video.addEventListener('click', () => openLightbox(item));
            container.appendChild(video);
        }
        return container;
    }

    function openLightbox(item) {
        lightbox.classList.remove('hidden');
        lightboxContent.innerHTML = ''; // Clear previous content
        const descriptionContainer = document.getElementById('lightbox-description');
        const descriptionContainerWrapper = document.getElementById('lightbox-description-container');
        descriptionContainer.textContent = ''; // Clear description

        let mediaElement;
        if (item.media_type === 'image') {
            mediaElement = document.createElement('img');
            mediaElement.src = item.image_url;
            mediaElement.alt = item.title;
        } else if (item.media_type === 'video') {
            mediaElement = document.createElement('video');
            mediaElement.src = item.image_url;
            mediaElement.controls = true;
            mediaElement.autoplay = true;
        }
        
        if (mediaElement) {
            mediaElement.className = 'max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl';
            lightboxContent.appendChild(mediaElement);
        }

        if (item.description) {
            descriptionContainer.textContent = item.description;
        }
        
        // Prevent body scroll when lightbox is open
        document.body.style.overflow = 'hidden';
    }

    lightbox.addEventListener('click', (e) => {
        // Close if clicked on the lightbox background or description area (not the media element itself)
        const mediaElement = lightboxContent.querySelector('img, video');
        if (!mediaElement || !mediaElement.contains(e.target)) {
            lightbox.classList.add('hidden');
            const video = lightboxContent.querySelector('video');
            if (video) {
                video.pause();
            }
            lightboxContent.innerHTML = ''; // Stop video/audio
            document.getElementById('lightbox-description').textContent = '';
            // Restore body scroll
            document.body.style.overflow = '';
        }
    });

    fetch('api/gallery.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (!galleryContainer || !videoGalleryContainer) return;
            galleryContainer.innerHTML = ''; // Clear static content
            videoGalleryContainer.innerHTML = ''; // Clear static content
            
            if (Array.isArray(data)) {
                data.forEach(item => {
                    const galleryItem = createGalleryItem(item);
                    if (item.media_type === 'image') {
                        galleryContainer.appendChild(galleryItem);
                    } else if (item.media_type === 'video') {
                        videoGalleryContainer.appendChild(galleryItem);
                    }
                });
            } else {
                console.error('Fetched data is not an array:', data);
            }

            AOS.refresh();
        })
        .catch(error => console.error('Error fetching gallery:', error));
});