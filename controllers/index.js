// sign in:

module.exports = {
    'GET /': async(ctx, next) => {
        var tag = ctx.request.query
        console.log('receive url: ')
        console.log(tag.tag)

        var items = require("./items/item.json");
        var bigCategoryArray = Object.keys(items);
        console.log(bigCategoryArray)

        ctx.render('agile.html', {"bigCategoryArray": bigCategoryArray, 
            "books": items['厨房小电'], "bookArrayString" : JSON.stringify(items['厨房小电'], null, 4)});
    }
};
