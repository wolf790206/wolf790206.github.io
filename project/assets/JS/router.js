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
	var element = document.createElement('div');
	element.innerHTML = `<h1>works Page</h1><p>Welcome ${ID} !</p>`;
	return element;
}
