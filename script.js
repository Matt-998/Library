const openModal = document.querySelector(".openModal");
const modal = document.querySelector(".modal");

openModal.addEventListener("click", () => {
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

let myLibrary = [];

function addBookToLibrary() {}
