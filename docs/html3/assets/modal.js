// 공통 모달 열기/닫기 — 화면에 <div class="overlay hidden" id="...">...<div class="modal">...
// 를 두고 버튼 onclick="openModal('id')" / 닫기 onclick="closeModal('id')" 로 호출.
// 오버레이 바깥 클릭·ESC 로도 닫힌다. 새 화면은 이 스크립트만 포함하면 됨.
function openModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}
function closeModal(id) {
  var el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}
document.addEventListener('click', function (e) {
  if (e.target && e.target.classList && e.target.classList.contains('overlay')) {
    e.target.classList.add('hidden');
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay:not(.hidden)').forEach(function (o) { o.classList.add('hidden'); });
  }
});
