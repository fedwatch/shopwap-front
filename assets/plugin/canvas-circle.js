$.fn.drawProcess = function(options) {
    var options = $.extend({
        loadAnimate      :true,      //开启进度条加载动画
        step             :5,         //动画步数时长
        endPointArc      :false,      //进度条开始、结束设置为弧形
        circleCenter     :36,        //圆心x坐标、y坐标
        outerCircleRadius:26,        //外圆半径
        outerCircleBg    :'#ccc',    //外圆背景颜色
        sectorRadius     :26,        //进度条扇形半径
        sectorBg         :'#00f',    //进度条扇形背景颜色
        innerCircleRadius:24,        //内圆半径
        innerCircleBg    :'#fff',    //内圆背景颜色
        textColor        :'#333',    //进度文字的颜色
        textSize         :'8pt',     //进度文字的大小：单位pt
        textFamily       :'Verdana', //进度文字的字体
        drawDirection	 :true,	 //默认顺时针画圆
    }, options);
    var circleCenter = options.circleCenter;
    $(this).each(function() {
        var self = this;
        var $self = $(this);
        this.width = $(this).css('width').replace('px', '');
        this.height = $(this).css('height').replace('px', '');
        var number = $self.attr('percent');
        // "画笔"
        var painter = this.getContext('2d');
        painter.globalCompositeOperation = 'source-over';
        // ie9以下的浏览器进行多个进度条动画时会很卡，直接禁用
        if(options.loadAnimate) {
            // 进度条的最终进度
            var process = parseFloat($self.attr('percent'));
            // 进度条加载时的当前进度
            var currentProcess = 0.0;
            // 定时重绘，形成进度条的加载动画
            timer = setInterval(function() {
                var num = process - currentProcess;
                if(num >=1) {
                    // 重绘之前先清空画布
                    painter.clearRect(0, 0, self.width, self.height);
                    draw();
                    currentProcess += options.step;
                }else if(num > 0 || num < 1){
                    painter.clearRect(0, 0, self.width, self.height);
                    draw();
                    currentProcess += num;
                }
            }, 30);
        }else{
            var text = number;
            var currentProcess = parseFloat($self.attr('percent'));
            draw();
        }

        function draw() {
            var text = currentProcess + '%';

            // 绘制外圆
            painter.beginPath();
            painter.moveTo(circleCenter, circleCenter);
            painter.arc(circleCenter, circleCenter, options.outerCircleRadius, 0, Math.PI * 2, false);
            painter.closePath();
            painter.fillStyle = options.outerCircleBg;
            painter.fill();

            // 绘制进度扇形
            painter.beginPath();
            painter.moveTo(circleCenter, circleCenter);
            if(currentProcess) {
            	//画圆方向
            	if(options.drawDirection){
            		painter.arc(circleCenter, circleCenter, options.sectorRadius,-0.5*Math.PI, Math.PI *2*(currentProcess/100)-Math.PI*0.5, false);
            	}else{// 逆时针
            		painter.arc(circleCenter, circleCenter, options.sectorRadius,1.5*Math.PI, Math.PI * (1.5-2 * currentProcess / 100 ), true);
            	}
            }
            painter.closePath();
            painter.fillStyle = options.sectorBg;
            painter.fill();

            // 绘制进度条开始、结束位置的圆弧
            if(options.endPointArc && currentProcess) {
                // 进度条开始位置的圆弧圆心坐标和半径
                var beginArcRadius = (options.sectorRadius - options.innerCircleRadius) / 2;
                var beginArcCenterX = circleCenter;
                var beginArcCenterY = (options.sectorRadius - options.innerCircleRadius) / 2 + (circleCenter - options.sectorRadius);
                painter.beginPath();
                painter.moveTo(beginArcCenterX, beginArcCenterY);
                painter.arc(beginArcCenterX, beginArcCenterY, beginArcRadius,  0, Math.PI*2, false);
                painter.closePath();
                painter.fillStyle = options.sectorBg;
                painter.fill();

                // 进度条结束的圆弧的圆心坐标和半径
                var endArcRadius = (options.sectorRadius - options.innerCircleRadius) / 2;
                var endArcCenterX = circleCenter + Math.sin(Math.PI * 2 * (currentProcess / 100)) * (options.sectorRadius - endArcRadius);
                var endArcCenterY = circleCenter - Math.cos(Math.PI * 2 * (currentProcess / 100)) * (options.sectorRadius - endArcRadius);
                painter.beginPath();
                painter.moveTo(endArcCenterX, endArcCenterY);
                painter.arc(endArcCenterX, endArcCenterY, endArcRadius, 0, Math.PI*2, false);
                painter.closePath();
                painter.fillStyle = options.sectorBg;
                painter.fill();
            }

            // 绘制内圆
            painter.beginPath();
            painter.moveTo(circleCenter, circleCenter);
            painter.arc(circleCenter, circleCenter, options.innerCircleRadius, 0, Math.PI * 2, false);
            painter.closePath();
            painter.fillStyle = options.innerCircleBg;
            painter.fill();
            painter.fillStyle = options.textColor;
            // 绘制中间的字体
            painter.font = options.textSize + " " + options.textFamily;
            painter.textAlign = 'center';
            painter.textBaseline = 'middle';
            painter.moveTo(circleCenter, circleCenter);
            painter.fillText(text, circleCenter, circleCenter);
        }
    });
}