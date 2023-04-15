const header = document.querySelector('header');
const wHeight = window.innerHeight;
const wWidth = window.innerWidth;
const mainColor = `#0032be`;
const white = `#fff`;

// click evt

const footerContainer = document.querySelector(' footer .container');
const GoTop = document.querySelector('.GoTop');
const hamburgerBtn = document.querySelector('#ipadNav .hamburgerBtn');
const clossBtn = document.querySelector('#ipadNav .clossBtn');
const ipadNavID = document.querySelector('#ipadNav');
const ipadNav = document.querySelector('#ipadNav .navigator');

footerContainer.addEventListener('click', () => {
	if (window.innerWidth < 768) footerContainer.classList.toggle('active');
});
GoTop.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
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

// scroll evt

window.addEventListener('scroll', () => {
	const scroll = window.scrollY;

	navigatorScroll(scroll);
	bannerSlowgon();
	socialMediaAni();
	GoTopAni();
});
function navigatorScroll(scroll) {
	const nav = document.getElementById('windowsNav');
	const banner = document.getElementById('banner');
	const bannerGap = banner.clientHeight / 20;
	const navAniEle = document.querySelectorAll('nav .navAniEle');
	const navBlock1 = navAniEle[0].querySelectorAll('.block');
	const navBlock2 = navAniEle[1].querySelectorAll('.block');
	const ipadNavContainer = document.querySelector('#ipadNav');
	if (window.innerWidth > 1000) {
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

	if (scroll > 100) {
		ipadNavContainer.style.background = `${white}`;
		hamburgerBtn.style.fill = `${mainColor}`;
	} else {
		ipadNavContainer.style.background = `transparent`;
		hamburgerBtn.style.fill = `${white}`;
	}
	// navigate end
}
function bannerSlowgon() {
	const bannerSlowgon = document.querySelector('#banner .slowgon');
	const main = document.querySelector('main');
	const mainPosition = main.getBoundingClientRect();
	if (mainPosition.top < wHeight) {
		if (mainPosition.top > wHeight * 0.2) {
			const result1 = lineAniFn({
				now: mainPosition.top,
				ds: wHeight * 1,
				df: wHeight * 0.2,
				as: 50,
				af: 30,
			});
			const result2 = lineAniFn({
				now: mainPosition.top,
				ds: wHeight * 1,
				df: wHeight * 0.2,
				as: 1,
				af: 0.3,
			});
			bannerSlowgon.style.top = `${result1}%`;
			bannerSlowgon.style.opacity = `${result2}`;
		} else {
			bannerSlowgon.style.top = `30%`;
			bannerSlowgon.style.opacity = `.3`;
		}
	} else {
		bannerSlowgon.style.top = `50%`;
		bannerSlowgon.style.opacity = `1`;
	}
}
function GoTopAni() {
	const footer = document.querySelector('footer');
	const footerPosition = footer.getBoundingClientRect();

	const GoTop = document.querySelector('.GoTop');

	if (footerPosition.top < wHeight) {
		if (!GoTop.classList.contains('ani')) GoTop.classList.add('ani');
		GoTop.style.position = 'absolute';
	} else {
		GoTop.style.position = 'fixed';
		if (window.scrollY > wHeight) {
			if (!GoTop.classList.contains('ani')) GoTop.classList.add('ani');
		} else {
			if (GoTop.classList.contains('ani')) GoTop.classList.remove('ani');
		}
	}
}
function socialMediaAni() {
	const footer = document.querySelector('footer');
	const footerPosition = footer.getBoundingClientRect();

	const socialMedia = document.querySelector('.socialMedia');

	if (footerPosition.top < wHeight) {
		if (!socialMedia.classList.contains('ani')) socialMedia.classList.add('ani');
	} else {
		if (socialMedia.classList.contains('ani')) socialMedia.classList.remove('ani');
	}
}
GoTopAni();
socialMediaAni();

// resize evt
window.addEventListener('resize', (e) => {
	const size = e.target.innerWidth;

	headerChange(size);
	bannerDecoratePos(size);
});
function headerChange(size) {
	const scroll = window.scrollY;
	if (size > 1000) {
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
}
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
bannerDecoratePos(wWidth);

// nav ele create
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

// shuffleNodeList
function shuffleNodeList(nodeList) {
	const arr = Array.from(nodeList);
	const shuffledArr = shuffleArray(arr);
	return shuffledArr;
}
function shuffleArray(arr) {
	return arr.sort(() => Math.random() - 0.5);
}

// animate Fn
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

// Math 0.00

function round2(num) {
	var m = Number((Math.abs(num) * 100).toPrecision(15));
	return (Math.round(m) / 100) * Math.sign(num);
}
function getRandomNumberInRange(min, max, hasDecimal) {
	let randomNumber;
	if (hasDecimal) {
		randomNumber = Math.random() * (max - min) + min;
		randomNumber = parseFloat(randomNumber.toFixed(2));
	} else {
		randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
	}
	return randomNumber;
}
