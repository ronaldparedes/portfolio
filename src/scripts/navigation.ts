import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);

export default class Navigation {
  nav: HTMLElement;
  scrollBtn: HTMLElement;
  accBtn: HTMLElement;
  logoLink: HTMLElement;
  navLinks: HTMLElement;
  webAnim: any;
  mobileHam: any;

  constructor(webAnim: any, mobileHam: any) {
    this.nav = document.querySelector("nav");
    this.accBtn = document.querySelector(".access-button");
    this.scrollBtn = document.querySelector(".scroll-button");
    this.logoLink = document.querySelector(".rpLogo");
    this.navLinks = document.querySelector(".link-wrap");
    this.webAnim = webAnim;
    this.mobileHam = mobileHam;
  }
  init() {
    if ("IntersectionObserver" in window) {
      const navObserver = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting) {
            this.scrollBtn.classList.add("isShowing");
            this.webAnim.setIsCanvasAnim(false);
          } else if (this.scrollBtn.classList.contains("isShowing")) {
            this.scrollBtn.classList.remove("isShowing");
            this.webAnim.setIsCanvasAnim(true);
          }
        },
        {
          rootMargin: "0px 0px -60% 0px"
        }
      );
      navObserver.observe(this.nav);
    } else {
      console.log("Browser Does Not support IntersectionObserver");
    }
    this.scrollBtn.addEventListener("click", () => this.scrollToHome());
    this.logoLink.addEventListener("click", () => this.scrollToHome());
    this.accBtn.addEventListener("click", () => {
      this.webAnim.setIsCanvasAnim(false);
      this.scrollToSection(document.querySelector(".about-wrap"), 50, 1, false);
    });
    this.navLinks.childNodes.forEach(link => {
      let linkName = link.textContent.toLowerCase();
      let offsetY = 50;
      link.addEventListener("click", () =>
        this.scrollToSection(
          document.querySelector(`.${linkName}-wrap`),
          offsetY,
          1,
          true
        )
      );
    });
  }
  scrollToSection(
    section: Element,
    offsetY: number,
    duration: number,
    shouldToggleMenu: boolean
  ) {
    gsap.to(window, {
      duration,
      scrollTo: { y: section, offsetY, ease: "power3.inOut" },
      onComplete: this.shouldToggleMenuFunc(shouldToggleMenu) as any
    });
  }
  scrollToHome() {
    this.scrollToSection(
      document.querySelector(`.home-wrap`),
      0,
      window.scrollY /
        (document.querySelector(".home-wrap") as HTMLElement).offsetHeight /
        2,
      false
    );
  }

  shouldToggleMenuFunc(shouldToggleMenu: boolean) {
    if (
      shouldToggleMenu &&
      document.querySelector(".ham-container").classList.contains("is-open")
    ) {
      this.mobileHam.toggleMenu();
    }
  }
}
