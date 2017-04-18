<div class="product-images-slider" data-space-between='10' data-pagination='.swiper-pagination' data-autoplay="1000">
    <div class="swiper-wrapper">
        {{#each images}}
        <div class="swiper-slide"><img src="{{this.url}}" alt="{{this.alt}}" class=""></div>
        {{/each}}
    </div>
</div>