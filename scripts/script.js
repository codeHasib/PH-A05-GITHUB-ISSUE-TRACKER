const adminName = "admin";
const adminPassword = "admin123";
const body = document.body;

// Login page functionality
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

// structure
//         <div class="cards">
        //   <div class="borderBottom">
        //     <div>
        //       <div class="image">
        //         <img src="/assets/Open-Status.png" alt="" />
        //       </div>
        //       <div class="rate">
        //         <p>HIGH</p>
        //       </div>
        //     </div>
        //     <h2>Fix navigation menu on mobile devices</h2>
        //     <p>The navigate button is not responsive for the mobile devices</p>
        //     <span>BUG</span>
        //     <span>BUG</span>
        //   </div>
        //   <p>by codeHasib</p>
        //   <p>5/10/2025</p>
        // </div>

// Main page functionality
if(body.id === "mainPage") {

    const searchInput = document.querySelector("#searchInput");
    const searchInputBtn = document.querySelector("#searchBtn");
    const totalIssuesDisplay = document.querySelector("#totalIssues");

    const filterBtns = document.querySelectorAll(".filterBtn");
    filterBtns.forEach(btn=> {
        btn.addEventListener("click", ()=> {
            filterBtns.forEach(btn=> btn.classList.remove("active"));
            btn.classList.add("active");
        })
    });

    

}   