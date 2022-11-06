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
			const imageWidth  = image.width;
			const imageHeight  = image.height;
            const scale = 768 / imageWidth;
			
            // initializeSoureCanvas
            const canvas = document.getElementById("sourceCanvas");
            let ctx = canvas.getContext("2d", { alpha: false });
            const Width = canvas.width = imageWidth * scale;
			const Height = canvas.height = imageHeight * scale;
            ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, Width, Height);
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
    
	let cropBoxData = null;
	if (cropper != null){
		cropBoxData = cropper.getCropBoxData();
		cropper.destroy();
	}
	else if (!initial){
		return;
	}

	cropper = new Cropper(context,{
		aspectRatio: cropAspectRatio,
		scalable: false,
		zoomable: false,
		checkOrientation : true,
		data: {
			width: context.width,
			height: context.width * cropAspectRatio
		 },
		crop: function (event) {
            const scale = 768 / image.width;

			const croppedCanvas = document.getElementById("croppedCanvas");
			let ctx = croppedCanvas.getContext("2d", { alpha: false });
			const Width = croppedCanvas.width = image.height * cropAspectRatio;
			const Height = croppedCanvas.height = image.height;

			ctx.filter = "brightness("+ Brightness + "%)" +
						 "blur("+ Blur + "px)" + 
						 "contrast(" + Contrast + "%)" + 
						 "grayscale("+ GrayScale +"%)" +
						 "hue-rotate("+ Hue +"deg)" +
						 "sepia("+ Sepia +"%)" + 
						 "opacity("+ Opacity +")";

			ctx.drawImage(image,
				event.detail.x / scale, event.detail.y / scale, event.detail.width / scale, event.detail.height / scale,
				0, 0, Width, Height
			);

			ctx.filter = "brightness(100%)" + "blur(0px)" + "contrast(100%)" + "grayscale(0%)" + "hue-rotate(0)" + "sepia(0%)" + "opacity(1.0)";

			// drawBackShape
			const centerX = Width / 2;
			const centerY = Height / 2;

			if (bShape){
				drawBackShape(ctx , centerX, centerY);
			}

			drawText(ctx, centerX, centerY);

		},
		ready(){
			cropper.setCropBoxData(cropBoxData);
			let el = document.getElementById('indicator');
			el.innerHTML = '<p>Read image-size('+ String(image.width) +'×'+ String(image.height) +')</p>';
		}
	});
}

// drawText
function drawText(context, centerX, centerY){
	let fontStyle = document.getElementById("fontStyle").value;
	context.font = fontItalic + ' ' + fontBold + ' ' + fontSize + 'px ' + fontStyle;
	context.letterSpacing = fontSpacing + "px";

	// RotateText
	context.translate(centerX, centerY);
	context.rotate(fontRotate / 180 * Math.PI);
	context.translate(-1* centerX, -1* centerY);

	// ImageSizer
	const element = document.Title.caption.value;
	const fontX = centerX - context.measureText(element).width / 2;
	const fontY = centerY + (fontSize / 3);

	if (bemphasisFont){
		context.lineWidth = String(fontLineWidth);
		context.lineJoin = "miter";
		context.miterLimit = "5"

		context.strokeStyle = shapeColor;
		context.strokeText(element, fontX, fontY);
		context.fillStyle = fontColor;
		context.fillText(element, fontX, fontY);
	}
	else if (boutlineFont){
		context.strokeStyle = fontColor;
		context.strokeText(element, fontX, fontY);
	}
	else{
		context.fillStyle = fontColor;
		context.fillText(element, fontX, fontY);
	}
}

// drawBackShape
function drawBackShape(context, centerX, centerY){
	// Rotate the shape
	context.translate(centerX, centerY);
	context.rotate(shapeRotate / 180 * Math.PI);
	context.translate(-1.0 * centerX, -1.0 * centerY);

	const shapeType = document.getElementById("shapeType").value;
	switch (shapeType) {
	case "Arc":
		context.arc(centerX, centerY, shapeSize, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
		break;
	case "Square":
		context.rect(centerX - shapeSize / 2, centerY - shapeSize / 2, shapeSize, shapeSize);
		break;
	case "justify-Rect":
		context.rect(0, centerY - shapeSize / 2, 2 * centerX, shapeSize);
		break;
	case "Line":
		context.moveTo(0, centerY);
		context.lineTo(2 * centerX, centerY);
		break;
	case "Sector":
		context.beginPath();
		context.moveTo(centerX, centerY);
		context.arc(centerX, centerY, shapeSize, Math.PI*0.3, Math.PI*1,false);
		context.closePath();
		break;
	default:
		console.log(`Sorry, we are out of ${shapeType}.`);
		return;
	}

	// ShapeSetting
	context.filter = "opacity(" + shapeOpacity + ")";
	context.lineWidth = shapeLineWidth;

	if (bShapeFill){
		context.fillStyle = shapeColor;
		context.fill();
	}
	context.strokeStyle = shapeColor;
	context.stroke();
	
	// initialize
	context.filter = "opacity(1.0)";
	context.setTransform(1, 0, 0, 1, 0, 0);
}
