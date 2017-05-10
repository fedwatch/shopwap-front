<div class="detail-header" >
    <div class="detail-image" >
        <img src="{{this.product.image}}" alt="" class="img-round" >
    </div>
    <div class="detail-desc" >
        <span class="detail-desc-price" >￥ <span class="product-price">{{this.product.price}}</span></span><br>
        <span class="detail-desc-stock" >库存：<span id="inStock">{{this.product.allocatedStock}}</span> 件</span><br>
        <span class="detail-desc-choice" >描述：<span id="productDescription">{{this.product.brand.introduction}}</span></span>
    </div>
</div>
<div class="detail-body">
    <div class="body-title">规格：</div>
    <div class="popup-page">
        {{#each product.specificationValues}}
        <span class="spec-button number-input">{{this}}</span>
        {{/each}}
    </div>
</div>
<div class="detail-body">
    <div class="body-title">颜色：</div>
    <div class="popup-page">
        {{#each color}}
        <span class="color-button number-input">{{this}}</span>
        {{/each}}
    </div>
</div>
<div class="detail-body">
    <!--<div class="body-title">颜色：</div>-->
    <div class="numbers-board popup-page">
        数量：
        <span class="number-input goods-minus-btn"> - </span>
        <input type="text" name="goodsNumber" value="1">
        <span class="number-input active goods-plus-btn"> + </span>
    </div>
</div>