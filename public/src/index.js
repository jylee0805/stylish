let product = document.querySelector(".product");
let cartNum = document.querySelector(".cartNum");
let member = document.querySelector(".member");
let main = document.querySelector("main");
let banner = document.querySelector(".banner");
let categories = document.querySelector(".header_categories");
let searchBox = document.querySelector(".searchBox");
let searchInput = document.querySelector(".search");
let searchBtn = document.querySelector(".searchIcon");
let slide = document.querySelector(".slide");
let slideBoxs;
let pageItem = document.querySelectorAll(".banner_pageItem");
let pages = document.querySelector(".banner_pages");

let urlString = location.href;
let url = new URL(urlString);
let urlCategory = url.searchParams.get("category");
let urlSearch = url.searchParams.get("search");

let timer;
let nextPaging = 0;

let isLoad = false;

let num = 0;

loadProdut();
cartNum.innerText = JSON.parse(localStorage.getItem("num"));
if (JSON.parse(localStorage.getItem("login")) == null) {
  member.setAttribute("src", "../img/member.png");
} else {
  member.setAttribute("src", JSON.parse(localStorage.getItem("login")).data.user.picture);
}

ajax("https://api.appworks-school.tw/api/1.0/marketing/campaigns").then((data) => {
  renderBanner(data);
  runBannerSlide();
});

function loadProdut() {
  let loadingStr = `<div  class="loading"><img src="img/loading.gif"><p>載入中，請稍後</p></div>`;
  product.insertAdjacentHTML("beforeend", loadingStr);

  if (urlCategory) {
    queryData(`https://api.appworks-school.tw/api/1.0/products/${urlCategory}?paging=${nextPaging}`);
  } else if (urlSearch) {
    queryData(`https://api.appworks-school.tw/api/1.0/products/search?keyword=${urlSearch}`);
  } else if (!urlCategory && !urlSearch) {
    queryData(`https://api.appworks-school.tw/api/1.0/products/all?paging=${nextPaging}`);
  }
}

function ajax(url) {
  return fetch(url, { method: "get" })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

function queryData(url) {
  let timeoutPromise = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("time out");
      }, timeout);
    });
  };

  Promise.race([timeoutPromise(3000), ajax(url)])
    .then((resp) => {
      let loading = document.querySelector(".loading");
      product.removeChild(loading);
      if (resp == "time out") {
        alert("連線超時，請重新嘗試");
      } else {
        if (resp.data.length == 0) {
          product.innerHTML = `<p class="notFound">查無該項商品</p>`;
        } else {
          renderlayout(resp, nextPaging);
          nextPaging = resp.next_paging;
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function renderBanner(data) {
  let template = document.getElementsByTagName("template")[0];

  data.data.forEach((element) => {
    let clone = template.content.cloneNode(true);
    let link = clone.querySelector("a");
    let img = clone.querySelector("img");
    let title = clone.querySelector("p");
    let from = clone.querySelector("small");
    let strarr = element.story.split("\r\n");
    link.setAttribute("href", `/product.html?id=${element.product_id}`);
    img.src = element.picture;
    title.innerHTML = `${strarr[0]} <br/>${strarr[1]} <br />${strarr[2]}`;
    from.innerText = strarr[3];
    slide.append(clone);
  });
  slideBoxs = document.querySelectorAll(".slide-box");
  slideBoxs[0].classList.add("active");
  pageItem[0].style.background = "#8B572A";
}

function runBannerSlide() {
  timer = setInterval(function () {
    console.log(num);
    if (num == slideBoxs.length || num == undefined) {
      num = 0;
    }
    slideBoxs[num].classList.remove("active");

    pageItem[num].style.background = "#fff";

    num = (num + 1) % slideBoxs.length;

    slideBoxs[num].classList.add("active");
    pageItem[num].style.background = "#8B572A";
  }, 5000);
}

function renderlayout(data, page) {
  data.data.forEach((element, outIndex) => {
    let str = ` <a href="./product?id=${element.id}" class="product_imgBox"><img src=${element.main_image} alt="product" class="product_img" /></a>
            <ul class="product_color"></ul>
            <h3 class="product_itemTitle">${element.title}</h3>
            <p class="product_price">TWD.${element.price}</p> `;
    product.insertAdjacentHTML("beforeend", `<div class="product_item">${str}</div> `);
    let num = outIndex + page * 6;

    element.colors.forEach((colorItem) => {
      let productColor = document.querySelectorAll(".product_color");

      productColor[num].insertAdjacentHTML("beforeend", `<li class="product_colorItem"></li>`);

      let colorLastChild = productColor[num].lastChild;

      colorLastChild.style.background = `#${colorItem.code}`;
    });
  });

  isLoad = true;
}

slide.addEventListener("mouseover", () => {
  clearInterval(timer);
});

slide.addEventListener("mouseout", () => {
  runBannerSlide();
});

pages.addEventListener("click", (e) => {
  console.log(e.target);
  if (e.target.nodeName == "LI") {
    clearInterval(timer);
    let target = e.target.dataset.id;
    console.log(num);
    slideBoxs[num].classList.remove("active");
    pageItem[num].style.background = "#fff";

    slideBoxs[target].classList.add("active");
    pageItem[target].style.background = "#8B572A";

    num = target;
  }
});

window.addEventListener("offline", () => {
  banner.insertAdjacentHTML("afterend", `<div class="offline">目前網頁斷線，請重新整理</div> `);
});
window.addEventListener("online", () => {
  let offlineAlert = document.querySelector(".offline");
  main.removeChild(offlineAlert);
});

categories.addEventListener("click", (e) => {
  e.preventDefault();
  let categoryUrl;

  switch (e.target.dataset.category) {
    case "women":
      categoryUrl = new URLSearchParams("category=women");
      break;
    case "men":
      categoryUrl = new URLSearchParams("category=men");
      break;
    case "accessories":
      categoryUrl = new URLSearchParams("category=accessories");
      break;
  }
  url.search = categoryUrl;
  location.href = url;
});

searchBtn.addEventListener("click", () => {
  searchBox.style.width = "98%";
  searchInput.style.display = "block";
  searchInput.focus();
});

searchInput.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    let searchUrl;
    let searchValue = searchInput.value;

    if (searchValue !== "") {
      searchUrl = new URLSearchParams(`search=${searchValue}`);
      url.search = searchUrl;
      location.href = url;
    }
  }
});

window.addEventListener("scroll", () => {
  let documentHeight = document.documentElement.offsetHeight;
  let windowHeight = window.innerHeight;
  let scrollTop = document.documentElement.scrollTop;

  if (scrollTop + windowHeight >= documentHeight - 1 && nextPaging != undefined && isLoad == true) {
    isLoad = false;
    loadProdut();
  }
});

window.addEventListener("resize", () => {
  if (document.documentElement.offsetWidth >= 1280) {
    searchBox.style.width = "auto";
    searchInput.style.display = "block";
  } else if (document.documentElement.offsetWidth < 1280) {
    searchBox.style.width = "98%";
    searchInput.style.display = "none";
  }
});

main.addEventListener("click", () => {
  if (document.documentElement.offsetWidth < 1280) {
    searchInput.style.display = "none";
  }
});
