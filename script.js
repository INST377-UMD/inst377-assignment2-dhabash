// Fetch and display quote from ZenQuotes
fetch('https://zenquotes.io/api/random')
  .then(response => response.json())
  .then(data => {
    const quote = data[0].q;
    const author = data[0].a;
    document.getElementById('quote').textContent = `"${quote}" — ${author}`;
  })
  .catch(error => {
    console.error('Error fetching quote:', error);
    document.getElementById('quote').textContent = 'Could not load quote.';
  });

// Set up Annyang voice commands (global setup)
if (annyang) {
  const commands = {
    'hello': () => alert('Hello World'),
    'change the color to *color': color => {
      document.body.style.backgroundColor = color;
    },
    'navigate to *page': page => {
      const normalized = page.toLowerCase();
      if (normalized === 'home') window.location.href = 'index.html';
      else if (normalized === 'stocks') window.location.href = 'stocks.html';
      else if (normalized === 'dogs') window.location.href = 'dogs.html';
    }
  };
  annyang.addCommands(commands);
}

// Load 10 random dog images into the carousel
fetch('https://dog.ceo/api/breeds/image/random/10')
  .then(res => res.json())
  .then(data => {
    const carousel = document.getElementById('carousel');
    data.message.forEach(url => {
      const img = document.createElement('img');
      img.src = url;
      img.alt = 'Dog photo';
      img.style = 'width: 150px; height: 150px; object-fit: cover; margin: 5px;';
      carousel.appendChild(img);
    });
  });

// Fetch dog breeds and create buttons
fetch('https://api.thedogapi.com/v1/breeds')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('breed-buttons');

    data.forEach(breed => {
      const btn = document.createElement('button');
      btn.textContent = breed.name;
      btn.className = 'breed-button';
      btn.setAttribute('data-name', breed.name.toLowerCase());
      btn.onclick = () => showBreed(breed);
      container.appendChild(btn);
    });

    // Add breed-specific voice command after breed data is loaded
    if (annyang) {
      annyang.addCommands({
        'load dog breed *breed': breedName => {
          const match = data.find(b => b.name.toLowerCase() === breedName.toLowerCase());
          if (match) showBreed(match);
        }
      });
      annyang.start();
    }
  });

// Show breed info in container
function showBreed(breed) {
  document.getElementById('breed-info').style.display = 'block';
  document.getElementById('breed-name').textContent = breed.name;
  document.getElementById('breed-desc').textContent = breed.temperament || 'No description available.';
  document.getElementById('breed-life').textContent = breed.life_span;
}
