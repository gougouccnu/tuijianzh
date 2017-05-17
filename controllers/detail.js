// sign in:

module.exports = {
    'GET /book/detail': async(ctx, next) => {
        var tag = ctx.request.query
        console.log('receive url: ')
        console.log(tag.name + tag.category)

        var items = require("./items/item.json");
        var bigCategoryArray = Object.keys(items);
        console.log(bigCategoryArray)

        ctx.render('detail.html', {"bigCategoryArray": bigCategoryArray, 
            "book": items[tag.category][0]});
    }
};
