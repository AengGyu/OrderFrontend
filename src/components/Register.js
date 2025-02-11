import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ loginId: '', password: '', name: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post('http://localhost:8080/api/members/register', formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      alert("회원가입이 완료되었습니다! 로그인해주세요.");
      navigate('/login'); // 회원가입 후 로그인 페이지로 이동
    } catch (err) {
      setError(err.response?.data?.message || '회원가입 실패');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="container" style={{ maxWidth: "560px" }}>
        <h2 className="mb-4 text-center">회원 가입</h2>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">아이디</label>
            <input type="text" className="form-control" name="loginId" value={formData.loginId} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">비밀번호</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label className="form-label">이름</label>
            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="d-flex gap-2 justify-content-center">
            <button type="submit" className="btn btn-primary btn-lg">가입하기</button>
            <button type="button" className="btn btn-secondary btn-lg" onClick={() => navigate('/')}>홈으로 이동</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;