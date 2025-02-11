import axios from 'axios';

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