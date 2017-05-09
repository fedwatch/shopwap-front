<div class="nav-tabs">
    <div class="nav-tabbar">
        <div class="nav-tabbar-itemlist">
            <div class="nav-scrollview">
                {{#each productCategories}}
                <div class="nav-tabbar-item">
                    <div class="nav-render" >
                        <span class="nav-text" data-category-id="{{this.id}}">{{this.name}}</span>
                    </div>
                </div>
                {{/each}}
            </div>
        </div>
    </div>
</div>
<div id="tabbar-bottomline" class="nav-tabbar-bottomline"></div>


<input type="hidden" id="categoryId" value="105">