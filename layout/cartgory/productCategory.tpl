<!--商品列表-->
{{#each products}}
<div class="col-50 productCategory" >
    <a href="javascript:;"  data-product-id="{{this.id}}" class="external">
        <div style="background: #fff;padding:.5rem 0;margin: .25rem 0;">
            <img src="{{this.image}}" alt="" style="width:100%;">
            <h4 class="product-title" style="padding-left: .25rem;font-size:.7rem;color:#000;">{{this.name}}</h4>
            <span class="product-price-box" style="padding-left: .25rem;font-size:.5rem;color:#ff0000;">
                ￥
                <span style="font-size:.7rem;">{{this.price}}</span>
            </span>
            <span class="product-buyer-number-box" style="font-size:.5rem;color:#999;">已有 <span>{{this.sales}}</span>人购买</span>
        </div>
    </a>
</div>
{{/each}}