// GrobalVariables
let   fontsize = 200;
let   cropAspectRatio = 16.0 / 9.0;
const scaledWidth = 1024;

// window load
window.onload = getViewportSizeAndAdjust;

// FontSize
const inputSlideBarFontSize = document.getElementById('inputSlideBar');
inputSlideBarFontSize.addEventListener('change', function(){
	fontsize = inputSlideBarFontSize.value;
});

// contrast
const inputSlideBarContrast = document.getElementById('Contrast');
inputSlideBarContrast.addEventListener('change', function(){
	let element = document.getElementById('output');
	element.style.filter = 'contrast(' + inputSlideBarContrast.value + '%)';
});

// AspectRatioCheck
let button = document.getElementById('aspectRatio');
button.addEventListener('click', OnAspectButton);

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
  window.addEventListener('load', (e) => {
	getViewportSizeAndAdjust();
  });
  window.addEventListener('resize', (e) => {
	getViewportSizeAndAdjust();
  });

