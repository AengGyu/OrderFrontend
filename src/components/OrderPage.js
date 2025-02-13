import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, orderProduct } from '../api/api';

function OrderPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProducts().then(setProducts).catch(setError);
    }, []);

    const selectedProduct = products.find(p => p.id === Number(selectedProductId));

    const handleOrder = async () => {
        if (!selectedProduct) return alert("상품을 선택해주세요!");
        if (quantity < 1 || quantity > selectedProduct.quantity) return alert("수량이 올바르지 않습니다!");

        try {
            await orderProduct({ productId: selectedProduct.id, quantity });

            // ✅ 주문 후 상태 업데이트 (재고 감소 반영)
            setProducts(prevProducts => 
                prevProducts.map(p => 
                    p.id === selectedProduct.id ? { ...p, quantity: p.quantity - quantity } : p
                )
            );

            alert("주문이 완료되었습니다!");
        } catch (err) {
            setError(err.errorMessage || "주문 중 오류 발생");
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">주문하기</h2>

            {error && <p className="text-danger">{error}</p>}

            <div className="mb-3">
                <label className="form-label">상품 선택</label>
                <select 
                    className="form-select" 
                    value={selectedProductId} 
                    onChange={(e) => setSelectedProductId(e.target.value)}
                >
                    <option value="">상품을 선택하세요</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id}>
                            {product.name} (재고: {product.quantity}개)
                        </option>
                    ))}
                </select>
            </div>

            {selectedProduct && (
                <>
                    <p><strong>가격:</strong> {selectedProduct.price}원</p>
                    <p><strong>현재 재고:</strong> {selectedProduct.quantity}개</p>
                    
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1" 
                        max={selectedProduct.quantity}
                        className="form-control w-25 d-inline-block"
                    />

                    <button 
                        className="btn btn-success mt-3"
                        onClick={handleOrder}
                    >
                        주문하기
                    </button>
                </>
            )}

            <button className="btn btn-secondary mt-3" onClick={() => navigate("/")}>홈으로 이동</button>
        </div>
    );
}

export default OrderPage;