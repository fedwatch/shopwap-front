<!-----弹框------>
<div class="bankMask">
    <div class="cont">
        {{#if memberBanks}}
            {{#each memberBanks}}
            <div class="bank-li">
                <a href="javascript:;" class="external bank-a" data-id="{{id}}">
                    <span class="attract">{{bankName}}</span>
                    <span>{{transBankCardType bankCardType}}（{{bankCardNo}}）</span>
                    <span class="pull-right arrw">&gt;</span>
                </a>
            </div>
            {{/each}}
        {{else}}
            <div>
                购物车，还没有东东。
            </div>
        {{/if}}
    </div>
</div>