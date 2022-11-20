// canvas
let   cropAspectRatio 	= 16 / 9;
let   imageWidth  = 1600;
let   imageHeight = 900;

// fonts
let   boutlineFont 		= false;
let   bemphasisFont 	= false;

// ImageFilterEffects
let   bFilter 		= false;

// ShaperEffects
let   bWireFrame 	= false;
let   bLighting 	= true;
let   bFog 			= false;
let   bHelper 		= false;

let   shapeColor 				= "#aaaaaa";
let   shapeBackgroundColor 		= "#000000";
let   shapeOpacity		= 1.0;
let   shapeSize 		= 250;
let   shapeRotate 		= 0;
let   shapeLineWidth 	= 10;
let   shapeVertexSize	= 50;
let   shapeSpacing		= 300;
let   shapePattern		= 'Single';

let   particleColor 	= "#ffffff";


const initWidth = window.innerWidth;
const initHeight = window.innerHeight;

// イベントリスナー/////////////////////////////////////////////////////////////////

// window load
window.addEventListener('load', (e) => {

	getViewportSizeAndAdjust();
	draw3D();

	let check = document.getElementById('lighting');
	check.checked = true;
});


// window Reload
let btnReload = document.querySelector('#Reload');
btnReload.addEventListener('click', (e) => {
	location.reload();
});


let iImageWidth = document.querySelector('#imageWidth');
iImageWidth.addEventListener('change', (e) => {
	imageWidth = iImageWidth.value;
	draw3D();
});


let iIamgeHeight = document.querySelector('#imageHeight');
iIamgeHeight.addEventListener('change', (e) => {
	imageHeight = iIamgeHeight.value;
	draw3D();
});


// wireFrame
let wireFrame = document.querySelector('#wireFrame');
wireFrame.addEventListener('change', (e) => {
	bWireFrame = wireFrame.checked;
	draw3D();
});


// Fog
let Fog = document.querySelector('#Fog');
Fog.addEventListener('change', (e) => {
	bFog = Fog.checked;
	draw3D();
});


// Lighting
let Lighting = document.querySelector('#lighting');
Lighting.addEventListener('change', (e) => {
	bLighting = Lighting.checked;
	draw3D();
});


// Helper
let Helper = document.querySelector('#helper');
Helper.addEventListener('change', (e) => {
	bHelper = Helper.checked;
	draw3D();
});

// ShapeType
let selectShapeType = document.querySelector('#shapeType');
selectShapeType.addEventListener('change', (e) => {
	updateShapeCheckState();
	draw3D();
});


// ShapePattern
let selectShapePattern = document.querySelector('#shapePattern');
selectShapePattern.addEventListener('change', (e) => {
	updateShapeCheckState();
	draw3D();
});


// meshType
let selectMeshType = document.querySelector('#meshType');
selectMeshType.addEventListener('change', (e) => {
	updateShapeCheckState();
	draw3D();
});


// bgTexture
let bgTexture = document.querySelector('#bgTexture');
bgTexture.addEventListener('change', (e) => {
	updateShapeCheckState();
	draw3D();
});



// Color
let inputShapeColor = document.querySelector('#inputShapeColor');
inputShapeColor.addEventListener('change', (e) => {
	shapeColor = inputShapeColor.value;
	draw3D();
});


// BackgroundColor
let inputBackgroundColor = document.querySelector('#inputBackgroundColor');
inputBackgroundColor.addEventListener('change', (e) => {
	shapeBackgroundColor = inputBackgroundColor.value;
	draw3D();
});


// Color
let inputParticleColor = document.querySelector('#inputParticleColor');
inputParticleColor.addEventListener('change', (e) => {
	particleColor = inputParticleColor.value;
	draw3D();
});


// Opacity
let inputShapeOpacity = document.querySelector('#inputShapeOpacity');
inputShapeOpacity.addEventListener('change', (e) => {
	shapeOpacity = inputShapeOpacity.value;
	draw3D();
});


// Size
let inputShapeSize = document.querySelector('#inputShapeSize');
inputShapeSize.addEventListener('change', (e) => {
	shapeSize = inputShapeSize.value;
	draw3D();
});

// VertexSize
let inputShapeVertexSize = document.querySelector('#inputVertexSize');
inputShapeVertexSize.addEventListener('change', (e) => {
	shapeVertexSize = inputShapeVertexSize.value;
	draw3D();
});


// VertexSize
let inputShapeSpacing = document.querySelector('#inputShapeSpacing');
inputShapeSpacing.addEventListener('change', (e) => {
	shapeSpacing = inputShapeSpacing.value;
	draw3D();
});


// // AspectRatioCheck
// let btnAspectRatio = document.querySelector('#aspectRatio');
// btnAspectRatio.addEventListener('click', OnAspectButton);


// Download
let btnDownload = document.querySelector('#Download');
btnDownload.addEventListener('click', OnDownloadButton);


// // fullScreen
// let fullScreen = document.querySelector('#fullScreen');
// fullScreen.addEventListener ('click', (e) => {     
//     let main = document.querySelector('#main');
// 	main.requestFullscreen();
// });

// 関数/////////////////////////////////////////////////////////////////
function updateFontCheckState(){

}

function updateShapeCheckState(){

}

function updateIndiXY(){

}


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
	draw3D();
}


// OnbtnDownload
function OnDownloadButton(){

	// ConvertPngImage
	let output = document.querySelector("#output");
	const croppedCanvas = document.getElementById("3DCanvas");
	output.src = croppedCanvas.toDataURL();
	output.style.display = "block";

	downloadFromUrlAutomatically(output.src, 'img.png');
}


// mobile editor adjust
function getViewportSizeAndAdjust() {
	if (initWidth < 768){
		// document.querySelector("#ImageFilter").classList.remove("col-3");
		document.querySelector("#sourceImage").classList.remove("col-2");
		document.querySelector("#TitleEdit").classList.remove("col-3");
		document.querySelector("#ShapeEdit").classList.remove("col-5");
		document.querySelector("#TitleEdit").classList.add("row-cols-1");
		// document.querySelector("#FontEdit").classList.add("row-cols-1");
		document.querySelector("#ShapeEdit").classList.add("row-cols-1");
		document.querySelector("#sourceImage").classList.add("col-4");
	}

	if (initWidth < 400){
		// document.querySelector('#ImageFilter').remove();
		document.querySelector('#ShapeEdit').remove();
		document.querySelector("#EditView").classList.remove("row-cols-2");
		document.querySelector("#sourceImage").classList.remove("col-2");
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

