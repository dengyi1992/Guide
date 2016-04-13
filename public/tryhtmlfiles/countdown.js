(function() {
    function Countdown(opts) {
        this.init(opts);
    }

    Countdown.prototype = {
        init: function(opts) {
            this.config = {
                elem: typeof opts.container == 'string' ? $('#' + opts.container) : opts.container,
                onchange: function(argument) {

                },

                oncomplete: function(argument) {
                    // console.log('complete');
                }
            }

            $.extend(this.config, opts);

            this.count();
        },

        initElem: function() {
            var elem = this.config.elem;

            try{
                this.config.elemDay = elem.find('[count-day]');
                this.config.elemHour = elem.find('[count-hour]');
                this.config.elemMin = elem.find('[count-min]');
                this.config.elemSec = elem.find('[count-sec]');
                this.config.elemMsec = elem.find('[count-msec]');
            }catch(e){
                console.log('elem is not a jQuery object');
                return false;
            }

            return true;
        },

        addZero: function(num, digit) {
            var numStr = num.toString(),
                digit = digit ? digit : 2;

            for (var i = numStr.length; i < digit; i++) {
                numStr = '0' + numStr;
            };

            return numStr;
        },

        handleCount: function(timer) {
            var remain = this.getRemain();

            this.handleHtml();

            if (remain <= 0) {
                this.config.oncomplete();
                clearInterval(timer);
            }
        },

        count: function() {
            var _this = this;
            var timer = setInterval(function() {
                _this.handleCount(timer);
            }, 100);

            _this.handleCount(timer);
        },

        getDate : function (strDate) {
            var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
             function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
            return date;
        },

        getRemain: function() {
            var config = this.config,
                start = config.startTime ? this.getDate(config.startTime).getTime() : new Date().getTime(),
                end = config.endTime ? this.getDate(config.endTime).getTime() : new Date().getTime(),
                remain = end - start,
                remain = remain <= 0 ? 0 : remain,
                day = Math.floor(remain / (24 * 60 * 60 * 1000)),
                hour = Math.floor(remain / (60 * 60 * 1000) % 24),
                min = Math.floor(remain / (60 * 1000) % 60),
                sec = Math.floor(remain / 1000 % 60),
                msec = Math.floor(remain % 1000);

            this.config.day = this.addZero(day);
            this.config.hour = this.addZero(hour);
            this.config.min = this.addZero(min);
            this.config.sec = this.addZero(sec);
            this.config.msec = config.msecDigit == 1 ? Math.floor(msec / 100) : this.addZero(msec,3);

            return remain;
        },

        separateStr : function (str,special) {
            var arry = str.toString().split(''),
                html = '';

            for (var i = 0; i < arry.length; i++) {
                html += '<span'+ (special ? ' class="msec"' : '') +'>' + arry[i] + '</span>';
            };

            return html;
        },

        handleHtml: function() {
            var config = this.config,
                html = '';

            html = (parseInt(config.day,10) == 0 ? '' : (this.separateStr(config.day) + ' 天 ')) +
                this.separateStr(config.hour) + ' 时 ' +
                this.separateStr(config.min) + ' 分 ' +
                this.separateStr(config.sec) + ' 秒 ' +
                this.separateStr(config.msec,true) ;

            config.elem.html(html);
        }
    };

    window.Countdown = Countdown;

})();
