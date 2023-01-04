// Canvas
let   cropAspectRatio 	= 16 / 9;

// Fonts
let   fontSize 			= 20;
let   fontRotate 		= 0;
let   fontSpacing 		= 10;
let   fontColor         = "#ffffff";
let   fontBackColor     = "#6fbb8d";
let   fontLineWidth 	= 10;
let   fontLocateX       = 0;
let   fontLocateY       = 0;

// ImageFilterEffects
let   bFilter 			= false;
let   Brightness 		= 100;
let   Blur 				= 0;
let   Contrast 			= 100;
let   GrayScale 		= 0;
let   Hue				= 0;
let   Invert 			= 0;
let   Saturate 			= 100;
let   Sepia 			= 0;
let   Opacity 			= 1.0;

// ShapeEffects
let   shapeColor 		= "#6fbb8d";
let   shapeSubColor 	= "#ffffff";
let   shapeOpacity		= 1.0;
let   shapeSize 		= 100;
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

// Window load
window.addEventListener('load', (e) => {

	getViewportSizeAndAdjust();
	updateFontCheckState();
	updateShapeCheckState();
	updateIndiXY();

	// Window Reload
	let btnReload = document.querySelector('#Reload');
	btnReload.addEventListener('click', (e) => {
		location.reload();
	});


	// FontSize
	let inputFontSize = document.querySelector('#inputFontSize');
	inputFontSize.addEventListener('change', (e) => {
		fontSize = inputFontSize.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// FontSpacing
	let inputFontSpacing = document.querySelector('#inputFontSpacing');
	inputFontSpacing.addEventListener('change', (e) => {
		fontSpacing = inputFontSpacing.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// FontRotate
	let inputFontRotate = document.querySelector('#inputFontRotate');
	inputFontRotate.addEventListener('change', (e) => {
		fontRotate = inputFontRotate.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// FontColor
	let inputFontColor = document.querySelector('#inputFontColor');
	inputFontColor.addEventListener('change', (e) => {
		fontColor = inputFontColor.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// FontBackColor
	let inputFontBackColor = document.querySelector('#inputFontBackColor');
	inputFontBackColor.addEventListener('change', (e) => {
		fontBackColor = inputFontBackColor.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// FontStyle
	let selectFontStyle = document.querySelector('#fontStyle');
	selectFontStyle.addEventListener('change', (e) => {
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// FontLineWidth
	let inputFontLineWidth = document.querySelector('#inputFontLineWidth');
	inputFontLineWidth.addEventListener('change', (e) => {
		fontLineWidth = inputFontLineWidth.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// FontLocateX
	let inputFontLocateX = document.querySelector('#inputFontLocateX');
	inputFontLocateX.addEventListener('change', (e) => {
		fontLocateX = inputFontLocateX.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
		updateIndiXY();
	});


	// FontLocateY
	let inputFontLocateY = document.querySelector('#inputFontLocateY');
	inputFontLocateY.addEventListener('change', (e) => {
		fontLocateY = inputFontLocateY.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
		updateIndiXY();
	});


	// ShapeType
	let selectShapeType = document.querySelector('#shapeType');
	selectShapeType.addEventListener('change', (e) => {
		updateShapeCheckState();
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// ShapeColor
	let inputShapeColor = document.querySelector('#inputShapeColor');
	inputShapeColor.addEventListener('change', (e) => {
		shapeColor = inputShapeColor.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// ShapeSubColor
	let inputShapeSubColor = document.querySelector('#inputShapeSubColor');
	inputShapeSubColor.addEventListener('change', (e) => {
		shapeSubColor = inputShapeSubColor.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// ShapeOpacity
	let inputShapeOpacity = document.querySelector('#inputShapeOpacity');
	inputShapeOpacity.addEventListener('change', (e) => {
		shapeOpacity = inputShapeOpacity.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// ShapeSize
	let inputShapeSize = document.querySelector('#inputShapeSize');
	inputShapeSize.addEventListener('change', (e) => {
		shapeSize = inputShapeSize.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// ShapeLineWidth
	let inputShapeLineWidth = document.querySelector('#inputShapeLineWidth');
	inputShapeLineWidth.addEventListener('change', (e) => {
		shapeLineWidth = inputShapeLineWidth.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// ShapeVertexSize
	let inputShapeVertexSize = document.querySelector('#inputVertexSize');
	inputShapeVertexSize.addEventListener('change', (e) => {
		shapeVertexSize = inputShapeVertexSize.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// ShapeSectorAngle
	let inputSectorAngle = document.querySelector('#inputSectorAngle');
	inputSectorAngle.addEventListener('change', (e) => {
		shapeSectorAngle = inputSectorAngle.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// ShapeDashInterval
	let inputShapeDash = document.querySelector('#inputShapeDash');
	inputShapeDash.addEventListener('change', (e) => {
		shapeDashInterval = inputShapeDash.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});


	// ShapeLocateX
	let inputShapeLocateX = document.querySelector('#inputShapeLocateX');
	inputShapeLocateX.addEventListener('change', (e) => {
		shapeLocateX = inputShapeLocateX.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
		updateIndiXY();
	});


	// ShapeLocateY
	let inputShapeLocateY = document.querySelector('#inputShapeLocateY');
	inputShapeLocateY.addEventListener('change', (e) => {
		shapeLocateY = inputShapeLocateY.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
		updateIndiXY();
	});


	// FontRotate
	let inputShapeRotate = document.querySelector('#inputShapeRotate');
	inputShapeRotate.addEventListener('change', (e) => {
		shapeRotate = inputShapeRotate.value;
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
	inputBrightness.addEventListener('change', (e) => {
		Brightness = inputBrightness.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
		
		// Display
		let indiBrightness = document.querySelector('#indiBrightness');
		indiBrightness.innerHTML = 'Brightness:' + inputBrightness.value + '';
	});


	// Blur
	let inputBlur = document.querySelector('#inputBlur');
	inputBlur.addEventListener('change', (e) => {
		Blur = inputBlur.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);

		// Display
		let indiBlur = document.querySelector('#indiBlur');
		indiBlur.innerHTML = 'Blur:' + inputBlur.value + '';
	});


	// Contrast
	let inputContrast = document.querySelector('#inputContrast');
	inputContrast.addEventListener('change', (e) => {
		Contrast = inputContrast.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);

		// Display
		let indiContrast = document.querySelector('#indiContrast');
		indiContrast.innerHTML = 'Contrast:' + inputContrast.value + '';
	});


	// GrayScale
	let inputGrayScale = document.querySelector('#inputGrayScale');
	inputGrayScale.addEventListener('change', (e) => {
		GrayScale = inputGrayScale.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);

		// Display
		let indiGrayscale = document.querySelector('#indiGrayscale');
		indiGrayscale.innerHTML = 'GrayScale:' + inputGrayScale.value + '';
	});


	// Hue
	let inputHue = document.querySelector('#inputHue');
	inputHue.addEventListener('change', (e) => {
		Hue = inputHue.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);

		// Display
		let indiHue = document.querySelector('#indiHue');
		indiHue.innerHTML = 'Hue:' + inputHue.value + '';
	});


	// Invert
	let inputInvert = document.querySelector('#inputInvert');
	inputInvert.addEventListener('change', (e) => {
		Invert = inputInvert.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);

		// Display
		let indiInvert = document.querySelector('#indiInvert');
		indiInvert.innerHTML = 'Invert:' + inputInvert.value + '';
	});


	// Saturate
	let inputSaturate = document.querySelector('#inputSaturate');
	inputSaturate.addEventListener('change', (e) => {
		Saturate = inputSaturate.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);

		// Display
		let indiSaturate = document.querySelector('#indiSaturate');
		indiSaturate.innerHTML = 'Saturate:' + inputSaturate.value + '';
	});


	// Sepia
	let inputSepia = document.querySelector('#inputSepia');
	inputSepia.addEventListener('change', (e) => {
		Sepia = inputSepia.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);

		// Display
		let indiSepia = document.querySelector('#indiSepia');
		indiSepia.innerHTML = 'Sepia:' + inputSepia.value + '';
	});


	// Opacity
	let inputOpacity = document.querySelector('#inputOpacity');
	inputOpacity.addEventListener('change', (e) => {
		Opacity = inputOpacity.value;
		initResultSetting(document.querySelector("#sourceCanvas"), false);

		// Display
		let indiOpacity = document.querySelector('#indiOpacity');
		indiOpacity.innerHTML = 'Opacity:' + inputOpacity.value + '';
	});


	// ResetParams
	let btnResetParam = document.querySelector('#ResetParam');
	btnResetParam.addEventListener('click', resetParam);


	// Grayish
	let btnGrayish= document.querySelector('#Grayish');
	btnGrayish.addEventListener('click', (e) => {
		resetParam();

		GrayScale = 80;
		inputGrayScale.value = GrayScale;
		Opacity = 0.8;
		inputOpacity.value = Opacity;
		
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});

	// Vivid
	let btnVivid = document.querySelector('#Vivid');
	btnVivid.addEventListener('click', (e) => {
		resetParam();

		Contrast = 150;
		inputContrast.value = Contrast;
		Saturate = 200;
		inputSaturate.value = Saturate;

		initResultSetting(document.querySelector("#sourceCanvas"), false);
	});

	function resetParam(){
		Brightness 	= 100;
		Blur 		= 0;
		Contrast 	= 100;
		GrayScale 	= 0;
		Hue	 		= 0;
		Invert 		= 0; 
		Sepia 		= 0;
		Saturate 	= 100;
		Opacity 	= 1.0;
	
		inputBrightness.value = Brightness;
		inputBlur.value = Blur;
		inputContrast.value = Contrast;
		inputGrayScale.value = GrayScale;
		inputHue.value = Hue;
		inputInvert.value = Invert;
		inputSepia.value = Sepia;
		inputSaturate.value = Saturate;
		inputOpacity.value = Opacity;
		initResultSetting(document.querySelector("#sourceCanvas"), false);
	
		// Display
		let indiBrightness = document.querySelector('#indiBrightness');
		indiBrightness.innerHTML = 'Brightness:' + inputBrightness.value + '';
	
		let indiBlur = document.querySelector('#indiBlur');
		indiBlur.innerHTML = 'Blur:' + inputBlur.value + '';
	
		let indiContrast = document.querySelector('#indiContrast');
		indiContrast.innerHTML = 'Contrast:' + inputContrast.value + '';
	
		let indiGrayScale = document.querySelector('#indiGrayscale');
		indiGrayScale.innerHTML = 'GrayScale:' + inputGrayScale.value + '';
	
		let indiHue = document.querySelector('#indiHue');
		indiHue.innerHTML = 'Hue:' + inputHue.value + '';
	
		let indiInvert = document.querySelector('#indiInvert');
		indiInvert.innerHTML = 'Invert:' + inputInvert.value + '';
	
		let indiSepia = document.querySelector('#indiSepia');
		indiSepia.innerHTML = 'Sepia:' + inputSepia.value + '';
	
		let indiSaturate = document.querySelector('#indiSaturate');
		indiSaturate.innerHTML = 'Saturate:' + inputSaturate.value + '';
		
		let indiOpacity = document.querySelector('#indiOpacity');
		indiOpacity.innerHTML = 'Opacity:' + inputOpacity.value + '';
	}

	/*ローディング終了*/
	const loading = document.querySelector( '.loading' );
	loading.classList.add('hide');
});


window.addEventListener('resize', function(){
	getViewportSizeAndAdjust();
});

// 関数/////////////////////////////////////////////////////////////////
function updateFontCheckState(){
	let fontEmphasis = document.querySelector('#fontEmphasis');
	document.querySelector("#inputFontLineWidth").disabled = (fontEmphasis.checked == false);

	let fontOutline = document.querySelector('#fontOutLine');
	fontOutline.disabled = bfontEmphasis;
}


function updateShapeCheckState(){
	let drawFont = document.querySelector('#fontDraw');
	bfontDraw = drawFont.checked;

	let drawShape = document.querySelector('#drawShape');
	bShape = drawShape.checked;

	let drawBackGround = document.querySelector('#drawBackGround');
	bShapeBackGround = drawBackGround.checked;
	drawShape.disabled = bShapeBackGround;

	const ImageFilter = document.querySelectorAll(".imageItem > input[type='range']");
	for (let i = 0; i < ImageFilter.length; i++) {
		ImageFilter[i].disabled = bShapeBackGround;
	}

	// check(Draw)
	let fill = document.querySelector('#drawShapeFill');
	bShapeFill = fill.checked;
	let dash = document.querySelector('#drawShapeDash');
	let shapeType = document.querySelector('#shapeType');
	fill.disabled = !bShape;
	dash.disabled = !bShape;
	shapeType.disabled = !bShape;

	// shapeInput(Draw)
	const shapeParam = document.querySelectorAll(".shapeParam > input[type='range']");
	for (let i = 0; i < shapeParam.length; i++) {
		shapeParam[i].disabled = (!bShape || bShapeBackGround);
	}

	let shapeTypeValue = shapeType.value;
	document.querySelector("#inputSectorAngle").disabled = (shapeTypeValue != "Sector");
	document.querySelector("#inputVertexSize").disabled = (shapeTypeValue != "Polygon");
	document.querySelector("#inputShapeDash").disabled = (dash.checked == false);
}

function updateIndiXY(){
	// Font Locator
	let indifX = document.querySelector('#indifX');
	let indifY = document.querySelector('#indifY');
	let inputFontLocateX = document.querySelector('#inputFontLocateX');
	let inputFontLocateY = document.querySelector('#inputFontLocateY');
	indifX.innerHTML = '' + inputFontLocateX.value + '';
	indifY.innerHTML = '' + inputFontLocateY.value + '';

	// Shape Locator
	let indisX = document.querySelector('#indisX');
	let indisY = document.querySelector('#indisY');
	let inputShapeLocateX = document.querySelector('#inputShapeLocateX');
	let inputShapeLocateY = document.querySelector('#inputShapeLocateY');
	indisX.innerHTML = '' + inputShapeLocateX.value + '';
	indisY.innerHTML = '' + inputShapeLocateY.value + '';
}


// OnbtnAspectRatio
function OnAspectButton(){
	let radioList = document.getElementsByName("AspectRatio");
	let str = "";
	for(let i=0; i<radioList.length; i++){
		if (radioList[i].checked) {
			str = radioList[i].value;
			break;
		}
	}

	cropAspectRatio = parseFloat(str);
	initResultSetting(document.querySelector("#sourceCanvas"), false);
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

		// DummyCanvas
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
	if (cropper != null){
		// cropper.destroy();
		initResultSetting(document.querySelector("#sourceCanvas"), true);
	}
	if (window.innerWidth < 768){
		let element = document.querySelector("#ImageFilter");
		element.classList.remove('col-2');
		element.classList.add('col-12');

		element = document.querySelector("#controlPanel");
		element.classList.remove('col-3');
		element.classList.add('col-12');

		element = document.querySelector("#PhotoView");
		element.classList.remove('col-9');
		element.classList.add('col-12');

		element = document.querySelector("#FontEdit");
		element.classList.remove('col-6');
		element.classList.add('col-12');

		element = document.querySelector("#ShapeEdit");
		element.classList.remove('col-6');
		element.classList.add('col-12');
	}
	else{
		let element = document.querySelector("#ImageFilter");
		element.classList.remove('col-12');
		element.classList.add('col-2');

		element = document.querySelector("#controlPanel");
		element.classList.remove('col-12');
		element.classList.add('col-3');

		element = document.querySelector("#PhotoView");
		element.classList.remove('col-12');
		element.classList.add('col-9');

		element = document.querySelector("#FontEdit");
		element.classList.remove('col-12');
		element.classList.add('col-6');

		element = document.querySelector("#ShapeEdit");
		element.classList.remove('col-12');
		element.classList.add('col-6');
	}
}


function downloadFromUrlAutomatically(url, fileName){
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'blob';
	xhr.onload = function(e){
		if (this.status == 200){
			let urlUtil = window.URL || window.webkitURL;
			let imgUrl = urlUtil.createObjectURL(this.response);
			let link = document.createElement('a');
			link.href=imgUrl;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};
	xhr.send();
}

