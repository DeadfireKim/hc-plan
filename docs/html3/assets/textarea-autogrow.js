// textarea 자동 높이 — 입력(엔터)마다 내용에 맞춰 높이가 늘어난다.
// 일반 화면: app.css .textarea(max-height:60vh)까지 늘어남.
// 모달 안: app.css .modal .textarea(max-height:180px)까지만 늘고 그 이상은 스크롤.
// (CSS max-height가 inline height보다 우선이라, JS로 height를 키워도 모달에선 상한에서 멈추고 overflow-y:auto로 스크롤됨)
(function () {
  function grow(el) {
    el.style.height = 'auto';
    var max = parseFloat(getComputedStyle(el).maxHeight);
    // max-height를 못 읽으면(none/NaN) 화면(viewport)을 넘지 않도록 강제 상한
    if (!max || isNaN(max)) max = Math.round(window.innerHeight * 0.55);
    var h = el.scrollHeight;
    if (h > max) {
      el.style.height = max + 'px';      // 화면/모달 크기까지만
      el.style.overflowY = 'auto';        // 넘치면 스크롤
    } else {
      el.style.height = h + 'px';         // 내용에 딱 맞게
      el.style.overflowY = 'hidden';
    }
  }
  function initAll() {
    document.querySelectorAll('textarea.textarea').forEach(function (el) {
      // 보이는 textarea만 초기 보정(모달 내부는 열릴 때 input/focus로 보정됨)
      if (el.offsetParent !== null) grow(el);
    });
  }
  document.addEventListener('input', function (e) {
    if (e.target && e.target.matches && e.target.matches('textarea.textarea')) grow(e.target);
  });
  // 모달이 열린 직후에도 높이 보정(focus 시)
  document.addEventListener('focusin', function (e) {
    if (e.target && e.target.matches && e.target.matches('textarea.textarea')) grow(e.target);
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();
})();
