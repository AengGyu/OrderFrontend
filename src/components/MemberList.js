import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllMembers } from '../api/api';

function MemberList() {
    const [members, setMembers] = useState([]);
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
        if (user.grade !== "ADMIN") {  // ✅ 관리자만 접근 가능
            alert("접근 권한이 없습니다.");
            navigate('/');
            return;
        }

        getAllMembers()
            .then(setMembers)
            .catch(error => {
                console.error("❌ API 요청 실패:", error.response?.status);
                setError("회원 목록을 불러올 수 없습니다.");
            });
    }, [navigate]);

    return (
        <div className="container">
            <h2 className="text-center mt-4">전체 회원 목록</h2>

            {error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>등급</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.id}>
                                <td>{member.id}</td>
                                <td>{member.loginId}</td>
                                <td>{member.name}</td>
                                <td>{member.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <Link to="/" className="btn btn-secondary mt-3">홈으로 이동</Link>
        </div>
    );
}

export default MemberList;