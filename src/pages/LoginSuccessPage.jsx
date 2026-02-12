// LoginSuccessPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setAccessToken } from "../auth/token";
import { useAuth } from "../auth/AuthContext";

export default function LoginSuccessPage() {
  const navigate = useNavigate();
  const {setRole, setIsLogin} = useAuth();

  useEffect(() => {
    const reissue = async () => {
      try {
        const res = await axios.post(
          "/api/v1/auth/reissue",
          {},
          {
            withCredentials: true, // refresh token 쿠키 보내기
          }
        );

        console.log(res.data);
        const token = res.data.token;
        console.log(`LoginSuccessPage token : ${token}`);
        setAccessToken(token);

        const decoded = jwtDecode(token);
        const role = decoded.role;
        console.log(`LoginSuccessPage role : ${role}`);
        setRole(role);
        setIsLogin(true);

        if(role === 'ADMIN') {
            navigate('/admin/workers');
        } else if (role === 'USER') {
            navigate('/mypage');
        } else {
            throw new Error('문제 있어');
        }
        
      } catch (e) {
        console.error(e);
        navigate("/login"); // 실패하면 다시 로그인
      }
    };

    reissue();
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}
