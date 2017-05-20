function getCurrentPage() {
    var path = location.pathname;
    if (path.indexOf("/html/index") == 0) {
        $("#home-link").addClass("active");
    } else if (path.indexOf("/html/category/category") == 0) {
        $("#category-link").addClass("active");
    } else if (path.indexOf("/html/cart/cart") == 0) {
        $("#cart-link").addClass("active");
    } else if (path.indexOf("/html/my/my") == 0) {
        $("#user-link").addClass("active");
    } else {
        $("#home-link").removeClass("active");
        $("#category-link").removeClass("active");
        $("#cart-link").removeClass("active");
        $("#user-link").removeClass("active");
    }
}