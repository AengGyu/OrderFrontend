import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import MemberInfo from './components/MemberInfo';
import MemberList from './components/MemberList';
import ProductList from './components/ProductList';  // ✅ 추가
import ProductRegister from './components/ProductRegister';  // ✅ 추가
//github check
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/members/register" element={<Register />} />
                <Route path="/member-info" element={<MemberInfo />} />
                <Route path="/members" element={<MemberList />} />
                <Route path="/products" element={<ProductList />} />  {/* ✅ 상품 목록 조회 */}
                <Route path="/products/register" element={<ProductRegister />} />  {/* ✅ 상품 등록 */}
            </Routes>
        </Router>
    );
}

export default App;