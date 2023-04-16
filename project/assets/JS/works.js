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
		const li = createEleFn('li', hrefEleFn(e.worksName, e.ID), ['navItem']);
		const ul = createEleFn('ul', li, ['nav']);
		const content = document.getElementById('content');
		content.appendChild(ul);
	});
}

function createEleFn(ele, context, classNa) {
	const element = document.createElement(ele);
	if (classNa) classNa.forEach((name) => element.classList.add(name));
	console.log(typeof context);
	if (typeof context === 'object') element.appendChild(context);
	else element.innerHTML = context;
	return element;
}
function hrefEleFn(url, context) {
	const element = document.createElement('a');
	element.classList.add('link');
	element.href = `${url}`;
	element.innerHTML = context;
	return element;
}
