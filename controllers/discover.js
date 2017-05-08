// sign in:

module.exports = {
    'GET /book/discover': async(ctx, next) => {
        var tag = ctx.request.query
        console.log('receive url: ')
        console.log(tag.tag)

        var items = require("./items/item.json");

        ctx.render(tag.tag + '.html', {"books" : items[tag.tag]});
    }
};
