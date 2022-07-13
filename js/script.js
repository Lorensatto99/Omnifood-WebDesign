const html = document.documentElement;
const headerEl = document.querySelector(".header");
const myName = "Celso Lorensatto";
const h1 = document.querySelector(".heading-primary");
const closeMenu = () => {
  headerEl.classList.remove("nav-open");
  html.style.removeProperty("overflow-y");
};

//Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

//Make mobile navigation work

const mobileNav = document.querySelector(".btn-mobile-nav");
mobileNav.addEventListener("click", () => {
  if (!headerEl.classList.contains("nav-open")) {
    headerEl.classList.add("nav-open");
    html.style.overflowY = "hidden";
  } else {
    closeMenu();
  }
});

//Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    //Scrool back to top
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    //Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    //Close mobile navigation
    if (link.classList.contains("main-nav-link")) closeMenu();
  });
});

// Sticky navigation

const sectionHeroEL = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    ent.isIntersecting
      ? document.body.classList.remove("sticky")
      : document.body.classList.add("sticky");
  },
  {
    root: null,
    threshold: 0.6,
  }
);
obs.observe(sectionHeroEL);

//Fixing flexbox gap property missing in some Safary versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
