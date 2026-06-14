// 멀티셀렉트 — select 외형 버튼을 누르면 체크박스 목록이 열리고, 복수 선택이 가능하다.
// "전체" 항목(.ms-all)을 두면 전체 선택/해제 토글이 된다.
// 마크업:
// <div class="multisel"><div class="multisel-btn" onclick="msToggle(this)"><span class="ms-label">전체</span></div>
//   <div class="multisel-list hidden">
//     <label class="checkbox-label"><input type="checkbox" class="ms-all" onchange="msAll(this)"> 전체</label>
//     <label class="checkbox-label"><input type="checkbox" onchange="msUpdate(this)"> 관리자</label> ...
//   </div></div>
function msToggle(btn) {
  var list = btn.nextElementSibling;
  if (list) list.classList.toggle('hidden');
}
function msRefresh(list) {
  var btn = list.previousElementSibling;
  var items = list.querySelectorAll('input:not(.ms-all)');
  var sel = [];
  items.forEach(function (c) { if (c.checked) sel.push(c.closest('label').textContent.trim()); });
  var lbl = btn.querySelector('.ms-label');
  if (lbl) lbl.textContent = (sel.length === 0 || sel.length === items.length) ? '전체' : sel.join(', ');
}
function msAll(cb) {
  var list = cb.closest('.multisel-list');
  list.querySelectorAll('input:not(.ms-all)').forEach(function (c) { c.checked = cb.checked; });
  msRefresh(list);
}
function msUpdate(cb) {
  var list = cb.closest('.multisel-list');
  var all = list.querySelector('.ms-all');
  if (all) {
    var items = list.querySelectorAll('input:not(.ms-all)');
    var checked = list.querySelectorAll('input:not(.ms-all):checked');
    all.checked = (items.length === checked.length);
  }
  msRefresh(list);
}
document.addEventListener('click', function (e) {
  if (!e.target.closest || !e.target.closest('.multisel')) {
    document.querySelectorAll('.multisel-list').forEach(function (l) { l.classList.add('hidden'); });
  }
});
