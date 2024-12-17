
import './style.css';

const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showSpinner()
    const data = new FormData(form);

    const response = await fetch('http://localhost:8080/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    });

    if (response.ok) {
      const { image } = await response.json();
      downloadLink(image);
      const result = document.querySelector('#result');
      result.innerHTML = `<img src="${ image }" width="512" />`;
    } else {
      const err = await response.text();
      alert(err);
      console.error(err);
    }

    
    hideSpinner()
});


function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dream... <span class="spinner">🧠</span>';
}

// Added a download link function
function downloadLink(image) {
  try {
    const link = document.querySelector('a');
    link.innerHTML = "Download";
    link.href = image;
    link.download = 'ai_image.png';
    link.target = '_blank';
  } catch (error) {
    console.error("Failed to create a download link")
    alert("Could not create download link")
  }
}

function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}