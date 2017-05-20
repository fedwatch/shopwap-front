<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class='title'>物流信息</h1>
</header>

{{#each resultList}}
<div class="content review logistics">
    <div class="list-block media-list">
        <ul>
            <li>
                <a href="#" class="item-link item-content">
                    <div class="item-media"><img src="http://gqianniu.alicdn.com/bao/uploaded/i4//tfscom/i3/TB10LfcHFXXXXXKXpXXXXXXXXXX_!!0-item_pic.jpg_250x250q60.jpg" style='width: 4rem;'></div>
                    <div class="logic-detail">
                        <div><span class="status-title">物流状态</span><span class="status">{{this.expressResult.state}}</span></div>
                        <div><span>承运来源</span><span> {{this.shipping.deliveryCorp}}</span></div>
                        <div><span>运单编号 </span><span>{{this.shipping.trackingNo}}</span></div>
                        <div><span>官方电话 </span><span>{{this.shipping.phone}}</span></div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
    <div class="list-block media-list" style="margin-top:0.607rem;">
        <ul>
            <li>
                <a href="#" class="item-link item-content">
                    <div class="item-inner">
                        <div class="list-block media-list star clearfix">
                            <div   class="clearfix logistics-desc" >
                                <div class="pull-left logistics-log {{#if this.expressResult.com}}sf{{/if}}"></div>
                                <div class="pull-left logistics-title">本数据由<span class="express-company">{{this.shipping.deliveryCorp}}</span>提供</div>
                            </div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>

    <div class="list-block">
        <ul>
            <li class="align-top">
                <div class="item-content">
                    <div class="item-inner">
                        <div class="logistics_con">
                            <ul id="J_listtext2" class="status-list">

                                {{#each this.expressResult.expressData}}
                                <li  >
                                    <div class="logistics-c">
                                        <div class="logistics-path"><span>[{{../this.shipping.area}}{{../this.shipping.deliveryCorp}}]</span>{{this.context}}</div>
                                        <div class="arrive-time">2017-03-20  14:45:46</div>
                                    </div>
                                </li>
                                {{/each}}

                            </ul>
                        </div>

                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
{{/each}}