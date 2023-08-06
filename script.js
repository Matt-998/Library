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
    read: '"read',
  },
  {
    title: "Test2",
    author: "Test2",
    pages: "45",
    read: '"notRead',
  },
];

function addBookToLibrary() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read").checked;
  if (read == false) {
    read = `"notRead`;
  } else {
    read = `"read`;
  }
  let newBook = new bookMaker(title, author, pages, read);
  myLibrary.push(newBook);
}

const submit = document.getElementById("submit");
const container = document.getElementById("grid");
let readButtons = document.querySelectorAll(".readStatus");

displayBook(myLibrary);
readToggleAddEvntListnr();

form.addEventListener("submit", () => {
  addBookToLibrary();
  displayBook(myLibrary);
  readButtons = document.querySelectorAll(".readStatus");
  readToggleAddEvntListnr();
});

function displayBook(array) {
  item = array[array.length - 1];
  const book = document.createElement("div");
  book.classList = "book";
  let text;
  if (item.read == false) {
    text = "Not read";
  } else {
    text = "Read";
  }
  const card = `
  <div class="book">
    <p>${item.title}</p>
    <p>${item.author}</p>
    <p>${item.pages}</p>
    <button class=${item.read} readStatus">${text}</button>
    <button class="remove">Remove</button>
  </div>
`;
  container.innerHTML += card;
}

function readToggleAddEvntListnr() {
  readButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switch (button.classList.contains("read")) {
        case true:
          button.classList.add("notRead");
          button.classList.remove("read");
          break;
        case false:
          button.classList.remove("notRead");
          button.classList.add("read");
          break;
      }
    });
  });
}
