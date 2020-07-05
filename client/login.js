//login operation
document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector("#loginBtn");
  login = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pwd").value;
    console.log("login func", email, password);

    //call login url
    const loginApiUrl = "http://localhost:5000/api/chat/login";
    fetch(loginApiUrl)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  loginBtn.addEventListener("click", login);
});
