document.getElementById('quote-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = new FormData(this);
  
    const res = await fetch('https://your-backend-url.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      })
    });
  
    if (res.ok) {
      alert('Message sent successfully!');
      this.reset();
    } else {
      alert('Failed to send message. Please try again.');
    }
  });
  