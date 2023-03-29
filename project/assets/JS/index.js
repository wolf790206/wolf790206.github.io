const header = document.querySelector('header');
const wHeight = window.innerHeight;
const wWidth = window.innerWidth;
var leftAndRightDataBase;
console.log('wHeight : ', wHeight);

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

function animateEaseInOut(element, options) {
	let startValues = {};
	let endValues = {};
	let units = {};

	// 初始化每个元素的属性值
	Object.keys(options.animate).forEach((prop) => {
		startValues[prop] = options.animate[prop].startValue;
		endValues[prop] = options.animate[prop].endValue;
		units[prop] = options.animate[prop].unit || '';
	});

	// 滚动范围
	let scrollRange =
		options.scrollRange || document.documentElement.scrollHeight - window.innerHeight;

	function animate() {
		let scrollPosition = window.scrollY - options.startScroll;
		let scrollPercentage = scrollPosition / scrollRange;
		let progressPercentage = Math.sin((scrollPercentage * Math.PI) / 2);

		Object.keys(endValues).forEach((prop) => {
			let currentValue =
				startValues[prop] + progressPercentage * (endValues[prop] - startValues[prop]);
			element.style[prop] = currentValue + units[prop];
		});

		if (scrollPosition < scrollRange) {
			// 如果滚动位置未到达目标，则继续更新动画
			window.requestAnimationFrame(animate);
		} else {
			// 动画完成
			if (typeof options.onComplete === 'function') {
				options.onComplete();
			}
		}
	}

	animate();
}
function whereAni(element, options) {
	const ROption = {};
	ROption['animate'] = options.animate;
	ROption['scrollRange'] = options.scrollRange;
	ROption['startScroll'] = options.startScroll;

	animateEaseInOut(element, ROption);
}

// onclick Event
const hamburgerBtn = document.querySelector('#ipadNav .hamburgerBtn');
const clossBtn = document.querySelector('#ipadNav .clossBtn');
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
	const size = e.target.innerWidth;
	// nav
	const scroll = window.scrollY;
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
	// banner
	bannerDecoratePos(size);
});
function bannerDecoratePos(size) {
	const bannerBox = document.querySelectorAll('#decorate .box');
	const bannerBoxL = document.querySelector('#decorate .box .left');
	const bannerBoxR = document.querySelector('#decorate .box .right');
	if (size < 1200) {
		if (size >= 375) {
			let opacityRange = 0.5 * ((size - 375) / 825) + 0.5;
			let topRange = -(12 * ((size - 375) / 825)) + 10;
			bannerBox.forEach((e) => {
				e.style.opacity = `${opacityRange}`;
				e.style.top = `${topRange}%`;
			});
			let leftRange = 110 * ((size - 375) / 825) - 150;
			bannerBoxL.style.left = `${leftRange}%`;
			if (size < 500) {
				let rightRange = 60 * ((size - 375) / 125) - 120;
				bannerBoxR.style.right = `${rightRange}%`;
			} else {
				bannerBoxR.style.right = `-60%`;
			}
		} else {
			bannerBox.forEach((e) => {
				e.style.opacity = `.5`;
				e.style.top = `10%`;
			});
			let leftRange = 50 * ((size - 320) / 55) - 200;
			bannerBoxL.style.left = `${leftRange}%`;
		}
	} else {
		bannerBox.forEach((e) => {
			e.style.opacity = `1`;
			e.style.top = `-2%`;
		});
		bannerBoxL.style.left = `-40%`;
		bannerBoxR.style.right = `-60%`;
	}
}
bannerDecoratePos(wWidth);

// scroll Event
document.addEventListener('scroll', () => {
	const scroll = window.scrollY;
	console.log('scroll : ', scroll);

	// navigate start
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
	// navigate end

	// banner start
	if (scroll < wHeight / 2) {
		const bannerSlowgon = document.querySelector('#banner .slowgon');
		whereAni(bannerSlowgon, {
			animate: {
				top: {
					startValue: 50,
					endValue: 30,
					unit: '%',
				},
				opacity: {
					startValue: 1,
					endValue: 0.3,
					unit: '',
				},
			},
			// 指定滚动范围
			scrollRange: wHeight / 2,
			// 指定起始滚动位置（可选）
			startScroll: 0,
		});
	}
	// banner end
	// section1 start
	if (scroll > wHeight / 2) {
		const section1Img1 = document.querySelector('.section1 .image.image01');
		if (scroll <= wHeight * 1.5)
			whereAni(section1Img1, {
				animate: {
					bottom: {
						startValue: 30,
						endValue: 57,
						unit: '%',
					},
					opacity: {
						startValue: 0,
						endValue: 1,
						unit: '',
					},
				},
				// 指定滚动范围
				scrollRange: wHeight,
				// 指定起始滚动位置（可选）
				startScroll: wHeight / 2,
			});
	}
	if (scroll > wHeight * 1.5) {
		const section1Img3 = document.querySelector('.section1 .image.image03');
		if (scroll <= wHeight * 2.5)
			whereAni(section1Img3, {
				animate: {
					bottom: {
						startValue: 10,
						endValue: 3,
						unit: '%',
					},
					opacity: {
						startValue: 0,
						endValue: 1,
						unit: '',
					},
				},
				// 指定滚动范围
				scrollRange: wHeight,
				// 指定起始滚动位置（可选）
				startScroll: wHeight * 1.5,
			});
	}
	if (scroll > wHeight * 1) {
		const section1Img2 = document.querySelector('.section1 .image.image02');
		if (scroll <= wHeight * 2)
			whereAni(section1Img2, {
				animate: {
					bottom: {
						startValue: 0,
						endValue: 14,
						unit: '%',
					},
					opacity: {
						startValue: 0,
						endValue: 1,
						unit: '',
					},
				},
				// 指定滚动范围
				scrollRange: wHeight,
				// 指定起始滚动位置（可选）
				startScroll: wHeight,
			});
	}
	if (scroll > wHeight * 0.8) {
		const section1Img4 = document.querySelector('.section1 .image.image04');
		if (scroll <= wHeight * 1.8)
			whereAni(section1Img4, {
				animate: {
					bottom: {
						startValue: 0,
						endValue: 19,
						unit: '%',
					},
					opacity: {
						startValue: 0,
						endValue: 1,
						unit: '',
					},
				},
				// 指定滚动范围
				scrollRange: wHeight,
				// 指定起始滚动位置（可选）
				startScroll: wHeight * 0.8,
			});
	}

	// section1 end

	// section2 start
	const section2 = document.querySelector('.section2');
	// console.log('section2 : ', section2.offsetHeight);
	if (scroll > section2.offsetHeight * 0.2 + section2.offsetTop) {
		const section2Part1 = document.querySelector('.section2 .part1');
		if (scroll <= section2.offsetHeight * 0.5 + section2.offsetTop)
			whereAni(section2Part1, {
				animate: {
					bottom: {
						startValue: 0,
						endValue: 40,
						unit: '%',
					},
					opacity: {
						startValue: 0,
						endValue: 1,
						unit: '',
					},
				},
				// 指定滚动范围
				scrollRange: section2.offsetHeight * 0.3,
				// 指定起始滚动位置（可选）
				startScroll: section2.offsetHeight * 0.2 + section2.offsetTop,
			});
		else {
			if (scroll <= section2.offsetHeight * 1 + section2.offsetTop) {
				console.log('zz');
				whereAni(section2Part1, {
					animate: {
						bottom: {
							startValue: 40,
							endValue: -15,
							unit: '%',
						},
					},
					// 指定滚动范围
					scrollRange: section2.offsetHeight * 1,
					// 指定起始滚动位置（可选）
					startScroll: section2.offsetHeight * 0.5 + section2.offsetTop,
				});
			}
		}
	}

	// section2 end
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
	const getData = window.localStorage.getItem('data');
	return JSON.parse(getData);
}
function setLocalstorage(Data) {
	const reData = settingData(Data);
	window.localStorage.setItem('data', JSON.stringify(reData));
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
