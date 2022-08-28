function submitForm() {

  const emailReceiver = "liro.zke@gmail.com";

  let name = document.getElementById("name").value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById('message').value;

  // using variable to store values if the document.getElementById is 
  //outside the function

  // name = name.value;
  // email = email.value;
  // phone = phone.value;
  // subject = subject.value;
  // message = message.value;

  // using object to store values :

  
  let dataObject = {
    name: name,
    email: email,
    phoneNumber: phone,
    subject: subject,
    message: message,
  };

  // console.log(dataObject); logging

  // validation value 

  if (name == "") {
    return alert("name must be filled in...");
  } else if (email == "") {
    return alert("email must be filled in...");
  } else if (phone == ""){
    return alert("phone number must be filled in...")
  } else if (subject == "") {
    return alert("subject must be filled in...")
  } else if (message == "") {
    return alert("message must be filled in...")
  } else {
    alert("opening mail...")
  }

  const a = document.createElement('a');

  a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello my name is ${name}, ${subject}. %0D%0A%0D%0A${message}`;
  a.target = '_blank';
  a.click();

}
