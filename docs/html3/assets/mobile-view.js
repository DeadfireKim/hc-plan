// 시니어 앱 전역 보기 모드 (간단히 / 자세히)
// 모든 일상 화면 상단에 <div class="m-toggle" id="mViewToggle"> 를 두고 이 스크립트를 포함하면,
// 한 화면에서 바꾼 모드가 localStorage로 앱 전체에 유지된다. body.m-detail → .detail-only 노출(app.css).
(function () {
  function apply(mode) {
    document.body.classList.toggle('m-detail', mode === 'detail');
    var t = document.getElementById('mViewToggle');
    if (t) {
      t.querySelectorAll('button').forEach(function (b) {
        b.classList.toggle('active', b.dataset.mode === mode);
      });
    }
  }
  function init() {
    var saved = 'simple';
    try { saved = localStorage.getItem('hcViewMode') || 'simple'; } catch (e) {}
    apply(saved);
    var t = document.getElementById('mViewToggle');
    if (t) {
      t.addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b) return;
        try { localStorage.setItem('hcViewMode', b.dataset.mode); } catch (e2) {}
        apply(b.dataset.mode);
      });
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
