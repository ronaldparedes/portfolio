import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import "waypoints/lib/noframework.waypoints.min.js";
import WebAnim from "./scripts/webAnim";
gsap.registerPlugin(ScrollToPlugin);

declare const Waypoint: any;

const webAnim = new WebAnim();
function AnimLoop() {
  webAnim.step();
  window.requestAnimationFrame(AnimLoop);
}
//Initial drawCanvas call (No animation)
webAnim.step();

// Wait until Text intro completes
webAnim.isAnimLoopPaused = true;
setTimeout(() => {
  //Begin animation
  scrollBtn.style.visibility !== "visible"
    ? webAnim.setIsCanvasAnim(true)
    : null;
  window.requestAnimationFrame(AnimLoop);
}, 5500);

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
let navTopPos = (document.querySelector(".home-wrap") as HTMLElement)
  .offsetHeight;
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
  // navTopPos = document.querySelector(".home-wrap").offsetHeight - 53;
  // Adjust Canvas size
  webAnim.resizeCanvas();
  webAnim.drawCanvas();
  webAnim.updatePointsPos();
};

/** Scroll to Home */
const scrollToHome = () => {
  scrollToSection(
    document.querySelector(`.home-wrap`),
    0,
    window.scrollY /
      (document.querySelector(".home-wrap") as HTMLElement).offsetHeight /
      2,
    false
  );
};
/**
 * Scroll button functionality
 */
const scrollBtn = document.querySelector(".scroll-button") as HTMLElement;
scrollBtn.addEventListener("click", () => scrollToHome());
/**
 * Access button functionality
 */
const accButton = document.querySelector(".access-button");
accButton.addEventListener("click", () => {
  webAnim.setIsCanvasAnim(false);
  scrollToSection(document.querySelector(".about-wrap"), 50, 1, false);
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
    onComplete: shouldToggleMenuFunc(shouldToggleMenu) as any
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
const logoLink = document.querySelector(".rpLogo");
logoLink.addEventListener("click", () => {
  scrollToHome();
});
const navLinks = document.querySelector(".link-wrap");
navLinks.childNodes.forEach(link => {
  let linkName = link.textContent.toLowerCase();
  let offsetY = 50;
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

/** Nav set properties when 'stuck'*/
// const navObserver = new IntersectionObserver(
//   ([e]) => {
//     e.target.toggleAttribute("stuck", e.intersectionRatio < 1);
//   },
//   { threshold: [1] }
// );
// navObserver.observe(nav);

/** Portfolio Project funct */
const project = document.querySelectorAll(".project");

project.forEach(card => {
  const vid = card.children.item(1) as HTMLVideoElement;
  const poster = card.querySelector(".poster");
  card.addEventListener("mouseover", () => {
    vid.nodeName === "VIDEO" && vid.play();
    poster.classList.add("hide");
  });
  card.addEventListener("mouseleave", () => {
    if (vid.nodeName === "VIDEO") {
      vid.pause();
      poster.classList.remove("hide");
    }
  });
  const infoBtn = card.querySelector(".info");
  const popDesc = card.querySelector(".pop-desc");

  infoBtn.addEventListener("click", () => {
    if (!popDesc.classList.contains("show")) {
      popDesc.classList.add("show");
      setTimeout(() => {
        popDesc.classList.remove("show");
      }, 4000);
    }
  });
});

/* Porfolio Videos Lazy loading */
document.addEventListener("DOMContentLoaded", () => {
  const lazyVideos = [].slice.call(document.querySelectorAll(".lazy"));

  require("./assets/vcard.mp4");
  require("./assets/tangram.mp4");
  require("./assets/vcard.png");
  require("./assets/tangram.png");
  require("./assets/cacho.jpg");
  require("./assets/cacho.mp4");

  if ("IntersectionObserver" in window) {
    const lazyVideoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(video => {
        if (video.isIntersecting) {
          (video.target as HTMLVideoElement).src = require(`./assets/${
            (video.target as HTMLVideoElement).dataset.src
          }`);
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });
    lazyVideos.forEach(lazyVideo => {
      lazyVideoObserver.observe(lazyVideo);
    });
  } else {
    console.log("Browser Does Not support IntersectionObserver");
  }
});

/** Form functionality */

/* Clear Button */
const clearBtn = document.querySelectorAll(".clear");
clearBtn.forEach(btn => {
  btn.addEventListener("click", event => {
    ((event.currentTarget as HTMLElement).parentNode
      .childNodes[1] as HTMLInputElement).value = "";
    ((event.currentTarget as HTMLElement).parentNode
      .childNodes[1] as HTMLInputElement).focus();
  });
});
/* Submit Button */
const submitBtn = document.querySelector(".submit-button");
submitBtn.addEventListener("submit", event => {
  if (!(event.target as HTMLElement).classList.contains("validate")) {
    console.log((event.target as HTMLElement).classList);
    return;
  }

  // Prevent form from submitting
  event.preventDefault();
});
