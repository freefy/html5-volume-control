var obj = {
    init: function () {
        this.flag = false;
        this.dom = {
            moon: $('.moon')
        }
        this.bindEvent();
        this.change(0);
    },
    bindEvent: function () {
        var self = this,
            disX, disY
        moon = self.dom.moon;
        moon.on('mousedown', function (e) {
            self.flag = true;
            disX = e.clientX - moon.offset().left;
            disY = e.clientY - moon.offset().top;
        })
        $('body').on('mousemove', function (e) {
            if (!self.flag) return;
            moon.css({
                left: e.clientX - disX - $('.wrapper').offset().left,
                top: e.clientY - disY - $('.wrapper').offset().top
            });
            self.getVolume();
        }).on('mouseup', function () {
            self.flag = false;
        })
    },
    getVolume: function () {
        var self = this;
        var sun = $('.sun');
        var moon = self.dom.moon;
        var d, vol;
        d = parseInt(sun.css('width'));
        sunL = parseInt(sun.css('left'));
        sunT = parseInt(sun.css('top'));
        sunOx = sunL + d / 2;
        sunOy = sunT + d / 2;
        moonL = parseInt(moon.css('left'));
        moonT = parseInt(moon.css('top'));
        moonOx = moonL + d / 2;
        moonOy = moonT + d / 2;
        var mm = Math.sqrt((sunOx - moonOx) * (sunOx - moonOx) + (sunOy - moonOy) * (sunOy - moonOy));
        if (mm <= d) {
            vol = Math.abs(d - mm) / d;
        } else{
            vol = 0;
        }
 self.change(vol);

    },
    change: function (vol) {
        var self = this;
        $('audio')[0].volume = vol;
        $('.text span').html((vol * 100).toPrecision(4) + '%');
        self.dom.moon.css({
            background: 'hsl(223,40%,' + (1 - vol) * 60 + '%)'
        })
        $('body').css({
            background: 'hsl(' + (194 + Math.floor(120 * vol)) + ',66%,' + (1.2 - vol) * 50 + '%)'
        })
    },

}


obj.init();