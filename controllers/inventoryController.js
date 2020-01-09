const connection = require('./../config/connection');

module.exports = {
    getInventory: (req, res) => {
        // const query = `SELECT * FROM inventory;`;
        // const query = `select * from stores cross join inventory products;`
        const query = `select a.id, b.product_name product_name, c.store_name store_name, quantity from inventory a join products b join stores c on a.product_id = b.id && a.store_id = c.id;`
        connection.query(query, (err, inventory) => {
            if(err) {
                console.log(inventory)
                return res.status(404).send(err);
            }
            res.json(inventory);
        });
    }
};