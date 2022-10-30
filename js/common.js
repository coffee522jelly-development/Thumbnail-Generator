// GrobalVariables
let   fontSize = 200;
let   cropAspectRatio = 16.0 / 9.0;
let   angle = 0.0;

// effect variables
let   Brightness = 100;
let   Blur = 0;
let   Contrast = 100;
let   GrayScale = 0;
let   Sepia = 0;
let   Opacity = 1.0;


const initWidth = window.innerWidth;
const initHeight = window.innerHeight;

// イベントリスナー/////////////////////////////////////////////////////////////////

window.onload = function() {
	getViewportSizeAndAdjust();
}

// window load
window.addEventListener('load', (e) => {
getViewportSizeAndAdjust();
});

// window Reload
let btnReload = document.getElementById('Reload');
btnReload.addEventListener('click', function(){
	location.reload();});

// FontSize
let inputFontSize = document.getElementById('inputFontSize');
inputFontSize.addEventListener('change', function(){
	fontSize = inputFontSize.value;
});

// AspectRatioCheck
let btnAspectRatio = document.getElementById('aspectRatio');
btnAspectRatio.addEventListener('click', OnAspectButton);

// Clear
let btnClear = document.getElementById('Clear');
btnClear.addEventListener('click',  function(){
	if (cropper != null){
		cropper.clear();
	}
	else{
		alert('画像を読み込んでください。');
	}
});

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

	if (cropper != null){
		cropper.initialAspectRatio = cropAspectRatio;
		cropper.aspectRatio = cropAspectRatio;
		cropper.canvasData.width = cropper.canvasData.height * cropAspectRatio;
		cropper.cropBoxData.width = cropper.cropBoxData.height * cropAspectRatio;
		cropper.setCropBoxData(cropper.cropBoxData);
	}
	else{
		alert('画像を読み込んでください。');
	}
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

		alert('変換に成功しました。右クリックで保存できます。');
	}
	else{
		alert('画像を読み込んでください。');
	}
}

// mobile editor adjust
function getViewportSizeAndAdjust() {
	const w = initWidth;
	if (w < 414){
		document.getElementById("EditView").classList.remove("row-cols-2");
		document.getElementById("ControlView").classList.remove("row-cols-2");

		document.getElementById("EditView").classList.add("row-cols-1");
		document.getElementById("ControlView").classList.add("row-cols-1");
	}
	else{
		document.getElementById("EditView").classList.remove("row-cols-1");
		document.getElementById("ControlView").classList.remove("row-cols-1");

		document.getElementById("EditView").classList.add("row-cols-2");
		document.getElementById("ControlView").classList.add("row-cols-2");
	}
}

