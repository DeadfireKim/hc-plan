// 자동완성 콤보 — 타이핑하면 매칭되는 항목이 입력칸 아래(왼쪽 정렬·같은 시작점)에 뜬다.
// 마크업: <div class="combo"><input class="input" oninput="comboFilter(this)" onfocus="comboFilter(this)" autocomplete="off">
//          <div class="combo-list hidden"><div class="combo-opt" onclick="comboPick(this)">서울본병원</div>...</div></div>
function comboFilter(input) {
  var box = input.parentElement.querySelector('.combo-list');
  if (!box) return;
  var q = input.value.trim();
  var any = false;
  box.querySelectorAll('.combo-opt').forEach(function (o) {
    var match = !q || o.textContent.indexOf(q) > -1;
    o.style.display = match ? '' : 'none';
    if (match) any = true;
  });
  box.classList.toggle('hidden', !any);
}
function comboPick(opt) {
  var box = opt.parentElement;
  var input = box.parentElement.querySelector('input');
  if (input) input.value = opt.textContent;
  box.classList.add('hidden');
}
// 바깥 클릭 시 닫기
document.addEventListener('click', function (e) {
  if (!e.target.closest || !e.target.closest('.combo')) {
    document.querySelectorAll('.combo-list').forEach(function (b) { b.classList.add('hidden'); });
  }
});
