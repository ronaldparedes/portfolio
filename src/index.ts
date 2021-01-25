import WebAnim from "./scripts/webAnim";
import MobileHam from "./scripts/mobileHam";
import NavHighlighter from "./scripts/navHighlighter";
import Navigation from "./scripts/navigation";
import LazyLoader from "./scripts/lazyLoader";
import ProjectCard from "./scripts/projectCard";
import FormProcessor from "./scripts/formProcessor";
import customCursor from "./scripts/customCursor";

const webAnim = new WebAnim();
animInit();
customCursor();
const navHighlighter = new NavHighlighter();
navHighlighter.init();
const formProcessor = new FormProcessor();
formProcessor.init();
const mobileHam = new MobileHam();
const navigation = new Navigation(webAnim, mobileHam);
navigation.init();
const lazyLoader = new LazyLoader();
const projectCard = new ProjectCard();
projectCard.init();

function animInit() {
  webAnim.step(); //Initial drawCanvas call (No animation)
  webAnim.isAnimLoopPaused = true; // Wait until Text intro completes
  const scrollBtn = document.querySelector(".scroll-button") as HTMLElement;
  setTimeout(() => {
    //Begin animation if canvas is visible
    if (!scrollBtn.classList.contains("isShowing")) {
      webAnim.setIsCanvasAnim(true);
    }
    window.requestAnimationFrame(AnimLoop);
  }, 5500);
}

function AnimLoop() {
  webAnim.step();
  window.requestAnimationFrame(AnimLoop);
}

window.onresize = () => {
  // Adjust Canvas size
  webAnim.resizeCanvas();
  webAnim.drawCanvas();
  webAnim.updatePointsPos();
};
