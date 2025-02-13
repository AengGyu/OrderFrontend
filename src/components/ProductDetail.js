import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/api';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id)
            .then(setProduct)
            .catch(err => {
                // ✅ 에러가 객체인지 확인 후, 메시지 출력
                const errorMessage = err.errorMessage || "상품 정보를 불러오는 중 오류 발생!";
                setError(errorMessage);
            });
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
                    
                    <button 
                        className="btn btn-success mt-3"
                        onClick={() => navigate(`/order/${product.id}`)}
                    >
                        주문하기
                    </button>
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