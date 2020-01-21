const connection = require('./../config/connection');

module.exports = {
    getProducts: (req, res) => {
        const query = `SELECT * FROM products;`;
        connection.query(query, (err, products) => {
            if (err) {
                console.log(products)
                return res.status(404).send(err);
            }
            res.json(products);
        });
    },
    createProduct: (req, res) => {
        const { product_name } = req.body;
        const { product_price } = req.body;
        const { product_image_url } = req.body;
        const { product_comment } = req.body;

        console.log(product_name, product_price, product_image_url, product_comment)
        const query = `INSERT INTO products (product_name,product_price,product_image_url,product_comment) VALUES(?,?,?,?)`;
        connection.query(query, [product_name, product_price, product_image_url, product_comment], (err, response) => {
            if (err) {
                console.log(err);
                return res.status(403).send(err);
            }
            res.send(response);
        });
    },
    getProduct: (req, res) => {
        const { storeId } = req.params;
        const query = `SELECT * FROM products WHERE ?`;
        // connection.query(query, {id: blogId}, (err, blogs) => {
        //     if(err) {
        //         return res.status(404).send(err);
        //     }
        //     const blog = blogs[0];
        //     res.json(blog);
        // });
    },

    deleteProduct: async (req, res) => {
        const { product_id } = req.params;

        // delete the product from the products DB
        const query = `DELETE FROM products WHERE ?`;
        connection.query(query, { id: product_id }, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }

            //delete the product entries from the inventory
            // res.json(result);
            const { product_id } = req.params;
            const query = `DELETE FROM inventory WHERE (product_id = ${product_id});`
            connection.query(query, { id: product_id }, (err, result) => {
                if (err) {
                    return res.status(404).send(err);
                }
                res.json(result);
            });
        });
    }
};