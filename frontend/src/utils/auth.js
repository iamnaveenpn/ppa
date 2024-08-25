// src/utils/auth.js
import { jwtDecode } from "jwt-decode";  // Named import

export const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token);  // Use jwtDecode
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;  // If decoding fails, consider the token as expired
    }
};
