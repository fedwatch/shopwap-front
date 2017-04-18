<!-- banner 首页滑动大图 -->
<div class="swiper-container swiper-banner">
    <div class="swiper-wrapper">
        {{#each img}}
        <div class="swiper-slide">
            <div class="slide-item"><img src="{{this}}"></div>
        </div>
        {{/each}}
    </div>
    <div class="pagination"></div>
</div>

