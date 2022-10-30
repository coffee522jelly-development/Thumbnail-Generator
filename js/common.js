// GrobalVariables
let   fontsize = 200;
let   cropAspectRatio = 16.0 / 9.0;
let   angle = 0.0;
const scaledWidth = 1024;

// window load
window.addEventListener('load', (e) => {
getViewportSizeAndAdjust();
});
	
window.addEventListener('resize', (e) => {
getViewportSizeAndAdjust();
});

// FontSize
const inputSlideBarFontSize = document.getElementById('inputSlideBar');
inputSlideBarFontSize.addEventListener('change', function(){
	fontsize = inputSlideBarFontSize.value;
});

// // contrast
// const inputSlideBarContrast = document.getElementById('Contrast');
// inputSlideBarContrast.addEventListener('change', function(){
// 	let element = document.getElementById('output');
// 	element.style.filter = 'contrast(' + inputSlideBarContrast.value + '%)';
// });

// AspectRatioCheck
let btnAspectRatio = document.getElementById('aspectRatio');
btnAspectRatio.addEventListener('click', OnAspectButton);

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

// Clear
let btnClear = document.getElementById('Clear');
btnClear.addEventListener('click', OnClearButton);

// OnbtnClear
function OnClearButton(){
	if (cropper != null){
		cropper.clear();
		cropper.reset();
	}
	else{
		alert('画像を読み込んでください。');
	}
}

// // Rotate
// let btnRotate = document.getElementById('Rotate');
// btnRotate.addEventListener('click', OnRotateButton);

// // OnbtnRotate
// function OnRotateButton(){
// 	if (cropper != null){
// 		cropper.rotate(45);
// 		angle += 45.0;
// 	}
// }

// Download
let btnDownload = document.getElementById('Download');
btnDownload.addEventListener('click', OnDownloadButton);

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


// Reload
let btnReload = document.getElementById('Reload');
btnReload.addEventListener('click', OnReloadButton);

// OnbtnReload
function OnReloadButton(){
	location.reload();
}

// mobile editor adjust
function getViewportSizeAndAdjust() {
	const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
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

