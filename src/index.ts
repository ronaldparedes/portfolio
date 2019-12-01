import { randomBetween, randomFloatBetween } from "./scripts/util";

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
    setCanvasAnim(false);
  }
  if (winYPos < navTopPos / 2 && scrollBtn.style.opacity == 0.8) {
    scrollBtn.style.cssText = "opacity: 0";
    scrollBtn.style.visibility = "hidden";
    setCanvasAnim(true);
  }
});

window.onresize = () => {
  navTopPos = document.querySelector(".home-wrap").offsetHeight - 53;
  // Adjust Canvas size
  canvas.width = canvas.parentNode.offsetWidth * dpi;
  canvas.height = canvas.parentNode.offsetHeight * dpi;
  drawCanvas();
  updatePointsPos();
};

/**
 * Scroll button functionality
 */
const scrollBtn = document.querySelector(".scroll-button") as HTMLElement;
scrollBtn.addEventListener("click", () => scrollToTop(0, 50));

function scrollToTop(to: number, duration: number) {
  if (duration < 0) {
    return;
  }
  let difference = to - window.scrollY;
  let perTick = (difference / duration) * 2;

  setTimeout(() => {
    window.scrollTo(0, window.scrollY + perTick);
    scrollToTop(to, duration - 2);
  }, 10);
}

/** Header Canvas Background animation */
const canvas: HTMLCanvasElement = <any>(
  document.getElementById("animation-canvas")
);
const ctx = canvas.getContext("2d");
const dpi = window.devicePixelRatio;
canvas.width = canvas.parentNode.offsetWidth * dpi;
canvas.height = canvas.parentNode.offsetHeight * dpi;

const points: Point[] = [];
const canvasOrig = { w: canvas.width, h: canvas.height };
const colorSelect: String[] = ["#ee79b6", "#9d3e60", "#e6627d"];

let isPlaying = true;
let isAnimLoopPaused = false;
function setCanvasAnim(value: boolean) {
  isPlaying = value;
  if (isPlaying) {
    isAnimLoopPaused = false;
    startPointAnim();
  } else {
    isAnimLoopPaused = true;
    pausePointAnim();
  }
}
/**
 * Initializes the properties of each Point
 * Then calls itself
 */
(function setPoints() {
  const maxPoint = 13;
  for (let i = 0; i < maxPoint; i++) {
    let x = i * (canvas.width / maxPoint) + canvas.width * 0.05;
    for (let j = 0; j < maxPoint; j++) {
      let y = j * ((canvas.height - 50) / maxPoint) + canvas.height * 0.05;
      points.push({
        x: x,
        y: y,
        origX: x,
        origY: y,
        size: randomBetween(2, 5),
        color: `rgba(255, 255, 255, 1)`
      });
    }
  }
})();

function getDistance(pointA: Point, pointB: Point) {
  return Math.sqrt(
    Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
  );
}

/** Redraws the Canvas
 * @param ctx takes a Context
 */
function drawCanvas() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  points.forEach(point => {
    drawLines(point);
    drawCircle(point);
  });
}

interface Point {
  x: number;
  y: number;
  origX: number;
  origY: number;
  size: number;
  color: string;
}
/**
 * Draws a Circle with given params
 * @param point to be drawn on the screen
 */
function drawCircle(point: Point) {
  ctx.beginPath();
  ctx.arc(point.x, point.y, point.size, 0, 2 * Math.PI, false);
  ctx.fillStyle = `rgba(255, 255, 255,
    ${point.y / 1.1 / canvas.height} )`; //Opacity based on height
  ctx.fill();
}

/**
 * Moves the animation one 'tick' or 'step'
 */
function step() {
  !isAnimLoopPaused && drawCanvas();
  window.requestAnimationFrame(step);
}
window.requestAnimationFrame(step);

function startPointAnim() {
  points.forEach(point => {
    updatePoint(point);
  });
}
startPointAnim();

function pausePointAnim() {
  points.forEach(point => {
    point.anim.pause();
  });
}

function drawLines(point: Point) {
  points.forEach(nextPoint => {
    let distance = getDistance(point, nextPoint);
    let val = 8;
    let maxDist =
      canvas.width / val > canvas.height / val
        ? canvas.width / val
        : canvas.height / val;
    if (point != nextPoint && distance < maxDist) {
      ctx.beginPath();
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(nextPoint.x, nextPoint.y);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = `rgba(255, 255, 255,${((maxDist - distance) /
        (maxDist * 3)) *
        (point.y / 1.1 / canvas.height)})`; // To Set opacity based on Height
      ctx.stroke();
    }
  });
}

/**
 * Animates a point to random canvas locations
 * @param point whose properties will be animated
 */
function updatePoint(point: Point) {
  const val = 15;
  const change: number =
    canvas.width / val > canvas.height / val
      ? canvas.width / val
      : canvas.height / val;

  point.anim = gsap.to(point, randomFloatBetween(1, 2), {
    x: randomBetween(point.origX - change, point.origX + change),
    y: randomBetween(point.origY - change, point.origY + change),
    size: randomBetween(2, 5),
    ease: "power1.inOut",
    onComplete: () => {
      updatePoint(point);
    }
  });
}

/**
 * Updates position (evely distributed) of points based on new Canvas size.
 */
function updatePointsPos() {
  points.forEach(point => {
    (point.origX = point.origX * (canvas.width / canvasOrig.w)),
      (point.origY = point.origY * (canvas.height / canvasOrig.h));
  });
  canvasOrig.w = canvas.width;
  canvasOrig.h = canvas.height;
}

/**
 * Access button functionality
 */
const accButton = document.querySelector(".access-button");
accButton.addEventListener("click", () => {
  setCanvasAnim(false);
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
