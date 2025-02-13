import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderProduct } from '../api/api';

function OrderPage() {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleOrder = async () => {
        try {
            await orderProduct({ productId: id, quantity });
            alert("주문이 완료되었습니다!");
            navigate('/my-orders'); 
        } catch (err) {
            // ✅ 에러가 객체인지 확인 후, 메시지 출력
            const errorMessage = err.errorMessage || "주문 요청 중 오류 발생!";
            setError(errorMessage);
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">주문하기</h2>
            {error && <p className="text-danger">{error}</p>}  {/* ✅ 에러 메시지 출력 */}

            <div className="mb-3">
                <label className="form-label">수량 선택</label>
                <input 
                    type="number" 
                    className="form-control" 
                    value={quantity} 
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
            </div>

            <button className="btn btn-primary" onClick={handleOrder}>주문하기</button>
        </div>
    );
}

export default OrderPage;