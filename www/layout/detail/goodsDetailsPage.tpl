<div class="detail-header" >
    <div class="detail-image" >
        <img class="lazy img-round" src="{{this.product.image}}"  alt="">
    </div>
    <div class="detail-desc" >
        <span class="detail-desc-price" >￥ <span class="product-price">{{this.product.price}}</span></span><br>
        <span class="detail-desc-stock" >库存：<span id="inStock">{{this.product.stock}}</span> 件</span><br>
        <!--<span class="detail-desc-choice" >描述：<span id="productDescription">{{this.product.brand.introduction}}</span></span>-->
    </div>
</div>

{{#if product.specifications}}
<div class="detail-body">
    {{#each product.specifications}}
    <div class="body-title">{{name}}：</div>
    <div class="popup-page spec-{{id}}" >
        {{#each this.specificationValues}}
        <span class="spec-button number-input"
              id="specification-id-{{this.id}}"
              data-specification-id="{{this.id}}">
            {{this.name}}
        </span>
        {{/each}}
    </div>
    {{/each}}
</div>
{{/if}}

<div class="detail-body">
    <div class="numbers-board popup-page">
        数量：
        <span class="number-input goods-minus-btn"> - </span>
        <input type="text" name="goodsNumber" value="0">
        <span class="number-input active goods-plus-btn"> + </span>
    </div>
</div>