// script.js

// Function to validate the URL
function isValidURL(url) {
    const regex = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]+$|^(https?:\/\/)?(www\.)?youtu\.be\/[a-zA-Z0-9_-]+$/;
    return regex.test(url);
}

// Function to handle video data
async function handleVideoData(url) {
    if (!isValidURL(url)) {
        showError('Invalid YouTube URL');
        return;
    }
    showLoading();
    try {
        const videoId = new URL(url).searchParams.get('v');
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=YOUR_API_KEY&part=snippet`);
        const data = await response.json();
        if (data.items.length > 0) {
            displayVideo(data.items[0].snippet.title);
        } else {
            showError('Video not found');
        }
    } catch (error) {
        showError('Error fetching video data');
    } finally {
        hideLoading();
    }
}

// Function to display video title
function displayVideo(title) {
    const videoTitleElement = document.getElementById('video-title');
    videoTitleElement.textContent = title;
}

// Function to show error messages
function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Function to show loading state
function showLoading() {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';
}

// Function to hide loading state
function hideLoading() {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'none';
}

// Function to download video
function downloadVideo(url) {
    // Implement video downloading functionality
    // Dummy implementation: just log the URL
    console.log('Downloading video from:', url);
}

// Event listener for the download button
document.getElementById('download-button').addEventListener('click', () => {
    const url = document.getElementById('youtube-url').value;
    handleVideoData(url);
});

// Add animations if necessary
// You can utilize CSS animations for the loading states and error notifications.

