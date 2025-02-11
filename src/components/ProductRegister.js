import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerProduct } from '../api/api';

function ProductRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', price: '', quantity: '' });
    const [error, setError] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.grade !== "ADMIN") {
        alert("접근 권한이 없습니다.");
        navigate('/');
        return null;
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        // ✅ price와 quantity를 숫자로 변환
        const productData = {
            name: formData.name,
            price: Number(formData.price), // 문자열 → 숫자로 변환
            quantity: Number(formData.quantity), // 문자열 → 숫자로 변환
        };
    
        console.log("보낼 데이터:", productData);  // ✅ 콘솔에서 확인
    
        try {
            await registerProduct(productData);
            alert("상품이 등록되었습니다.");
            navigate('/products');
        } catch (err) {
            console.error("상품 등록 오류:", err);  // ✅ 에러 로그 확인
            setError(err.response?.data?.message || '상품 등록 실패');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="container" style={{ maxWidth: "560px" }}>
                <h2 className="mb-4 text-center">상품 등록</h2>

                {error && <div className="alert alert-danger text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">상품명</label>
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">가격</label>
                        <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">수량</label>
                        <input type="number" className="form-control" name="quantity" value={formData.quantity} onChange={handleChange} required />
                    </div>

                    <div className="d-flex gap-2 justify-content-center">
                        <button type="submit" className="btn btn-primary btn-lg">등록하기</button>
                        <button type="button" className="btn btn-secondary btn-lg" onClick={() => navigate('/')}>홈으로 이동</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductRegister;