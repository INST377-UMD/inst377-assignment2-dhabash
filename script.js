// Fetch and display quote from ZenQuotes ONLY if #quote exists
const quoteElement = document.getElementById('quote');
if (quoteElement) {
  fetch('https://zenquotes.io/api/random')
    .then(response => response.json())
    .then(data => {
      const quote = data[0].q;
      const author = data[0].a;
      quoteElement.textContent = `"${quote}" — ${author}`;
    })
    .catch(error => {
      console.error('Error fetching quote:', error);
      quoteElement.textContent = 'Could not load quote.';
    });
}

// Set up Annyang voice commands
if (annyang) {
  const commands = {
    'hello': () => alert('Hello World'),
    'change the color to *color': color => {
      document.body.style.backgroundColor = color;
    },
    'navigate to *page': page => {
      const normalized = page.toLowerCase();
      if (normalized === 'home') window.location.href = 'homepage.html';
      else if (normalized === 'stocks') window.location.href = 'stocks.html';
      else if (normalized === 'dogs') window.location.href = 'dogs.html';
    }
  };
  annyang.addCommands(commands);
  annyang.start();
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
  })
  .catch(error => console.error('Error fetching dog images:', error));

// Fetch dog breeds and create 10 random buttons
fetch('https://api.thedogapi.com/v1/breeds')
  .then(res => res.json())
  .then(data => {
    console.log('Dog breeds fetched:', data);
    const container = document.getElementById('breed-buttons');
    if (!container) {
      console.error('No breed-buttons container found!');
      return;
    }

    // Randomly pick 10 breeds
    const randomBreeds = data.sort(() => 0.5 - Math.random()).slice(0, 10);

    randomBreeds.forEach(breed => {
      const btn = document.createElement('button');
      btn.textContent = breed.name;
      btn.className = 'breed-button';
      btn.onclick = () => pageFacts(breed); // 🔥 When clicked, show breed info
      container.appendChild(btn);
    });

    // Annyang: Load breed info by name
    if (annyang) {
      annyang.addCommands({
        'load dog breed *breed': breedName => {
          const match = data.find(b => b.name.toLowerCase() === breedName.toLowerCase());
          if (match) pageFacts(match);
        }
      });
    }
  })
  .catch(error => console.error('Failed to fetch dog breeds:', error));
  

// Function to fill in breed info and show container
function pageFacts(breed) {
  const breedInfo = document.getElementById('breed-info');
  const namedog = document.getElementById('breedname');
  const dogs = document.getElementById('breeds');
  const minlife = document.getElementById('minlife');
  const maxlife = document.getElementById('maxlife');

  if (!breedInfo || !breed) return;

  // Split lifespan
  const lifespan = breed.life_span ? breed.life_span.split(' - ') : ["Unknown", "Unknown"];
  const min = lifespan[0];
  const max = lifespan[1] ? lifespan[1].replace(" years", "") : "Unknown";

  // Fill the text
  namedog.textContent = breed.name;
  dogs.textContent = breed.temperament || "No description available.";
  minlife.textContent = min;
  maxlife.textContent = max;

  // Make container appear
  breedInfo.style.display = 'block';
  breedInfo.style.opacity = 0;

  setTimeout(() => {
    breedInfo.style.transition = 'opacity 0.5s';
    breedInfo.style.opacity = 1;
  }, 50);
}


