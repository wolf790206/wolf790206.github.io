const header = document.querySelector('header');
const wHeight = window.innerHeight;
var leftAndRightDataBase;

if (window.innerWidth > 768) {
	header.style.top = `-${header.clientHeight}px`;
} else {
	header.style.position = `fixed`;
	header.style.top = `0px`;
}

function navAniEle() {
	const navAniEle = document.querySelectorAll('nav .navAniEle');
	const fontHeight = document.querySelector('a.navLink').offsetHeight;
	navAniEle.forEach((e) => {
		for (let i = 0; i < 20; i++) {
			const div = document.createElement('div');
			div.className = 'block';
			div.style = `height: ${fontHeight - 6}px; `;
			e.appendChild(div);
		}
	});
	navAniBlock(
		navAniEle[0].querySelectorAll('.block'),
		navAniEle[1].querySelectorAll('.block'),
		document.getElementById('banner').clientHeight / 20,
		window.scrollY
	);
}
function navAniBlock(ele1, ele2, height, scroll) {
	const index1 = 19 - Math.round(scroll / height);
	const index2 = Math.round(scroll / height) > 20 ? 20 : Math.round(scroll / height);
	if (scroll > 0) {
		for (let i = 0; i < index2; i++) {
			if (!ele2[i].classList.contains('active')) ele2[i].classList.toggle('active');
			if (!ele1[19 - i].classList.contains('active')) ele1[19 - i].classList.toggle('active');
		}
		for (let i = 0; i < index1; i++) {
			if (ele1[i].classList.contains('active')) ele1[i].classList.toggle('active');
			if (ele2[19 - i].classList.contains('active')) ele2[19 - i].classList.toggle('active');
		}
	} else
		for (let i = 0; i < 20; i++) {
			if (ele1[i].classList.contains('active')) ele1[i].classList.toggle('active');
			if (ele2[19 - i].classList.contains('active')) ele2[19 - i].classList.toggle('active');
		}
}
navAniEle();

// onclick Event
const hamburgerBtn = document.querySelector('#ipadNav .hamburgerBtn');
const clossBtn = document.querySelector('#ipadNav .clossBtn');
const scrollDown = document.querySelector('.scrollDown');
hamburgerBtn.addEventListener('click', (e) => {
	const ipadNav = document.querySelector('#ipadNav .navigator');
	ipadNav.classList.toggle('active');
	e.target.classList.toggle('active');
	clossBtn.classList.toggle('active');
	document.querySelector('#ipadNav').classList.toggle('active');
	document.querySelector('#ipadNav').style.background = `#fff`;
});
clossBtn.addEventListener('click', (e) => {
	const ipadNav = document.querySelector('#ipadNav .navigator');
	ipadNav.classList.toggle('active');
	e.target.classList.toggle('active');
	hamburgerBtn.classList.toggle('active');
	document.querySelector('#ipadNav').classList.toggle('active');
	document.querySelector('#ipadNav').style.background = `${
		window.scrollY > 100 ? '#fff' : 'none'
	}`;
});
scrollDown.addEventListener('click', () => {
	window.scrollTo({ top: wHeight - 70, behavior: 'smooth' });
});

const contentBtnAwait = document.querySelector('.contentBtn .await');
const contentBtn = document.querySelectorAll('.contentBtn div[class$="Btn"]');
const Btn = document.querySelectorAll('.contentBtn > .btn');

Btn.forEach((e) => {
	e.addEventListener('click', (event) => {
		changeBtnAction(event);
	});
});
const getLocalstorageData = getLocalstorage() || null;
if (getLocalstorageData)
	if (getLocalstorageData.changeBtn) {
		if (!contentBtnAwait.classList.contains('active')) contentBtnAwait.classList.add('active');
	}
function changeBtnAction(ele) {
	let data = {};
	data.left = ele ? ele.target.dataset.left : 0;
	data.right = ele ? ele.target.dataset.right : 0;
	if (!contentBtnAwait.classList.contains('active')) contentBtnAwait.classList.add('active');

	setTimeout(() => {
		let left = leftAndRightDataBase.left + Number(data.left);
		let right = leftAndRightDataBase.right + Number(data.right);
		let whiteBlock = document.querySelector('.changeBtn .whiteBlock');
		let pinkBlock = document.querySelector('.changeBtn .pinkBlock');
		whiteBlock.style.width = `${round2((left / (left + right)) * 100)}%`;
		pinkBlock.style.width = `${round2((right / (left + right)) * 100)}%`;
		pinkBlock.innerText = `${Math.round((left / (left + right)) * 100)}%`;
		contentBtn.forEach((e) => {
			if (!e.classList.contains('active')) e.classList.add('active');
		});
		contentBtnAwait.classList.remove('active');
		if (!getLocalstorageData) {
			postData(data);
			setLocalstorage({ changeBtn: true });
		}
	}, 2500);
}

// resize Event
window.addEventListener('resize', (e) => {
	const scroll = window.scrollY;
	const size = e.target.innerWidth;
	if (size > 768) {
		if (scroll < header.clientHeight) {
			header.style.position = `relative`;
			header.style.top = `-${header.clientHeight - scroll}px`;
		} else {
			header.style.position = `sticky`;
			header.style.top = `0px`;
		}
	} else {
		header.style.position = `fixed`;
	}
});

// scroll Event
document.addEventListener('scroll', () => {
	const scroll = window.scrollY;

	//navigate start
	const nav = document.getElementById('windowsNav');
	const banner = document.getElementById('banner');
	const bannerGap = banner.clientHeight / 20;
	const navAniEle = document.querySelectorAll('nav .navAniEle');
	const navBlock1 = navAniEle[0].querySelectorAll('.block');
	const navBlock2 = navAniEle[1].querySelectorAll('.block');
	if (window.innerWidth > 768) {
		if (scroll < header.clientHeight) {
			header.style.position = `relative`;
			header.style.top = `-${header.clientHeight - scroll}px`;
		} else {
			header.style.position = `sticky`;
			header.style.top = `0px`;
		}
	} else {
		header.style.position = `fixed`;
		header.style.top = `0px`;
	}
	if (scroll > banner.clientHeight) {
		nav.style.width = `100%`;
		nav.style.borderRadius = `0px`;
	} else {
		nav.style.width = `70%`;
		nav.style.borderRadius = `100px`;
	}
	if (scroll === 0) navAniBlock(navBlock1, navBlock2, bannerGap, scroll);
	if (scroll < banner.clientHeight * 1.5) navAniBlock(navBlock1, navBlock2, bannerGap, scroll);

	const ipadNavContainer = document.querySelector('#ipadNav');
	if (scroll > 100) {
		ipadNavContainer.style.background = `#fff`;
		hamburgerBtn.style.color = `#0000ff`;
	} else {
		ipadNavContainer.style.background = `transparent`;
		hamburgerBtn.style.color = `#fff`;
	}
	//navigate end
});

// get leftAndRightDataBase

function getData() {
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbxJdSI_NRIGJiiT2794G222ddxwZwcBGONYljSeRW3QFf0xohptKHaUZzYmYlsv2ES25Q/exec';
	fetch(scriptURL, { method: 'GET' })
		.then((res) => {
			return res.text();
		})
		.then((result) => {
			leftAndRightDataBase = JSON.parse(result).data;
			if (getLocalstorageData) if (getLocalstorageData.changeBtn) changeBtnAction();
		})
		.catch((err) => console.log('err', err));
}
getData();

function postData(data) {
	function getHTMLData() {
		let option = {
			sheetUrl: '1dpuOW_vg7ZkXMbgGvHZnSipRIGHAXYYKjPwKzkT3opQ',
			sheetTag: 'workinSheet',
			left: data.left,
			right: data.right,
		};
		return option;
	}
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbx9OZindyqrkwlqcEpNe34qRQEtP0QFJHEXKj17nTAz_d6fEUlGcqSrItXIZQ_f-i5Z/exec';
	$.post(scriptURL, getHTMLData(data), function (e) {
		console.log('post data msg', e);
	});
}

// Math 0.00

function round2(num) {
	var m = Number((Math.abs(num) * 100).toPrecision(15));
	return (Math.round(m) / 100) * Math.sign(num);
}

// localstorage
function getLocalstorage() {
	const getData = window.localStorage.getItem('Data');
	return JSON.parse(getData);
}
function setLocalstorage(Data) {
	const reData = settingData(Data);
	window.localStorage.setItem('Data', JSON.stringify(reData));
	console.log('succes localstorage');
}

function settingData(Data) {
	const newDate = new Date();
	const changeBtn = Data.changeBtn ? true : false;
	return {
		time: newDate,
		changeBtn: changeBtn,
	};
}
