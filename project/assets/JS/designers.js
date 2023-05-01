const Loading = document.getElementById('loader');
const content = document.getElementById('content');
Loading.classList.add('ani');
var dataCategory = null;
var dataDesigner = null;

function getData() {
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbywgNzee6Qpo7TvAx_NMn5W4AGezo7d00VvCEEHGwL9v5FYn977BQeoB-hl2m_uXqBa3g/exec';
	fetch(scriptURL, { method: 'GET' })
		.then((res) => {
			return res.text();
		})
		.then((result) => {
			dataCategory = JSON.parse(result).category;
			dataDesigner = JSON.parse(result).data;
			dataDesigner.forEach((e) => {
				e.category = e.category.split(',');
			});
			createContent(dataCategory, dataDesigner);
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
		let result = Data.filter((e) => e.teamName == cat);
		console.log(result);
		content.append(category(result[0]));
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
	const element = document.createElement('div');
	element.classList.add('card');
	element.append(ImageContainerEleFn(data.thumbnail, ['changeTo75']));
	element.append(title(data));
	element.append(designerCat(data));
	element.append(createEleFn('div', data.mail, ['mail']));

	return element;
}
function category(data) {
	const element = document.createElement('div');
	element.classList.add('category');
	element.appendChild(createEleFn('div', data.teamName, ['chineseName']));
	element.appendChild(createEleFn('div', '', ['line']));
	element.appendChild(createEleFn('div', data.teamEngN, ['englishName']));
	return element;
}
function title(data) {
	const element = document.createElement('div');
	element.classList.add('title');
	element.appendChild(createEleFn('div', data.Name, ['titleChi']));
	element.appendChild(createEleFn('div', data.engName, ['titleEng']));
	return element;
}
function designerCat(data) {
	const element = document.createElement('div');
	element.classList.add('category');
	data.category.forEach((e) => {
		element.append(createEleFn('span', e, ['text']));
	});
	return element;
}
