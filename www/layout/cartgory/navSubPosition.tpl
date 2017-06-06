<!--二级商品分类-->
<div class="nav-sub-tabs">
    <div class=" nav-sub-tabbar">
        <div class=" nav-sub-tabbar-itemlist">
            <div class=" nav-sub-scrollview">
                {{#each productCategories}}
                <div class="nav-sub-tabbar-item">
                    <div class="nav-sub-render">
                        <span class="nav-sub-text " data-category-sub-id="{{this.id}}">{{this.name}}</span>
                    </div>
                </div>
                {{/each}}
            </div>
        </div>
    </div>
</div>