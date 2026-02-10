import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../api/adminApi';
import LogoutModal from '../components/LogoutModal'; 
import './WorkerManagement.css';

function WorkerManagement() {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);  // 추가!
  const navigate = useNavigate();

  const [attendanceData] = useState([
    { date: '12/9 (월)', checkIn: '10:00', checkOut: '20:00', pay: '84,000원' },
    { date: '12/10 (화)', checkIn: '12:00', checkOut: '20:00', pay: '42,000원' },
    { date: '12/11 (수)', checkIn: '10:00', checkOut: '22:00', pay: '42,000원' },
    { date: '12/12 (목)', checkIn: '12:00', checkOut: '00:00', pay: '42,000원' },
    { date: '12/13 (금)', checkIn: '10:00', checkOut: '20:00', pay: '0원' },
    { date: '12/14 (토)', checkIn: '00:00', checkOut: '00:00', pay: '0원' }
  ]);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      console.log('API 호출 시작...');
      const res = await adminApi.getAllUsers();
      console.log('받아온 데이터:', res.data);
      
      if (res.data && Array.isArray(res.data)) {
        setWorkers(res.data);
        console.log('Workers 설정 완료:', res.data);
      } else {
        console.error('데이터 형식 오류:', res.data);
        setError('데이터 형식이 올바르지 않습니다.');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('회원 조회 실패:', err);
      console.error('에러 상세:', err.response);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleWorkerClick = (workerId) => {
    navigate(`/admin/worker/${workerId}`);
  };

  const handleAddWorker = () => {
    navigate('/admin/register');
  };

  // 로그아웃 처리 (추가!)
 const handleLogout = () => {
        // 1. 로컬스토리지에서 토큰 삭제
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        // 2. 세션스토리지 삭제
        sessionStorage.clear();
        
        // 3. 로그인 페이지로 이동
        navigate('/login');
};

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <p>로딩중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <p style={{ color: 'red' }}>에러 발생: {error}</p>
        <button onClick={fetchWorkers}>다시 시도</button>
      </div>
    );
  }

  if (workers.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <p>등록된 근무자가 없습니다.</p>
        <button onClick={handleAddWorker}>근무자 추가하기</button>
      </div>
    );
  }

  return (
    <div className="management-page">
      <div className="management-container">
        <div className="management-header">
          <h2 className="page-title">관리자-메인</h2>
          <button 
            className="logout-btn" 
            onClick={() => setIsLogoutModalOpen(true)}  // 수정!
          >
            로그아웃
          </button>
        </div>

        <div className="management-content">
          {/* 왼쪽: 근무자 관리 */}
          <div className="left-section">
            <div className="section-header">
              <h3 className="section-title">근무자 관리 ({workers.length}명)</h3>
              <button className="add-icon-btn" onClick={handleAddWorker}>+</button>
            </div>

            <div className="worker-grid">
              {workers.map(worker => (
                <div 
                  key={worker.id} 
                  className="worker-card"
                  onClick={() => handleWorkerClick(worker.id)}
                >
                  <div className="worker-icon">😊</div>
                  <p className="worker-name">{worker.name || '이름없음'}</p>
                </div>
              ))}
            </div>

            <button className="manage-btn" onClick={handleAddWorker}>
              근무자 추가
            </button>
          </div>

          {/* 오른쪽: 출퇴근 관리 */}
          <div className="right-section">
            <div className="attendance-header">
              <h3 className="section-title">근무자 출퇴근 아이템별</h3>
              <p className="week-info">1주차 근무 아이템 제목</p>
            </div>

            <table className="attendance-table">
              <thead>
                <tr className="table-header">
                  <th className="table-th">날짜</th>
                  <th className="table-th">출근시간</th>
                  <th className="table-th">퇴근시간</th>
                  <th className="table-th">시급 (8 시간이상)</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-td">{record.date}</td>
                    <td className="table-td">{record.checkIn}</td>
                    <td className="table-td">{record.checkOut}</td>
                    <td className="table-td">{record.pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total-section">
              <p className="total-label">이번 달 총 급여</p>
              <p className="total-amount">42,000,000 원</p>
            </div>
          </div>
        </div>
      </div>

      {/* 로그아웃 모달 */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default WorkerManagement;