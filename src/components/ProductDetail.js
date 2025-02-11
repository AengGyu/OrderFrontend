import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api/api';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProductById(id)
            .then(setProduct)
            .catch(setError);
    }, [id]);

    return (
        <div className="container">
            <h2 className="text-center mt-4">상품 상세 정보</h2>

            {error ? (
                <p className="text-danger">{error}</p>
            ) : product ? (
                <div>
                    <p><strong>상품명:</strong> {product.name}</p>
                    <p><strong>가격:</strong> {product.price}원</p>
                    <p><strong>재고:</strong> {product.quantity}개</p>
                </div>
            ) : (
                <p>상품 정보를 불러오는 중...</p>
            )}

            <Link to="/products" className="btn btn-primary mt-3">상품 목록으로 이동</Link>
            <Link to="/" className="btn btn-secondary mt-3">홈으로 이동</Link>
        </div>
    );
}

export default ProductDetail;