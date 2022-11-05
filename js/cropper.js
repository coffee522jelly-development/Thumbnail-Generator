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
            let ctx = canvas.getContext("2d", { alpha: false });
			ctx.imageSmoothingEnabled = true;
            canvas.width = image.width * scale;
            canvas.height = image.height * scale;
            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
            initResultSetting(canvas, true);
        }
        image.src = evt.target.result;
    }
    reader.readAsDataURL(file);
}

//　Uploader
const uploader = document.getElementById('uploader');
uploader.addEventListener('change', cropImage);

// ResultViewerSetting
function initResultSetting(context, initial){
    if (cropper != null){
		cropper.destroy();
	}
	else
	{
		if (!initial)	return;
	}
	
	cropper = new Cropper(context,{
		aspectRatio: cropAspectRatio,
		movable: false,
		scalable: false,
		zoomable: false,
		checkOrientation    : true,
		data: {
			width: context.width,
			height: context.width * cropAspectRatio
		 },
		crop: function (event) {
			const scalewidth = 1024;
            let scale = scalewidth / image.width;

			const croppedCanvas = document.getElementById("croppedCanvas");
			let ctx = croppedCanvas.getContext("2d", { alpha: false });
			ctx.imageSmoothingEnabled = true;
			let croppedImageWidth = image.height * cropAspectRatio;
			croppedCanvas.width = croppedImageWidth;
			croppedCanvas.height = image.height;

			// SizeVariables
			const Width = croppedCanvas.width;
			const Height = croppedCanvas.height;
			const centerX = Width / 2;
			const centerY = Height / 2;

			ctx.filter = "brightness("+ Brightness + "%)" +
							"blur("+ Blur + "px)" + 
							"contrast(" + Contrast + "%)" + 
							"grayscale("+ GrayScale +"%)" +
							"sepia("+ Sepia +"%)" + 
							"opacity("+ Opacity +")";

			ctx.drawImage(image,
				event.detail.x / scale, event.detail.y / scale, event.detail.width / scale, event.detail.height / scale,
				0, 0, Width, Height
			);

			ctx.filter = "brightness(100%)" + "blur(0px)" + "contrast(100%)" + "grayscale(0%)" + "sepia(0%)" + "opacity(1.0)";

			// DrawShape
			if (bShape){
				ctx.translate(centerX, centerY);
				ctx.rotate(shapeRotate / 180 * Math.PI);
				ctx.translate(-1.0 * centerX, -1.0 * centerY);

				let shapeType = document.getElementById("shapeType").value;
				if (shapeType == "Arc"){
					ctx.arc(Width / 2, Height / 2, shapeSize, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
				}
				else if(shapeType == "Square"){
					ctx.rect(Width / 2 - shapeSize / 2, Height / 2 - shapeSize / 2, shapeSize, shapeSize);
				}
				else if(shapeType == "justify-Rect"){
					ctx.rect(Width / 2 - Width / 2, Height / 2 - shapeSize / 2, Width, shapeSize);
				}
				ctx.fillStyle = shapeColor;
				ctx.filter = "opacity(" + shapeOpacity + ")";
				ctx.fill();
				ctx.lineWidth = 0;
				ctx.stroke();
				ctx.rotate(0 / 180 * Math.PI);
				ctx.filter = "opacity(1.0)";
			}

			// Style
			let fontStyle = document.getElementById("fontStyle").value;
			ctx.font = fontItalic + ' ' + fontBold + ' ' + fontSize + 'px ' + fontStyle;
			ctx.letterSpacing = fontSpacing + "px";
			ctx.translate(centerX, centerY);
			ctx.rotate(fontRotate / 180 * Math.PI);
			ctx.translate(-1.0 * centerX, -1.0 * centerY);

			// ImageSizer
			let element = document.Title.caption.value;
			let length = ctx.measureText(element).width;

			if (bOutlineFont){
				ctx.strokeStyle = fontColor;
				ctx.strokeText(element, (centerX - length / 2), centerY + (fontSize / 3));
			}
			else{
				ctx.fillStyle = fontColor;
				ctx.fillText(element, (centerX - length / 2), centerY + (fontSize / 3));
			}
		}
	});
}
