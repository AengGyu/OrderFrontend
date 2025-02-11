import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMemberById } from '../api/api';

function MemberInfo() {
    const [member, setMember] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert("로그인이 필요합니다.");
            navigate('/login');
            return;
        }

        const user = JSON.parse(storedUser);
        if (!user.id) {
            setError("잘못된 회원 정보입니다.");
            return;
        }

        getMemberById(user.id)
            .then(setMember)
            .catch(error => {
                if (error.response?.status === 401) {
                    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
                    navigate('/login');
                } else {
                    setError("회원 정보를 불러올 수 없습니다.");
                }
            });
    }, [navigate]);

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="container text-center" style={{ maxWidth: "560px" }}>
                <h2 className="mb-4">회원 정보</h2>

                {error ? (
                    <p className="text-danger">{error}</p>
                ) : member && member.loginId ? (
                    <>
                        <p className="fw-bold">아이디: <span>{member.loginId}</span></p>
                        <p className="fw-bold">이름: <span>{member.name}</span></p>
                        <p className="fw-bold">회원 등급: <span>{member.grade}</span></p>
                    </>
                ) : null}

                <Link to="/" className="btn btn-secondary btn-lg">홈으로 이동</Link>
            </div>
        </div>
    );
}

export default MemberInfo;