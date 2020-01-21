const connection = require('./../config/connection');

module.exports = {
    getInventory: (req, res) => {
        // const query = `select a.id, b.product_name product_name, c.store_name store_name, quantity from inventory a join products b join stores c on a.product_id = b.id && a.store_id = c.id;`
        const query = `
        SELECT 
        a.id, 
        a.product_id, 
        a.store_id, 
        a.comment,
        b.product_name, 
        c.store_name, 
        quantity 
        FROM 
        inventory a 
        join products b 
        join stores c 
        ON 
        a.product_id = b.id && a.store_id = c.id;`

        connection.query(query, (err, inventory) => {
            if (err) {
                console.log(inventory)
                return res.status(404).send(err);
            }
            res.json(inventory);
        });
    },
    getInventoryEntry: (req, res) => {
        const { inventory_id } = req.params;
        const query = `
        SELECT 
        a.id,
        b.product_name product_name, 
        c.store_name store_name, 
        a.quantity,
        a.local_price,
        a.comment
        FROM inventory a 
        JOIN products b 
        JOIN stores c 
        ON a.product_id = b.id && a.store_id = c.id
        where a.id=${inventory_id}`;
        connection.query(query, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }
            console.log(result)
            res.json(result);
        });

    },
    createInventoryEntry: (req, res) => {
        const { product_id } = req.body;
        const { store_id } = req.body;
        const { quantity } = req.body;
        const { local_price } = req.body;
        const { comment } = req.body;

        let query = '';
        let args = [];
        if (comment !== '') {
            query = `INSERT INTO inventory (product_id, store_id, quantity, local_price, comment) VALUES(?, ?, ?, ?, ?)`;
            arg = [product_id, store_id, quantity, local_price, comment]
        } else {
            query = `INSERT INTO inventory (product_id, store_id, quantity, local_price) VALUES(?, ?, ?, ?)`;
            arg = [product_id, store_id, quantity, local_price]
        }

        connection.query(query, arg, (err, response) => {
            if (err) {
                return res.status(403).send(err);
            }
            res.send(response);
        });
    },
    deleteInventoryEntry: (req, res) => {
        console.log(req.params)
        const { inventory_id } = req.params;
        const query = `DELETE FROM inventory WHERE ?`;
        connection.query(query, { id: inventory_id }, (err, result) => {
            if (err) {
                return res.status(404).send(err);
            }
            res.json(result);
        });
    },
    updateInventoryEntry: (req, res) => {
        console.log(req.body)
        const { inventory_id } = req.body;
        const { local_price } = req.body;
        const { product_name} = req.body;
        const { product_quantity } = req.body;
        const { product_comment} = req.body;

        const query = `UPDATE inventory SET quantity=${parseInt(product_quantity)}, local_price=${parseFloat(local_price)}, comment="${product_comment}" where id=${inventory_id}`;
        console.log(query)
        connection.query(query, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(404).send(err);
            }
            res.json(result);
        })
    }
};