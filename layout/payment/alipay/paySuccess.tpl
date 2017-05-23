<header class="bar bar-nav">
    <a class="button button-link button-nav pull-left external" href="javascript:history.go(-1)"
       data-transition='slide-out'>
        <span class="icon icon-left"></span>
    </a>
    <h1 class="title">支付成功</h1>
</header>


<div class="content">
    {{#order}}
     <div class="paySuccess-bg">
         <div class="pay-succ-con">
             <div class="clearfix title5">
                 <div class="pull-left ang8"></div>
                 <div class="pull-left sum-am">
                     <div class="sum-t">您已成功付款<span>{{../paymentAmount}}</span>元！</div>
                     <div>商户会尽快发货</div>
                 </div>
             </div>
             <div class="user-desc pay-content">
                 <div class="order-addr ">
                     <span>收货地址：</span>
                     <span>{{this.consignee}}   {{this.phone}}</span>
                 </div>
                 <span class="detail-addr">
                    {{this.areaName}} {{this.address}}
                </span>
             </div>
         </div>
     </div>
    {{/order}}
    <div class="content-block">
        <p>
            <a class="checkMyOrderBtn button button-big button-fill external rg-col" href="javascript:;" >
                查看订单
            </a>
        </p>
    </div>
</div>
