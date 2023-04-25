const Loading = document.getElementById('loader');
function getData() {
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbwiBglFCi3-JUsQsOfVhjcGNZ7seFSwUpXdZ1owVksnQ22CvNpV92CXiCGsqBy6_hsp8A/exec';
	fetch(scriptURL, { method: 'GET' })
		.then((res) => {
			return res.text();
		})
		.then((result) => {
			createContent(JSON.parse(result).data);
			Loading.classList.remove('ani');
		})
		.catch((err) => console.log('err', err));
}
getData();

function createContent(Data) {
	console.log(Data);
	Data.forEach((e) => {
		// const projectLink = `/work#/work?ID=${e.ID}`;
		// const card = createEleFn('div', '', ['card']);
		// const titleChi = createEleFn('span', e.worksName, ['titleChi']);
		// const titleEng = createEleFn('span', e.englishName, ['titleEng']);
		// const tourGuide = createEleFn('p', e.tourGuide, ['tourGuide']);
		// const info = createEleFn('div', '', ['info']);
		// const title = createEleFn('div', '', ['title']);
		// const cardImage = ImageContainerEleFn(e.thumbnail, ['changeTo75']);
		// card.appendChild(cardImage);
		// title.appendChild(titleChi);
		// title.appendChild(titleEng);
		// info.appendChild(title);
		// info.appendChild(tourGuide);
		// card.appendChild(title);
		// card.appendChild(info);
		// const cardLink = hrefEleFn(projectLink, card);
		// cardLink.appendChild(card);
		const content = document.getElementById('content');

		// content.appendChild(cardLink);
		content.appendChild(Card(e));
	});
}

function createEleFn(ele, context, classNa) {
	const element = document.createElement(ele);
	if (classNa) classNa.forEach((name) => element.classList.add(name));
	if (typeof context === 'object') element.appendChild(context);
	else element.innerHTML = context;
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
function ImageContainerEleFn(url, classNa) {
	const imageContainer = document.createElement('div');
	const imageContainerInner = document.createElement('div');
	imageContainer.classList.add('imageContainer');
	imageContainerInner.classList.add('imageContainerInner');
	if (classNa) classNa.forEach((name) => imageContainer.classList.add(name));
	imageContainerInner.style.backgroundImage = `url(${url})`;
	imageContainer.append(imageContainerInner);
	return imageContainer;
}
function Card(data) {
	const projectLink = `/work#/work?ID=${data.ID}`;
	const html = `
			<div class="card">
				<div class="imageContainer changeTo75">
					<div
						class="imageContainerInner"
						style="background-image: url(${data.thumbnail})"
					></div>
				</div>
				<div class="info">
					<div class="title">
						<h2 class="titleChi">${data.worksName}</h2>
						<span class="titleEng">${data.englishName}</span>
					</div>
					<div class="tourGuide">${data.tourGuide}</div>
				</div>
			</div>
	`;
	const hrefA = hrefEleFn(projectLink, html);
	return hrefA;
}
