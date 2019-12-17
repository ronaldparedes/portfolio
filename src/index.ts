import WebAnim from "./scripts/webAnim";

const webAnim = new WebAnim();
function AnimLoop() {
  webAnim.step();
  window.requestAnimationFrame(AnimLoop);
}
webAnim.startPointAnim();

window.requestAnimationFrame(AnimLoop);

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  console.log(true);
} else {
  console.log(false);
}

//* Hamburger functionality
const button = document.querySelector(".ham-container") as HTMLElement;
const linkWrap = document.querySelector(".link-wrap");
function toggleMenu() {
  button.classList.toggle("is-open");
  linkWrap.classList.toggle("is-visible");
}
button.addEventListener("click", toggleMenu);

//* Navigation positioning
const nav = document.getElementsByTagName("nav")[0];
let navTopPos = document.querySelector(".home-wrap").offsetHeight - 53;
let lastPos = 0;
let isFixed = false;

/**
 * Closes mobile hamburger menu if window size increases
 * to desktop size and hamburger menu was left open
 */
const hamCont = document.querySelector(".ham-container");
window.addEventListener("resize", () => {
  const winWidth = window.innerWidth;
  if (winWidth >= 600 && hamCont.classList.contains("is-open")) {
    hamCont.classList.remove("is-open");
    linkWrap.classList.remove("is-visible");
  }
});

window.addEventListener("scroll", () => {
  let winYPos = window.scrollY;

  if (winYPos >= navTopPos && lastPos < winYPos && !isFixed) {
    nav.classList.add("fixed");
    isFixed = true;
  }
  if (winYPos <= navTopPos && lastPos > winYPos && isFixed) {
    nav.classList.remove("fixed");
    isFixed = false;
  }
  lastPos = winYPos;
  if (winYPos >= navTopPos / 2 && scrollBtn.style.opacity == 0) {
    scrollBtn.style.cssText = "opacity: 0.8";
    scrollBtn.style.visibility = "visible";
    webAnim.setIsCanvasAnim(false);
  }
  if (winYPos < navTopPos / 2 && scrollBtn.style.opacity == 0.8) {
    scrollBtn.style.cssText = "opacity: 0";
    scrollBtn.style.visibility = "hidden";
    webAnim.setIsCanvasAnim(true);
  }
});

window.onresize = () => {
  navTopPos = document.querySelector(".home-wrap").offsetHeight - 53;
  // Adjust Canvas size
  webAnim.resizeCanvas();
  webAnim.drawCanvas();
  webAnim.updatePointsPos();
};

/**
 * Scroll button functionality
 */
const scrollBtn = document.querySelector(".scroll-button") as HTMLElement;
scrollBtn.addEventListener("click", () =>
  scrollToSection(
    document.querySelector(`.home-wrap`),
    0,
    window.scrollY / document.querySelector(".home-wrap").offsetHeight / 2,
    false
  )
);
/**
 * Access button functionality
 */
const accButton = document.querySelector(".access-button");
accButton.addEventListener("click", () => {
  webAnim.setIsCanvasAnim(false);
  scrollToSection(document.querySelector(".about-wrap"), 53, 1, false);
});

function scrollToSection(
  section: Element,
  offsetY: number,
  duration: number,
  shouldToggleMenu: boolean
) {
  gsap.to(window, {
    duration,
    scrollTo: { y: section, offsetY, ease: "power3.inOut" },
    onComplete: shouldToggleMenuFunc(shouldToggleMenu)
  });
}

function shouldToggleMenuFunc(shouldToggleMenu: boolean) {
  if (
    shouldToggleMenu &&
    document.querySelector(".ham-container").classList.contains("is-open")
  ) {
    toggleMenu();
  }
}
/**
 * Nav To Section Functionality
 */
const navLinks = document.querySelector(".link-wrap");
navLinks.childNodes.forEach(link => {
  let linkName = link.textContent.toLowerCase();
  let offsetY = linkName == "about" ? 53 : 0;
  link.addEventListener("click", () =>
    scrollToSection(
      document.querySelector(`.${linkName}-wrap`),
      offsetY,
      1,
      true
    )
  );
});

/**
 * Nav Items Hightlighting functionality
 */

const sections = document.querySelectorAll("section");
const sectWaypointsDown = [];
const sectWaypointsUp = [];
const linkArr = Array.from(navLinks.children);

sections.forEach(section => {
  let sectStr = section.classList
    .item(0)
    .substring(0, section.classList.item(0).length - 5);
  sectWaypointsDown.push(
    new Waypoint({
      element: section,
      handler: direction => {
        if (direction == "down") {
          linkArr.forEach(link => {
            link.classList.remove("link--selected");
          });
          document
            .querySelector(`.link--${sectStr}`)
            .classList.add("link--selected");
        }
      },
      offset: "60%"
    })
  );
});

sections.forEach(section => {
  let sectStr = section.classList
    .item(0)
    .substring(0, section.classList.item(0).length - 5);
  sectWaypointsUp.push(
    new Waypoint({
      element: section,
      handler: direction => {
        if (direction == "up") {
          linkArr.forEach(link => {
            link.classList.remove("link--selected");
          });
          document
            .querySelector(`.link--${sectStr}`)
            .classList.add("link--selected");
        }
      },
      offset: "-40%"
    })
  );
});

/** Form functionality */

/* Clear Button */
const clearBtn = document.querySelectorAll(".clear");
clearBtn.forEach(btn => {
  btn.addEventListener("click", event => {
    event.currentTarget.parentNode.childNodes[1].value = "";
    event.currentTarget.parentNode.childNodes[1].focus();
  });
});
/* Submit Button */
const submitBtn = document.querySelector(".submit-button");
submitBtn.addEventListener("submit", event => {
  if (!event.target.classList.contains("validate")) {
    console.log(event.target.classList);
    return;
  }

  // Prevent form from submitting
  event.preventDefault();
});
