const connection = require('./../config/connection');

module.exports = {
    getStores: (req, res) => {
        const query = `SELECT * FROM stores;`;
        connection.query(query, (err, stores) => {
            if (err) {
                console.log(stores)
                return res.status(404).send(err);
            }
            res.json(stores);
        });
    },
    createStore: (req, res) => {
        console.log(req.body)
        let storeName = req.body.store_name;
        let storeCity = req.body.store_city;
        let storeState = req.body.store_state;

        const query = `INSERT INTO stores (store_name,store_city,store_state) VALUES(?,?,?)`;
        const values = [storeName, storeCity, storeState];

        // connection.query(query, [storeName, storeCity, storeState], (err, response) => {
        connection.query(query, values, (err, response) => {
            if (err) {
                return res.status(403).send(err);
            }
            res.send(response);
        });
    },
    getStore: (req, res) => {
        const { storeId } = req.params;
        const query = `SELECT * FROM stores WHERE ?`;
        connection.query(query, { id: storeId }, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }
            console.log(result)
            res.json(result);
        });
    },
    deleteStore: (req, res) => {
        const { storeId } = req.params;
        const query = `DELETE FROM stores WHERE ?`;
        connection.query(query, { id: storeId }, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }
            res.json(result);
        });
    },
    getStoreProducts: (req, res) => {
        // console.log(req.params);
        const { storeId } = req.params;
        // const query = `SELECT 
        // a.store_id,
        // a.id inventory_id,
        // b.product_price,
        // b.product_name product_name, 
        // c.store_name store_name, 
        // quantity 
        // FROM inventory a 
        // JOIN products b 
        // JOIN stores c 
        // ON a.product_id = b.id && a.store_id = c.id WHERE (?);`
        const query = `SELECT 
        a.store_id,
        a.id inventory_id,
        a.local_price,
        a.comment,
        b.product_name product_name, 
        c.store_name store_name, 
        quantity 
        FROM inventory a 
        JOIN products b 
        JOIN stores c 
        ON a.product_id = b.id && a.store_id = c.id
        where (?)`

        connection.query(query, { store_id: storeId }, (err, products) => {
            if (err) {
                return res.status(404).send(err);
            }
            res.json(products);
        });
    },
    addStoreProduct: (req, res) => {

        const { store_id } = req.body;
        const { product_name } = req.body;
        const product_price = parseFloat(req.body.product_price);
        const { product_img_url } = req.body;
        const { product_comment } = req.body;
        const query = `INSERT INTO products (product_name, product_price, product_image_url, product_comment) VALUES(?, ?, ?, ?);`
        console.log(product_name, product_price, product_img_url, product_comment);
        connection.query(query, [product_name, product_price, product_img_url, product_comment], (err, result) => {
            if (err) {
                console.log(err);
                return res.status(403).send(err);
            }
            res.json(result);
        });
    },
    deleteStoreProduct: (req, res) => {
        const { blogId } = req.params;
        const { comment } = req.body;
        const query = `INSERT INTO comments(comment, blog_id) VALUES(?,?);`
        connection.query(query, [comment, blogId], (err, comments) => {
            if (err) {
                console.log(err);
                return res.status(403).send(err);
            }
            res.json(comments);
        });
    }
};