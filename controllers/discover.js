// sign in:

module.exports = {
    'GET /book/discover': async(ctx, next) => {
        var tag = ctx.request.query
        console.log('receive url: ')
        console.log(tag.tag)

        var books = [{
            "id": "0201604434",
            "name": "Compressed Image File Formats",
            "authors": "John Miano",
            "description": "Since not all graphic formats are of equal complexity, author John Miano does not simply choose a number of file formats and devote a chapter to each one. Instead, he offers additional coverage for the more complex image file formats like PNG (a new standard) and JPEG, while providing all information necessary to use the simpler file formats. While including the well-documented BMP, XBM, and GIF formats for completeness, along with some of their less-covered features, this book gives the most space to the more intricate PNG and JPEG, from basic concepts to creating and reading actual files. Among its highlights, this book covers: -- JPEG Huffman coding, including decoding sequential mode JPEG images and creating sequential JPEG files-- Optimizing the DCT-- Portable Network Graphics format (PNG), including decompressing PNG image data and creating PNG files-- Windows BMP, XBM, and GIF",
            "rating": "4.0",
            "ratingscount": "2",
            "img": "\\/img\\/thumbnails\\/0201604434.png",
            "pop": "10",
            "review": "Among its highlights, this book covers: -- JPEG Huffman coding, including decoding sequential mode JPEG images and creating sequential JPEG files-- Optimizing the DCT-- Portable Network Graphics format (PNG), including decompressing PNG ...",
            "link": "https:\\/\\/amazon.com\\/dp\\/0201604434\\/?tag=devbookscom20-20"
        }, {
            "id": "0201604434",
            "name": "Compressed Image File Formats",
            "authors": "John Miano",
            "description": "Since not all graphic formats are of equal complexity, author John Miano does not simply choose a number of file formats and devote a chapter to each one. Instead, he offers additional coverage for the more complex image file formats like PNG (a new standard) and JPEG, while providing all information necessary to use the simpler file formats. While including the well-documented BMP, XBM, and GIF formats for completeness, along with some of their less-covered features, this book gives the most space to the more intricate PNG and JPEG, from basic concepts to creating and reading actual files. Among its highlights, this book covers: -- JPEG Huffman coding, including decoding sequential mode JPEG images and creating sequential JPEG files-- Optimizing the DCT-- Portable Network Graphics format (PNG), including decompressing PNG image data and creating PNG files-- Windows BMP, XBM, and GIF",
            "rating": "4.0",
            "ratingscount": "2",
            "img": "\\/img\\/thumbnails\\/0201604434.png",
            "pop": "10",
            "review": "Among its highlights, this book covers: -- JPEG Huffman coding, including decoding sequential mode JPEG images and creating sequential JPEG files-- Optimizing the DCT-- Portable Network Graphics format (PNG), including decompressing PNG ...",
            "link": "https:\\/\\/amazon.com\\/dp\\/0201604434\\/?tag=devbookscom20-20"
        }]

        ctx.render('discover.html', {"books" : books});
    }
};
