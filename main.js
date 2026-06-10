const emailjsPublicKey = 'npYaMzxoIOSbbDDVb';
const emailjsServiceId = 'service_w1ebzrg';
const emailjsTemplateId = 'template_5o3zo4a';

const sendMessageBtn = document.getElementById('sendMessageBtn');
const contactName = document.getElementById('contactName');
const contactEmail = document.getElementById('contactEmail');
const contactMessage = document.getElementById('contactMessage');

function isEmailJsConfigured() {
  return emailjsPublicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
         emailjsServiceId !== 'YOUR_SERVICE_ID' &&
         emailjsTemplateId !== 'YOUR_TEMPLATE_ID';
}

if (isEmailJsConfigured()) {
  emailjs.init(emailjsPublicKey);
}

sendMessageBtn.addEventListener('click', () => {
  const name = contactName.value.trim();
  const email = contactEmail.value.trim();
  const message = contactMessage.value.trim();

  if (!name || !email || !message) {
    alert('Please fill out all fields before sending.');
    return;
  }

  if (!isEmailJsConfigured()) {
    alert('EmailJS is not configured. Please add your public key, service ID, and template ID to the script.');
    return;
  }

  sendMessageBtn.disabled = true;
  const originalText = sendMessageBtn.textContent;
  sendMessageBtn.textContent = 'Sending...';

  const templateParams = {
    from_name: name,
    from_email: email,
    message: message,
    to_email: 'vutamanishankar@gmail.com'
  };

  emailjs.send(emailjsServiceId, emailjsTemplateId, templateParams)
    .then(() => {
      alert('Message sent successfully. I will get back to you soon.');
      contactName.value = '';
      contactEmail.value = '';
      contactMessage.value = '';
    })
    .catch((error) => {
      console.error(error);
      alert('Sorry, the message could not be sent. Please try again later.');
    })
    .finally(() => {
      sendMessageBtn.disabled = false;
      sendMessageBtn.textContent = originalText;
    });
});
