// Tier 배지 자동 툴팁
// 새 화면도 이 스크립트만 포함하면(<script src=".../assets/tier-tip.js">) 자동 적용된다.
// 배지 마크업은 그대로 두고, 텍스트가 Tier1/Tier2/Tier3인 .badge에 호버 설명을 붙인다.
(function () {
  var TIER_TIP = {
    Tier1: 'Tier 1 · 의료급 — 혈압·ECG·낙상까지 정확히 수집 (HealthWatch·Apple·Galaxy)',
    Tier2: 'Tier 2 · 공식 연동이나 혈압·ECG 미수집, 낙상은 일부만 (Fitbit·Garmin·COROS)',
    Tier3: 'Tier 3 · 실험적 — 데이터가 자주 끊기고 낙상 감지 불가 (샤오미·Amazfit)'
  };
  var TIER_CLASS = { Tier1: 'tip-t1', Tier2: 'tip-t2', Tier3: 'tip-t3' };
  function apply() {
    document.querySelectorAll('.badge').forEach(function (b) {
      var key = b.textContent.trim();
      var tip = TIER_TIP[key];
      if (tip && !b.dataset.tip) {
        b.classList.add('tip');
        if (TIER_CLASS[key]) b.classList.add(TIER_CLASS[key]);
        b.dataset.tip = tip;
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
