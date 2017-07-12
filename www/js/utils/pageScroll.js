/**
 * 移动端分页展示
 * @OJH
 *
 */

(function ($, IScroll) {

    $.fn.page = function (options) {
        var _this = this;
        if (_this.length == 0) {
            console.error("selector not found - " + _this.selector);
            return null;
        }

        var tmpCacheOp = _this.data("ext-page");
        if (tmpCacheOp != null) {
            return tmpCacheOp;
        }

        var config = {
            url: "/",
            type: "get",
            dataType: "json",
            param: null,
            content: null,
            pageSize: 20,
            searchProperty: "",
            searchValue: "",
            paginationParam: {
                pageSize: "T{pageSize}",
                pageNumber: "T{pageNumber}",
                searchProperty: "T{searchProperty}",
                searchValue: "T{searchValue}",
                orderProperty: "T{orderProperty}",
                orderDirection: "T{orderDirection}"
            },
            pagination: true,
            pullUpIdent: "page-pullUp",
            pullDownIdent: "page-pullDown",
            pullUpStatus: {
                normal: "上拉加载更多",
                release: "释放加载页面",
                loading: "正在加载数据",
                end: "加载完成"
            },
            pullDownStatus: {
                normal: "下拉开始刷新",
                release: "释放刷新页面",
                loading: "正在加载数据",
                end: "加载完成"
            },
            iscrollOption: null,
            distance: null,
            onBefore: null,
            onSuccess: null,
            onError: null,
            processRefresh: function (data) {
                return JSON.stringify(data);
            },
            processLoadPage: function (data) {
                return JSON.stringify(data);
            }
        };

        //获取配置
        if (_this.attr("data-url") != null) {
            config.url = $this.attr("data-url");
        }

        if (_this.attr("data-options") != null) {
            var optionStr = $this.attr("data-options");
            try {
                var optionObj = new Function("return {" + optionStr + "}").call(_this);
                $.extend(config, optionObj);
            } catch (e) {
                console.error("data-options read fail", e.stack);
            }
        }

        $.extend(config, options);

        //分页对象
        var paginationObj = {
            pageable: false,
            segmentSize: 6,
            pageNumber: 1,
            pageSize: config.pageSize,
            totalPages: null,
            searchProperty: config.searchProperty,
            searchValue: config.searchValue,
            orderProperty: null,
            orderDirection: null,
            hasPreviousPage: function () {
                if (this.pageNumber > 0) {
                    return true;
                }

                return false;
            },
            hasNextPage: function () {
                if (this.totalPages != null) {
                    return this.pageNumber < this.totalPages;
                }

                return true;
            },
            isOutSide: function (pageNum) {
                if (pageNum <= 0) {
                    return true;
                }
                if (this.totalPages != null && pageNum > this.totalPages) {
                    return true;
                }

                return false;
            }
        };

        /**
         * 参数转换
         *
         */
        function convertParam(paramData, baseData) {
            if (paramData != null && baseData != null) {
                var tPattern = /T\{\s*(\w+)\s*\}/;
                for (var key in paramData) {
                    var val = paramData[key];
                    if (val != null && typeof val == "string" && tPattern.test(val) != null) {
                        val = val.replace(tPattern, function (p0, p1) {
                            return baseData[p1] == null ? "" : baseData[p1];
                        });
                        paramData[key] = val;
                    }
                }
            }

            return paramData;
        }

        function invokeFn(fn) {
            try {
                var args = Array.prototype.slice.call(arguments, 1);
                return fn && fn.apply(_this, args);
            } catch (e) {
                console.error("invoke " + fn.name + " error", e.stack);
            }
        }

        /**
         * 加载远程数据
         *
         */
        function remoteLoadData(callBack) {
            var requestData = {};

            $.extend(requestData, config.param);
            if (config.pagination) {
                var newParam = $.extend({}, config.paginationParam);
                convertParam(newParam, paginationObj);
                $.extend(requestData, newParam);
            }

            var xhr = $.ajax({
                url: config.url,
                type: config.type,
                data: requestData,
                dataType: config.dataType,
                beforeSend: function () {
                    invokeFn(config.onBefore, data, textStatus, xhr);
                },
                success: function (data, textStatus, xhr) {
                    if (data == null) {
                        data = {};
                    }
                    if (data.totalPages != null) {
                        paginationObj.totalPages = data.totalPages;
                    }

                    callBack(data);
                    invokeFn(config.onSuccess, data, textStatus, xhr);
                },
                error: function (xhr, textStatus, er) {
                    console.error("load data fail - " + er);
                    invokeFn(config.onError, xhr, textStatus, er);
                }
            });

            return xhr;
        }

        function pullUpStatus(status) {
            var statusDom = _this.find("." + config.pullUpIdent);
            if (statusDom.length == 0) {
                statusDom = $("<div></div>");
                statusDom.addClass(config.pullUpIdent);
            }

            if (status != null) {
                var statusObj = config.pullUpStatus;
                statusDom.addClass(status);
                statusDom.html(statusObj[status]);
            }

            return statusDom;
        }

        function pullDownStatus(status) {
            var statusDom = _this.find("." + config.pullDownIdent);
            if (statusDom.length == 0) {
                statusDom = $("<div></div>");
                statusDom.addClass(config.pullDownIdent);
            }

            if (status != null) {
                var statusObj = config.pullDownStatus;
                statusDom.addClass(status);
                statusDom.html(statusObj[status]);
            }

            return statusDom;
        }


        //刷新操作
        function executeRefresh(iscrollObj) {
            var xhr = remoteLoadData(function (data) {
                var htmlStr = invokeFn(config.processRefresh, data);
                $(iscrollObj.scroller).html(htmlStr);
                initStatus();
            });
            return xhr;
        }

        function executeLoadPage(iscrollObj) {
            var xhr = remoteLoadData(function (data) {
                var htmlStr = invokeFn(config.processLoadPage, data);
                $(iscrollObj.scroller).append(htmlStr);
                initStatus();
            });
            return xhr;
        }

        //scroll config
        var scrollOption = {
            probeType: 1,
            scrollbars: true
        };

        $.extend(scrollOption, config.iscrollOption);

        var iscrollObj = new IScroll(_this.get(0), scrollOption);
        var refreshAble = false;
        var loadAble = false;
        //开始滚动
        iscrollObj.on("scrollStart", function () {
            pullDownStatus("normal");
            pullUpStatus("normal");
            refreshAble = false;
            loadAble = false;
        });

        //滚动中
        iscrollObj.on("scroll", function () {
            var upDistance = config.distance;
            if (upDistance == null) {
                upDistance = pullUpStatus().innerHeight();
            }

            var downDistance = config.distance;
            if (downDistance == null) {
                downDistance = pullDownStatus().innerHeight();
            }


            if (iscrollObj.y > upDistance) {
                pullDownStatus("release");
                refreshAble = true;
            } else {
                pullDownStatus("normal");
                refreshAble = false;
            }

            if (iscrollObj.y <= (iscrollObj.maxScrollY - downDistance)) {
                pullUpStatus("release");
                loadAble = true;
            } else {
                pullUpStatus("normal");
                loadAble = false;
            }

        });

        //滚动结束
        iscrollObj.on("scrollEnd", function () {
            if (refreshAble) {
                //停止回跳
                pullDownStatus("loading");
                var xhr = executeRefresh(iscrollObj);
                xhr.done(function () {
                    pullDownStatus("end");
                    iscrollObj.refresh();
                });
            }

            if (loadAble) {
                //停止回跳
                pullUpStatus("loading");
                var xhr = executeLoadPage(iscrollObj);
                xhr.done(function () {
                    pullUpStatus("end");
                    iscrollObj.refresh();
                });

            }

        });

        //初始化状态
        function initStatus() {
            var $scroller = $(iscrollObj.scroller);
            var dStatus = pullDownStatus("normal");
            $scroller.prepend(dStatus);
            var uStatus = pullUpStatus("normal");
            $scroller.append(uStatus);
        }

        initStatus();


        var cacheOp = {
            scroller: iscrollObj,
            load: function (param) {
                config.param = param;
                executeRefresh();
            },
            refresh: function () {
                this.scroller.refresh();
            },
            destroy: function () {
                this.iscrollObj.destroy();
                $this.removeData("ext-page");
            }
        };


        _this.data("ext-page", cacheOp);

        return cacheOp;
    };

})(jQuery, IScroll);
