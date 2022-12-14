////////////////////////////////////////////////////////////// チェックボックス
///////////////////////////////////////////// フォント設定(f ~)
let   bfontDraw 	    = false;
let   bfontOutLine 		= false;
let   bfontEmphasis 	= false;
let   fontBold 	        = '';
let   fontItalic 	    = '';

/*フォント描画するか？*/
const fDrawFont = new Vue({
    el:'#fontDraw',
    data: {
        isChecked: true
    },
    methods: {
        setFontDraw: function() {
            updateShapeCheckState();
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
});

/*太字*/
const fBold = new Vue({
    el:'#fontBold',
    data: {
        isChecked: false
    },
    methods: {
        setBold: function() {
            fontBold = (this.isChecked) ? 'bold' : '';
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
});


/*イタリック*/
const fItalic = new Vue({
    el:'#fontItalic',
    data: {
        isChecked: false
    },
    methods: {
        setItalic: function() {
            fontItalic = (this.isChecked) ? 'italic' : '';
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
});


/*アウトライン*/
const fOutline = new Vue({
    el:'#fontOutLine',
    data: {
        isChecked: false
    },
    methods: {
        setOutLine: function() {
            bfontOutLine = this.isChecked;
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
});


/*強調表現*/
const fEmphasis = new Vue({
    el:'#fontEmphasis',
    data: {
        isChecked: false
    },
    methods: {
        setEmphasis: function() {
            bfontEmphasis = this.isChecked;
            updateFontCheckState();
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
});

///////////////////////////////////////////// 形状描画設定(s ~)
let   bShape 			= false;	
let   bShapeFill 		= false;
let   bShapeDash 		= false;
let   bShapeBackGround 	= false;
let   bShapeGradient    = false;

/*形状描画するか？*/
const sDrawShape = new Vue({
    el:'#drawShape',
    data: {
        isChecked: true
    },
    methods: {
        setShapeDraw: function() {
            updateShapeCheckState();
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
});


/*背景描画するか？*/
const sDrawBackGround = new Vue({
    el:'#drawBackGround',
    data: {
        isChecked: false
    },
    methods: {
        setBackGround: function() {
            updateShapeCheckState();
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
});


/*形状ダッシュ化*/
const sDrawShapeDash = new Vue({
    el:'#drawShapeDash',
    data: {
        isChecked: false
    },
    methods: {
        setShapeDash: function() {
            bShapeDash = this.isChecked;
            updateShapeCheckState();
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
});


/*形状塗りつぶし*/
const sDrawShapeFill = new Vue({
    el:'#drawShapeFill',
    data: {
        isChecked: true
    },
    methods: {
        setShapeFill: function() {
            bShapeFill = this.isChecked;
            updateShapeCheckState();
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
});


/*形状グラデーション*/
const sDrawShapeGradient = new Vue({
    el:'#drawShapeGradient',
    data: {
        isChecked: false
    },
    methods: {
        setShapeGradient: function() {
            bShapeGradient = this.isChecked;
            updateShapeCheckState();
            initResultSetting(document.querySelector("#sourceCanvas"), false);
        }
    }
})


