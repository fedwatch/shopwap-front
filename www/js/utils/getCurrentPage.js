function getCurrentPage() {
    var protocol = location.protocol;
    var path = location.pathname;
    if (protocol === 'http' || protocol === 'https') {
        if (path.indexOf("index") == 0) {
            $("#home-link").addClass("active");
        } else if (path.indexOf("category") == 0) {
            $("#category-link").addClass("active");
        } else if (path.indexOf("cart") == 0) {
            $("#cart-link").addClass("active");
        } else if (path.indexOf("my") == 0) {
            $("#user-link").addClass("active");
        } else {
            $("#home-link").removeClass("active");
            $("#category-link").removeClass("active");
            $("#cart-link").removeClass("active");
            $("#user-link").removeClass("active");
        }
    } else {

        if (path.indexOf("index") !== -1) {
            $("#home-link").addClass("active");
        } else if (path.indexOf("category") !== -1) {
            $("#category-link").addClass("active");
        } else if (path.indexOf("cart") !== -1) {
            $("#cart-link").addClass("active");
        } else if (path.indexOf("my") !== -1) {
            $("#user-link").addClass("active");
        } else {
            $("#home-link").removeClass("active");
            $("#category-link").removeClass("active");
            $("#cart-link").removeClass("active");
            $("#user-link").removeClass("active");
        }
    }


}