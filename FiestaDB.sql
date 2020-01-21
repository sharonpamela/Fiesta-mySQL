DROP DATABASE IF EXISTS inventoryManagement;

CREATE DATABASE inventoryManagement;

USE inventoryManagement

CREATE TABLE stores (
	id INT AUTO_INCREMENT,
    store_name VARCHAR(255) NOT NULL,
    store_city VARCHAR(255) NOT NULL,
    store_state VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE products (
	id INT AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL (4,2) NULL,
    product_image_url TEXT NOT NULL,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE inventory (
    -- id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    store_id INT NOT NULL,
    quantity INT default 0,
    -- PRIMARY KEY(no),
    INDEX (product_id),
    INDEX (store_id),
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (store_id) REFERENCES stores(id) ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=INNODB;

SELECT * FROM products;
SELECT * FROM stores;

-- ALTER TABLE products MODIFY product_price DECIMAL (4,2) NULL;
-- ALTER TABLE products MODIFY product_image_url TEXT NOT NULL;


-- create unique index prod_store_id on inventory(product_id, store_id);
-- ALTER TABLE inventory drop index prod_store_id;
-- DELETE FROM inventory WHERE store_id=1;