import axios from 'axios';
// 깃허브 확인용
const API_URL = 'http://localhost:8080/api';  // Spring API URL

// 로그인 API 요청
export const login = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, loginData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;  
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// 회원가입 API 요청
export const register = async (registerData) => {
    try {
        const response = await axios.post(`${API_URL}/members/register`, registerData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// ✅ 회원 정보 조회 (개별 회원)
export const getMemberById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/members/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// ✅ 전체 회원 목록 조회 (관리자 전용)
export const getAllMembers = async () => {
    try {
        const response = await axios.get(`${API_URL}/members`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// ✅ 상품 목록 조회
export const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// ✅ 특정 상품 상세 조회
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// ✅ 상품 등록 (ADMIN 전용)
export const registerProduct = async (productData) => {
    try {
        const response = await axios.post(`${API_URL}/products`, productData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,  
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// ✅ 주문 API 요청 추가
export const orderProduct = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/orders`, orderData, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,  // ✅ 세션 유지
        });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

// ✅ 내 주문 목록 조회 API (수정됨)
export const getMyOrders = async () => {
    try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) throw new Error("로그인이 필요합니다.");

        const user = JSON.parse(storedUser);

        if (!user.id || isNaN(user.id)) {
            console.error("🚨 잘못된 회원 정보:", user);
            throw new Error("잘못된 회원 정보입니다.");
        }

        console.log("✅ 요청 보낼 ID:", user.id); // 디버깅용 로그 추가

        const response = await axios.get(`${API_URL}/orders/${user.id}`, { withCredentials: true });

        return response.data;
    } catch (error) {
        console.error("🚨 내 주문 목록 오류:", error.response?.data || error.message);
        throw error.response?.data?.errorMessage || "내 주문 목록을 불러오는 중 오류 발생!";
    }
};

// ✅ 전체 주문 목록 조회 (관리자 전용)
export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/orders`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};