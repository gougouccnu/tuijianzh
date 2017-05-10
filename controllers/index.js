// index:

module.exports = {
    'GET /': async (ctx, next) => {
    	var tag = ctx.request.query
        console.log('receive url: ')
        console.log(tag.tag)

        var items = require("./items/item.json");
        var bigCategoryArray = Object.keys(items);
        console.log(bigCategoryArray)

        ctx.render('index.html', {
            title: 'Welcome', "bigCategoryArray": bigCategoryArray
        });
    }
};
