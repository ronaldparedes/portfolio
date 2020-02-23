export default class MobileHam {
  menuBtn: HTMLElement;
  menuItems: HTMLElement;
  constructor() {
    this.menuBtn = document.querySelector(".ham-container");
    this.menuItems = document.querySelector(".link-wrap");
    this.menuBtn.addEventListener("click", () => this.toggleMenu());
    window.addEventListener("resize", () => this.closeOnResize());
  }
  toggleMenu() {
    this.menuBtn.classList.toggle("is-open");
    this.menuItems.classList.toggle("is-visible");
  }
  closeOnResize() {
    if (
      window.innerWidth >= 600 &&
      this.menuBtn.classList.contains("is-open")
    ) {
      this.menuBtn.classList.remove("is-open");
      this.menuItems.classList.remove("is-visible");
    }
  }
}
