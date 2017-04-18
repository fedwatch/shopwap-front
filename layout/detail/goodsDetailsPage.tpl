<div class="detail-header" >
    <div class="detail-image" >
        <img src="{{detailImage}}" alt="" class="img-round" >
    </div>
    <div class="detail-desc" >
        <span class="detail-desc-price" >￥ <span class="product-price">{{this.productPrice}}</span></span><br>
        <span class="detail-desc-stock" >库存：<span id="inStock">{{this.inStock}}</span> 件</span><br>
        <span class="detail-desc-choice" >描述：<span id="productDescription">{{this.productDescription}}</span></span>
    </div>
</div>
<div class="detail-body">
    <div class="body-title">规格：</div>
    <div class="popup-page">
        {{#each spec}}
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