const adminName = "admin";
const adminPassword = "admin123";
const body = document.body;

// Login page functionality
if (body.id === "loginPage") {
  const userNameInput = document.querySelector("#nameInput");
  const passwordInput = document.querySelector("#passwordInput");
  const loginBtn = document.querySelector("#loginBtn");
  loginBtn.addEventListener("click", () => {
    const nameValue = userNameInput.value.trim();
    const passwordValue = passwordInput.value.trim();
    if (!nameValue || !passwordValue) {
      alert("Please fill-up both username and password");
      return;
    }
    if (nameValue !== adminName) {
      alert("Incorrect username");
      return;
    }
    if (passwordValue !== adminPassword) {
      alert("Incorrect password");
      return;
    }
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
if (body.id === "mainPage") {
  const searchInput = document.querySelector("#searchInput");
  const searchInputBtn = document.querySelector("#searchBtn");
  const totalIssuesDisplay = document.querySelector("#totalIssues");
  const divParent = document.querySelector("#parentDiv");

  const filterBtns = document.querySelectorAll(".filterBtn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  async function loadAllIssues() {
    let res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    let data = await res.json();
    let issuesArr = data.data;
    renderIssues(issuesArr);
    console.log(issuesArr);
  }

  loadAllIssues();

  function renderIssues(arr) {
    divParent.innerHTML = "";
    if (arr.length > 0) {
      totalIssuesDisplay.textContent = `${arr.length} Issues`;
      arr.forEach((item) => {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("cards");
        let secondDiv = document.createElement("div");
        secondDiv.classList.add("borderBottom");
        let imageAndRateDiv = document.createElement("div");
        let imageDiv = document.createElement("div");
        imageDiv.classList.add("image");
        let image = document.createElement("img");
        if (item.status === "open") image.src = "./assets/open.png";
        if (item.status === "closed") image.src = "./assets/close.png";
        imageDiv.append(image);
        imageAndRateDiv.append(imageDiv);
        let rateDiv = document.createElement("div");
        rateDiv.classList.add("rate");
        let rateP = document.createElement("p");
        let newPriority = item.priority.toUpperCase();
        rateP.textContent = newPriority;
        if (item.priority === "high") rateDiv.classList.add("high");
        if (item.priority === "medium") rateDiv.classList.add("medium");
        if (item.priority === "low") rateDiv.classList.add("low");
        rateDiv.append(rateP);
        imageAndRateDiv.append(rateDiv);
        secondDiv.append(imageAndRateDiv);
        let titleH2 = document.createElement("h2");
        titleH2.textContent = item.title;
        secondDiv.append(titleH2);
        let descP = document.createElement("p");
        descP.textContent = item.description;
        secondDiv.append(descP);
        item.labels.forEach((label) => {
          let newLabel = label.toUpperCase();
          let span = document.createElement("span");
          span.textContent = newLabel;
          span.style.marginRight = "8px";
          if (label === "bug") span.classList.add("high");
          else if (label === "help wanted") span.classList.add("medium");
          else if (label === "enhancement") span.classList.add("good");
          else span.classList.add("normal");
          secondDiv.append(span);
        });
        cardDiv.append(secondDiv);
        let authorP = document.createElement("p");
        authorP.textContent = `by ${item.author}`;
        cardDiv.append(authorP);
        let timeP = document.createElement("p");
        timeP.textContent = `${item.createdAt.split("T")[0]}`;
        cardDiv.append(timeP);
        divParent.append(cardDiv);
      });
    } else {
      totalIssuesDisplay.textContent = `${arr.length} Issues`;
    }
  }
}
