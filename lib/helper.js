class helper {
  toggleClass(el, className) {
    if (el.classList.contains(className)) el.classList.remove(className);
    else el.classList.add(className);
  }
  toggleText(el, text1, text2) {
    el.innerText = el.innerText == text1 ? text2 : text1;
  }
}
const Helper = new helper();
export default Helper;
