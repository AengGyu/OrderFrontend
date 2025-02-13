import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, orderProduct } from '../api/api';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id)
            .then(setProduct)
            .catch(setError);
    }, [id]);

    const handleOrder = async () => {
        try {
            if (!product) return;
            
            const orderData = {
                productId: product.id,
                quantity
            };

            await orderProduct(orderData);

            // ✅ 주문 후 즉시 상태 업데이트 (재고 감소 반영)
            setProduct(prev => ({
                ...prev,
                quantity: prev.quantity - quantity  // 현재 수량에서 주문 수량 차감
            }));

            alert("주문이 완료되었습니다!");
        } catch (err) {
            setError(err.errorMessage || "주문 중 오류 발생");
        }
    };

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
                    
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1" 
                        max={product.quantity}
                        className="form-control w-25 d-inline-block"
                    />
                    <button 
                        className="btn btn-success mt-3"
                        onClick={handleOrder}
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