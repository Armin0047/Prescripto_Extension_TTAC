// modules/utils.js

/*
 * قالب‌بندی عدد برای نمایش ریالی با جداکننده‌ی هزارگان
 * @param {string|number} str
 * @returns {string}
 */
export function ToRial(str) {
  const clean = String(str).replace(/,/g, '');
  return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}