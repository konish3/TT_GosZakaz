document.addEventListener("DOMContentLoaded", function () {
  const totalPages = 10; // Количество страниц
  let activePage = 1; // номер активной страницы
  const pagination = document.getElementById("pagination");
  const nextBtn = document.getElementById("nextBtn");

  function getPages(maxPages, currentPage) {
    let pages = [];

    for (let i = 1; i <= maxPages; i++) {
      if (
        i === 1 ||
        i === maxPages ||
        (currentPage < 4 && i <= 4) ||
        (i >= currentPage - 1 && i <= currentPage + 1) ||
        (maxPages - currentPage < 3 && maxPages - i <= 3)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }

    return pages;
  }

  function createPageButtons(newBtn) {
    const items = getPages(totalPages, +newBtn);
    pagination.replaceChildren();
    for (let i = 0; i < items.length; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = items[i];
      pageButton.classList.remove("pagination__button_active");

      if (items[i] === +newBtn) {
        pageButton.classList.add("pagination__button_active");
      }
      pagination.appendChild(pageButton);
    }
  }

  pagination.addEventListener("click", (e) => {
    const btnOnClick = e.target;

    if (btnOnClick.tagName === "DIV") {
      return;
    }
    if (btnOnClick.textContent === "...") {
      return;
    }
    activePage = +e.target.textContent;
    createPageButtons(activePage);
  });

  nextBtn.addEventListener("click", (e) => {
    if (activePage === totalPages) {
      activePage = 1;
    } else {
      activePage += 1;
    }
    createPageButtons(activePage);
  });

  createPageButtons(activePage);
});
