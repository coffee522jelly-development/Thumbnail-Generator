// GrobalVariables
let   fontsize = 200;
const cropAspectRatio = 16.0 / 9.0;
const scaledWidth = 1024;

// FontSize
const inputSlideBarElement = document.getElementById('inputSlideBar');
inputSlideBarElement.addEventListener('change', function(){
	fontsize = inputSlideBarElement.value;
});

// mobile editor
function getViewportSizeAndAdjust() {
	const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	if (w < 414){
		document.getElementById("EditView").classList.remove("row-cols-2");
		document.getElementById("EditView").classList.add("row-cols-1");
	}
	else{
		document.getElementById("EditView").classList.remove("row-cols-1");
		document.getElementById("EditView").classList.add("row-cols-2");
	}
  }
  window.addEventListener('load', (e) => {
	getViewportSizeAndAdjust();
  });
  window.addEventListener('resize', (e) => {
	getViewportSizeAndAdjust();
  });

window.onload = getViewportSizeAndAdjust;
