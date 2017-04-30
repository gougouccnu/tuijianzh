function scrollTo(id) {
    console.log("#" + id);
    $('html, body').animate({
        scrollTop: $("#" + id).offset().top - 52
    }, 1000);
}

appendItem = function(div, title, content, imgUrl, itemLink) {
    div.append('<div class="row top-pad" id="0132350882">\
                                <div class="col-sm-3">\
                                    <img src=' + imgUrl + ' class="img-responsive">\
                                </div>\
                                <div class="col-sm-9">\
                                    <h2><a class="book-title" href="http://www.dev-books.com/book/book?isbn=0132350882&name=Clean-Code"  >' + title + '</a></h2>\
                                    <p>Robert C. Martin</p>\
                                    <p>' + content + '</p>\
                                    <p class="get-amazon pull-left"><a class="btn btn-warning" target="_blank" href=' + itemLink + '>More on jd.com</a></p>\
                                </div>\
                </div>\
    ');
};

$(document).ready(function() {
    var div = $('#items');
    var content = '松下只卖两百元的吸尘器，每周吸一吸，相当好用。看很多人推荐机器人吸尘器，那玩意儿只能吸地板，犄角旮旯的灰尘完全用不上。而且，家里的地板吸起来并不费劲，所以大可不必买个机器人。',
        imgUrl = "https://images-na.ssl-images-amazon.com/images/I/41XzaDJ3eXL._AC_US160_.jpg",
        itemLink = "https://amazon.com/dp/0132350882/?tag=devbookscom20-20";
    var title = "test append";
    console.log(div);
    appendItem(div, title, content, imgUrl, itemLink);
    appendItem(div, title, content, imgUrl, itemLink);

    for (var i = 0; i < 1000; i++) {
        appendItem(div, title, content, imgUrl, itemLink);
    }
});
