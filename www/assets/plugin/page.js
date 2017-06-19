/**
 * 移动端分页展示
 * @OJH
 * 
 */

(function($,ISroll){
	
	$.fn.page = function(options){
		var _this = this;
		if(_this.length == 0){
			console.error("selector not found - " + _this.selector);
			return null;
		}
		
		var tmpCacheOp = _this.data("ext-page");
		if(tmpCacheOp != null){
			return tmpCacheOp;
		}
		
		var config = {
				url:"/",//
				type:"get",
				dataType:"json",
				param:null,
				content:null,
				pageSize:20,
				paginationParam:{
					pageSize:"T{pageSize}",
					pageNumber:"T{pageNumber}",
				},
				refresh:true,
				pagination:true,
				scrollerClass:"page-scroller",
				contentClass:"contentWrapper",
				pullUpIdent:"page-pullUp",
				pullDownIdent:"page-pullDown",
				pullUpStatus:{
					normal:"上拉加载更多",
					release:"释放加载更多",
					loading:"正在加载数据",
					end:"加载完成",
					noMore:"没有更多数据了"
				},
				pullDownStatus:{
					normal:"下拉开始刷新",
					release:"释放刷新页面",
					loading:"正在加载数据",
					end:"加载完成"
				},
				iscrollOption:null,
				distance:0,
				releaseTime:200,
				onBefore:null,
				onSuccess:null,
				onError:null,
				processResult:function(data){
					return JSON.stringify(data);
				}
		};
		
		//获取配置
		if(_this.attr("data-url") != null){
			config.url = _this.attr("data-url");
		}
		
		if(_this.attr("data-options") != null){
			var optionStr = _this.attr("data-options");
			try{
				var optionObj = new Function("return {" +  optionStr + "}").call(_this);
				$.extend(config, optionObj);
			}catch(e){
				console.error("data-options read fail", e.stack );
			}
		}
		
		$.extend(config, options);
		
		_this.css({display:"block",position:"relative", overflow:"hidden",maxHeight:"100%"});
		var  $scrollerChild = _this.children();
		if($scrollerChild.length != 1){
			_this.wrapInner("<div class='"+config.scrollerClass+"'></div>");
		}
		
		
		//分页对象
		var paginationObj = {
				pageable:false,
				pageNumber:1,
				pageSize:config.pageSize,
				totalPages:null,
				hasPreviousPage:function(){
					if(this.pageNumber > 0){
						return true;
					}
					
					return false;
				},
				hasNextPage:function(){
					if(this.totalPages != null){
						return this.pageNumber < this.totalPages;
					}
					
					return true;
				},
				isOutSide:function(pageNum){
					if(pageNum <= 0){
						return true;
					}
					if(this.totalPages != null && pageNum > this.totalPages){
						return true;
					}
					
					return false;
				}
		};
		
		
		var reverseTime = null;
		var isStart = false;
		var cacheXhr = null;
		//scroll config
		var scrollOption = {
			scrollbars : true,
			fadeScrollbars:true,
			shrinkScrollbars:"scale",
			bounce:true,
			probeType:2
		};

		$.extend(scrollOption, config.iscrollOption);
			
		var iscrollObj = new IScroll(_this.get(0), scrollOption);
		
		iscrollObj.on("scrollStart", function(){
			var _thisScroll = this;
			isStart =  true;
			
			if(config.refresh){
				pullDownStatus("normal");
			}
			
			if(config.pagination){
				pullUpStatus("normal");
			}
			
		});
		
		iscrollObj.on("scroll",function(){
			var _thisScroll = this;
			
			//刷新支持
			if(config.refresh){
				var pStatus = pullDownStatus();
				var downDistance = pStatus.outerHeight();
				
				if(_thisScroll.y >= config.distance){
					pullDownStatus("release");
				}else if(_thisScroll.y > (-1 * downDistance)){
					pullDownStatus("normal");
				}
				
			}
			
			//分页支持
			if(config.pagination){
				var uStatus = pullUpStatus();
				var upDistance = uStatus.outerHeight();
				if(_thisScroll.y <= _thisScroll.maxScrollY){
					pullUpStatus("release");
				}else if(_thisScroll.y < (_thisScroll.maxScrollY + upDistance)){
					pullUpStatus("normal");
				}
			}
			
		});
		
		iscrollObj.on("scrollEnd", function(){
			if(!isStart){
				return false;
			}
			
			var _thisScroll = this;
			//刷新支持
			if(config.refresh){
				var pStatus = pullDownStatus();
				var downDistance = pStatus.outerHeight();
				
				if(_thisScroll.y >= config.distance ){
					executeRefresh();
				}else if(_thisScroll.y > (-1 * downDistance)){
					_thisScroll.scrollTo(0, (-1 * downDistance), config.releaseTime);
				}
				
			}
			
			//分页支持
			if(config.pagination){
				var uStatus = pullUpStatus();
				var upDistance = uStatus.outerHeight();
				if(_thisScroll.y <= _thisScroll.maxScrollY){
					executeLoadPage();
				}else if(_thisScroll.y < (_thisScroll.maxScrollY + upDistance)){
					_thisScroll.scrollTo(0, (_thisScroll.maxScrollY + upDistance), config.releaseTime);
				}
			}
			
			isStart =  false;
			
		});
		
		
		/**
		 * 参数转换
		 * 
		 */
		function convertParam(paramData, baseData){
			if(paramData != null && baseData != null){
				var tPattern = /T\{\s*(\w+)\s*\}/; 
				for(var key in paramData){
					var val = paramData[key];
					if(val != null && typeof val == "string" && tPattern.test(val) != null){
						val = val.replace(tPattern,function(p0,p1){
							return baseData[p1] == null ?  "" : baseData[p1];
						});
						paramData[key] = val;
					}
				}
			}
			
			return paramData;
		}
		
		function invokeFn(fn){
			try{
				var args = Array.prototype.slice.call(arguments,1);
				return fn && fn.apply(_this,args);
			}catch(e){
				console.error("invoke " + fn.name + " error", e.stack);
			}
		}
		
		/**
		 * 加载远程数据
		 * 
		 */
		function remoteLoadData(callBack){
			var requestData = {};
			
			if(cacheXhr != null && cacheXhr.readyState > 0 && cacheXhr.readState < 4){
				cacheXhr.abort();
			}
			
			$.extend(requestData, config.param);
			if(config.pagination){
				var newParam = $.extend({},config.paginationParam);
				convertParam(newParam, paginationObj);
				$.extend(requestData, newParam);
			}
			
			var xhr = $.ajax({
				url:config.url,
				type:config.type,
				data:requestData,
				dataType:config.dataType,
				beforeSend:function(xhr){
					invokeFn(config.onBefore, xhr);
				},
				success:function(data, textStatus,xhr){
					if(data == null){
						data = {};
					}
					
					if(data.pageNumber != null){
						paginationObj.pageNumber = data.pageNumber;
					}
					
					if(data.totalPages != null){
						paginationObj.totalPages = data.totalPages;
					}
					
					callBack(data);
					invokeFn(config.onSuccess, data, textStatus, xhr);
				},
				error:function(xhr,textStatus, er){
					console.error("load data fail - " + er);
					invokeFn(config.onError, xhr,textStatus, er);
				},
				complete:function(){
					completeHandler();
				}
				
			});
			
			cacheXhr = xhr;
			
			return xhr;
		}
		
		function pullUpStatus(status){
			var statusDom = _this.find("." + config.pullUpIdent);
			if(statusDom.length == 0){
				statusDom = $("<div></div>");
				statusDom.addClass(config.pullUpIdent);
			}
			
			if(status != null){
				var statusObj = config.pullUpStatus;
				$.each(statusObj,function(key, value){
					statusDom.removeClass(key);
				});
				
				statusDom.addClass(status);
				statusDom.html(statusObj[status]);
			}
			
			return statusDom;
		}
		
		function pullDownStatus(status){
			var statusDom = _this.find("." + config.pullDownIdent);
			if(statusDom.length == 0){
				statusDom = $("<div></div>");
				statusDom.addClass(config.pullDownIdent);
			}
			
			if(status != null){
				var statusObj = config.pullDownStatus;
				$.each(statusObj,function(key, value){
					statusDom.removeClass(key);
				});
				statusDom.addClass(status);
				statusDom.html(statusObj[status]);
			}
			
			return statusDom;
		}
		
		
		//刷新操作
		function executeRefresh(){
			pullDownStatus("loading");
			paginationObj.pageNumber = 1;
			var xhr = remoteLoadData(function(data){
				var htmlStr = invokeFn(config.processResult, data);
				fetchContentWrapper().html(htmlStr);
				//refresh
				pullDownStatus("end");
			});
			return xhr;
		}
		
		function executeLoadPage(){
			if(!paginationObj.hasNextPage()){
				pullUpStatus("noMore");
				completeHandler();
				return false;
			}
			
			pullUpStatus("loading");
			paginationObj.pageNumber += 1;
			var xhr = remoteLoadData(function(data){
				var htmlStr = invokeFn(config.processResult, data);
				fetchContentWrapper().append(htmlStr);
				//refresh
				pullUpStatus("end");
			});
			
			return xhr;
		}
		
		
		function completeHandler(){
			iscrollObj.refresh();
			clearTimeout(reverseTime);
			reverseTime = setTimeout(function(){
				var _thisScroll = iscrollObj;
				//刷新支持
				if(config.refresh){
					var pStatus = pullDownStatus();
					var downDistance = pStatus.outerHeight();
					if(_thisScroll.y > (-1 * downDistance)){
						isStart =  false;
						_thisScroll.scrollTo(0, (-1 * downDistance), config.releaseTime);
					}
					
				}
				
				//分页支持
				if(config.pagination){
					var uStatus = pullUpStatus();
					var upDistance = uStatus.outerHeight();
					if(_thisScroll.y < (_thisScroll.maxScrollY + upDistance)){
						isStart =  false;
						_thisScroll.scrollTo(0, (_thisScroll.maxScrollY + upDistance), config.releaseTime);
					}
					
				}
				
			},60);
		}
		
		
		//获取滚动元素
		function fetchContentWrapper(){
			var $scroller = $(iscrollObj.scroller);
			return $scroller.children("." + config.contentClass);
		}
		
		//初始化状态
		function initStatus(){
			var contentWrapper = $("<div class='"+config.contentClass+"'></div>");
			var $scroller = $(iscrollObj.scroller);
			$scroller.wrapInner(contentWrapper);
			
			//设置内容的最小高度
			fetchContentWrapper().css({minHeight:$(iscrollObj.wrapper).height()});
			
			if(config.refresh){
				var dStatus = pullDownStatus("normal");
				$scroller.prepend(dStatus);
			}
			
			if(config.pagination){
				var uStatus = pullUpStatus("normal"); 
				$scroller.append(uStatus);
			}
			
			iscrollObj.refresh();
		}
		
		initStatus();
		executeRefresh();
		
		var cacheOp = {
			source:_this,
			scroller:iscrollObj,
			paginationObj:paginationObj,
			setTotalPages:function(totalPages){
				if(!isNaN(totalPages)){
					this.paginationObj.totalPages = totalPages;
				}
			},
			load:function(param){
				config.param = param;
				executeRefresh();
			},
			refresh:function(){
				this.scroller.refresh();
			},
			destroy:function(){
				this.iscrollObj.destroy();
				this.source.removeData("ext-page");
			}
		};
		
		
		_this.data("ext-page",cacheOp);
		
		return cacheOp;
	};
	
})(jQuery,IScroll);
