const EMAIL_SERVICE = 'service_kxzprw3'
const EMAIL_TEMPLATE = 'template_lnre93j'

function sendMail(params){
  var tempparams = {
       from_name: document.getElementById('InputName').value,
       from_email: document.getElementById('InputEmail').value,
       from_subject: document.getElementById('InputSubject').value,
       from_message: document.getElementById('InputMessage').value,
  };
  emailjs.send(EMAIL_SERVICE, EMAIL_TEMPLATE, tempparams)
  .then(function(response){
    swal("Message Sent!", "I'll get back to you shortly!", "success")
  })
}
