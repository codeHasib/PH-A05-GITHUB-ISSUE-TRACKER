const adminName = "admin";
const adminPassword = "admin123";
const body = document.body;

if(body.id === "loginPage") {
    const userNameInput = document.querySelector("#nameInput");
    const passwordInput = document.querySelector("#passwordInput");
    const loginBtn = document.querySelector("#loginBtn");
    loginBtn.addEventListener("click", ()=> {
        const nameValue = userNameInput.value.trim();
        const passwordValue = passwordInput.value.trim();
        if(!nameValue || !passwordValue) {
            alert("Please fill-up both username and password");
            return;
        };
        if(nameValue !== adminName) {
            alert("Incorrect username");
            return;
        }
        if(passwordValue !== adminPassword) {
            alert("Incorrect password");
            return;
        };
        window.location.href = "./main.html";
    });
}