import { randomBetween, randomFloatBetween } from "./util";

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
