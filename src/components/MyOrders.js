import React, { useEffect, useState } from 'react';
import { getMyOrders } from '../api/api';
import { Link } from 'react-router-dom';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getMyOrders()
            .then(setOrders)
            .catch(err => {
                console.error("🚨 오류 발생:", err);
                setError(typeof err === "string" ? err : "내 주문 목록을 불러오는 중 오류 발생!");
            });
    }, []);

    return (
        <div className="container">
            <h2 className="text-center mt-4">내 주문 목록</h2>

            {error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>주문 ID</th>
                            <th>상품명</th>
                            <th>가격</th>
                            <th>수량</th>
                            <th>총 가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.productName}</td>
                                <td>{order.price}원</td>
                                <td>{order.quantity}</td>
                                <td>{order.totalPrice}원</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Link to="/" className="btn btn-secondary mt-3">홈으로 이동</Link>
        </div>
    );
}

export default MyOrders;