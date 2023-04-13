const header = document.querySelector('header');
const wHeight = window.innerHeight;
const wWidth = window.innerWidth;
const mainColor = `#0032be`;
const white = `#fff`;
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
const ipadNavID = document.querySelector('#ipadNav');
const ipadNav = document.querySelector('#ipadNav .navigator');
hamburgerBtn.addEventListener('click', (e) => {
	ipadNav.classList.add('active');
	hamburgerBtn.classList.add('active');
	clossBtn.classList.add('active');
	ipadNavID.classList.add('active');
	ipadNavID.style.background = `${white}`;
});
clossBtn.addEventListener('click', (e) => {
	ipadNav.classList.remove('active');
	clossBtn.classList.toggle('active');
	hamburgerBtn.classList.remove('active');
	ipadNavID.classList.toggle('active');
	ipadNavID.style.background = `${window.scrollY > 100 ? `${white}` : 'none'}`;
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

const section3Part2Col = document.querySelectorAll('.section3 .part2 .aniBox .column');
section3Part2Col.forEach((ele) => {
	ele.addEventListener('click', (e) => {
		if (window.innerWidth <= 768) e.target.closest('.column').classList.toggle('active');
	});
});

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
	resizeSection3Part3(size);
});

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
		ipadNavContainer.style.background = `${white}`;
		hamburgerBtn.style.fill = `${mainColor}`;
	} else {
		ipadNavContainer.style.background = `transparent`;
		hamburgerBtn.style.fill = `${white}`;
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
	const section1 = document.querySelector('.section1');
	const section1Position = section1.getBoundingClientRect();
	if (window.innerWidth > 1024) {
		if (section1Position.top < wHeight * 1.2) {
			const section1Img1 = document.querySelector('.section1 .image.image01');
			if (section1Position.top > 0)
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
					scrollRange: wHeight * 0.8,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 0.2,
				});
		}
		if (section1Position.top < 0) {
			const section1Img3 = document.querySelector('.section1 .image.image03');
			if (section1Position.top > -1.5 * wHeight)
				whereAni(section1Img3, {
					animate: {
						bottom: {
							startValue: -30,
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
					scrollRange: wHeight * 1.5,
					// 指定起始滚动位置（可选）
					startScroll: wHeight,
				});
		}
		if (section1Position.top < wHeight * 0.2) {
			const section1Img2 = document.querySelector('.section1 .image.image02');
			if (section1Position.top > -0.8 * wHeight)
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
					startScroll: wHeight * 0.8,
				});
		}
		if (section1Position.top < wHeight * 0.5) {
			const section1Img4 = document.querySelector('.section1 .image.image04');
			if (section1Position.top > 0)
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
					scrollRange: wHeight * 0.5,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 0.5,
				});
		}
	} else if (window.innerWidth >= 768) {
		if (section1Position.top < wHeight * 0.8) {
			const section1Img1 = document.querySelector('.section1 .image.image01');
			if (section1Position.top > wHeight * 0.1)
				whereAni(section1Img1, {
					animate: {
						bottom: {
							startValue: 60,
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
					scrollRange: wHeight * 0.8,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 0.2,
				});
		}
		if (section1Position.top < 0) {
			const section1Img3 = document.querySelector('.section1 .image.image03');
			if (section1Position.top > -1 * wHeight * 0.5)
				whereAni(section1Img3, {
					animate: {
						bottom: {
							startValue: -30,
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
					scrollRange: wHeight * 1.3,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 1,
				});
		}
		if (section1Position.top < wHeight * 0.5) {
			const section1Img2 = document.querySelector('.section1 .image.image02');
			if (section1Position.top > -1 * wHeight * 0.2)
				whereAni(section1Img2, {
					animate: {
						bottom: {
							startValue: 10,
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
					scrollRange: wHeight * 1.2,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 0.7,
				});
		}
		if (section1Position.top < wHeight * 0.5) {
			const section1Img4 = document.querySelector('.section1 .image.image04');
			if (section1Position.top > 0)
				whereAni(section1Img4, {
					animate: {
						bottom: {
							startValue: 13,
							endValue: 30,
							unit: '%',
						},
						opacity: {
							startValue: 0,
							endValue: 1,
							unit: '',
						},
					},
					// 指定滚动范围
					scrollRange: wHeight * 1.2,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 0.7,
				});
		}
	} else {
		if (section1Position.top < wHeight * 0.8) {
			const section1Img1 = document.querySelector('.section1 .image.image01');
			if (section1Position.top > wHeight * 0.1)
				whereAni(section1Img1, {
					animate: {
						bottom: {
							startValue: 60,
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
					scrollRange: wHeight * 0.8,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 0.2,
				});
		}
		if (section1Position.top < 0) {
			const section1Img3 = document.querySelector('.section1 .image.image03');
			if (section1Position.top > -1 * wHeight)
				whereAni(section1Img3, {
					animate: {
						bottom: {
							startValue: -20,
							endValue: 10,
							unit: '%',
						},
						opacity: {
							startValue: 0,
							endValue: 1,
							unit: '',
						},
					},
					// 指定滚动范围
					scrollRange: wHeight * 2,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 1,
				});
		}
		if (section1Position.top < wHeight * 0.5) {
			const section1Img2 = document.querySelector('.section1 .image.image02');
			if (section1Position.top > -1 * wHeight * 0.2)
				whereAni(section1Img2, {
					animate: {
						bottom: {
							startValue: 10,
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
					scrollRange: wHeight * 1.2,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 0.7,
				});
		}
		if (section1Position.top < wHeight * 0.5) {
			const section1Img4 = document.querySelector('.section1 .image.image04');
			if (section1Position.top > 0)
				whereAni(section1Img4, {
					animate: {
						bottom: {
							startValue: 13,
							endValue: 30,
							unit: '%',
						},
						opacity: {
							startValue: 0,
							endValue: 1,
							unit: '',
						},
					},
					// 指定滚动范围
					scrollRange: wHeight * 1.2,
					// 指定起始滚动位置（可选）
					startScroll: wHeight * 0.7,
				});
		}
	}

	// section1 end

	// section2 start
	const section2 = document.querySelector('.section2');
	const section2Position = section2.getBoundingClientRect();
	if (section2Position.top < wHeight) {
		const section2Part1 = document.querySelector('.section2 .part1');
		if (section2Position.top < wHeight * 0.5)
			if (section2Position.top > 0) {
				whereAni(section2Part1, {
					animate: {
						opacity: {
							startValue: 0,
							endValue: 1,
							unit: '',
						},
					},
					// 指定滚动范围
					scrollRange: wHeight * 0.5,
					// 指定起始滚动位置（可选）
					startScroll: section2.offsetTop + wHeight * 0.5,
				});
			} else {
				section2Part1.style.opacity = `1`;
			}
		if (section2Position.top < 0) {
			if (section2Position.top > -0.5 * wHeight)
				section2Part1.style.top = `${section2Position.top * -1}px`;
			else section2Part1.style.top = `${0.5 * wHeight}px`;
		} else {
			section2Part1.style.top = `0px`;
		}
	}

	// section2 end

	// section3 start
	section3Ani();
	// section3 end
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

// easeInOut
function easeInOutAniFn(option) {
	let progress = (option.now - option.ds) / (option.df - option.ds);
	let t = easeInOut(progress);
	let nowAni =
		option.as + (3 * (option.af - option.as) * t * t - 2 * (option.af - option.as) * t * t * t);
	return nowAni;
}
function easeInOut(t) {
	return 3 * t * t - 2 * t * t * t;
}
// line
function lineAniFn(option) {
	let progress = ((option.now - option.ds) * (option.af - option.as)) / (option.df - option.ds);
	let nowAni = progress + option.as;
	return nowAni;
}

// resize ani
bannerDecoratePos(wWidth);
function bannerDecoratePos(size) {
	const bannerBox = document.querySelectorAll('#banner #decorate .box');
	const bannerRBox = document.querySelector('#banner #decorate .box.right');
	const bannerBoxL = document.querySelector('#banner #decorate .box .left');
	const bannerBoxR = document.querySelector('#banner #decorate .box .right');
	if (size < 1000) {
		if (size >= 500)
			bannerBox.forEach((e) => {
				e.style.height = `${size / 10}vh`;
			});
		else {
			bannerBox.forEach((e) => {
				e.style.height = `50vh`;
			});
		}
	} else {
		bannerBox.forEach((e) => {
			e.style.height = `100vh`;
		});
	}
	if (size < 500) {
		bannerBoxL.style.left = `-50%`;
		bannerBoxR.style.right = `-30%`;
		bannerRBox.style.bottom = `-2%`;
	} else {
		bannerBoxL.style.left = `-40%`;
		bannerBoxR.style.right = `-60%`;
		bannerRBox.style.bottom = `2%`;
	}
}
resizeSection3Part3(wWidth);
function resizeSection3Part3(size) {
	const section3Part3NewsRow = document.querySelector('.section3 .part3 .newsBox .newsRow');
	if (size < 1440) {
		if (size > 768) {
			let result1 = lineAniFn({
				now: size,
				ds: 1440,
				df: 768,
				as: 1,
				af: 0.5,
			});
			let result2 = lineAniFn({
				now: size,
				ds: 1440,
				df: 768,
				as: -50,
				af: -100,
			});
			section3Part3NewsRow.style.transform = `scale(${result1}) translate(${result2}%, ${result2}%)`;
		} else {
			section3Part3NewsRow.style.transform = `scale(0.5) translate(-100%, -100%)`;
		}
	} else {
		section3Part3NewsRow.style.transform = `scale(1) translate(-50%, -50%)`;
	}
	if (size < 1440) {
		if (size > 768) {
			let left = 58;
			if (size >= 1000) {
				let result = lineAniFn({
					now: size,
					ds: 1440,
					df: 1000,
					as: 50,
					af: left,
				});
				section3Part3NewsRow.style.left = `${result}%`;
			} else {
				let result = lineAniFn({
					now: size,
					ds: 1000,
					df: 768,
					as: left,
					af: 50,
				});
				section3Part3NewsRow.style.left = `${result}%`;
			}
		} else {
			section3Part3NewsRow.style.left = `50%`;
		}
	} else {
		section3Part3NewsRow.style.left = `50%`;
	}
	if (size < 450) {
		section3Part3NewsRow.style.transform = `scale(1) translate(-50%, -50%)`;
	}
}

// scroll ani
section3Ani();
function section3Ani() {
	const section3 = document.querySelector('.section3');
	const section3Position = section3.getBoundingClientRect();

	const section3Part1 = document.querySelector('.section3 .part1');
	const section3Part1Position = section3Part1.getBoundingClientRect();
	const section3Part1Box = document.querySelector('.section3 .part1 .box');
	const section3Part1Content = document.querySelector('.section3 .part1 .content');
	const section3Part1SliderRow = document.querySelector('.section3 .part1 .box .sliderRow');

	const section3Part2 = document.querySelector('.section3 .part2');
	const section3Part2Position = section3Part2.getBoundingClientRect();
	const section3Part2Content = document.querySelector('.section3 .part2 .content');
	const section3Part2Box = document.querySelector('.section3 .part2 .box');
	const section3Part2aniBox = document.querySelector('.section3 .part2 .aniBox');
	const section3Part2Img = section3Part2aniBox.querySelectorAll('.imageContainer');

	const section3Part3 = document.querySelector('.section3 .part3');
	const section3Part3Position = section3Part3.getBoundingClientRect();
	const section3Part3Box = document.querySelector('.section3 .part3 .box');
	const section3Part3NewsBox = document.querySelector('.section3 .part3 .newsBox');
	const section3Part3Content = document.querySelector('.section3 .part3 .content');
	const section3Part3Col = document.querySelectorAll('.section3 .part3 .column');

	const section3Part4 = document.querySelector('.section3 .part4');
	const section3Part4Position = section3Part4.getBoundingClientRect();

	if (section3Position.top < wHeight * 1.3) {
		if (section3Position.top > wHeight * 0.8) {
			let result = section3Position.top / wHeight;
			section3Part1Content.style.transform = `scale(${result + 0.2})`;
		} else {
			section3Part1Content.style.transform = `scale(1)`;
		}
	}
	if (section3Position.top < wHeight * 0.8) {
		if (section3Position.top > wHeight * 0.3) {
			let result = (section3Position.top * 60) / wHeight;
			section3Part1.style.top = `${18 - result}vh`;
		} else {
			section3Part1.style.top = `0`;
		}
	}

	if (window.innerWidth > 768) {
		if (section3Position.top < 0) {
			section3Part1Box.style.position = `fixed`;
			section3Part1Box.style.top = `0`;
			if (section3Part1Position.top > wHeight * -2) {
				let result = (section3Position.top / wHeight) * 150;
				section3Part1SliderRow.style.left = `${result + 100}%`;
			}
		} else {
			section3Part1Box.style.position = `relative`;
		}
	} else {
		if (section3Position.top < 0) {
			section3Part1Box.style.position = `fixed`;
			section3Part1Box.style.top = `0`;
			if (section3Position.top > wHeight * -4) {
				let result = (section3Position.top / wHeight) * 100;
				section3Part1SliderRow.style.left = `${result + 100}%`;
			}
		} else {
			section3Part1Box.style.position = `relative`;
		}
	}
	if (section3Part2Position.top < wHeight) {
		section3Part1Box.style.position = `relative`;
		section3Part1Box.style.top = `${
			section3Part1.offsetHeight - section3Part1Box.offsetHeight
		}px`;
	}

	if (section3Part2Position.top < wHeight) {
		if (section3Part2Position.top > wHeight * 0.5) {
			section3Part2Content.style.transform = `scale(2)`;
			section3Part2aniBox.style.width = `0%`;
		} else if (section3Part2Position.top > 0) {
			let result = (section3Part2Position.top * 2) / wHeight;
			section3Part2Content.style.transform = `scale(${result + 1})`;
		}
		if (section3Part2Position.top < 0) {
			if (section3Part2Position.top > wHeight * -2) {
				section3Part2Box.style.position = `fixed`;
				section3Part2Box.style.top = `0`;
			} else if (section3Part3Position.top < wHeight) {
				section3Part2Box.style.position = `relative`;
				section3Part2Box.style.top = `${
					section3Part2.offsetHeight - section3Part2Box.offsetHeight
				}px`;
			}
			if (section3Part2Position.top > wHeight * -0.5) {
				let result = easeInOutAniFn({
					now: section3Part2Position.top,
					ds: wHeight * 0,
					df: wHeight * -0.5,
					as: 0,
					af: 100,
				});
				section3Part2aniBox.style.width = `${result}%`;
			} else {
				section3Part2aniBox.style.width = `100%`;
			}
			if (section3Part2Position.top < wHeight * -0.5) {
				section3Part2Img.forEach((e) => {
					e.style.opacity = `1`;
				});
				if (section3Part2Position.top > wHeight * -1.5) {
					let result1 = easeInOutAniFn({
						now: section3Part2Position.top,
						ds: wHeight * -0.5,
						df: wHeight * -1.5,
						as:
							-section3Part2Img[0].offsetHeight -
							section3Part2Img[0].closest('.aniBox').offsetTop,
						af: 0,
					});
					let result2 = easeInOutAniFn({
						now: section3Part2Position.top,
						ds: wHeight * -0.5,
						df: wHeight * -1.5,
						as: 720,
						af: 0,
					});
					section3Part2Img[0].style.transform = `translateX(${result1}px) rotate(${result2}deg)`;
				} else {
					section3Part2Img[0].style.transform = `translateX(0) rotate(0)`;
				}
				if (section3Part2Position.top > wHeight * -1.6) {
					let result1 = easeInOutAniFn({
						now: section3Part2Position.top,
						ds: wHeight * -0.5,
						df: wHeight * -1.6,
						as:
							-section3Part2Img[1].offsetHeight -
							section3Part2Img[1].closest('.aniBox').offsetTop,
						af: 0,
					});
					let result2 = easeInOutAniFn({
						now: section3Part2Position.top,
						ds: wHeight * -0.5,
						df: wHeight * -1.6,
						as: 360,
						af: 0,
					});
					console.log(
						'section3Part2Img[1].parentElement : ',
						section3Part2Img[1].parentNode
					);
					section3Part2Img[1].style.transform = `translateY(${result1}px) rotate(${result2}deg)`;
				} else {
					section3Part2Img[1].style.transform = `translateY(0) rotate(0)`;
				}
				if (section3Part2Position.top > wHeight * -1.7) {
					let result1 = easeInOutAniFn({
						now: section3Part2Position.top,
						ds: wHeight * -0.5,
						df: wHeight * -1.7,
						as:
							section3Part2Img[2].offsetHeight +
							section3Part2Img[2].closest('.aniBox').offsetTop,
						af: 0,
					});
					let result2 = easeInOutAniFn({
						now: section3Part2Position.top,
						ds: wHeight * -0.5,
						df: wHeight * -1.7,
						as: -540,
						af: 0,
					});
					section3Part2Img[2].style.transform = `translateX(${result1}px) rotate(${result2}deg)`;
				} else {
					section3Part2Img[2].style.transform = `translateX(0) rotate(0)`;
				}
				if (section3Part2Position.top < wHeight * -0.9) {
					if (section3Part2Position.top > wHeight * -1.8) {
						let result1 = easeInOutAniFn({
							now: section3Part2Position.top,
							ds: wHeight * -0.9,
							df: wHeight * -1.8,
							as:
								-section3Part2Img[3].offsetHeight -
								section3Part2Img[3].closest('.aniBox').offsetTop,
							af: 0,
						});
						let result2 = easeInOutAniFn({
							now: section3Part2Position.top,
							ds: wHeight * -0.9,
							df: wHeight * -1.8,
							as: 540,
							af: 0,
						});
						section3Part2Img[3].style.transform = `translateX(${result1}px) rotate(${result2}deg)`;
					} else {
						section3Part2Img[3].style.transform = `translateX(0) rotate(0)`;
					}
					if (section3Part2Position.top > wHeight * -1.6) {
						let result1 = easeInOutAniFn({
							now: section3Part2Position.top,
							ds: wHeight * -0.9,
							df: wHeight * -1.6,
							as:
								section3Part2Img[1].offsetHeight +
								section3Part2Img[1].closest('.aniBox').offsetTop,
							af: 0,
						});
						let result2 = easeInOutAniFn({
							now: section3Part2Position.top,
							ds: wHeight * -0.9,
							df: wHeight * -1.6,
							as: 540,
							af: 0,
						});
						section3Part2Img[4].style.transform = `translateY(${result1}px) rotate(${result2}deg)`;
					} else {
						section3Part2Img[4].style.transform = `translateX(0) rotate(0)`;
					}
					if (section3Part2Position.top > wHeight * -1.7) {
						let result1 = easeInOutAniFn({
							now: section3Part2Position.top,
							ds: wHeight * -0.9,
							df: wHeight * -1.7,
							as:
								section3Part2Img[1].offsetHeight +
								section3Part2Img[1].closest('.aniBox').offsetTop,
							af: 0,
						});
						let result2 = easeInOutAniFn({
							now: section3Part2Position.top,
							ds: wHeight * -0.9,
							df: wHeight * -1.7,
							as: 720,
							af: 0,
						});
						section3Part2Img[5].style.transform = `translateY(${result1}px) rotate(${result2}deg)`;
					} else {
						section3Part2Img[5].style.transform = `translateX(0) rotate(0)`;
					}
				}
			} else {
				section3Part2Img.forEach((e) => {
					e.style.opacity = `0`;
				});
			}
		} else {
			section3Part2Box.style.position = `relative`;
		}
	}
	console.log('section3Part3Position : ', section3Part3Position.top);
	if (section3Part3Position.top < wHeight) {
		if (section3Part3Position.top > wHeight * 0.5) {
			let result1 = lineAniFn({
				now: section3Part3Position.top,
				ds: wHeight * 1,
				df: wHeight * 0.5,
				as: 0,
				af: 100,
			});
			section3Part3NewsBox.style.width = `${result1}%`;
			section3Part3NewsBox.style.opacity = `0`;
			let result2 = lineAniFn({
				now: section3Part3Position.top,
				ds: wHeight * 1,
				df: wHeight * 0.5,
				as: 0.3,
				af: 1,
			});
			section3Part3Content.style.scale = `${result2}`;
		} else {
			if (section3Part3Position.top > wHeight * 0) {
				let result = lineAniFn({
					now: section3Part3Position.top,
					ds: wHeight * 0.5,
					df: wHeight * 0,
					as: 0,
					af: 1,
				});
				section3Part3NewsBox.style.opacity = `${result}`;
			} else {
				section3Part3NewsBox.style.opacity = `1`;
			}
			section3Part3NewsBox.style.width = `100%`;
		}
	} else {
		section3Part3NewsBox.style.width = `0%`;
		section3Part3NewsBox.style.opacity = `0`;
		section3Part3Content.style.scale = `.3`;
	}
	if (section3Part3Position.top < 0) {
		section3Part3Box.style.position = `fixed`;
		section3Part3Box.style.top = `0`;
		if (section3Part4Position.top < wHeight) {
			console.log('section3Part4Position.top  : ', section3Part4Position.top);
			section3Part3Box.style.position = `relative`;
			section3Part3Box.style.top = `${wHeight * 5}px`;
		}
		console.log('section3Part3Box.offsetHeight : ', section3Part3Box.offsetHeight);
		outAni(section3Part3Col, section3Part3.offsetHeight - wHeight, -section3Part3Position.top);
	} else {
		section3Part3Box.style.position = `relative`;
		section3Part3Box.style.top = `auto`;
	}
}

function outAni(obj, danst, now) {
	const count = obj.length;
	const smallUnit = danst / count;
	const persent = smallUnit / danst;
	const unit = Math.floor(now / smallUnit);
	if (unit % 2 === 0) {
		if (now > persent * danst * unit) {
			if (now < persent * danst * (unit + 1)) {
				// Math.floor(now / smallUnit)
				if (now > persent * danst * (unit + 0.2)) {
					if (now < persent * danst * (unit + 0.5)) {
						let result1 = lineAniFn({
							now: now,
							ds: persent * danst * (unit + 0.2),
							df: persent * danst * (unit + 0.5),
							as: 0,
							af: -90,
						});
						obj[unit].style.transform = `rotate(${result1}deg)`;
						obj[unit].style.transformOrigin = `-35% 150%`;
					}
				} else {
					obj[unit].style.transform = `rotate(0deg)`;
					obj[unit].style.transformOrigin = `50% 50%`;
				}
				if (now > persent * danst * (unit + 0.5)) {
					if (now < persent * danst * (unit + 1)) {
						if (obj[unit].classList.contains('first')) {
							obj[unit].classList = `column`;
							obj[unit + 1].classList = `column first`;
							obj[unit + 2].classList = `column second`;
							obj[unit + 3].classList = `column third`;
						}
					}
				} else {
					if (!obj[unit].classList.contains('first')) {
						obj[unit].classList = `column first`;
						obj[unit + 1].classList = `column second`;
						obj[unit + 2].classList = `column third`;
						obj[unit + 3].classList = `column`;
					}
				}
			}
		}
	} else {
		if (now > persent * danst * unit) {
			if (now < persent * danst * (unit + 1)) {
				// unit
				if (now > persent * danst * (unit + 0.2)) {
					if (now < persent * danst * (unit + 0.5)) {
						let result1 = lineAniFn({
							now: now,
							ds: persent * danst * (unit + 0.2),
							df: persent * danst * (unit + 0.5),
							as: 0,
							af: 90,
						});
						obj[unit].style.transform = `rotate(${result1}deg)`;
						obj[unit].style.transformOrigin = `135% 150%`;
					}
				} else {
					obj[unit].style.transform = `rotate(0deg)`;
					obj[unit].style.transformOrigin = `50% 50%`;
				}
				if (now > persent * danst * (unit + 0.5)) {
					if (now < persent * danst * (unit + 1)) {
						if (obj[unit].classList.contains('first')) {
							obj[unit].classList = `column`;
							obj[unit + 1].classList = `column first`;
							obj[unit + 2].classList = `column second`;
							obj[unit + 3].classList = `column third`;
						}
					}
				} else {
					if (!obj[unit].classList.contains('first')) {
						obj[unit].classList = `column first`;
						obj[unit + 1].classList = `column second`;
						obj[unit + 2].classList = `column third`;
						obj[unit + 3].classList = `column`;
					}
				}
			}
		}
	}
}
