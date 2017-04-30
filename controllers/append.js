// sign in:

module.exports = {
    'GET /append': async (ctx, next) => {
        var
            email = ctx.request.body.email || '',
            password = ctx.request.body.password || '';
        if (email === 'admin@example.com' && password === '123456') {
            console.log('signin ok!');
            ctx.render('signin-ok.html', {
                title: 'Sign In OK',
                name: 'Mr Node'
            });
        } else {
            console.log('signin failed!');
            ctx.render('append.html', {
                title: 'Sign In Failed'
            });
        }
    }
};
