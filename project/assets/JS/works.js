const Loading = document.getElementById('loader');
const content = document.getElementById('content');
function getData() {
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbwiBglFCi3-JUsQsOfVhjcGNZ7seFSwUpXdZ1owVksnQ22CvNpV92CXiCGsqBy6_hsp8A/exec';
	fetch(scriptURL, { method: 'GET' })
		.then((res) => {
			return res.text();
		})
		.then((result) => {
			createContent(JSON.parse(result).category, JSON.parse(result).data);
			Loading.classList.remove('ani');
			content.classList.add('ani');
		})
		.catch((err) => console.log('err', err));
}
getData();

function createContent(Category, Data) {
	console.log(Category);
	console.log(Data);

	const content = document.getElementById('content');

	Category.forEach((cat) => {
		let result = Data.filter((e) => e.category == cat);
		console.log(result);
		content.appendChild(createEleFn('div', cat, ['category']));
		result.forEach((e) => {
			content.appendChild(Card(e));
		});
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
	const projectLink = `./work.html#/work?ID=${data.ID}`;
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
