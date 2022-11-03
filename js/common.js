// GrobalVariables
let   fontSize 			= 150;
let   fontRotate 		= 0;
let   fontSpacing 		= 10;
let   cropAspectRatio 	= 16 / 9;
let   angle 			= 0.0;
let   bFilter 			= false;
let   bOutlineFont 		= false;

// Effects GrobalVariables
let   Brightness 	= 100;
let   Blur 			= 0;
let   Contrast 		= 100;
let   GrayScale 	= 0;
let   Sepia 		= 0;
let   Opacity 		= 1.0;

const initWidth = window.innerWidth;
const initHeight = window.innerHeight;

// イベントリスナー/////////////////////////////////////////////////////////////////
// window.onload = function() {
// 	getViewportSizeAndAdjust();
// }

// window load
window.addEventListener('load', (e) => {
getViewportSizeAndAdjust();
});

// window Reload
let btnReload = document.getElementById('Reload');
btnReload.addEventListener('click', function(){
	location.reload();
});

// outlineOnOff
let outlineFont = document.getElementById('outlineFont');
outlineFont.addEventListener('change', function(){
	bOutlineFont = outlineFont.checked;
});

// FontSize
let inputFontSize = document.getElementById('inputFontSize');
inputFontSize.addEventListener('change', function(){
	fontSize = inputFontSize.value;
});

// FontSpacing
let inputFontSpacing = document.getElementById('inputFontSpacing');
inputFontSpacing.addEventListener('change', function(){
	fontSpacing = inputFontSpacing.value;
});

// FontRotate
let inputFontRotate = document.getElementById('inputFontRotate');
inputFontRotate.addEventListener('change', function(){
	fontRotate = inputFontRotate.value;
});

// AspectRatioCheck
let btnAspectRatio = document.getElementById('aspectRatio');
btnAspectRatio.addEventListener('click', OnAspectButton);

// Download
let btnDownload = document.getElementById('Download');
btnDownload.addEventListener('click', OnDownloadButton);

// Brightness
let inputBrightness = document.getElementById('inputBrightness');
inputBrightness.addEventListener('change', function(){
	Brightness = inputBrightness.value;
});

// Blur
let inputBlur = document.getElementById('inputBlur');
inputBlur.addEventListener('change', function(){
	Blur = inputBlur.value;
});

// Contrast
let inputContrast = document.getElementById('inputContrast');
inputContrast.addEventListener('change', function(){
	Contrast = inputContrast.value;
});

// GrayScale
let inputGrayScale = document.getElementById('inputGrayScale');
inputGrayScale.addEventListener('change', function(){
	GrayScale = inputGrayScale.value;
});

// Sepia
let inputSepia = document.getElementById('inputSepia');
inputSepia.addEventListener('change', function(){
	Sepia = inputSepia.value;
});

// Opacity
let inputOpacity = document.getElementById('inputOpacity');
inputOpacity.addEventListener('change', function(){
	Opacity = inputOpacity.value;
});

// ResetParams
let btnResetParam = document.getElementById('ResetParam');
btnResetParam.addEventListener('click', function(){
	Brightness 	= 100;
	Blur 		= 0;
	Contrast 	= 100;
	GrayScale 	= 0;
	Sepia 		= 0;
	Opacity 	= 1.0;
	inputBrightness.value = Brightness;
	inputBlur.value = Blur;
	inputContrast.value = Contrast;
	inputGrayScale.value = GrayScale;
	inputSepia.value = Sepia;
	inputOpacity.value = Opacity;
});


// 関数/////////////////////////////////////////////////////////////////

// OnbtnAspectRatio
function OnAspectButton(){
	let radioList = document.getElementsByName("AspectRatio");
	let str = "";
	for(var i=0; i<radioList.length; i++){
		if (radioList[i].checked) {
		str = radioList[i].value;
		break;
		}
	}
	cropAspectRatio = parseFloat(str);

	const canvas = document.getElementById("sourceCanvas");
	initResultSetting(canvas);
}

// OnbtnDownload
function OnDownloadButton(){
	if (cropper != null){
		// ConvertPngImage
		let output = document.getElementById("output");
		const croppedCanvas = document.getElementById("croppedCanvas");
		output.src = croppedCanvas.toDataURL();
		output.style.display = "block"; //visible

		// NoneDummyCanvas
		croppedCanvas.style.display = "none";
		cropper.reset();
		croppedCanvas.remove();

		downloadFromUrlAutomatically(output.src, 'img.png');
	}
	else{
		alert('画像を読み込んでください。');
	}
}

// mobile editor adjust
function getViewportSizeAndAdjust() {
	const w = initWidth;
	if (w < 768){
		document.getElementById("ImageFilter").classList.remove("col-2");
		document.getElementById("sourceImage").classList.remove("col-2");
		document.getElementById("TitleEdit").classList.remove("col-3");
		document.getElementById("FontEdit").classList.remove("col-4");
		document.getElementById("PhotoEdit").classList.remove("col-5");
		document.getElementById("TitleEdit").classList.add("row-cols-1");
		document.getElementById("FontEdit").classList.add("row-cols-1");
		document.getElementById("PhotoEdit").classList.add("row-cols-1");

		document.getElementById("sourceImage").classList.add("col-4");
	}

	if (w < 400){
		document.getElementById("EditView").classList.remove("row-cols-2");
		// document.getElementById("ControlView").classList.remove("row-cols-2");
		document.getElementById("sourceImage").classList.remove("col-2");
		document.getElementById("sourceImage").classList.remove("col-4");
		document.getElementById("croppedImage").classList.remove("col-8");
		document.getElementById("ImageFilter").classList.remove("col-2");

		document.getElementById("EditView").classList.add("row-cols-1");
		// document.getElementById("ControlView").classList.add("row-cols-1");
		document.getElementById("ImageFilter").classList.add("row-cols-1");
	}
	else{
		document.getElementById("EditView").classList.remove("row-cols-1");
		// document.getElementById("ControlView").classList.remove("row-cols-1");

		document.getElementById("EditView").classList.add("row-cols-2");
		// document.getElementById("ControlView").classList.add("row-cols-2");
	}
}

const btn = document.querySelector('.btn-menu');
const nav = document.querySelector('nav');

btn.addEventListener('click', () => {
  nav.classList.toggle('open-menu')
  // if (btn.innerHTML === 'メニュー') {
  //   btn.innerHTML = '閉じる';
  // } else {
  //   btn.innerHTML = 'メニュー';
  // }
  // ↑ これと同じ意味の三項演算子での書き方 ↓
  btn.innerHTML = btn.innerHTML === 'Menu'
    ? '×'
    : 'Menu'
});

/** URLから自動DLさせる関数 */
function downloadFromUrlAutomatically(url, fileName){
var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = 'blob';
xhr.onload = function(e){
	if(this.status == 200){
	var urlUtil = window.URL || window.webkitURL;
	var imgUrl = urlUtil.createObjectURL(this.response);
	var link = document.createElement('a');
	link.href=imgUrl;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link)
	}
};
xhr.send();
}

