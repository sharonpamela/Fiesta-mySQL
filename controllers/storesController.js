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

        // const query = `SELECT * FROM stores;`;
        // sql.query(query, (err, stores) => {
        //     if (err) {
        //         console.log(stores)
        //         return res.status(404).send(err);
        //     }
        //     res.json(stores);
        // });
    },
    createStore: (req, res) => {
        let storeName = req.body.store_name;
        let storeCity = req.body.store_city;
        let storeState = req.body.store_state;

        const query = `INSERT INTO stores (store_name,store_city,store_state) VALUES(?,?,?)`;
        const values = [storeName, storeCity, storeState];

        // connection.query(query, [storeName, storeCity, storeState], (err, response) => {
        connection.query(query, values, (err, response) => {
            if (err) {
                console.log(err);
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
                console.log(err);
                return res.status(404).send(err);
            }
            res.json(result);
        });
    },
    deleteStore: (req, res) => {
        const { storeId } = req.params;

        // need to delete all of the inventory entries from this store first
        const query = `DELETE FROM inventory WHERE ?`;
        connection.query(query, { store_id: storeId }, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(404).send(err);
            }
            // delete the store second
            const query = `DELETE FROM stores WHERE ?`;
            connection.query(query, { id: storeId }, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(404).send(err);
                }
                res.json(result);
            });
        });
    },
    getStoreProducts: (req, res) => {
        const { storeId } = req.params;
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
                console.log(err);
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