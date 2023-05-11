var Datas = null;
function getData() {
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbwiBglFCi3-JUsQsOfVhjcGNZ7seFSwUpXdZ1owVksnQ22CvNpV92CXiCGsqBy6_hsp8A/exec';
	fetch(scriptURL, { method: 'GET' })
		.then((res) => {
			return res.text();
		})
		.then((result) => {
			Datas = JSON.parse(result).data;
			Datas.forEach((e) => {
				e.bannerPic = e.bannerPic.split(',');
				e.Introduction = e.Introduction.split('\n');
				e.designer = e.designer.split(',');
				e.remark = e.remark.split('\n');
				e.imageLinkLarge = e.imageLinkLarge.split(',');
				e.imageLinkMedium = e.imageLinkMedium.split(',');
				e.imageLinkSmall = e.imageLinkSmall.split(',');
			});
			navData(JSON.parse(result).category, Datas);
			router();
			// Loading.classList.remove('ani');
		})
		.catch((err) => console.log('err', err));
}
getData();

function renderContent(component) {
	var content = document.getElementById('content');
	content.innerHTML = '';
	content.appendChild(component());
}

function router() {
	var route = window.location.hash.substring(1);
	if (route.split('?')[0] === '/work') {
		var params = getQueryParams();
		renderContent(() => works(params.ID));
	}
}

function getQueryParams() {
	var search = window.location.hash.substring(1);
	var queryParams = {};
	if (search) {
		search.split('?').forEach(function (part) {
			var item = part.split('=');
			if (item.length > 1) queryParams[item[0]] = decodeURIComponent(item[1]);
		});
	}
	return queryParams;
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

function works(ID) {
	if (Datas) {
		result = Datas.filter((Data) => Data.ID === ID);
		const Loading = document.getElementById('loader');
		const content = document.getElementById('content');
		Loading.classList.remove('ani');
		content.classList.add('ani');

		Datas.forEach((Data, key) => {
			if (Data.ID === ID) Linkpage(key);
		});
		return card(result[0]);
	} else {
		return null;
	}
}
function Linkpage(key) {
	const linkPage = document.getElementById('linkPage');
	const prepLink = `./work.html#/work?ID=${
		key - 1 < 0 ? Datas[Datas.length - 1].ID : Datas[key - 1].ID
	}`;
	const nextLink = `./work.html#/work?ID=${
		key + 1 > Datas.length - 1 ? Datas[0].ID : Datas[key + 1].ID
	}`;
	const html = `
		<a href="${prepLink}" class="link">
			<div class="leftBox">
				<svg>
					<path d="M0.962665 17.6468C-0.320888 18.9483 -0.320888 21.0621 0.962665 22.3637L17.3922 39.0238C18.6757 40.3254 20.7602 40.3254 22.0438 39.0238C23.3273 37.7222 23.3273 35.6085 22.0438 34.3069L11.2106 23.332H42.7141C44.5316 23.332 46 21.843 46 20C46 18.157 44.5316 16.668 42.7141 16.668H11.2208L22.0335 5.69309C23.317 4.39151 23.317 2.27776 22.0335 0.976181C20.7499 -0.325394 18.6654 -0.325394 17.3819 0.976181L0.952397 17.6363L0.962665 17.6468Z" fill="black"/>
				</svg>
				<span class="text">${
					key - 1 < 0 ? Datas[Datas.length - 1].worksName : Datas[key - 1].worksName
				}</span>
			</div>
		</a>
		<a href="${nextLink}" class="link">
			<div class="rightBox">
				<span class="text">${
					key + 1 > Datas.length - 1 ? Datas[0].worksName : Datas[key + 1].worksName
				}</span>
				<svg>
					<path d="M45.0373 22.3532C46.3209 21.0517 46.3209 18.9379 45.0373 17.6363L28.6078 0.976181C27.3243 -0.325394 25.2398 -0.325394 23.9562 0.976181C22.6727 2.27776 22.6727 4.39151 23.9562 5.69309L34.7894 16.668H3.2859C1.46839 16.668 0 18.157 0 20C0 21.843 1.46839 23.332 3.2859 23.332H34.7792L23.9665 34.3069C22.683 35.6085 22.683 37.7222 23.9665 39.0238C25.2501 40.3254 27.3346 40.3254 28.6181 39.0238L45.0476 22.3637L45.0373 22.3532Z" fill="black"/>
				</svg>
			</div>
		</a>
	`;
	linkPage.innerHTML = html;
}

function card(Data) {
	const element = document.createElement('div');
	element.classList = `card`;
	element.appendChild(titleBox(Data));
	element.appendChild(banner(Data));
	element.appendChild(line());
	element.appendChild(infoBox(Data));
	element.appendChild(line());
	element.appendChild(description(Data));
	element.appendChild(line());
	element.appendChild(innerImg(Data));
	if (Data.remark[0] != '') element.appendChild(remark(Data));
	if (Data.CTA != '') element.appendChild(CTA(Data));
	element.appendChild(line());
	return element;
}
function createEleFn(ele, context, classNa) {
	const element = document.createElement(ele);
	if (classNa) classNa.forEach((name) => element.classList.add(name));
	if (typeof context === 'object') element.appendChild(context);
	else element.innerHTML = context;
	return element;
}
function createImg(large, medium, small, alt) {
	const element = document.createElement('img');
	element.src = large;
	element.srcset = `
		${small}   500w,
		${medium} 1000w,
		${large}  2000w
	`;
	element.alt = alt;
	return element;
}
function titleBox(Data) {
	const element = document.createElement('div');
	element.classList = `titleBox`;
	const html = `
		<div class="chineseTitle">${Data.worksName}</div>
			<div class="line"></div>
		<div class="englishTitle">${Data.englishName}</div>
	`;
	element.innerHTML = html;
	return element;
}
function banner(Data) {
	const element = document.createElement('div');
	element.classList = `banner`;
	const html = `
		<img
			src=${Data.bannerPic[0]}
			srcset="
				${Data.bannerPic[2]}   500w,
				${Data.bannerPic[1]} 1000w,
				${Data.bannerPic[0]}  2000w
			"
			alt=${Data.worksName}
		/>
	`;
	element.innerHTML = html;
	return element;
}
function line() {
	const element = document.createElement('div');
	element.classList = `line`;
	return element;
}
function infoBox(Data) {
	const element = document.createElement('div');
	element.classList = `infoBox`;
	let designerText = '';
	const firstLine = document.createElement('div');
	firstLine.classList = `firstLine`;
	const secondLine = document.createElement('div');
	secondLine.classList = `secondLine`;
	const thirdLine = document.createElement('div');
	thirdLine.classList = `thirdLine`;

	firstLine.appendChild(createEleFn('div', '年份：', ['yearTitle']));
	firstLine.appendChild(createEleFn('div', Data.year, ['year']));
	firstLine.appendChild(createEleFn('div', '設計類別：', ['categoryTitle']));
	firstLine.appendChild(createEleFn('div', Data.category, ['category']));

	secondLine.appendChild(createEleFn('div', '設計師：', ['designerTitle']));
	Data.designer.forEach((e) => {
		designerText = designerText + `<span class='text'>${e}</span>`;
	});
	secondLine.appendChild(createEleFn('div', designerText, ['designerBox']));

	thirdLine.appendChild(createEleFn('div', '指導老師：', ['instructorTitle']));
	thirdLine.appendChild(createEleFn('div', Data.instructor, ['instructor']));

	element.appendChild(firstLine);
	element.appendChild(secondLine);
	element.appendChild(thirdLine);

	return element;
}
function description(Data) {
	const element = document.createElement('div');
	element.classList = `description`;
	Data.Introduction.forEach((e) => {
		element.appendChild(createEleFn('span', e, ['text']));
	});
	return element;
}
function innerImg(Data) {
	const element = document.createElement('div');
	element.classList = `innerImg`;
	const num = Data.imageLinkLarge.length;
	for (let i = 0; i < num; i++) {
		element.appendChild(
			createImg(
				Data.imageLinkLarge[i],
				Data.imageLinkMedium[i],
				Data.imageLinkSmall[i],
				Data.worksName
			)
		);
	}
	return element;
}
function remark(Data) {
	const element = document.createElement('div');
	element.classList = `remark`;
	Data.remark.forEach((e) => {
		element.appendChild(createEleFn('span', e, ['text']));
	});

	return element;
}
function CTA(Data) {
	const element = document.createElement('a');
	element.classList = `CTA`;
	element.innerHTML = `點選預購`;
	element.href = Data.CTA;
	element.target = `_blank`;
	return element;
}
function hrefEleFn(url, context, classNa) {
	const element = document.createElement('a');
	if (classNa) classNa.forEach((name) => element.classList.add(name));
	element.classList.add('link');
	element.href = `${url}`;
	if (typeof context === 'object') element.appendChild(context);
	else element.innerHTML = context;
	return element;
}
function navData(Cat, Data) {
	const nav = document.querySelector('#mainNav .navigator');
	console.log(Cat);
	console.log(Data);
	Cat.forEach((ca) => {
		nav.appendChild(createEleFn('div', ca, ['category']));
		let result = Data.filter((e) => e.category == ca);
		result.forEach((da) => {
			const projectLink = `./work.html#/work?ID=${da.ID}`;
			nav.appendChild(hrefEleFn(projectLink, da.worksName, ['product']));
		});
	});
	const collapose = document.querySelector('#mainNav .collapose');
	collapose.addEventListener('click', () => {
		const mainNav = document.querySelector('#mainNav');
		mainNav.classList.toggle('active');
		if (mainNav.classList.contains('active'))
			document.querySelector('#mainNav .navBox').style.height = `${
				document.querySelector('#mainNav .navigator').clientHeight
			}px`;
		else document.querySelector('#mainNav .navBox').style.height = '0px';
	});
}
