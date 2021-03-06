// JavaScript Document
(function($){
	$.fn.textScrollUp = function(options){
	//默认配置
	var defaults = {
		speed:40,  //滚动速度,值越大速度越慢
		rowHeight:24 //每行的高度
	};

	var opts = $.extend({}, defaults, options),intId = [];

	function marquee(obj, step){

		obj.find("ul").animate({
			marginTop: '-=1'
		},0,function(){
			var s = Math.abs(parseInt($(this).css("margin-top")));
			if(s >= step){
				$(this).find("li").slice(0, 1).appendTo($(this));
				$(this).css("margin-top", 0);
				//setTimeout("marquee('obj,step')",1000)
			}
		});
	}

		this.each(function(i){
			var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);

			intId[i] = setInterval(function(){
				if(_this.find("ul").height()<=_this.height()){
					clearInterval(intId[i]);
				}else{
					marquee(_this, sh)
				}
			}, speed);

			var s = Math.abs(parseInt(_this.find("ul").css("margin-top")));
			//console.log(intId[i])
			_this.on('touchstart',function(){
				clearInterval(intId[i]);
			})
			_this.on('touchend',function(){
				intId[i] = setInterval(function(){
					if(_this.find("ul").height()<=_this.height()){
						clearInterval(intId[i]);
					}else{
						marquee(_this, sh)

					}
				}, speed);
			})

		});

	}

})(jQuery);