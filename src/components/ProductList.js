import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api/api';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts()
            .then(setProducts)
            .catch(err => setError(err));
    }, []);

    return (
        <div className="container">
            <h2 className="text-center mt-4">상품 목록</h2>

            {error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>수량</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>
                                    {/* ✅ 상품명을 클릭하면 상세페이지(`/products/:id`)로 이동 */}
                                    <Link to={`/products/${product.id}`} className="text-primary">
                                        {product.name}
                                    </Link>
                                </td>
                                <td>{product.price}원</td>
                                <td>{product.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Link to="/" className="btn btn-secondary mt-3">홈으로 이동</Link>
        </div>
    );
}

export default ProductList;