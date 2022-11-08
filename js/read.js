if (window.File) {
    var dropArea = document.querySelector('#main');
    dropArea.addEventListener('dragover', (e) => {
        e.stopPropagation();
        e.preventDefault();
    }, false);
 
    dropArea.addEventListener('drop', (e) => {
        e.stopPropagation();
        e.preventDefault();
 
        var fileData = e.dataTransfer.files;
        file = fileData[0];
 
        if(!file.type.match(/^image/)) {
            alert('画像を選択してください。');
            return;
        }

        image = new Image();
        var reader = new FileReader();
        reader.onerror = () => {
            alert('ファイルの読み取りに失敗しました。');
        }

        reader.onload = (e) => {
            image.onload = () => {
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
            image.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }, false);
}