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
function changeBtnAction(ele) {
	let data = {};
	data.left = ele.target.dataset.left;
	data.right = ele.target.dataset.right;
	contentBtnAwait.classList.add('active');
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
		postData(data);
	}, 2000);
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

// drag Event
new SliderBar({
	el: '#mySlider', // The container, required
	beforeImg: 'https://lh3.google.com/u/0/d/1uCDmQG4gC6TiHxKGQg5CVoLIBRYtftad=w2000-h2666-iv1', // before image, required
	afterImg: 'https://lh3.google.com/u/0/d/1n-w4_BOLJnDz9qY2RlB_YG_Rj9wLzGKG=w2000-h2666-iv1', // after image, required
	width: 'default', // slide-wrap width, default 100%
	height: 'default', // slide-wrap height, default image-height
	line: false, // Dividing line, default true
	lineColor: 'rgba(0,0,0,0.5)', // Dividing line color, default rgba(0,0,0,0.5)
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
		console.log(e);
	});
}

// Math 0.00

function round2(num) {
	var m = Number((Math.abs(num) * 100).toPrecision(15));
	return (Math.round(m) / 100) * Math.sign(num);
}
