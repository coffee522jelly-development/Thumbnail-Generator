// canvas
let   cropAspectRatio 	= 16 / 9;

// fonts
let   boutlineFont 		= false;
let   bemphasisFont 	= false;

let   fontBold 	        = '';
let   fontItalic 	    = '';
let   fontSize 			= 150;
let   fontRotate 		= 0;
let   fontSpacing 		= 10;
let   fontColor         = "#ffffff";
let   fontBackColor     = "#0068b7";
let   fontLineWidth 	= 10;
let   fontLocateX       = 0;
let   fontLocateY       = 0;

// ImageFilterEffects
let   bFilter 		= false;

let   Brightness 	= 100;
let   Blur 			= 0;
let   Contrast 		= 100;
let   GrayScale 	= 0;
let   Hue			= 0;
let   Sepia 		= 0;
let   Opacity 		= 1.0;

// ShaperEffects
let   bShape 			= false;	
let   bShapeFill 		= false;
let   bShapeDash 		= false;

let   shapeColor 		= "#aaaaaa";
let   shapeOpacity		= 0.6;
let   shapeSize 		= 420;
let   shapeRotate 		= 0;
let   shapeLineWidth 	= 10;
let   shapeVertexSize	= 3;
let   shapeSectorAngle	= 30;
let   shapeDashInterval	= 10;
let   shapeLocateX      = 0;
let   shapeLocateY      = 0;

const initWidth = window.innerWidth;
const initHeight = window.innerHeight;

// イベントリスナー/////////////////////////////////////////////////////////////////

// window load
window.addEventListener('load', (e) => {
getViewportSizeAndAdjust();
// init();
});

// window Reload
let btnReload = document.querySelector('#Reload');
btnReload.addEventListener('click', function(){
	location.reload();
});

// BoldOnOff
let boldFont = document.querySelector('#fontBold');
boldFont.addEventListener('change', function(){
	fontBold = (boldFont.checked) ? 'bold' : '';
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// ItalicOnOff
let ItalicFont = document.querySelector('#fontItalic');
ItalicFont.addEventListener('change', function(){
	fontItalic = (ItalicFont.checked) ? 'italic' : '';

	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// outlineOnOff
let outlineFont = document.querySelector('#outlineFont');
outlineFont.addEventListener('change', function(){
	boutlineFont = outlineFont.checked;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// EmphasisOnOff
let emphasisFont = document.querySelector('#emphasisFont');
emphasisFont.addEventListener('change', function(){
	bemphasisFont = emphasisFont.checked;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontSize
let inputFontSize = document.querySelector('#inputFontSize');
inputFontSize.addEventListener('change', function(){
	fontSize = inputFontSize.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontSpacing
let inputFontSpacing = document.querySelector('#inputFontSpacing');
inputFontSpacing.addEventListener('change', function(){
	fontSpacing = inputFontSpacing.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontRotate
let inputFontRotate = document.querySelector('#inputFontRotate');
inputFontRotate.addEventListener('change', function(){
	fontRotate = inputFontRotate.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontColor
let inputFontColor = document.querySelector('#inputFontColor');
inputFontColor.addEventListener('change', function(){
	fontColor = inputFontColor.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontBackColor
let inputFontBackColor = document.querySelector('#inputFontBackColor');
inputFontBackColor.addEventListener('change', function(){
	fontBackColor = inputFontBackColor.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontStyle
var selectFontStyle = document.querySelector('#fontStyle');
selectFontStyle.addEventListener('change', function(){
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontLineWidth
let inputFontLineWidth = document.querySelector('#inputFontLineWidth');
inputFontLineWidth.addEventListener('change', function(){
	fontLineWidth = inputFontLineWidth.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontLocateX
let inputFontLocateX = document.querySelector('#inputFontLocateX');
inputFontLocateX.addEventListener('change', function(){
	fontLocateX = inputFontLocateX.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontLocateY
let inputFontLocateY = document.querySelector('#inputFontLocateY');
inputFontLocateY.addEventListener('change', function(){
	fontLocateY = inputFontLocateY.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// DrawShapeOnOff
let drawShape = document.querySelector('#drawShape');
drawShape.addEventListener('change', function(){
	bShape = drawShape.checked;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});


// DrawShapeFillOnOff
let drawShapeFill = document.querySelector('#drawShapeFill');
drawShapeFill.addEventListener('change', function(){
	bShapeFill = drawShapeFill.checked;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// DrawShapeDashOnOff
let drawShapeDash = document.querySelector('#drawShapeDash');
drawShapeDash.addEventListener('change', function(){
	bShapeDash = drawShapeDash.checked;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// ShapeColor
let inputShapeColor = document.querySelector('#inputShapeColor');
inputShapeColor.addEventListener('change', function(){
	shapeColor = inputShapeColor.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// ShapeOpacity
let inputShapeOpacity = document.querySelector('#inputShapeOpacity');
inputShapeOpacity.addEventListener('change', function(){
	shapeOpacity = inputShapeOpacity.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// ShapeSize
let inputShapeSize = document.querySelector('#inputShapeSize');
inputShapeSize.addEventListener('change', function(){
	shapeSize = inputShapeSize.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// ShapeLineWidth
let inputShapeLineWidth = document.querySelector('#inputShapeLineWidth');
inputShapeLineWidth.addEventListener('change', function(){
	shapeLineWidth = inputShapeLineWidth.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// ShapeVertexSize
let inputShapeVertexSize = document.querySelector('#inputVertexSize');
inputShapeVertexSize.addEventListener('change', function(){
	shapeVertexSize = inputShapeVertexSize.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// ShapeSectorAngle
let inputSectorAngle = document.querySelector('#inputSectorAngle');
inputSectorAngle.addEventListener('change', function(){
	shapeSectorAngle = inputSectorAngle.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// ShapeDashInterval
let inputShapeDash = document.querySelector('#inputShapeDash');
inputShapeDash.addEventListener('change', function(){
	shapeDashInterval = inputShapeDash.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontLocateX
let inputShapeLocateX = document.querySelector('#inputShapeLocateX');
inputShapeLocateX.addEventListener('change', function(){
	shapeLocateX = inputShapeLocateX.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontLocateY
let inputShapeLocateY = document.querySelector('#inputShapeLocateY');
inputShapeLocateY.addEventListener('change', function(){
	shapeLocateY = inputShapeLocateY.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontRotate
let inputShapeRotate = document.querySelector('#inputShapeRotate');
inputShapeRotate.addEventListener('change', function(){
	shapeRotate = inputShapeRotate.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// FontStyle
var selectShapeType = document.querySelector('#shapeType');
selectShapeType.addEventListener('change', function(){
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// AspectRatioCheck
let btnAspectRatio = document.querySelector('#aspectRatio');
btnAspectRatio.addEventListener('click', OnAspectButton);

// Download
let btnDownload = document.querySelector('#Download');
btnDownload.addEventListener('click', OnDownloadButton);

// Brightness
let inputBrightness = document.querySelector('#inputBrightness');
inputBrightness.addEventListener('change', function(){
	Brightness = inputBrightness.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// Blur
let inputBlur = document.querySelector('#inputBlur');
inputBlur.addEventListener('change', function(){
	Blur = inputBlur.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// Contrast
let inputContrast = document.querySelector('#inputContrast');
inputContrast.addEventListener('change', function(){
	Contrast = inputContrast.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// GrayScale
let inputGrayScale = document.querySelector('#inputGrayScale');
inputGrayScale.addEventListener('change', function(){
	GrayScale = inputGrayScale.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// Hue
let inputHue = document.querySelector('#inputHue');
inputHue.addEventListener('change', function(){
	Hue = inputHue.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// Sepia
let inputSepia = document.querySelector('#inputSepia');
inputSepia.addEventListener('change', function(){
	Sepia = inputSepia.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// Opacity
let inputOpacity = document.querySelector('#inputOpacity');
inputOpacity.addEventListener('change', function(){
	Opacity = inputOpacity.value;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// ResetParams
let btnResetParam = document.querySelector('#ResetParam');
btnResetParam.addEventListener('click', function(){
	Brightness 	= 100;
	Blur 		= 0;
	Contrast 	= 100;
	GrayScale 	= 0;
	Hue	 		= 0;
	Sepia 		= 0;
	Opacity 	= 1.0;

	inputBrightness.value = Brightness;
	inputBlur.value = Blur;
	inputContrast.value = Contrast;
	inputGrayScale.value = GrayScale;
	inputHue.value = Hue;
	inputSepia.value = Sepia;
	inputOpacity.value = Opacity;
	initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// fullScreen
let fullScreen = document.querySelector('#fullScreen');
fullScreen.addEventListener ('click', function(){     
    let main = document.querySelector('#main');
	main.requestFullscreen();
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

	const canvas = document.querySelector("#sourceCanvas");
	initResultSetting(canvas, false);
}


// OnbtnDownload
function OnDownloadButton(){
	if (cropper != null){
		// ConvertPngImage
		let output = document.querySelector("#output");
		const croppedCanvas = document.querySelector("#croppedCanvas");
		output.src = croppedCanvas.toDataURL();
		output.style.display = "block"; //visible

		let el = document.querySelector('#indicator');
		el.innerHTML = '<p>Embed image-size('+ String(croppedCanvas.width) +'×'+ String(croppedCanvas.height) +')</p>';

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
	if (initWidth < 768){
		document.querySelector("#ImageFilter").classList.remove("col-3");
		document.querySelector("#sourceImage").classList.remove("col-2");
		document.querySelector("#TitleEdit").classList.remove("col-3");
		document.querySelector("#FontEdit").classList.remove("col-4");
		document.querySelector("#ShapeEdit").classList.remove("col-5");
		document.querySelector("#TitleEdit").classList.add("row-cols-1");
		document.querySelector("#FontEdit").classList.add("row-cols-1");
		document.querySelector("#ShapeEdit").classList.add("row-cols-1");

		document.querySelector("#sourceImage").classList.add("col-4");
	}

	if (initWidth < 400){
		const element = document.querySelector('#ImageFilter');
		element.remove();

		const elem = document.querySelector('#ShapeEdit');
		elem.remove();

		document.querySelector("#EditView").classList.remove("row-cols-2");
		document.querySelector("#sourceImage").classList.remove("col-3");
		document.querySelector("#sourceImage").classList.remove("col-4");
		document.querySelector("#croppedImage").classList.remove("col-7");
		document.querySelector("#EditView").classList.add("row-cols-1");
	}
	else{
		document.querySelector("#EditView").classList.remove("row-cols-1");
		document.querySelector("#EditView").classList.add("row-cols-2");
	}
}


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
		document.body.removeChild(link);
		}
	};
	xhr.send();
}

