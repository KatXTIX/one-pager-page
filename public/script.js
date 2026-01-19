document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });

  const contactForm = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const message = document.getElementById('message').value;
    const button = contactForm.querySelector('button');
    
    button.disabled = true;
    button.textContent = 'Sending...';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      formResponse.textContent = data.message;
      formResponse.classList.remove('hidden');
      contactForm.reset();
    } catch (error) {
      formResponse.textContent = 'Something went wrong. Please try again.';
      formResponse.classList.remove('hidden');
    } finally {
      button.disabled = false;
      button.textContent = 'Send';
    }
  });
});
