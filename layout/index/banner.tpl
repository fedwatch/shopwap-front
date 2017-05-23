<!-- banner 首页滑动大图 -->
<div class="swiper-container swiper-banner">
    <div class="swiper-wrapper">
        {{#each banner}}
        <div class="swiper-slide">
            <div class="slide-item">
                <a href="{{this.url}}" target="_self">
                    <img src="{{this.image}}">
                </a>
            </div>
        </div>
        {{/each}}
    </div>
    <div class="pagination"></div>
</div>

