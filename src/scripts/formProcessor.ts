/** Form functionality */

export default class FormProccessor {
  clearBtns: NodeList;
  submitBtn: HTMLElement;
  constructor() {
    this.clearBtns = document.querySelectorAll(".clear");
    this.submitBtn = document.querySelector(".submit-button");
  }
  init() {
    /**Clear Buttons */
    this.clearBtns.forEach(btn => {
      btn.addEventListener("click", event => {
        ((event.currentTarget as HTMLElement).parentNode
          .childNodes[1] as HTMLInputElement).value = "";
        ((event.currentTarget as HTMLElement).parentNode
          .childNodes[1] as HTMLInputElement).focus();
      });
    });
    /* Submit Button */
    this.submitBtn.addEventListener("submit", event => {
      if (!(event.target as HTMLElement).classList.contains("validate")) {
        console.log((event.target as HTMLElement).classList);
        return;
      }
      event.preventDefault(); // Prevent form from submitting
    });
  }
}
