<div class="product-images-slider" data-space-between='10' data-pagination='.swiper-pagination' data-autoplay="1000">
    <div class="swiper-wrapper">
        {{#each this.product.productImages}}
            <div class="swiper-slide">
                <img
                src="{{this.source}}"
                     alt="{{this.alt}}" class="lazy">
            </div>
        {{/each}}
    </div>
</div>