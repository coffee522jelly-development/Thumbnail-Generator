// GrobalVariables
let   fontsize = 200;
const cropAspectRatio = 16.0 / 9.0;
const scaledWidth = 1024;

// FontSize
const inputSlideBarElement = document.getElementById('inputSlideBar');
inputSlideBarElement.addEventListener('change', function(){
	fontsize = inputSlideBarElement.value;
});