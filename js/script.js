// Email regex//credit to emailregex.com for below regex. I did not write this myself!
// /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Create the `showPage` function toinsert/append the elements needed to display a "page" of nine students

function showPage(list, page) {
  //Creating variables for the list, and start and end indices

  const startIndex = page * 9 - 9;
  const endIndex = page * 9;

  //Selecting the student list
  const studentList = document.querySelector(".student-list");
  studentList.innerHTML = "";

  //Using a loop to cycle through the data and display the appropriate 9 elements per page and their associated info

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      const li = document.createElement("li");
      li.className = "student-item cf";

      const divDetails = document.createElement("div");
      divDetails.className = "student-details";

      const img = document.createElement("img");
      img.className = "avatar";
      img.alt = "Profile Picture";
      img.src = `${list[i].picture.large}`;

      const studentName = document.createElement("h3");
      const fullName = `${list[i].name.first} ${list[i].name.last}`;
      studentName.innerText = `${fullName}`;

      const email = document.createElement("span");
      email.className = "email";
      email.innerHTML = `${list[i].email}`;

      const joinedDiv = document.createElement("div");
      joinedDiv.className = "joined-details";

      const joinDate = document.createElement("span");
      joinDate.className = "date";
      joinDate.innerHTML = `Joined ${list[i].registered.date}`;

      const body = document.querySelector("body");

      body.appendChild(studentList);
      studentList.appendChild(li);
      li.appendChild(divDetails);
      li.appendChild(joinedDiv);
      divDetails.appendChild(img);
      divDetails.appendChild(studentName);
      divDetails.appendChild(email);
      joinedDiv.appendChild(joinDate);
    }
  }
}

//Creating the `addPagination` function tocreate and insert/append the elements needed for the pagination buttons

function paginate(list) {
  const length = list.length;
  const pagesNum = Math.ceil(length / 9);

  const ulList = document.querySelector(".link-list");
  ulList.innerHTML = "";

  //Creating and adding the buttons to the ul defined above
  for (let i = 1; i <= pagesNum; i++) {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerText = i;
    ulList.appendChild(li);
    li.appendChild(btn);
  }
  const firstBtn = document.querySelector("button");
  firstBtn.className = "active";

  //Creating the event listener to allow users to filter through pages when clicking the buttons
  ulList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const activeBtn = document.querySelector(".active");
      activeBtn.classList.remove("active");
      e.target.className = "active";
      showPage(list, e.target.textContent);
    }
  });
}

// Call functions, starting on the first page of the list, add the pagination buttons, add search function capability

showPage(data, 1);
paginate(data);
showSearch();

//Create a search component and append to the header

function showSearch() {
  const header = document.querySelector(".header");

  const search = `
   <label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;

  header.insertAdjacentHTML("beforeend", search);
}

//Add functionality to the search component so that it works as expected for standard search

// Write a function to check for and list a match

function search(list) {
  const searchInput = document.querySelector("#search").value.toLowerCase();
  let matches = [];

  for (let i = 0; i < list.length; i++) {
    const fullName = `${list[i].name.first} ${list[i].name.last}`;

    if (fullName.toLowerCase().includes(searchInput)) {
      matches.push(list[i]);
    }
  }

  if (matches.length >= 1) {
    showPage(matches, 1);
    paginate(matches);
  } else {
    const newHeadline = document.querySelector(".student-list");
    newHeadline.innerHTML = "Sorry, no results found ☹";
    newHeadline.style.textAlign = "center";
    newHeadline.style.fontSize = "2rem";
  }
}

// //Add on an event listener to trigger the above function when a search is inputted
const searchBtn = document.querySelector(".student-search button");
const searchBar = document.querySelector("#search");

searchBtn.addEventListener("click", () => {
  search(data);
});

searchBar.addEventListener("keyup", () => {
  search(data);
});

//Adding an event listener to the 'Students' heading to refresh the page since I think it's most intuitive to restore to the original page button (totally extra)

const headline = document.querySelector(".header h2");
console.log(headline);

headline.addEventListener("click", () => {
  showPage(data, 1);
  paginate(data);
});
