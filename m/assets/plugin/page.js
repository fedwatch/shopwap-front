/**
 * 移动端分页展示
 * @OJH
 * 
 */

(function($,iSroll){
	
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
				url:"/",
				type:"get",
				dataType:"json",
				param:null,
				content:null,
				pageSize:20,
				searchProperty:"",
				searchValue:"",
				paginationParam:{
					pageSize:"T{pageSize}",
					pageNumber:"T{pageNumber}",
					searchProperty:"T{searchProperty}",
					searchValue:"T{searchValue}",
					orderProperty:"T{orderProperty}",
					orderDirection:"T{orderDirection}"
				},
				pagination:true,
				pullUpIdent:"page-pullUp",
				pullDownIdent:"page-pullDown",
				pullUpStatus:{
					normal:"上拉加载更多",
					release:"释放加载页面",
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
				distance:5,
				onBefore:null,
				onSuccess:null,
				onError:null,
				processResult:function(data) {
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

		var $container = _this.closest(".container");
		var availHeight = $container.height();
		_this.css({position:"relative",overflow:"hidden",height:availHeight});

		//分页对象
		var paginationObj = {
				pageable:false,
				segmentSize:6,
				pageNumber:1,
				pageSize:config.pageSize,
				totalPages:null,
				searchProperty:config.searchProperty,
				searchValue:config.searchValue,
				orderProperty:null,
				orderDirection:null,
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
            $.support.cors = true;
			var requestData = {};
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
				}
			});
			
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
			paginationObj.pageNumber = 1;
			var xhr = remoteLoadData(function(data){
				var htmlStr = invokeFn(config.processResult, data);
				var contentWrapper = fetchContentWrapper();
                contentWrapper.html(htmlStr);
				//refresh
				pullDownStatus("end");
				iscrollObj.refresh();
			});
			return xhr;
		}
		
		function executeLoadPage(){
			if(!paginationObj.hasNextPage()){
				pullUpStatus("noMore");
				return false;
			}
			
			paginationObj.pageNumber += 1;
			var xhr = remoteLoadData(function(data){
				var htmlStr = invokeFn(config.processResult, data);
				var contentWrapper = fetchContentWrapper();
                contentWrapper.append(htmlStr);
				//refresh
				pullUpStatus("end");
				iscrollObj.refresh();

			});
			
			return xhr;
		}
		
		//scroll config
		var scrollOption = {
			scrollbars : true,
			onRefresh: function () {
				var _thisScroll = this;
				
				var pStatus = pullDownStatus("normal");
				var uStatus = pullUpStatus("normal");
				var downDistance = pStatus.outerHeight();
				var upDistance = uStatus.outerHeight();
				refreshAble = false;
				loadAble = false;
				
				_thisScroll.minScrollY = -downDistance;
				
			},
			onScrollMove: function () {
				var _thisScroll = this;
				var pStatus = pullDownStatus();
				var uStatus = pullUpStatus();
				var downDistance = pStatus.outerHeight();
				var upDistance = uStatus.outerHeight();
				
				if(_thisScroll.y > config.distance && !pStatus.hasClass("release")){
					pullDownStatus("release");
					refreshAble = true;
					_thisScroll.minScrollY = 0;
				}else if(iscrollObj.y < config.distance && pStatus.hasClass("release")){
					pullDownStatus("normal");
					refreshAble = false;
					_thisScroll.minScrollY = -downDistance;
				}else if(_thisScroll.y  < (_thisScroll.maxScrollY - config.distance) && !uStatus.hasClass("release") ){
					pullUpStatus("release");
					loadAble = true;
                    //_thisScroll.maxScrollY = _thisScroll.maxScrollY;
				}else if(_thisScroll.y  > (_thisScroll.maxScrollY + config.distance) && uStatus.hasClass("release")){
					pullUpStatus("normal");
					loadAble = false;
                    //this.maxScrollY = upDistance;

				}


				console.log(_thisScroll.y + ":" + (_thisScroll.maxScrollY - config.distance));
				
			},
			onScrollEnd: function () {
				var _thisScroll = this;
				if(refreshAble){
					pullDownStatus("loading");
					executeRefresh();
				}else if(loadAble){
					pullUpStatus("loading");
					executeLoadPage();
					
				}
				
				
			}
		};

		$.extend(scrollOption, config.iscrollOption);
			
		var iscrollObj = new iScroll(_this.get(0), scrollOption);
		var refreshAble = false;
		var loadAble = false;
		
		//获取滚动元素
		function fetchContentWrapper(){
			var $scroller = $(iscrollObj.scroller);
			return $scroller.children(".contentWrapper");
		}
		
		//初始化状态
		function initStatus(){
			var contentWrapper = $("<div class='contentWrapper'></div>");
			var $scroller = $(iscrollObj.scroller);
			$scroller.wrapInner(contentWrapper);
			
			var dStatus = pullDownStatus("normal");
			$scroller.prepend(dStatus);
			var uStatus = pullUpStatus("normal");
			$scroller.append(uStatus);
			
			iscrollObj.refresh();
		}
		
		initStatus();
		executeRefresh();
		
		var cacheOp = {
			source:_this,
			scroller:iscrollObj,
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
	
})(jQuery,iScroll);
