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

let   shapeColor 		= "#0068b7";
let   shapeOpacity		= 0.6;
let   shapeSize 		= 420;
let   shapeRotate 		= 0;
let   shapeLineWidth 	= 10;
let   shapeSectorAngle	= 30;
let   shapeVertexSize	= 3;
let   shapeLocateX       = 0;
let   shapeLocateY       = 0;

const initWidth = window.innerWidth;
const initHeight = window.innerHeight;

// イベントリスナー/////////////////////////////////////////////////////////////////

// window load
window.addEventListener('load', (e) => {
getViewportSizeAndAdjust();
});

// window Reload
let btnReload = document.getElementById('Reload');
btnReload.addEventListener('click', function(){
	location.reload();
});

// BoldOnOff
let boldFont = document.getElementById('fontBold');
boldFont.addEventListener('change', function(){
	fontBold = (boldFont.checked) ? 'bold' : '';
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// ItalicOnOff
let ItalicFont = document.getElementById('fontItalic');
ItalicFont.addEventListener('change', function(){
	fontItalic = (ItalicFont.checked) ? 'italic' : '';

	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// outlineOnOff
let outlineFont = document.getElementById('outlineFont');
outlineFont.addEventListener('change', function(){
	boutlineFont = outlineFont.checked;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// EmphasisOnOff
let emphasisFont = document.getElementById('emphasisFont');
emphasisFont.addEventListener('change', function(){
	bemphasisFont = emphasisFont.checked;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontSize
let inputFontSize = document.getElementById('inputFontSize');
inputFontSize.addEventListener('change', function(){
	fontSize = inputFontSize.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontSpacing
let inputFontSpacing = document.getElementById('inputFontSpacing');
inputFontSpacing.addEventListener('change', function(){
	fontSpacing = inputFontSpacing.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontRotate
let inputFontRotate = document.getElementById('inputFontRotate');
inputFontRotate.addEventListener('change', function(){
	fontRotate = inputFontRotate.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontColor
let inputFontColor = document.getElementById('inputFontColor');
inputFontColor.addEventListener('change', function(){
	fontColor = inputFontColor.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontStyle
var selectFontStyle = document.getElementById('fontStyle');
selectFontStyle.addEventListener('change', function(){
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontLineWidth
let inputFontLineWidth = document.getElementById('inputFontLineWidth');
inputFontLineWidth.addEventListener('change', function(){
	fontLineWidth = inputFontLineWidth.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontLocateX
let inputFontLocateX = document.getElementById('inputFontLocateX');
inputFontLocateX.addEventListener('change', function(){
	fontLocateX = inputFontLocateX.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontLocateY
let inputFontLocateY = document.getElementById('inputFontLocateY');
inputFontLocateY.addEventListener('change', function(){
	fontLocateY = inputFontLocateY.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// DrawShapeOnOff
let drawShape = document.getElementById('drawShape');
drawShape.addEventListener('change', function(){
	bShape = drawShape.checked;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});


// DrawShapeFillOnOff
let drawShapeFill = document.getElementById('drawShapeFill');
drawShapeFill.addEventListener('change', function(){
	bShapeFill = drawShapeFill.checked;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// ShapeColor
let inputShapeColor = document.getElementById('inputShapeColor');
inputShapeColor.addEventListener('change', function(){
	shapeColor = inputShapeColor.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// ShapeOpacity
let inputShapeOpacity = document.getElementById('inputShapeOpacity');
inputShapeOpacity.addEventListener('change', function(){
	shapeOpacity = inputShapeOpacity.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// ShapeSize
let inputShapeSize = document.getElementById('inputShapeSize');
inputShapeSize.addEventListener('change', function(){
	shapeSize = inputShapeSize.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// ShapeLineWidth
let inputShapeLineWidth = document.getElementById('inputShapeLineWidth');
inputShapeLineWidth.addEventListener('change', function(){
	shapeLineWidth = inputShapeLineWidth.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// ShapeVertexSize
let inputShapeVertexSize = document.getElementById('inputVertexSize');
inputShapeVertexSize.addEventListener('change', function(){
	shapeVertexSize = inputShapeVertexSize.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// ShapeSectorAngle
let inputSectorAngle = document.getElementById('inputSectorAngle');
inputSectorAngle.addEventListener('change', function(){
	shapeSectorAngle = inputSectorAngle.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontLocateX
let inputShapeLocateX = document.getElementById('inputShapeLocateX');
inputShapeLocateX.addEventListener('change', function(){
	shapeLocateX = inputShapeLocateX.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontLocateY
let inputShapeLocateY = document.getElementById('inputShapeLocateY');
inputShapeLocateY.addEventListener('change', function(){
	shapeLocateY = inputShapeLocateY.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontRotate
let inputShapeRotate = document.getElementById('inputShapeRotate');
inputShapeRotate.addEventListener('change', function(){
	shapeRotate = inputShapeRotate.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// FontStyle
var selectShapeType = document.getElementById('shapeType');
selectShapeType.addEventListener('change', function(){
	initResultSetting(document.getElementById("sourceCanvas"), false);
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
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// Blur
let inputBlur = document.getElementById('inputBlur');
inputBlur.addEventListener('change', function(){
	Blur = inputBlur.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// Contrast
let inputContrast = document.getElementById('inputContrast');
inputContrast.addEventListener('change', function(){
	Contrast = inputContrast.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// GrayScale
let inputGrayScale = document.getElementById('inputGrayScale');
inputGrayScale.addEventListener('change', function(){
	GrayScale = inputGrayScale.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// Hue
let inputHue = document.getElementById('inputHue');
inputHue.addEventListener('change', function(){
	Hue = inputHue.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// Sepia
let inputSepia = document.getElementById('inputSepia');
inputSepia.addEventListener('change', function(){
	Sepia = inputSepia.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// Opacity
let inputOpacity = document.getElementById('inputOpacity');
inputOpacity.addEventListener('change', function(){
	Opacity = inputOpacity.value;
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// ResetParams
let btnResetParam = document.getElementById('ResetParam');
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
	initResultSetting(document.getElementById("sourceCanvas"), false);
});

// fullScreen
let fullScreen = document.getElementById('fullScreen');
fullScreen.addEventListener ('click', function(){     
    let main = document.getElementById('main');
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

	const canvas = document.getElementById("sourceCanvas");
	initResultSetting(canvas, false);
}


// OnbtnDownload
function OnDownloadButton(){
	if (cropper != null){
		// ConvertPngImage
		let output = document.getElementById("output");
		const croppedCanvas = document.getElementById("croppedCanvas");
		output.src = croppedCanvas.toDataURL();
		output.style.display = "block"; //visible

		let el = document.getElementById('indicator');
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
		document.getElementById("ImageFilter").classList.remove("col-3");
		document.getElementById("sourceImage").classList.remove("col-2");
		document.getElementById("TitleEdit").classList.remove("col-3");
		document.getElementById("FontEdit").classList.remove("col-4");
		document.getElementById("ShapeEdit").classList.remove("col-5");
		document.getElementById("TitleEdit").classList.add("row-cols-1");
		document.getElementById("FontEdit").classList.add("row-cols-1");
		document.getElementById("ShapeEdit").classList.add("row-cols-1");

		document.getElementById("sourceImage").classList.add("col-4");
	}

	if (initWidth < 400){
		document.getElementById("EditView").classList.remove("row-cols-2");
		document.getElementById("sourceImage").classList.remove("col-3");
		document.getElementById("sourceImage").classList.remove("col-4");
		document.getElementById("croppedImage").classList.remove("col-7");
		document.getElementById("ImageFilter").classList.remove("col-3");
		document.getElementById("EditView").classList.add("row-cols-1");
		document.getElementById("ImageFilter").classList.add("row-cols-1");
	}
	else{
		document.getElementById("EditView").classList.remove("row-cols-1");
		document.getElementById("EditView").classList.add("row-cols-2");
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

