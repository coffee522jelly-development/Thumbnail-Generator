let   cropper = null;
let   image = null;
let   file = null;

const cropImage = function (evt) {
    const files = evt.target.files;
    if (files.length == 0) {
        return;
    }
    file = files[0];	// 先頭のイメージファイルの読み込み

	// 選択されたファイルが画像かどうか確認
	if(!file.type.match(/^image/)) {
		alert('画像を選択してください');
		return;
	}

    image = new Image();
    let reader = new FileReader();
    reader.onload = function (evt) {

        image.onload = function () {
			const imageWidth  = image.width;
			const imageHeight  = image.height;
            const scale = 768 / imageWidth;
			
            // initializeSoureCanvas
            const canvas = document.querySelector("#sourceCanvas");
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
const uploader = document.querySelector('#uploader');
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

			const croppedCanvas = document.querySelector("#croppedCanvas");
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
				drawBackShape(ctx , centerX + (shapeLocateX * 10), centerY + (shapeLocateY * 10));
			}

			drawText(ctx, centerX + (fontLocateX * 10), centerY + (fontLocateY * 10));

		},
		ready(){
			cropper.setCropBoxData(cropBoxData);
			let el = document.querySelector('#indicator');
			el.innerHTML = '<p>ImageSize : '+ String(image.width) +'×'+ String(image.height) +'<br> FileName : ' + file.name + '<br> FileSize : ' + ag2fileSizeOpt(file.size, true, 1); +'</p>';
		}
	});
}

// drawText
function drawText(context, centerX, centerY){
	let fontStyle = document.querySelector("#fontStyle").value;
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

		context.strokeStyle = fontBackColor;
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


// drawPolygon
function drawPolygon(context, position_x, position_y, radius, num, rotation) {
	if (num < 3) return false;

	context.lineWidth = 10;
  
	const angle = 360 / num;
	const angleOffset = -90;
  
	context.beginPath();
  
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


  function ag2fileSizeOpt(a,b,c){
	let thisSize, fileUnit, thisUnit;
  
	//数値に変換
	thisSize = Number(a);
	//数値に変換できなかった場合
	if(isNaN(thisSize)) return 'Error : Not a Number.';
	//小数点を含めている場合
	if(String(thisSize).split('.').length > 1) return 'Error : Unaccetable Number.';
  
	//基準のバイト数と単位の配列を設定
	if(b){
	  b = 1000;
	  fileUnit = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	}else{
	  b = 1024;
	  fileUnit = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	}
  
	//有効小数点 デフォルト小数第2位まで(小数第3位で四捨五入)
	if(c !== 0){c = c ? c : 2;}
  
	if(thisSize >= b){
	  for(let i = 0, j = 0, sizeTemp = (thisSize / b); sizeTemp >= 1 && j < fileUnit.length; i++, j++, sizeTemp /= b){
		thisUnit = i;
		thisSize = sizeTemp;
	  }
	  thisSize = (Math.round(thisSize * (10**c))/(10**c))+' '+fileUnit[thisUnit];
	}else{
	  if(a === 1) thisUnit = 'byte';
	  else thisUnit = 'bytes';
	  thisSize = a+' '+thisUnit;
	}
  
	//変換した表記の文字列を返す
	return thisSize;
  }
