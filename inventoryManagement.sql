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
    product_price DECIMAL (4,2),
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

create unique index prod_store_id on inventory(product_id, store_id);
ALTER TABLE inventory drop index prod_store_id;
DELETE FROM inventory WHERE store_id=1;


SELECT * FROM products;

ALTER TABLE products MODIFY product_price DECIMAL (4,2);
ALTER TABLE products MODIFY product_image_url TEXT NOT NULL;


-- CREATE TABLE product (
--     id INT NOT NULL,
--     category INT NOT NULL, 
--     price DECIMAL,
--     PRIMARY KEY(category, id)
-- )   ENGINE=INNODB;

-- CREATE TABLE customer (
--     id INT NOT NULL,
--     PRIMARY KEY (id)
-- )   ENGINE=INNODB;

-- CREATE TABLE product_order (
--     no INT NOT NULL AUTO_INCREMENT,
--     product_category INT NOT NULL,
--     product_id INT NOT NULL,
--     customer_id INT NOT NULL,

--     PRIMARY KEY(no),
--     INDEX (product_category, product_id),
--     INDEX (customer_id),

--     FOREIGN KEY (product_category, product_id)
--       REFERENCES product(category, id)
--       ON UPDATE CASCADE ON DELETE RESTRICT,

--     FOREIGN KEY (customer_id)
--       REFERENCES customer(id)
-- )   ENGINE=INNODB;