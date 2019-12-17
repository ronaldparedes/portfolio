import { randomBetween, randomFloatBetween } from "./util";

interface Point {
  x: number;
  y: number;
  origX: number;
  origY: number;
  size: number;
  color: string;
  anim: any;
}
/** Header Canvas Background animation */

export default class WebAnim {
  canvas = <HTMLCanvasElement>document.getElementById("animation-canvas");
  ctx = this.canvas.getContext("2d");
  dpi = window.devicePixelRatio;
  points: Point[] = [];
  isPlaying = true;
  isAnimLoopPaused = false;
  canvasOrig = { w: null, h: null };
  constructor() {
    this.canvas.width =
      (<HTMLElement>this.canvas.parentNode).offsetWidth * this.dpi;
    this.canvas.height =
      (<HTMLElement>this.canvas.parentNode).offsetHeight * this.dpi;
    this.canvasOrig = { w: this.canvas.width, h: this.canvas.height };
    this.setPoints(11);
  }

  /** Initializes the properties of each Point */
  private setPoints(maxPoint: number) {
    const widthVal = this.canvas.width / maxPoint;
    const heightVal = ((this.canvas.height - 53) / (maxPoint * 0.75)) * 0.9;
    const maxPointY = maxPoint * 0.75;
    for (let i = 0; i < maxPoint; i++) {
      let x = i * widthVal + this.canvas.width * 0.05;
      for (let j = 0; j < maxPointY; j++) {
        let y = j * heightVal + this.canvas.height * 0.1;
        this.points.push({
          x: x,
          y: y,
          origX: x,
          origY: y,
          size: randomBetween(2, 5),
          color: `rgba(255, 255, 255, 1)`,
          anim: null
        });
      }
    }
  }
  private getDistance(pointA: Point, pointB: Point) {
    return Math.sqrt(
      Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)
    );
  }
  /** Draws a Circle with given params
   * @param point to be drawn on the canvas
   */
  private drawCircle(point: Point) {
    const pointOpacity = point.y / this.canvas.height; //Opacity based on Y position
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, point.size, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = `rgba(255, 255, 255,
    ${pointOpacity} )`;
    this.ctx.fill();
  }

  /** Draws a connecting linte between a Point and the points
   * that are at least at a specified distance away
   * @param point to draw lines from
   * @param distVal variable num to affect number of connections
   */
  private drawLines(point: Point, distVal: number, lineWidth: number) {
    // MaxDist based on canvas aspect ratio
    const widthVal = this.canvas.width / distVal;
    const heightVal = this.canvas.height / distVal;
    const maxDist: number = widthVal > heightVal ? widthVal : heightVal;
    const heightOpacity =
      (point.y + this.canvas.height * 0.1) / this.canvas.height;
    this.points.forEach(nextPoint => {
      const distance = this.getDistance(point, nextPoint);
      // Draws lines to points closer that maxDist
      if (point != nextPoint && distance < maxDist) {
        const lineOpacity =
          ((maxDist - distance) / (maxDist * 3)) * heightOpacity;
        this.ctx.beginPath();
        this.ctx.moveTo(point.x, point.y);
        this.ctx.lineTo(nextPoint.x, nextPoint.y);
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = `rgba(255, 255, 255,${lineOpacity})`;
        this.ctx.stroke();
      }
    });
  }

  /** Draws the Canvas*/
  drawCanvas() {
    let lineWidth = this.canvas.width > 1200 ? 3 : 1.5;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.points.forEach(point => {
      this.drawLines(point, 8, lineWidth);
      this.drawCircle(point);
    });
  }

  /**Animates a point to random canvas locations
   * @param point whose properties will be animated
   * @param changeVal number that sets the range of point movement
   */
  private updatePoint(point: Point, changeVal: number) {
    // Range of point movement based on canvas aspect ratio
    const widthVal = this.canvas.width / changeVal;
    const heightVal = this.canvas.height / changeVal;
    const change: number = widthVal > heightVal ? widthVal : heightVal;

    point.anim = gsap.to(point, randomFloatBetween(1, 2), {
      x: randomBetween(point.origX - change, point.origX + change),
      y: randomBetween(point.origY - change, point.origY + change),
      // size: randomBetween(2, 5),
      ease: "power1.inOut",
      onComplete: () => {
        this.updatePoint(point, changeVal);
      }
    });
  }

  /** Moves the animation one 'tick' or 'step' */
  public step() {
    !this.isAnimLoopPaused && this.drawCanvas();
  }

  /** Resumes the Points animation cycle*/
  public startPointAnim() {
    this.points.forEach(point => {
      this.updatePoint(point, 15);
    });
  }

  /** Pauses the Points animation cycle */
  private pausePointAnim() {
    this.points.forEach(point => {
      point.anim.pause();
    });
  }
  /** Pauses or Plays the canvas animation based on the provided value.
   * @param value represents play if true and pause if false.
   */
  public setIsCanvasAnim(value: boolean) {
    this.isPlaying = value;
    if (this.isPlaying) {
      this.isAnimLoopPaused = false;
      this.startPointAnim();
    } else {
      this.isAnimLoopPaused = true;
      this.pausePointAnim();
    }
  }
  /** Updates position (evely distributed) of points based on new Canvas size. */
  public updatePointsPos() {
    const widthVal = this.canvas.width / this.canvasOrig.w;
    const heightVal = this.canvas.height / this.canvasOrig.h;
    this.points.forEach(point => {
      (point.origX = point.origX * widthVal),
        (point.origY = point.origY * heightVal);
    });
    this.canvasOrig.w = this.canvas.width;
    this.canvasOrig.h = this.canvas.height;
  }
  /** Resizes the canvas when the container changes size */
  public resizeCanvas() {
    this.canvas.width =
      (<HTMLElement>this.canvas.parentNode).offsetWidth * this.dpi;
    this.canvas.height =
      (<HTMLElement>this.canvas.parentNode).offsetHeight * this.dpi;
  }
}
