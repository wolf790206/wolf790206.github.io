const wHeight = window.innerHeight;
const GoTop = document.querySelector('.GoTop');
const linkPage = document.querySelector('#linkPage');
const hamburgerBtn = document.querySelector('#ipadNav .hamburgerBtn');
const clossBtn = document.querySelector('#ipadNav .clossBtn');
const ipadNavID = document.querySelector('#ipadNav');
const ipadNav = document.querySelector('#ipadNav .navigator');

document.documentElement.style.overflowY = 'hidden';
setTimeout(() => {
	document.documentElement.style.overflowY = 'scroll';
	setTimeout(() => {
		document.getElementById('startAni').style.display = 'none';
	}, 500);
}, 6400);

hamburgerBtn.addEventListener('click', (e) => {
	ipadNav.classList.add('active');
	hamburgerBtn.classList.add('active');
	clossBtn.classList.add('active');
	ipadNavID.classList.add('active');
});
clossBtn.addEventListener('click', (e) => {
	ipadNav.classList.remove('active');
	clossBtn.classList.toggle('active');
	hamburgerBtn.classList.remove('active');
	ipadNavID.classList.toggle('active');
});

GoTop.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
linkPage.addEventListener('click', (e) => {
	if (e.target.closest('a').classList.contains('link'))
		window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
	GoTopAni();
});

function GoTopAni() {
	const footer = document.querySelector('footer');
	const footerPosition = footer.getBoundingClientRect();

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
