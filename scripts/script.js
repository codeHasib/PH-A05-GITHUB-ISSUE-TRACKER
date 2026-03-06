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

// Main page functionality
if (body.id === "mainPage") {
  const searchInput = document.querySelector("#searchInput");
  const searchInputBtn = document.querySelector("#searchBtn");
  const totalIssuesDisplay = document.querySelector("#totalIssues");
  const divParent = document.querySelector("#parentDiv");

  // Modal DOMS
  // const modalBox = document.querySelector(".modal-box");
  const modalTitle = document.querySelector("#modal-title");
  const modalSpanStatus = document.querySelector("#modal-status");
  const modalOpenedBy = document.querySelector("#modal-list-assignee");
  const modalDesc = document.querySelector("#modal-desc");
  const modalAssignee = document.querySelector("#modal-assignee");
  const modalPriority = document.querySelector("#modal-priority-level");
  const modalTime = document.querySelector("#modal-time");
  const bugsDiv = document.querySelector("#bugs");

  let filterValue = "all";

  const filterBtns = document.querySelectorAll(".filterBtn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((btn) => btn.classList.remove("active"));
      btn.classList.add("active");
      filterValue = btn.value;
      loadAllIssues();
    });
  });

  searchInputBtn.addEventListener("click", () => {
    const value = searchInput.value.trim();
    if (value) loadBySearch(value);
    else loadAllIssues();
  });

  async function loadAllIssues() {
    divParent.innerHTML = `
    <div class="col-span-4 flex items-center justify-center mt-20">
    <span class="loading loading-ring loading-xl"></span>
    </div>
    `;
    let res = await fetch(
      "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    let data = await res.json();
    let issuesArr = data.data;
    const openArr = issuesArr.filter((item) => item.status === "open");
    const closedArr = issuesArr.filter((item) => item.status === "closed");
    if (filterValue === "all") renderIssues(issuesArr);
    else if (filterValue === "open") renderIssues(openArr);
    else if (filterValue === "closed") renderIssues(closedArr);
  }

  async function loadBySearch(value) {
    divParent.innerHTML = `
      <div class="col-span-4 flex items-center justify-center mt-20">
    <span class="loading loading-ring loading-xl"></span>
    </div>
    `;
    let res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${value}`,
    );
    let data = await res.json();
    let issuesArr = data.data;
    renderIssues(issuesArr);
  }

  async function loadById(id) {
    let res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    let data = await res.json();
    let issueObj = data.data;
    renderModal(issueObj);
  }

  loadAllIssues();

  function renderIssues(arr) {
    divParent.innerHTML = "";
    if (arr.length > 0) {
      totalIssuesDisplay.textContent = `${arr.length} Issues`;
      arr.forEach((item) => {
        let cardDiv = document.createElement("div");
        cardDiv.classList.add("cards");
        cardDiv.addEventListener("click", async () => {
          await loadById(item.id);
          my_modal_2.showModal();
        });
        let secondDiv = document.createElement("div");
        secondDiv.classList.add("borderBottom");
        let imageAndRateDiv = document.createElement("div");
        let imageDiv = document.createElement("div");
        imageDiv.classList.add("image");
        let image = document.createElement("img");
        if (item.status === "open") {
          image.src = "./assets/open.png";
          cardDiv.style.borderTop = "5px solid lightgreen";
        } 
        if (item.status === "closed") {
          image.src = "./assets/close.png";
          cardDiv.style.borderTop = "5px solid purple";
        } 
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
      divParent.innerHTML = `
      <h1 class="text-center font-extrabold text-2xl col-span-4 mt-10">
      No issues found!!!
      </h1>
      `;
    }
  }

  function renderModal(obj) {
    modalTitle.textContent = obj.title;
    if (obj.status === "open") modalSpanStatus.classList.add("good");
    else modalSpanStatus.classList.add("high");
    modalSpanStatus.textContent = obj.status;
    modalSpanStatus.classList.add("rate");
    modalOpenedBy.textContent = `Opened By ${obj.author}`;
    modalTime.textContent = obj.createdAt.split("T")[0];
    modalDesc.textContent = obj.description;
    modalAssignee.textContent = obj.author;
    modalPriority.classList.add("rate");
    if (obj.priority === "high") modalPriority.classList.add("high");
    else if (obj.priority === "medium") modalPriority.classList.add("medium");
    else modalPriority.classList.add("low");
    modalPriority.textContent = obj.priority;
    bugsDiv.innerHTML = "";
    obj.labels.forEach((label) => {
      let newLabel = label.toUpperCase();
      let span = document.createElement("span");
      span.classList.add("rate");
      span.textContent = newLabel;
      span.style.marginRight = "8px";
      if (label === "bug") span.classList.add("high");
      else if (label === "help wanted") span.classList.add("medium");
      else if (label === "enhancement") span.classList.add("good");
      else span.classList.add("normal");
      bugsDiv.append(span);
    });
  }
}
