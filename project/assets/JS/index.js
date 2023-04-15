var leftAndRightDataBase;

sectionTextLength();
function sectionTextLength() {
	let section5Title = document.querySelectorAll('.section5 .title span');
	section5Title.forEach((e) => {
		e.parentNode.style.width = `${e.offsetWidth + 30}px`;
	});
}
section6Imgpos();
function section6Imgpos() {
	let section6Img = document.querySelectorAll('.section6 .box img');
	const shuffledNodeList = shuffleNodeList(section6Img);
	const shuffledArray = Array.from(shuffledNodeList);

	shuffledArray.forEach((e) => {
		e.style.scale = `${getRandomNumberInRange(0.7, 0.9, true)}`;
		if (getRandomNumberInRange(0, 10, false) < 4)
			e.style.opacity = `${getRandomNumberInRange(0, 0.3, true)}`;
		else e.style.opacity = `${getRandomNumberInRange(0.7, 1, true)}`;
	});

	let section6fake = document.querySelector('.section6 > .fake');
	document.querySelectorAll('.section6 .box img').forEach((e) => {
		section6fake.appendChild(e.cloneNode(true));
	});
}

// onclick Event

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
		let content = document.querySelector('.section2 .box .content');
		whiteBlock.style.width = `${round2((left / (left + right)) * 100)}%`;
		pinkBlock.style.width = `${round2((right / (left + right)) * 100)}%`;
		pinkBlock.innerText = `${Math.round((left / (left + right)) * 100)}%`;
		contentBtn.forEach((e) => {
			if (!e.classList.contains('active')) e.classList.add('active');
		});
		contentBtnAwait.classList.remove('active');
		content.innerHTML = `左右兩張作品皆為AI人工智能繪圖作品<br>Both works are AI artificial intelligence drawing works`;
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

const playContentBtn = document.querySelector('.section3 .part4 .enterBtn');
playContentBtn.addEventListener('click', playContentPostFn);
window.addEventListener('keydown', (evt) => {
	console.log(evt);
	if (evt.key === 'Enter') {
		playContentPostFn();
	}
});
function playContentPostFn() {
	const textBox = document.querySelector('.section3 .part4 input.textBox');
	const section4Content = document.querySelector('.section4 .content');
	if (textBox.value != '') {
		postPlayContent({ content: textBox.value });
		const action = [40, 70];
		let div = document.createElement('div');
		div.classList = 'text ani';
		div.innerHTML = textBox.value;
		div.style.animationDelay = `5s`;
		div.style.top = `${action[Math.floor(Math.random() * Math.floor(2))]}%`;
		div.style.scale = `${Math.random() * 0.2 + 0.8}`;
		div.style.animationDuration = `${Math.floor(Math.random() * 6) + 10}s`;
		section4Content.appendChild(div);
		textBox.value = '';
	}
}

// resize Event
window.addEventListener('resize', (e) => {
	const size = e.target.innerWidth;
	resizeSection3Part3(size);
	sectionTextLength();
});

// scroll Event
document.addEventListener('scroll', () => {
	const scroll = window.scrollY;

	section1Ani(window.innerWidth);
	section2Ani();
	section3Ani();
	section5Ani();
	section6Ani();
	section7Ani();
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
function getPlayContent() {
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbzKYAIAwk5vIJRI2qN_XZ5xO9VLYNX5lG8IzO2tyeBWYZVstzjLoZlgBKQqQIg-0gtzTQ/exec';
	fetch(scriptURL, { method: 'GET' })
		.then((res) => {
			return res.text();
		})
		.then((result) => {
			section4Action(JSON.parse(result).data.content);
		})
		.catch((err) => console.log('err', err));
}
getPlayContent();

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
function postPlayContent(data) {
	function getHTMLData() {
		let option = {
			sheetUrl: '1EqSAhJCpBriKPb1AcMqhP_7ugh4Nh5tJrcqUwdD9SjE',
			sheetTag: 'workinSheet',
			content: data.content,
		};
		return option;
	}
	const scriptURL =
		'https://script.google.com/macros/s/AKfycbyF-W-iH6RU9kUsDs-0QnqGcBthKlLBRthfSay6BmPEOc2c-W0qy_V452amWERttMu0_A/exec';
	$.post(scriptURL, getHTMLData(data), function (e) {
		console.log('post data msg', e);
	});
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

// resize ani
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

function section1Ani(wWidth) {
	const section1 = document.querySelector('.section1');
	const section1Position = section1.getBoundingClientRect();
	const section1Img1 = document.querySelector('.section1 .image.image01');
	const section1Img3 = document.querySelector('.section1 .image.image03');
	const section1Img2 = document.querySelector('.section1 .image.image02');
	const section1Img4 = document.querySelector('.section1 .image.image04');

	if (wWidth > 1024) {
		if (section1Position.top < wHeight * 1) {
			if (section1Position.top > 0) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 1,
					df: wHeight * 0,
					as: 50,
					af: 30,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 1,
					df: wHeight * 0,
					as: 0,
					af: 1,
				});
				section1Img1.style.bottom = `${result1}%`;
				section1Img1.style.opacity = `${result2}`;
			} else {
				section1Img1.style.bottom = `30%`;
				section1Img1.style.opacity = `1`;
			}
		} else {
			section1Img1.style.bottom = `50%`;
			section1Img1.style.opacity = `0`;
		}
		if (section1Position.top < wHeight * 0) {
			if (section1Position.top > -1.5 * wHeight) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0,
					df: wHeight * -1.5,
					as: -30,
					af: 3,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0,
					df: wHeight * -1.5,
					as: 0,
					af: 1,
				});
				section1Img3.style.bottom = `${result1}%`;
				section1Img3.style.opacity = `${result2}`;
			} else {
				section1Img3.style.bottom = `3%`;
				section1Img3.style.opacity = `1`;
			}
		} else {
			section1Img3.style.bottom = `-30%`;
			section1Img3.style.opacity = `0`;
		}
		if (section1Position.top < wHeight * 0.2) {
			if (section1Position.top > -0.8 * wHeight) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.2,
					df: wHeight * -0.8,
					as: 0,
					af: 14,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.2,
					df: wHeight * -0.8,
					as: 0,
					af: 1,
				});
				section1Img2.style.bottom = `${result1}%`;
				section1Img2.style.opacity = `${result2}`;
			} else {
				section1Img2.style.bottom = `14%`;
				section1Img2.style.opacity = `1`;
			}
		} else {
			section1Img2.style.bottom = `0%`;
			section1Img2.style.opacity = `0`;
		}
		if (section1Position.top < wHeight * 0.5) {
			if (section1Position.top > 0) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * 0,
					as: 0,
					af: 19,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * 0,
					as: 0,
					af: 1,
				});
				section1Img4.style.bottom = `${result1}%`;
				section1Img4.style.opacity = `${result2}`;
			} else {
				section1Img4.style.bottom = `19%`;
				section1Img4.style.opacity = `1`;
			}
		} else {
			section1Img4.style.bottom = `0%`;
			section1Img4.style.opacity = `0`;
		}
	} else if (wWidth >= 768) {
		if (section1Position.top < wHeight * 0.8) {
			if (section1Position.top > wHeight * 0.1) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.8,
					df: wHeight * 0.1,
					as: 60,
					af: 40,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.8,
					df: wHeight * 0.1,
					as: 0,
					af: 1,
				});
				section1Img1.style.bottom = `${result1}%`;
				section1Img1.style.opacity = `${result2}`;
			} else {
				section1Img1.style.bottom = `40%`;
				section1Img1.style.opacity = `1`;
			}
		} else {
			section1Img1.style.bottom = `60%`;
			section1Img1.style.opacity = `0`;
		}
		if (section1Position.top < wHeight * 0) {
			if (section1Position.top > -1 * wHeight * 0.5) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0,
					df: wHeight * -0.5,
					as: -30,
					af: 3,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0,
					df: wHeight * -0.5,
					as: 0,
					af: 1,
				});
				section1Img3.style.bottom = `${result1}%`;
				section1Img3.style.opacity = `${result2}`;
			} else {
				section1Img3.style.bottom = `3%`;
				section1Img3.style.opacity = `1`;
			}
		} else {
			section1Img3.style.bottom = `-30%`;
			section1Img3.style.opacity = `0`;
		}
		if (section1Position.top < wHeight * 0.5) {
			if (section1Position.top > -1 * wHeight * 0.2) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * -0.2,
					as: 0,
					af: 14,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * -0.2,
					as: 0,
					af: 1,
				});
				section1Img2.style.bottom = `${result1}%`;
				section1Img2.style.opacity = `${result2}`;
			} else {
				section1Img2.style.bottom = `14%`;
				section1Img2.style.opacity = `1`;
			}
		} else {
			section1Img2.style.bottom = `0%`;
			section1Img2.style.opacity = `0`;
		}
		if (section1Position.top < wHeight * 0.5) {
			if (section1Position.top > 0) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * 0,
					as: 13,
					af: 30,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * 0,
					as: 0,
					af: 1,
				});
				section1Img4.style.bottom = `${result1}%`;
				section1Img4.style.opacity = `${result2}`;
			} else {
				section1Img4.style.bottom = `30%`;
				section1Img4.style.opacity = `1`;
			}
		} else {
			section1Img4.style.bottom = `13%`;
			section1Img4.style.opacity = `0`;
		}
	} else {
		if (section1Position.top < wHeight * 0.8) {
			if (section1Position.top > wHeight * 0.1) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.8,
					df: wHeight * 0.1,
					as: 60,
					af: 40,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.8,
					df: wHeight * 0.1,
					as: 0,
					af: 1,
				});
				section1Img1.style.bottom = `${result1}%`;
				section1Img1.style.opacity = `${result2}`;
			} else {
				section1Img1.style.bottom = `40%`;
				section1Img1.style.opacity = `1`;
			}
		} else {
			section1Img1.style.bottom = `60%`;
			section1Img1.style.opacity = `0`;
		}
		if (section1Position.top < wHeight * 0) {
			if (section1Position.top > -1 * wHeight) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0,
					df: wHeight * -1,
					as: -20,
					af: 10,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0,
					df: wHeight * -1,
					as: 0,
					af: 1,
				});
				section1Img3.style.bottom = `${result1}%`;
				section1Img3.style.opacity = `${result2}`;
			} else {
				section1Img3.style.bottom = `10%`;
				section1Img3.style.opacity = `1`;
			}
		} else {
			section1Img3.style.bottom = `-20%`;
			section1Img3.style.opacity = `0`;
		}
		if (section1Position.top < wHeight * 0.5) {
			if (section1Position.top > -1 * wHeight * 0.2) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * -0.2,
					as: 2,
					af: 14,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * -0.2,
					as: 0,
					af: 1,
				});
				section1Img2.style.bottom = `${result1}%`;
				section1Img2.style.opacity = `${result2}`;
			} else {
				section1Img2.style.bottom = `14%`;
				section1Img2.style.opacity = `1`;
			}
		} else {
			section1Img2.style.bottom = `2%`;
			section1Img2.style.opacity = `0`;
		}
		if (section1Position.top < wHeight * 0.5) {
			if (section1Position.top > 0) {
				let result1 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * 0,
					as: 13,
					af: 30,
				});
				let result2 = lineAniFn({
					now: section1Position.top,
					ds: wHeight * 0.5,
					df: wHeight * 0,
					as: 0,
					af: 1,
				});
				section1Img4.style.bottom = `${result1}%`;
				section1Img4.style.opacity = `${result2}`;
			} else {
				section1Img4.style.bottom = `30%`;
				section1Img4.style.opacity = `1`;
			}
		} else {
			section1Img4.style.bottom = `13%`;
			section1Img4.style.opacity = `0`;
		}
	}
}
function section2Ani() {
	const section2 = document.querySelector('.section2');
	const section2Position = section2.getBoundingClientRect();
	const section2Box = section2.querySelector('.box');

	const section3 = document.querySelector('.section3 .part1');
	const section3Position = section3.getBoundingClientRect();

	if (section2Position.top < wHeight * 0.5) {
		if (section2Position.top > 0) {
			let result = easeInOutAniFn({
				now: section2Position.top,
				ds: wHeight * 0.5,
				df: wHeight * 0,
				as: 0,
				af: 1,
			});
			section2Box.style.opacity = `${result}`;
		} else {
			section2Box.style.opacity = `1`;
		}
	} else {
		section2Box.style.opacity = `0`;
	}
	if (section2Position.top < 0) {
		if (section3Position.top > wHeight) {
			section2Box.style.position = `fixed`;
			section2Box.style.top = `0`;
		} else {
			section2Box.style.position = `relative`;
			section2Box.style.top = `${wHeight * 0.7}px`;
		}
	} else {
		section2Box.style.position = `relative`;
		section2Box.style.top = `0px`;
	}
}
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
	const section3Part4Box = section3Part4.querySelector('.box');
	const section3Part4EnterBox = section3Part4.querySelector('.enterBox');
	const section3Part4Content = section3Part4.querySelector('.contentBox');

	const section4 = document.querySelector('.section4');
	const section4Position = section4.getBoundingClientRect();

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
		if (section3Part4Position.top < wHeight * 0.5) {
			section3Part3Box.style.position = `relative`;
			section3Part3Box.style.top = `${section3Part3.offsetHeight - wHeight}px`;
		} else {
			outAni(
				section3Part3Col,
				section3Part3.offsetHeight - wHeight,
				-section3Part3Position.top
			);
		}
	} else {
		section3Part3Box.style.position = `relative`;
		section3Part3Box.style.top = `auto`;
	}

	if (section3Part4Position.top < wHeight * 0.9) {
		if (section3Part4Position.top > wHeight * 0.65) {
			let result = easeInOutAniFn({
				now: section3Part4Position.top,
				ds: wHeight * 0.9,
				df: wHeight * 0.65,
				as: 1,
				af: 0,
			});
			section3Part3Content.style.opacity = `${result}`;
		} else {
			section3Part3Content.style.opacity = `0`;
		}
	} else {
		section3Part3Content.style.opacity = `1`;
	}
	if (section3Part4Position.top < wHeight * 0.2) {
		if (section3Part4Position.top > wHeight * -0.2) {
			let result = easeInOutAniFn({
				now: section3Part4Position.top,
				ds: wHeight * 0.2,
				df: wHeight * -0.2,
				as: 0,
				af: 1,
			});
			section3Part4EnterBox.style.opacity = `${result}`;
		} else {
			section3Part4EnterBox.style.opacity = `1`;
		}
	} else {
		section3Part4EnterBox.style.opacity = `0`;
	}
	if (section3Part4Position.top < wHeight * 0.1) {
		if (section3Part4Position.top > wHeight * -0.3) {
			let result1 = easeInOutAniFn({
				now: section3Part4Position.top,
				ds: wHeight * 0.1,
				df: wHeight * -0.3,
				as: 1,
				af: 0,
			});
			let result2 = easeInOutAniFn({
				now: section3Part4Position.top,
				ds: wHeight * 0.1,
				df: wHeight * -0.3,
				as: section3Part4Content.offsetHeight,
				af: 0,
			});
			section3Part4Content.style.scale = `${result1}`;
			section3Part4Content.style.opacity = `${result1}`;
			section3Part4Content.style.height = `${result2}px`;
		} else {
			section3Part4Content.style.scale = `0`;
			section3Part4Content.style.opacity = `0}`;
			section3Part4Content.style.height = `0`;
		}
	} else {
		section3Part4Content.style.scale = `1`;
		section3Part4Content.style.opacity = `1`;
		section3Part4Content.style.height = `auto`;
	}
	if (section3Part4Position.top < wHeight * 0.5) {
		if (section4Position.top < wHeight) {
			section3Part4Box.style.position = `relative`;
			section3Part4Box.style.bottom = `-${wHeight * 0.5}px`;
		} else {
			section3Part4Box.style.position = `fixed`;
			section3Part4Box.style.bottom = `0px`;
		}
	} else {
		section3Part4Box.style.position = `relative`;
		section3Part4Box.style.bottom = `${wHeight * 0.5}px`;
	}
}
var reload = true;
function outAni(obj, danst, now) {
	const count = obj.length;
	const smallUnit = danst / count;
	const persent = smallUnit / danst;
	const unit = Math.floor(now / smallUnit);
	if (reload) {
		obj.forEach((e) => (e.classList = `column`));
		obj[unit].classList = `column first`;
		if (count > unit + 1) obj[unit + 1].classList = `column second`;
		if (count > unit + 2) obj[unit + 2].classList = `column third`;
		if (count > unit + 3) obj[unit + 3].classList = `column`;
		reload = false;
	}
	if (now > persent * danst * unit) {
		if (now < persent * danst * (unit + 1)) {
			// Math.floor(now / smallUnit)
			if (now > persent * danst * (unit + 0.2)) {
				if (now < persent * danst * (unit + 0.5)) {
					if (unit % 2 === 0) {
						let result1 = lineAniFn({
							now: now,
							ds: persent * danst * (unit + 0.2),
							df: persent * danst * (unit + 0.5),
							as: 0,
							af: -90,
						});
						obj[unit].style.transform = `rotate(${result1}deg)`;
						obj[unit].style.transformOrigin = `-35% 150%`;
					} else {
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
				}
			} else {
				obj[unit].style.transform = `rotate(0deg)`;
				obj[unit].style.transformOrigin = `50% 50%`;
			}
			if (now > persent * danst * (unit + 0.35)) {
				if (now < persent * danst * (unit + 1)) {
					if (obj[unit].classList.contains('first')) {
						obj[unit].classList = `column`;
						if (count > unit + 1) obj[unit + 1].classList = `column first`;
						if (count > unit + 2) obj[unit + 2].classList = `column second`;
						if (count > unit + 3) obj[unit + 3].classList = `column third`;
					}
				}
			} else {
				if (!obj[unit].classList.contains('first')) {
					obj[unit].classList = `column first`;
					if (count > unit + 1) obj[unit + 1].classList = `column second`;
					if (count > unit + 2) obj[unit + 2].classList = `column third`;
					if (count > unit + 3) obj[unit + 3].classList = `column`;
				}
			}
		}
	}
}
function section4Action(data) {
	const section4Content = document.querySelector('.section4 .content');
	const action = [80, 10, 30, 90, 60, 20];

	data.forEach((e, key) => {
		let div = document.createElement('div');
		div.classList = 'text ani';
		div.innerHTML = e;
		div.style.animationDelay = `${key * 2}s`;
		div.style.top = `${action[key % 6]}%`;
		div.style.scale = `${Math.random() * 0.4 + 0.7}`;
		div.style.animationDuration = `${Math.floor(Math.random() * 6) + 10}s`;
		section4Content.appendChild(div);
	});
}
function section5Ani() {
	const section5 = document.querySelector('.section5');
	const section5Position = section5.getBoundingClientRect();
	const section5Box = section5.querySelector('.box');
	if (section5Position.top < wHeight * 0.2) {
		if (!section5Box.classList.contains('ani')) section5Box.classList.add('ani');
	} else {
		if (section5Box.classList.contains('ani')) section5Box.classList.remove('ani');
	}
}
function section6Ani() {
	const section6 = document.querySelector('.section6');
	const section6Position = section6.getBoundingClientRect();
	const section6Img = document.querySelectorAll('.section6 .box img');
	const section6FakeImg = document.querySelectorAll('.section6 .fake img');
	section6FakeImg.forEach((e, key) => {
		let ePosition = e.getBoundingClientRect();
		if (ePosition.top < wHeight) {
			if (ePosition.top > wHeight * 0.3) {
				let result1 = easeInOutAniFn({
					now: ePosition.top,
					ds: wHeight * 1,
					df: wHeight * 0.3,
					as: Number(e.style.top.match(/\d+/)[0]),
					af: Number(e.style.top.match(/\d+/)[0]) - 5,
				});
				section6Img[key].style.top = `${result1}%`;
				if (Number(e.style.opacity) > 0.5) {
					let result2 = easeInOutAniFn({
						now: ePosition.top,
						ds: wHeight * 1,
						df: wHeight * 0.3,
						as: Number(e.style.opacity),
						af: 0.1,
					});
					section6Img[key].style.opacity = `${result2}`;
				} else {
					let result2 = easeInOutAniFn({
						now: ePosition.top,
						ds: wHeight * 1,
						df: wHeight * 0.3,
						as: Number(e.style.opacity),
						af: 1,
					});
					section6Img[key].style.opacity = `${result2}`;
				}
			} else {
				section6Img[key].style.top = `${Number(e.style.top.match(/\d+/)[0]) - 5}%`;
				if (e.style.opacity > 0.5) {
					section6Img[key].style.opacity = `.1`;
				} else {
					section6Img[key].style.opacity = `1`;
				}
			}
		} else {
			section6Img[key].style.top = `${Number(e.style.top.match(/\d+/)[0])}%`;
			section6Img[key].style.opacity = `${e.style.opacity}`;
		}
	});
}
function section7Ani() {
	const section7 = document.querySelector('.section7');
	const section7Position = section7.getBoundingClientRect();
	const section7Box = section7.querySelector('.box');
	if (section7Position.top < wHeight) {
		if (!section7Box.classList.contains('ani')) section7Box.classList.add('ani');
	} else {
		if (section7Box.classList.contains('ani')) section7Box.classList.remove('ani');
	}
}
section1Ani(wWidth);
section2Ani();
section3Ani();
section5Ani();
section6Ani();
section7Ani();
