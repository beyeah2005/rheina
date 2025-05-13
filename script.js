// Simulate login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    if (username && password) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'home.html';
    } else {
      alert('Please enter both username and password');
    }
  }
  
  function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
  }
  
  function showAbout() {
    alert('University Finder helps you explore universities with detailed info, programs, and rankings.');
  }
  
  function loadUniversities() {
    fetch('universities.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('universities');
        data.forEach((uni, index) => {
          const card = document.createElement('div');
          card.className = 'university-card';
          card.innerHTML = `
            <div class="university-image-container">
              <img src="${uni.image}" alt="${uni.name}">
            </div>
            <h3>${uni.name}</h3>
            <button onclick="viewDetails(${index})">View Details</button>
          `;
          container.appendChild(card);
        });
      });
  }
  
  function viewDetails(index) {
    localStorage.setItem('selectedUniversity', index);
    window.location.href = 'university.html';
  }
  
  function displayUniversityDetails() {
    fetch('universities.json')
      .then(response => response.json())
      .then(data => {
        const index = localStorage.getItem('selectedUniversity');
        const uni = data[index];
        const container = document.getElementById('university-details');
        container.innerHTML = `
          <h2>${uni.name}</h2>
          <div class="university-image-container">
            <img src="${uni.image}" alt="${uni.name}">
          </div>
          <p><strong>Description:</strong> ${uni.description}</p>
          <p><strong>Programs:</strong> ${uni.programs.join(', ')}</p>
          <p><strong>Rank:</strong> ${uni.rank}</p>
          <p><a href="${uni.website}" target="_blank">Visit Official Website</a></p>
          <a href="home.html" class="back-button">Back to Home</a>
        `;
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('universities')) loadUniversities();
    if (document.getElementById('university-details')) displayUniversityDetails();
  });
