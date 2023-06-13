const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');

btnSubmit.addEventListener('click', (e) => {
	// if (!isTxt('userid', 5)) e.preventDefault();
	// if (!isTxt('comments', 10)) e.preventDefault();
	// if (!isPwd('pwd1', 'pwd2', 4)) e.preventDefault();
	if (!isEmail('email', 6)) e.preventDefault();
	//if (!isCheck('gender')) e.preventDefault();
	//if (!isCheck('hobby')) e.preventDefault();
	//if (!isSelect('edu')) e.preventDefault();
});

//에러메세지 제거 함수
function resetErrMsg(inputs) {
	let el = null;
	inputs.length ? (el = inputs[0]) : (el = inputs);
	const errMsg = el.closest('td').querySelector('p');
	if (errMsg) el.closest('td').querySelector('p').remove();
}

//에러메세지 생성 함수
function createErrorMsg(target, msg) {
	const errMsg = document.createElement('p');
	errMsg.innerText = msg;
	target.closest('td').append(errMsg);
}

//텍스트항목 입력받아 인증
function isTxt(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const text = input.value.trim();
	const errorMsg = `텍스트를 ${len}글자 이상 입력하세요`;

	resetErrMsg(input);
	if (text.length < len) {
		createErrorMsg(input, errorMsg);
		return false;
	}
	return true;
}

//비밀번호 입력받아 인증
function isPwd(pwd1, pwd2, len) {
	const num = /[0-9]/;
	const eng = /[a-zA-Z]/;
	const spc = /[!@#$%^&*()_+]/;

	const pwd1_el = form.querySelector(`[name=${pwd1}]`);
	const pwd2_el = form.querySelector(`[name=${pwd2}]`);

	const pwd1_val = pwd1_el.value;
	const pwd2_val = pwd2_el.value;

	const errMsg = `비밀번호 항목 2개를 동일하게 입력하고 ${len}글자 이상 입력하세요`;

	resetErrMsg(pwd1_el);
	resetErrMsg(pwd2_el);

	if (
		pwd1_val !== pwd2_val ||
		pwd1_val.length < len ||
		!num.test(pwd1_val) ||
		!eng.test(pwd1_val) ||
		!spc.test(pwd1_val)
	) {
		createErrorMsg(pwd1_el, errMsg);
		createErrorMsg(pwd2_el, errMsg);
		return false;
	}
	return true;
}

//이메일 형식 입력받아 인증
function isEmail(name, len) {
	const email = form.querySelector(`[name=${name}]`).value;
	const errMsg = `이메일주소에 @를 포함시키고 ${len}글자 이상 입력하세요.`;
	// @ 기준으로 앞뒤 문자가 없으면,뒤에 .이 없으면, org.net,com이 없으면
	const regex = /\.\?|com|org|net/.test('');
	resetErrMsg(email);
	if (email.indexOf('@') < 0 || email.length < len) {
		createErrorMsg(email, errMsg);
		return false;
	}
	return true;
}

//체크요소 형식 입력받아 인증
function isCheck(name) {
	const inputs = document.querySelectorAll(`[name=${name}]`);
	const errorMsg = `해당 선택사항을 하나이상 체크하세요.`;
	let isChecked = false;
	resetErrMsg(inputs);
	for (const input of inputs) input.checked && (isChecked = true);
	if (!isChecked) {
		createErrorMsg(inputs, errorMsg);
		return false;
	}
	return true;
}

//select요소 입력받아 인증
function isSelect(name) {
	const input = form.querySelector(`[name=${name}]`);
	const selected_index = input.options.selectedIndex;
	const value = input.options[selected_index].value;
	const errorMsg = `해당 요소중에 하나를 선택해주세요.`;

	resetErrMsg(input);
	if (value === '') {
		createErrorMsg(input, errorMsg);
		return false;
	}
	return true;
}
