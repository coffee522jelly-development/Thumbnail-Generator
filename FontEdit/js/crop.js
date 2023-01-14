let   cropper 	= null;
let   image 	= null;
let   file 		= null;


// ドラッグ＆ドロップ
if (window.File) {
    let dropArea = document.querySelector('#main');
    dropArea.addEventListener('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();
    }, false);
 
    dropArea.addEventListener('drop', (e) => {
        e.stopPropagation();
        e.preventDefault();
 
		// ドロップしたファイル
		let fileData = e.dataTransfer.files;
		file = fileData[0];
	
		cropImageFile(file);

    }, false);
}

// アップローダー
const uploader = document.querySelector('#uploader');
uploader.addEventListener('change', cropImage);

//  イメージを切り抜く
function cropImage(e) {

	// 選択したファイル
	let fileData = e.target.files;
	file = fileData[0];

	cropImageFile(file);
}


// 画像読み込みクロップ
function cropImageFile(file){
	if (!file.type.match(/^image/)) {
		alert('画像を選択してください');
		return;
	}

    image = new Image();
	
    let reader = new FileReader();
    reader.onload = (e) =>{
        image.onload = () => {
			const imageWidth  = image.width;
			const imageHeight  = image.height;
            const scale = 768 / imageWidth;
			
            // initializeSoureCanvas
            const canvas = document.querySelector("#sourceCanvas");
            let ctx = canvas.getContext("2d");
            const Width = canvas.width = imageWidth * scale;
			const Height = canvas.height = imageHeight * scale;
            ctx.drawImage(image, 0, 0, imageWidth, imageHeight, 0, 0, Width, Height);
            initResultSetting(canvas, true);

			// 画像から色を抽出しdefaultとして設定
			let vibrant = new Vibrant(image);
			let swatches = vibrant.swatches();
			for (let swatch in swatches){
				if (swatches.hasOwnProperty(swatch) && swatches[swatch]){
					let list = document.getElementById('defaultcolors');
					let option = document.createElement('option');
					option.value = swatches[swatch].getHex();
					list.appendChild(option);
				}
			}

			// // 初期設定
			// let fontColor = document.getElementById('inputFontColor');
			// const optionfontColor = fontColor.querySelectorAll('option');
			// const selectedfontColor = optionfontColor[0];
			// selectedfontColor.selected = true;

			// let fontBackColor = document.getElementById('inputFontBackColor');
			// const optionfontBackColor = fontBackColor.querySelectorAll('option');
			// const selectedfontBackColor = optionfontBackColor[1];
			// selectedfontBackColor.selected = true;

			// let shapeColor = document.getElementById('inputShapeColor');
			// const optionshapeColor = shapeColor.querySelectorAll('option');
			// const selectedshapeColor = optionshapeColor[2];
			// selectedshapeColor.selected = true;
        }
        image.src = e.target.result;
    }
    reader.readAsDataURL(file);
}

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
		crop: (e) => {
			imageCrop(e);
		},
		ready(){
			cropper.setCropBoxData(cropBoxData);
			let el = document.querySelector('#indicator');
			el.innerHTML = '<p>ImageSize : '+ String(image.width) +'×'+ String(image.height) +'<br> FileName : ' + file.name + '<br> FileSize : ' + ag2fileSizeOpt(file.size, true, 1); +'</p>';
		}
	});
}


// 画像切り抜き時のイベント関数
function imageCrop(event) {
	const scale = 768 / image.width;

	const croppedCanvas = document.querySelector(".croppedCanvas");
	const Width = croppedCanvas.width = image.height * cropAspectRatio;
	const Height = croppedCanvas.height = image.height;
	let ctx = croppedCanvas.getContext("2d");

	ctx.imageSmoothingEnabled = true;

	ctx.filter = "brightness("+ Brightness + "%)" +
				"blur("+ Blur + "px)" + 
				"contrast(" + Contrast + "%)" + 
				"grayscale("+ GrayScale +"%)" +
				"hue-rotate("+ Hue +"deg)" +
				"invert("+ Invert +"%)" +
				"saturate("+ Saturate +"%)" + 
				"sepia("+ Sepia +"%)" + 
				"opacity("+ Opacity +")";

	ctx.drawImage(image,
		event.detail.x / scale, event.detail.y / scale, event.detail.width / scale, event.detail.height / scale,
		0, 0, Width, Height
	);

	ctx.filter = "brightness(100%)" + "blur(0px)" + "contrast(100%)" + "grayscale(0%)" + "hue-rotate(0)" + "invert(0%)"+ "saturate(100%)" + "sepia(0%)" + "opacity(1.0)";

	const centerX = Width / 2;
	const centerY = Height / 2;
	const RateX = centerX / 50;
	const RateY = centerY / 50;

	if (bShapeBackGround)
		drawBackground(ctx , Width, Height);
	else if (bShape)
		drawBackShape(ctx , centerX + (RateX * shapeLocateX), centerY + (RateY * shapeLocateY));

	if (bfontDraw)
		drawText(ctx, centerX + (RateX * fontLocateX), centerY + (RateY * fontLocateY));
}

// テキスト描画関数(切り抜き時に付与)
function drawText(context, centerX, centerY){
	let fontStyle = document.querySelector("#fontStyle").value;
	let fontRelativeSize = fontSize * 5;

	context.font = fontItalic + ' ' + fontBold + ' ' + fontRelativeSize + 'px ' + fontStyle;
	context.letterSpacing = fontSpacing + "px";

	// RotateText
	context.translate(centerX, centerY);
	context.rotate(fontRotate / 180 * Math.PI);
	context.translate(-1* centerX, -1* centerY);

	// ImageSizer
	const element = document.Title.caption.value;
	const fontX = centerX - (context.measureText(element).width / 2);
	const fontY = centerY + (fontRelativeSize / 3);

	if (bfontEmphasis){
		context.lineWidth = String(fontLineWidth);
		context.lineJoin = "miter";
		context.miterLimit = "5"

		context.strokeStyle = fontBackColor;
		context.strokeText(element, fontX, fontY);
		context.fillStyle = fontColor;
		context.fillText(element, fontX, fontY);
	}
	else if (bfontOutLine){
		context.strokeStyle = fontColor;
		context.strokeText(element, fontX, fontY);
	}
	else{
		context.fillStyle = fontColor;
		context.fillText(element, fontX, fontY);
	}
}

// 図形描画関数(切り抜き時に付与)
function drawBackShape(context, centerX, centerY){
	// Rotate the shape
	context.translate(centerX, centerY);
	context.rotate(shapeRotate / 180 * Math.PI);
	context.translate(-1.0 * centerX, -1.0 * centerY);

	if (bShapeDash)
		context.setLineDash([shapeDashInterval]);

	const shapeType = document.querySelector("#shapeType").value;
	
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
		context.arc(centerX, centerY, shapeSize, 0 * Math.PI / 180, shapeSectorAngle * Math.PI / 180,false);
		context.closePath();
		break;

	case "Polygon":
		drawPolygon(context, centerX, centerY, shapeSize, shapeVertexSize, 0);
		break;

	default:
		console.log(`Sorry, we are out of ${shapeType}.`);
		return;
	}

	// ShapeSetting
	context.filter = "opacity(" + shapeOpacity + ")";
	context.lineWidth = shapeLineWidth;

	let fillStyle;

	if (bShapeFill){
		fillStyle = shapeColor;
	}


	if (bShapeGradient){
		const grad = context.createLinearGradient(0, 0, 2.0 * centerX, 2.0 * centerY);
		grad.addColorStop(0.0 , shapeSubColor);
		grad.addColorStop(1.0 , shapeColor);
		fillStyle = grad;
	}

	if (bShapeFill || bShapeGradient){
		context.fillStyle = fillStyle;
		context.fill();
	}

	if (bShapeDash){
		context.strokeStyle = shapeColor;
		context.stroke();
	}
	
	// initialize
	context.filter = "opacity(1.0)";
	context.setTransform(1, 0, 0, 1, 0, 0);
}


// 背景描画関数(切り抜き時に付与)
function drawBackground(context, X, Y){
	if (bShapeFill){
		context.fillStyle = shapeColor;
	}

	if (bShapeGradient){
		const grad = context.createLinearGradient(0, 0, X, Y);
		grad.addColorStop(0.0 , shapeSubColor);
		grad.addColorStop(1.0 , shapeColor);
		context.fillStyle = grad;	
	}

    context.fillRect(0,0,X,Y);
}


// ポリゴン描画関数(切り抜き時に付与)
function drawPolygon(context, position_x, position_y, radius, num, rotation) {
	if (num < 3) return false;
	context.lineWidth = 10;
	context.beginPath();

	const angle = 360 / num;
	const angleOffset = -90;

	for (let i = 0; i < num; i++) {
	  const x1 =
		radius *
		  Math.cos((2 * Math.PI * (rotation + angle * i + angleOffset)) / 360) +
		position_x;
	  const y1 =
		radius *
		  Math.sin((2 * Math.PI * (rotation + angle * i + angleOffset)) / 360) +
		position_y;
	  if ((i === 0)) context.moveTo(x1, y1); else context.lineTo(x1, y1);
	
	}
  
	context.closePath();
	context.filter = "opacity(" + shapeOpacity + ")";
	context.strokeStyle = shapeColor;
	context.stroke();

	if (bShapeFill){
		context.fillStyle = shapeColor;
		context.fill();
	}
}


// ファイルサイズの計算
function ag2fileSizeOpt(a,b,c){
	let thisSize, fileUnit, thisUnit;

	thisSize = Number(a);
	if (isNaN(thisSize)) return 'Error : Not a Number.';
	if (String(thisSize).split('.').length > 1) return 'Error : Unaccetable Number.';

	if (b){
		b = 1000;
		fileUnit = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	}
	else{
		b = 1024;
		fileUnit = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	}

	if (c !== 0){c = c ? c : 2;}

	if (thisSize >= b){
		for(let i = 0, j = 0, sizeTemp = (thisSize / b); sizeTemp >= 1 && j < fileUnit.length; i++, j++, sizeTemp /= b){
			thisUnit = i;
			thisSize = sizeTemp;
		}
		thisSize = (Math.round(thisSize * (10**c))/(10**c))+' '+fileUnit[thisUnit];
	}
	else{
		if(a === 1) thisUnit = 'byte';
		else thisUnit = 'bytes';
		thisSize = a+' '+thisUnit;
	}

	return thisSize;
}
