;(function($){
	$.fn.keyboard = function(options){
		var defaults = {
			divId : 'keyboard_id',
			zIndex : 10000,
			width : '100%',
			fontSize : '15px',
			backgroundColor : '#fff',
			table_id : 'table_0909099',
			keyboardName : '密码安全键盘',
			funStep1 : function(){},
			funStep2 : function(){},
			finishPwd : function(){}
		}

		var body = document.getElementsByTagName('body')[0];
		var opt = $.extend({}, defaults, options);
		var self = this;
		var DIV_ID = opt.divId;
		var zIndex = opt.zIndex;
		var width = opt.width;
		var height = opt.height;
		var fontSize = opt.fontSize;
		var backgroundColor = opt.backgroundColor;
		var TABLE_ID = opt.table_id;
		var mobile = typeof orientation !== 'undefined';
		var maxlength = $(this).attr('maxlength');
		if(document.getElementById(DIV_ID)){
			body.removeChild(document.getElementById(DIV_ID));
		}
		this.el = document.createElement('div');
		this.el.id = DIV_ID;
		this.el.style.position = 'absolute';
		this.el.style.left = 0;
		this.el.style.right = 0;
		this.el.style.bottom = 0;
		this.el.style.zIndex = zIndex;
		this.el.style.width = width;
		this.el.style.height = height;
		this.el.style.backgroundColor = backgroundColor;

		this.input = $(this)[0];

		//样式
		var cssStr = '<style type="text/css">';
		cssStr += '#'+DIV_ID+' {-webkit-user-select:none;}';
		cssStr += '#' + TABLE_ID + '{text-align:center;width:100%;height:160px;border-top:1px solid #CECDCE;background-color:#FFF;}';
		cssStr += '#' + TABLE_ID + ' td{width:33%;border:1px solid #ddd;border-right:0;border-top:0;}';
		if(!mobile){
			cssStr += '#' + TABLE_ID + ' td:hover{background-color:#1FB9FF;color:#FFF;}';
		}
		cssStr += '</style>';
		//Button
		var btnStr = '<div style="text-align:center;position:relative;line-height:35px;color:#333;">'+opt.keyboardName+'<div style="width:60px;';
		btnStr += 'right:5px;top:0;color:#1FB9FF;';
		btnStr += 'cursor:pointer;position:absolute;">完成</div></div>';
		//table
		var tableStr = '<table id="' + TABLE_ID + '" border="0" cellspacing="0" cellpadding="0">';
			tableStr += '<tr><td>1</td><td>2</td><td>3</td></tr>';
			tableStr += '<tr><td>4</td><td>5</td><td>6</td></tr>';
			tableStr += '<tr><td>7</td><td>8</td><td>9</td></tr>';
			tableStr += '<tr><td style="background-color:#D3D9DF;">.</td><td>0</td>';
			tableStr += '<td style="background-color:#D3D9DF;">删除</td></tr>';
			tableStr += '</table>';

		//$('#'+DIV_ID).html(cssStr + btnStr + tableStr)
		this.el.innerHTML = cssStr + btnStr + tableStr;
		var key_cont = $(this).attr('data-cont')==undefined?0 : $(this).attr('data-cont');
		function addEvent(e){
			var ev = e || window.event;
			var clickEl = ev.element || ev.target;
			var value = clickEl.textContent || clickEl.innerText;
			if(self.input.getAttribute('data-reset')==1){
				self.input.value = '';
				key_cont=0;
				self.input.setAttribute('data-reset',0)
				//self.input.setAttribute('data-cont',0)
			}
			if(clickEl.tagName.toLocaleLowerCase() === 'td' && value !== "删除"){
				if(self.input){
					key_cont++
					if(key_cont>maxlength){
						//key_cont = maxlength;
						return ;
					}
					self.input.value += value;
					opt.funStep1();//数字输入的时候
					if(key_cont==maxlength){
						opt.finishPwd();//密码输完的时候
					}
				}
			}else if(clickEl.tagName.toLocaleLowerCase() === 'div' && value === "完成"){
				body.removeChild(self.el);
				self.input.setAttribute('data-cont',key_cont)
			}else if(clickEl.tagName.toLocaleLowerCase() === 'td' && value === "删除"){
				var num = self.input.value;
				if(num){
					key_cont--
					if(key_cont<0){
						key_cont = 0
						return false;
					}
					var newNum = num.substr(0, num.length - 1);
					self.input.value = newNum;
					opt.funStep2();//点击删除的时候
				}
			}
			//console.log('pwd='+self.input.value+' , key_cont='+key_cont)
		}

		if(mobile){
			this.el.ontouchstart = addEvent;
		}else{
			this.el.onclick = addEvent;
		}
		body.appendChild(this.el);




	}
})(jQuery)