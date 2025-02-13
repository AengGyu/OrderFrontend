import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center" style={{ maxWidth: "560px" }}>
        <h2 className="mb-4">{user ? `환영합니다, ${user.name}!` : '홈 화면'}</h2>

        <div className="d-flex flex-column gap-3 align-items-center">
          {!user ? (
            <>
              <Link to="/members/register" className="btn btn-secondary btn-lg">회원 가입</Link>
              <Link to="/login" className="btn btn-dark btn-lg">로그인</Link>
            </>
          ) : (
            <>
              {user.grade !== 'ADMIN' ? (
                <>
                  <Link to="/products" className="btn btn-outline-primary btn-lg">상품 목록</Link>  {/* ✅ 상품 목록 조회 */}
                  <Link to="/order/1" className="btn btn-outline-primary btn-lg">주문하기</Link>  {/* ✅ 주문 페이지 추가 */}
                  <Link to="/my-orders" className="btn btn-outline-primary btn-lg">내 주문 목록</Link>  {/* ✅ 내 주문 목록 추가 */}
                  <Link to={`/member-info`} className="btn btn-outline-primary btn-lg">내 정보 보기</Link>
                </>
              ) : (
                <>
                  <Link to="/members" className="btn btn-outline-dark btn-lg">회원 목록 조회</Link>  {/* ✅ 관리자 전용 */}
                  <Link to="/admin/orders" className="btn btn-outline-dark btn-lg">전체 주문 조회</Link>  {/* ✅ 전체 주문 조회 */}
                  <Link to="/products/register" className="btn btn-outline-dark btn-lg">상품 등록</Link>  {/* ✅ 상품 등록 */}
                </>
              )}
              <button className="btn btn-danger btn-lg" onClick={() => {
                localStorage.removeItem('user');
                window.location.reload();
              }}>
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;