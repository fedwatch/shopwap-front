<!--商品详情-->
<div class="detail-content list-block" style="background: #fff;" >
    <div class="detail-item-content">
        <div class="detail-block label">商品详情</div>
    </div>
    {{#each this.product.productImages}}
    <div class="goods-description text-center">
        <img class="lazy" src="{{this.source}}"  alt="{{this.alt}}">
    </div>
    {{/each}}
</div>