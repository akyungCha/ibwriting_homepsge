(function () {
  var API = 'https://jz9oyxw5g6.execute-api.ap-northeast-2.amazonaws.com/default/bwriting-trial-form';

  // 라디오 value(영문) → 전송할 한글 라벨
  var SOURCE_LABEL = {
    cafe: '카페(네이버, 학관노 등)',
    search: '검색',
    intro: '소개',
    etc: '기타(인스타그램, 지역광고 등)'
  };

  var form = document.querySelector('.apply-box .form');
  if (!form) return;

  var btn = form.querySelector('.btn');
  // id 없는 input이 있어 name 기준으로 조회
  var field = function (name) { return form.querySelector('[name="' + name + '"]'); };
  var agree = form.querySelector('#agreePrivacy');

  var fail = function (msg, el) {
    alert(msg);
    if (el) el.focus();
    return false;
  };

  btn.addEventListener('click', function (e) {
    e.preventDefault(); // <form>이 없지만 type="submit" 기본동작 차단

    var name = field('name');
    var phone = field('phone');
    var checked = form.querySelector('[name="source"]:checked');

    if (!name.value.trim()) return fail('이름을 입력해 주세요.', name);
    if (!phone.value.trim()) return fail('연락처를 입력해 주세요.', phone);
    if (!agree.checked) return fail('개인정보 수집·이용에 동의해 주세요.', agree);

    var payload = {
      name: name.value.trim(),
      org: field('org').value.trim(),
      phone: phone.value.trim(),
      referrer: field('ref').value.trim(),
      message: field('memo').value.trim(),
      source: checked ? SOURCE_LABEL[checked.value] || checked.value : ''
    };

    var label = btn.textContent;
    btn.disabled = true;
    btn.textContent = '접수 중...';

    fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        alert('신청이 접수되었습니다.\n확인 후 순차적으로 연락드리겠습니다.');
        reset();
      })
      .catch(function (err) {
        console.error('[trial] 접수 실패:', err);
        alert('접수에 실패했습니다.\n잠시 후 다시 시도하시거나 1800-7501로 문의해 주세요.');
      })
      .then(function () {
        btn.disabled = false;
        btn.textContent = label;
      });
  });

  // <form>이 없어 reset()을 쓸 수 없으므로 직접 비움
  function reset() {
    ['name', 'org', 'phone', 'ref', 'memo'].forEach(function (n) { field(n).value = ''; });
    form.querySelectorAll('[name="source"]').forEach(function (r) { r.checked = false; });
    agree.checked = false;
  }
})();
