function submitForm(){

  const emailReceiver = "liro.zke@gmail.com";

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let subject = document.getElementById("subject").value;
  let message = document.getElementById("message").value;

  let dataObject = {
    name: name,
    email: email,
    phone: phone,
    subject: subject,
    message: message
  }

  // validation input

  if (name == "") {
    return alert("name is required");
  } else if (email == "") {
    return alert("email is required");
  } else if (phone == "") {
    return alert("phone is required");
  } else if (subject == "") {
    return alert("subject is required");    
  } else if (message == "") {
    return alert("message is required"); 
  } else {
    alert("Opening mail..");
  }

  const a = document.createElement("a");

  a.href = `mailto:${emailReceiver}?subject=${subject}&body=Hello, my name is ${name}, ${subject}. Here is my phone number : ${phone}. %0D%0A%0D%0A${message}`;
  a.target = "_blank";
  a.click();

}