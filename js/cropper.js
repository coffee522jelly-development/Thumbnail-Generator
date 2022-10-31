let   cropper = null;
let   image = null;

const cropImage = function (evt) {
    const files = evt.target.files;
    if (files.length == 0) {
        return;
    }
    let file = files[0];
    image = new Image();
    let reader = new FileReader();
    reader.onload = function (evt) {
        image.onload = function () {
            const scalewidth = 768;
            let scale = scalewidth / image.width;

            // initializeSoureCanvas
            const canvas = document.getElementById("sourceCanvas");
            let ctx = canvas.getContext("2d");
            canvas.width = image.width * scale;
            canvas.height = image.height * scale;
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

            initResultSetting(canvas);
        }
        image.src = evt.target.result;
    }
    reader.readAsDataURL(file);
}

//　Uploader
const uploader = document.getElementById('uploader');
uploader.addEventListener('change', cropImage);

// ResultViewerSetting
function initResultSetting(context){
    if (cropper != null){
		cropper.destroy();
	}
	
	cropper = new Cropper(context,{
		aspectRatio: cropAspectRatio,
		movable: false,
		scalable: false,
		zoomable: false,
		data: {
			width: context.width,
			height: context.width * cropAspectRatio
		 },
		crop: function (event) {
			const scalewidth = 768;
            let scale = scalewidth / image.width;

			const croppedCanvas = document.getElementById("croppedCanvas");
			let ctx = croppedCanvas.getContext("2d");
			let croppedImageWidth   = image.height * cropAspectRatio;
			croppedCanvas.width     = croppedImageWidth * scale;
			croppedCanvas.height    = image.height * scale;

			ctx.filter = "brightness("+ Brightness + "%)" +
							"blur("+ Blur + "px)" + 
							"contrast(" + Contrast + "%)" + 
							"grayscale("+ GrayScale +"%)" +
							"sepia("+ Sepia +"%)" + 
							"opacity("+ Opacity +")";

			ctx.drawImage(image,
				event.detail.x / scale, event.detail.y / scale, event.detail.width / scale, event.detail.height / scale,
				0, 0, croppedCanvas.width, croppedCanvas.height
			);

			// 初期化
			ctx.filter = "brightness(100%)" + 
							"blur(0px)" + 
							"contrast(100%)" + 
							"grayscale(0%)" + 
							"sepia(0%)" +
							"opacity(1.0)";

			// Style
			let fontStyle = document.getElementById("fontStyle").value;
			ctx.font = fontSize + 'px ' + fontStyle;
			ctx.fillStyle = document.getElementById("fontColor").value;

			// ImageSizer
			let x = croppedCanvas.width / 2;
			let y = (croppedCanvas.height / 2);
			let element = document.Title.caption.value;
			let length = ctx.measureText(element).width;
			ctx.fillText(element, (x - length / 2), y + (fontSize / 3));
		}
	});   
}
