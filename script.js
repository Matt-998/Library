const openModal = document.querySelector(".openModal");
const modal = document.querySelector(".modal");
const form = document.getElementById("addBook");

openModal.addEventListener("click", () => {
  form.reset();
  modal.showModal();
});

modal.addEventListener("click", (e) => {
  if (e.target.nodeName === "DIALOG") {
    modal.setAttribute("closing", "");
    modal.addEventListener(
      "animationend",
      () => {
        modal.removeAttribute("closing");
        modal.close();
      },
      { once: true }
    );
  }
});

function bookMaker(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let myLibrary = [
  {
    title: "Test1",
    author: "Test1",
    pages: "25",
    read: "read",
  },
  {
    title: "Test2",
    author: "Test2",
    pages: "45",
    read: "notRead",
  },
];

function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  if (read == false) {
    read = "notRead";
  } else {
    read = "read";
  }
  let newBook = new bookMaker(title, author, pages, read);
  myLibrary.push(newBook);
}

const submit = document.getElementById("submit");
const container = document.getElementById("grid");
let readButtons = document.querySelectorAll(".readStatus");

displayBook(myLibrary);
readToggleAddEvntListnr(myLibrary);

form.addEventListener("submit", () => {
  addBookToLibrary();
  displayBook(myLibrary);
  readButtons = document.querySelectorAll(".readStatus");
  readToggleAddEvntListnr();
});

function indexOfBook(title, array) {
  return array.findIndex((item) => {
    return item.title === title;
  });
}

function displayBook(array) {
  if (container.firstChild === null) {
    i = 0;
  } else {
    i = array.length - 1;
  }
  for (i; i < array.length; i++) {
    item = array[i];
    let text;
    if (item.read === "notRead") {
      text = "Not read";
    } else {
      text = "Read";
    }
    const card = `
  <div class="book" data-objectIndex="${indexOfBook(item.title, array)}">
    <p>${item.title}</p>
    <p>${item.author}</p>
    <p>${item.pages}</p>
    <button class="${item.read} readStatus">${text}</button>
    <button class="remove">Remove</button>
  </div>
`;
    container.innerHTML += card;
    readButtons = document.querySelectorAll(".readStatus");
  }
}

function readToggleAddEvntListnr() {
  readButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switch (button.classList.contains("read")) {
        case true:
          button.classList.add("notRead");
          button.classList.remove("read");
          myLibrary[
            button.parentElement.getAttribute("data-objectIndex")
          ].read = "notRead";
          button.textContent = "Not Read";
          break;
        case false:
          button.classList.remove("notRead");
          button.classList.add("read");
          button.textContent = "Read";
          myLibrary[
            button.parentElement.getAttribute("data-objectIndex")
          ].read = "read";
          break;
      }
    });
  });
}
