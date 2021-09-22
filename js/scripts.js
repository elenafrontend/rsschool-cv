"use strict";

let header = document.querySelector(".header");
let burgerBtn = document.querySelector(".burger");
let navLinks = document.querySelectorAll(".nav__link");
let skillsItems = document.querySelectorAll(".skills__item");
let skills = document.querySelector(".skills");

// -----------  mobile or not  -----------

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

// -----------  scroll animation  -----------

const scrollItems = document.querySelectorAll(".scroll-item");

if (scrollItems.length > 0) {
  setTimeout(() => {
    showScrollAnim();
  }, 500);

  window.addEventListener("scroll", showScrollAnim);

  function showScrollAnim() {
    for (let scrollItem of scrollItems) {
      // высота элемента
      const scrollItemHeight = scrollItem.offsetHeight;
      // положение на странице (прокрутка страницы top окна + положение элемента относительно окна)
      const scrollItemOffset =
        pageYOffset + scrollItem.getBoundingClientRect().top;
      // при прокрутке на какую часть элемента показываем его на странице (прокрутив 4 часть элемента)
      const scrollItemPart = 4;

      // определяем точку появления элемента - после появления в окне четверти элемента
      let viewPoint = window.innerHeight - scrollItemHeight / scrollItemPart;
      // если элемент больше окна, при прокрутке четверти окна
      if (scrollItemHeight > window.innerHeight) {
        viewPoint = window.innerHeight - window.innerHeight / scrollItemPart;
      }

      if (pageYOffset > scrollItemOffset - viewPoint) {
        scrollItem.classList.add("scroll-item--active");
      }
    }
  }
}

// -----------  header appearance  -----------
window.onscroll = function () {
  if (window.pageYOffset > 100) {
    header.classList.add("header--active");
  } else {
    header.classList.remove("header--active");
  }
};

// -----------  active scroll menu item  -----------

window.addEventListener("scroll", () => {
  let scrollDistance = window.scrollY;
  let sections = document.querySelectorAll(".section");

  for (let i = 0; i < sections.length; i++) {
    let sectionPosition = sections[i].offsetTop;
    let navItems = document.querySelectorAll(".nav__item");

    if (sectionPosition - header.clientHeight < scrollDistance) {
      for (let navLink of navLinks) {
        navLink.classList.remove("nav__link--active");
      }

      navItems[i].querySelector("a").classList.add("nav__link--active");
    }

    let contacts = document.querySelector(".contacts");
    let contactsPosition = contacts.offsetTop - 200;

    if (contactsPosition - header.clientHeight < scrollDistance) {
      for (let navLink of navLinks) {
        navLink.classList.remove("nav__link--active");
      }

      navItems[i].querySelector("a").classList.add("nav__link--active");
    }
  }
});

//-----------  scroll toggle  -----------

function scrollToggle(elem, classActive) {
  // ширина скролла
  let body = document.body;
  let paddingOffset = window.innerWidth - body.offsetWidth + "px";

  // функция блокировки скролла
  if (elem.classList.contains(classActive)) {
    document.body.style.overflow = "hidden";

    // если десктоп - убираем скачок страницы - компенсируем скролл
    if (!isMobile.any()) {
      body.style.paddingRight = paddingOffset;
      header.style.paddingRight = paddingOffset;
    }
  } else {
    document.body.style.overflow = "";

    // если десктоп - убираем компенсацию скролла
    if (!isMobile.any()) {
      body.style.paddingRight = "0px";
      header.style.paddingRight = "0px";
    }
  }
}

//-----------  burger-menu  -----------

burgerBtn.addEventListener("click", function () {
  header.classList.toggle("header--active-nav");
  burgerBtn.classList.toggle("burger--active");

  // блокируем/возобновляем скролл страницы
  scrollToggle(burgerBtn, "burger--active");
});

// функция закрытия меню бургер
let resetNav = function () {
  if (burgerBtn.classList.contains("burger--active")) {
    burgerBtn.classList.remove("burger--active");
    header.classList.remove("header--active-nav");

    scrollToggle(burgerBtn, "burger--active");
  }
};

// закрываем бургер при клике на ссылку в меню
for (let navLink of navLinks) {
  navLink.addEventListener("click", function (evt) {
    // если открыто меню-бургер, закрываем его
    resetNav();
  });
}

// закрываем бургер меню при ресайзе окна
window.addEventListener("resize", resetNav);

//-----------  typing text  -----------
// https://mattboldt.com/demos/typed-js/

var typed = new Typed(".typed", {
  strings: ["Lena", "Gumerova Elena"],
  typeSpeed: 90,
  startDelay: 1800,
  backSpeed: 60,

  onComplete: (self) => {
    self.cursor.remove();
  },
});

// -----------  sliders  -----------

// Инициализируем swiper
let swiper = new Swiper(".skills__container", {
  loop: true,
  speed: 3000,
  slidesPerView: 2,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

  breakpoints: {
    // when window width is >= 400px
    400: {
      slidesPerView: 3,
    },

    576: {
      slidesPerView: 4,
    },

    768: {
      slidesPerView: 5,
    },

    992: {
      slidesPerView: 6,
      speed: 5000,
    },

    1400: {
      slidesPerView: 7,
    },

    1700: {
      slidesPerView: 8,
      speed: 6000,
    },
  },

  grabCursor: true,
  keyboard: true,

  // Стоп при наведении вар 1
  /* on: {
    init() {
      this.el.addEventListener("mouseover", () => {
        this.autoplay.stop();
      });

      this.el.addEventListener("mouseout", () => {
        this.autoplay.start();
      });
    },
  }, */
});

// Стоп при наведении вар 2

skills.addEventListener("mouseover", () => {
  swiper.autoplay.stop();
});

skills.addEventListener("mouseout", () => {
  swiper.autoplay.start();
});

//-----------  3D cards  -----------
// https://micku7zu.github.io/vanilla-tilt.js/

if (!isMobile.any()) {
  VanillaTilt.init(document.querySelectorAll(".portfolio__card"), {
    max: 20,
    speed: 600,
    // reverse: true,
  });
}

//-----------  self-rating  -----------
console.log(`
  1. вёрстка валидная +10
  https://validator.w3.org/

  2. вёрстка семантическая +20
  Теги (указаны по порядку использования в верстке): 
  header, nav, main, section, h1, figure, picture, h2, h3, figcaption, time, footer

  3. для оформления СV используются css-стили +10

  4. контент по центру +10
  так как в каждой секции свой цвет, то блок, который центрирует контент находится в каждой секции отдельно - .container
  фоновый цвет, при наличии - на всю ширину страницы

  5. вёрстка адаптивная +10: 
  ни на одном из разрешений экрана до 320px включительно не появляется горизонтальная полоса прокрутки, при этом всё содержание страницы сохраняется

  6. есть адаптивное бургер-меню +10. 
  Ссылки в пунктах меню ведут на основные разделы CV. При кликах по пунктам меню реализована плавная прокрутка по якорям. 
  При уменьшении ширины экрана меню становится адаптивным.

  7. на странице СV присутствует изображение +10
  фото или аватарка автора CV, пропорции изображения не искажены, у изображения есть атрибут alt

  8. контакты для связи и перечень навыков оформлены в виде списка ul > li +10

  9. +10  CV содержит:
  контакты для связи (раздел Contacts), 
  краткую информацию о себе (About), 
  перечень навыков (Skills), 
  информацию об образовании и уровне английского (разделы Certificates, Experience)
  Вся информация есть на сайте, но для печати можно скачать pdf вариант в разделе About - Download CV, где вся информация на одном листе

  10. CV содержит пример вашего кода с подсветкой кода +10
  для подсветки использовала highlight.js

  11.CV содержит изображения-ссылки на выполненные проекты +10
  Раздел Portfolio
  При клике по изображению страница проекта открывается в новой вкладке. 
  У каждого проекта есть название, небольшое описание, указан перечень используемых технологий. 

  12. CV выполнено на английском языке +10

  13. выполнены требования к Pull Request +10

  14. видеорезюме автора CV - нет

  15. дизайн, оформление, качество выполнения CV не ниже чем в примерах CV
    надеюсь на +10)
`)