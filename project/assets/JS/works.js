function getData() {
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbwiBglFCi3-JUsQsOfVhjcGNZ7seFSwUpXdZ1owVksnQ22CvNpV92CXiCGsqBy6_hsp8A/exec';
	fetch(scriptURL, { method: 'GET' })
		.then((res) => {
			return res.text();
		})
		.then((result) => {
			createContent(JSON.parse(result).data);
		})
		.catch((err) => console.log('err', err));
}
getData();

function createContent(Data) {
	console.log(Data);
	Data.forEach((e) => {
		createEleFn('div', e.ID);
	});
}

function createEleFn(ele, child) {
	const content = document.getElementById('content');
	const div = document.createElement(ele);
	div.innerHTML = child;
	content.appendChild(div);
}
