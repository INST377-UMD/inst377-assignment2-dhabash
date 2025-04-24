// Fetch and display quote
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

// Set up Annyang voice commands
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
