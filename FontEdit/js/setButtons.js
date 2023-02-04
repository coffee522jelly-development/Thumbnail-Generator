// ResetParams
let btnResetParam = document.querySelector('#ResetParam');
btnResetParam.addEventListener('click', resetParam);

// Grayish
let btnGrayish= document.querySelector('#Grayish');
btnGrayish.addEventListener('click', (e) => {
    resetParam();

    GrayScale = 80;
    inputGrayScale.value = GrayScale;
    Opacity = 0.8;
    inputOpacity.value = Opacity;
    
    initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// Vivid
let btnVivid = document.querySelector('#Vivid');
btnVivid.addEventListener('click', (e) => {
    resetParam();

    Contrast = 150;
    inputContrast.value = Contrast;
    Saturate = 200;
    inputSaturate.value = Saturate;

    initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// BrightSepia
let btnBrightSepia= document.querySelector('#BrightSepia');
btnBrightSepia.addEventListener('click', (e) => {
    resetParam();

    Sepia = 80;
    inputSepia.value = Sepia;
    Brightness = 110;
    inputBrightness.value = Brightness;
    
    initResultSetting(document.querySelector("#sourceCanvas"), false);
});

// Darkness
let btnDarkness= document.querySelector('#Darkness');
btnDarkness.addEventListener('click', (e) => {
    resetParam();

    Contrast = 200;
    inputContrast.value = Contrast;
    Brightness = 50;
    inputBrightness.value = Brightness;
    Opacity = 0.5;
    inputOpacity.value = Opacity;
    Saturate = 40;
    inputSaturate = Saturate;
    
    initResultSetting(document.querySelector("#sourceCanvas"), false);
});

function resetParam(){
    Brightness 	= 100;
    Blur 		= 0;
    Contrast 	= 100;
    GrayScale 	= 0;
    Hue	 		= 0;
    Invert 		= 0; 
    Sepia 		= 0;
    Saturate 	= 100;
    Opacity 	= 1.0;

    inputBrightness.value = Brightness;
    inputBlur.value = Blur;
    inputContrast.value = Contrast;
    inputGrayScale.value = GrayScale;
    inputHue.value = Hue;
    inputInvert.value = Invert;
    inputSepia.value = Sepia;
    inputSaturate.value = Saturate;
    inputOpacity.value = Opacity;
    initResultSetting(document.querySelector("#sourceCanvas"), false);

    // Display
    let indiBrightness = document.querySelector('#indiBrightness');
    indiBrightness.innerHTML = 'Brightness:' + inputBrightness.value + '';

    let indiBlur = document.querySelector('#indiBlur');
    indiBlur.innerHTML = 'Blur:' + inputBlur.value + '';

    let indiContrast = document.querySelector('#indiContrast');
    indiContrast.innerHTML = 'Contrast:' + inputContrast.value + '';

    let indiGrayScale = document.querySelector('#indiGrayscale');
    indiGrayScale.innerHTML = 'GrayScale:' + inputGrayScale.value + '';

    let indiHue = document.querySelector('#indiHue');
    indiHue.innerHTML = 'Hue:' + inputHue.value + '';

    let indiInvert = document.querySelector('#indiInvert');
    indiInvert.innerHTML = 'Invert:' + inputInvert.value + '';

    let indiSepia = document.querySelector('#indiSepia');
    indiSepia.innerHTML = 'Sepia:' + inputSepia.value + '';

    let indiSaturate = document.querySelector('#indiSaturate');
    indiSaturate.innerHTML = 'Saturate:' + inputSaturate.value + '';
    
    let indiOpacity = document.querySelector('#indiOpacity');
    indiOpacity.innerHTML = 'Opacity:' + inputOpacity.value + '';
}