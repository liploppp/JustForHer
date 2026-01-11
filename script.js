function nextPage(page) {
  // Add fade out effect
  const currentPage = document.querySelector('.container:not(.hidden)');
  if (currentPage) {
    currentPage.style.opacity = '0';
    currentPage.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
      document.querySelectorAll('.container').forEach(el => {
        el.classList.add('hidden');
        el.style.opacity = '';
        el.style.transform = '';
      });
      
      const nextPageEl = document.getElementById('page' + page);
      nextPageEl.classList.remove('hidden');
      
      // Trigger reflow to ensure animations restart
      nextPageEl.offsetHeight;
      
      // Reset animations
      const animatedElements = nextPageEl.querySelectorAll('h1, h2, p, button, .avatar, .photo, .quote, iframe, .gallery img');
      animatedElements.forEach((el, index) => {
        el.style.animation = 'none';
        el.offsetHeight; // Trigger reflow
        el.style.animation = null;
      });
    }, 300);
  } else {
    // First load
    document.querySelectorAll('.container').forEach(el => {
      el.classList.add('hidden');
    });
    document.getElementById('page' + page).classList.remove('hidden');
  }
}

// Initialize love animation
function initLoveAnimation() {
  const loveContainer = document.querySelector('.love-animation');
  const loveEmojis = ['💖', '💕', '💗', '💓', '💝', '💘', '💞', '💟', '❤️', '💙'];
  
  // Clear existing love elements
  loveContainer.innerHTML = '';
  
  // Create 15 love elements for better coverage
  for (let i = 0; i < 15; i++) {
    const love = document.createElement('span');
    love.className = 'love';
    love.textContent = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
    love.style.left = Math.random() * 100 + '%';
    love.style.animationDelay = Math.random() * 5 + 's';
    love.style.animationDuration = (7 + Math.random() * 4) + 's';
    loveContainer.appendChild(love);
  }
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
  // Initialize love animation
  initLoveAnimation();
  
  // Add click effect to buttons
  document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
      const ripple = document.createElement('span');
      const rect = e.target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      e.target.style.position = 'relative';
      e.target.style.overflow = 'hidden';
      e.target.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    }
  });
  
  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});