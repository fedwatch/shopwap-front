<!--促销-->
<div class="detail-content list-block" style="background: #fff;">

    <div class="detail-item-content" style="background: #fff;margin: .5rem 0;">
        <div class="promotion-title pull-left">促销</div>
        {{#each product.promotions}}
        <div class="promotion-type pull-right">
            <i class="icon icon-promo-minus"></i>
              {{name}}
        </div>
        {{/each}}
    </div>

    <div class="detail-item-content" style="background: #fff;margin: .5rem 0;">
        <div class="specifications-title pull-left">请选择规格</div>
        <div class="specifications-type pull-right">
            <span id="specShow"></span>
            <i class="specifications-icon icon icon-more-link"></i>

        </div>
    </div>

    <!--<div class="detail-item-content" style="background: #fff;margin: .5rem 0;">-->
        <!--<div class="user-reviews pull-left">用户评价</div>-->
        <!--<div class="user-reviews-details pull-right">-->
            <!--<a href="../../html/user/comment.html" class="external">-->
            <!--{{transUserReviews review}}<i class="icon icon-more-link"></i>-->
            <!--</a>-->
        <!--</div>-->
    <!--</div>-->
</div>