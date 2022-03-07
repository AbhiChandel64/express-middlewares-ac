const express = require('express');
const app = express();
const port = 3000;


function logger(req, res, next) {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(fullUrl);
    next();
}

function checkPermission(role) {
    return function (req, res, next) {
        if (req.originalUrl === '/libraries') {
            req.permission = true;
            req.role = role;
        }

        if (req.originalUrl === '/authors') {
            req.permission = true;
            req.role = role;
        }
        next();
    }
}

app.use(logger);

app.get('/books', (req, res) => {
    res.send({ 'route': '/books' })
});

app.get('/libraries', checkPermission("librarian"), (req, res) => {
    res.send({
        route: "/libraries",
        permission: req.permission,
        role: req.role
    });
});

app.get('/authors', checkPermission('author'), (req, res) => {
    res.send({
        route: "/authors",
        permission: req.permission,
        role: req.role
    });
});


app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`)
})