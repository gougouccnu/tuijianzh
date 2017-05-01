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
                                    <h4><a class="book-title" href="http://www.dev-books.com/book/book?isbn=0132350882&name=Clean-Code"  >' + title + '</a></h4>\
                                    <p>Robert C. Martin</p>\
                                    <p>' + content + '</p>\
                                    <p class="get-amazon pull-left"><a class="btn btn-warning" target="_blank" href=' + itemLink + '>More on jd.com</a></p>\
                                </div>\
                </div>\
    ');
};

$(document).ready(function() {

	var items = [{
            "id": "0201633612",
            "name": "Design Patterns",
            "authors": "Ralph Johnson, Erich Gamma, John Vlissides, Richard Helm",
            "description": "",
            "category": "小家电",
            "ratingscount": "18",
            "img": "https://images-na.ssl-images-amazon.com/images/I/41XzaDJ3eXL._AC_US160_.jpg",
            "pop": "277",
            "review": "With Design Patterns as your guide, you will learn how these important patterns fit into the software development process, and how you can leverage them to solve your own design problems most efficiently.",
            "link": "https:\/\/amazon.com\/dp\/0201633612\/?tag=devbookscom20-20"
        }, {
            "id": "0132350882",
            "name": "Clean Code",
            "authors": "Robert C. Martin",
            "description": "An extremely pragmatic method for writing better code from the start, and ultimately producing more robust applications.",
            "category": "4.5",
            "ratingscount": "29",
            "img": "https://images-na.ssl-images-amazon.com/images/I/41XzaDJ3eXL._AC_US160_.jpg",
            "pop": "256",
            "review": "Looks at the principles and clean code, includes case studies showcasing the practices of writing clean code, and contains a list of heuristics and &quot;smells&quot; accumulated from the process of writing clean code.",
            "link": "https:\/\/amazon.com\/dp\/0132350882\/?tag=devbookscom20-20"
        }
    ];

    var div = $('#items');
    // var content = '松下只卖两百元的吸尘器，每周吸一吸，相当好用。看很多人推荐机器人吸尘器，那玩意儿只能吸地板，犄角旮旯的灰尘完全用不上。而且，家里的地板吸起来并不费劲，所以大可不必买个机器人。',
    //     imgUrl = "https://images-na.ssl-images-amazon.com/images/I/41XzaDJ3eXL._AC_US160_.jpg",
    //     itemLink = "https://amazon.com/dp/0132350882/?tag=devbookscom20-20";
    // var title = "test append";
    // console.log(div);
    // appendItem(div, title, content, imgUrl, itemLink);
    // appendItem(div, title, content, imgUrl, itemLink);

    for (var i = 0; i < items.length; i++) {
    	appendItem(div, items[i].name, items[i].description, items[i].img, items[i].link);
    }
});
