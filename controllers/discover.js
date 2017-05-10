// sign in:

module.exports = {
    'GET /book/discover': async(ctx, next) => {
        var tag = ctx.request.query
        console.log('receive url: ')
        console.log(tag.tag)

        var items = require("./items/item.json");
        var bigCategoryArray = Object.keys(items);
        console.log(bigCategoryArray)

        ctx.render('agile.html', {"bigCategoryArray": bigCategoryArray, 
            "books": items[tag.tag], "bookArrayString" : JSON.stringify(items[tag.tag], null, 4)});
    }
};
