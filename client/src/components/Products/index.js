import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './style.css';

class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            property: false
        }
    }

    render() {
        let products =
            this.props.products.map(product => (
                <p key={product.id}>
                    <img src={product.product_image_url} crossOrigin="true" alt={product.product_name} className="product_img" />
                    <Link to={`/product/${product.id}`}>
                        {product.product_name} - ${product.product_price}
                    </Link>
                </p>
            ));

        return (
            <div>
                <h2>List of Products:</h2>
                {products}
            </div>
        )
    }
}

export default Products;


