let   cropper = null;

const cropImage = function (evt) {
    const files = evt.target.files;
    if (files.length == 0) {
        return;
    }
    let file = files[0];
    let image = new Image();
    let reader = new FileReader();
    reader.onload = function (evt) {
        image.onload = function () {
            let scale = scaledWidth / image.width;
            {
                const canvas = document.getElementById("sourceCanvas");
                {
                    let ctx = canvas.getContext("2d");
                    canvas.width = image.width * scale;
                    canvas.height = image.height * scale;
                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
                }
                if (cropper != null) {
                    // Reload
                    cropper.destroy();
                }
                cropper = new Cropper(canvas, {
                    aspectRatio: cropAspectRatio,
                    movable: false,
                    scalable: false,
                    zoomable: false,
                    data: {
                        width: canvas.width,
                        height: canvas.width * cropAspectRatio
                    },
                    crop: function (event) {
                        const croppedCanvas = document.getElementById("croppedCanvas");
                        {
                            let ctx = croppedCanvas.getContext("2d");
                            let croppedImageWidth   = image.height * cropAspectRatio;
                            croppedCanvas.width     = croppedImageWidth * scale;
                            croppedCanvas.height    = image.height * scale;
                            ctx.drawImage(image,
                                event.detail.x / scale, event.detail.y / scale, event.detail.width / scale, event.detail.height / scale,
                                0, 0, croppedCanvas.width, croppedCanvas.height
                            );

                            // Style
                            let fontStyle = document.getElementById("fontStyle").value;
                            ctx.font = fontsize + 'px ' + fontStyle;
                            ctx.fillStyle = document.getElementById("fontColor").value;

                            // ImageSizer
                            let x = croppedCanvas.width / 2;
                            let y = (croppedCanvas.height / 2);
                            let element = document.Title.caption.value;
                            let length = ctx.measureText(element).width;
                            ctx.fillText(element, (x - length / 2), y + (fontsize / 3));
                            
                            // Edit
                            const imageData = croppedCanvas.getImageData(0, 0, croppedCanvas.clientWidth, croppedCanvas.clientHeight);
                            let data = imageData.data;
                            for (let i = 0; i < data.length; i += 4) {
                                // (r+g+b)/3
                                const color = (data[i] + data[i+1] + data[i+2]) / 3;
                                data[i] = data[i+1] = data[i+2] = color;
                              }
                            croppedCanvas.putImageData(imageData, 0, 0);

                            // ConvertPngImage
                            let output = document.getElementById("output");
                            output.src = croppedCanvas.toDataURL();
                            output.style.display = "block"; //visible

                            // NoneDummyCanvas
                            croppedCanvas.style.display = "none";
                        }
                    }
                });
            }
        }
        image.src = evt.target.result;
    }
    reader.readAsDataURL(file);
}

//　Uploader
const uploader = document.getElementById('uploader');
uploader.addEventListener('change', cropImage);