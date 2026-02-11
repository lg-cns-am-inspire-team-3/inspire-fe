import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './WorkerManagement.css';
import LogoutModal from '../components/LogoutModal';
import WorkerApproveModal from '../components/WorkerApproveModal';

function WorkerManagement() {
  const navigate = useNavigate(); 

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false); // 👉 승인 모달

  // ✅ 승인 완료된 근무자 (카드에 보임)
  const [workers, setWorkers] = useState([
    { id: 1, name: '근무자1' },
    { id: 2, name: '근무자2' },
  ]);

  // ✅ 승인 대기 근무자 (모달에만 보임)
  const [pendingWorkers, setPendingWorkers] = useState([
    { id: 3, name: '근무자3' },
    { id: 4, name: '근무자4' },
    { id: 5, name: '근무자5' },
    { id: 6, name: '근무자6' },
    { id: 7, name: '근무자7' },
    { id: 8, name: '근무자8' },
  ]);

  const [attendanceData, setAttendanceData] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  // ✅ 근무자 승인 처리 (핵심 로직)
  const handleApprove = (workerId) => {
    const approvedWorker = pendingWorkers.find(
      worker => worker.id === workerId
    );

    // 1️⃣ 승인 완료 목록에 추가
    setWorkers(prev => [...prev, approvedWorker]);

    // 2️⃣ 승인 대기 목록에서 제거
    setPendingWorkers(prev =>
      prev.filter(worker => worker.id !== workerId)
    );
  };

  useEffect(() => {
  fetchMonthlyAttendance();
  fetchMonthlyTotal();
}, []);

const fetchMonthlyAttendance = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/v1/admin/users/attendances'
    );

    setAttendanceData(response.data);
  } catch (error) {
    console.error('출퇴근 데이터 불러오기 실패', error);
  }
};

const fetchMonthlyTotal = async () => {
  try {
    const response = await axios.get(
      'http://localhost:8080/api/v1/admin/users/attendances/monthly-total'
    );

    setMonthlyTotal(response.data.totalAmount);
  } catch (error) {
    console.error('총 급여 불러오기 실패', error);
  }
};


  return (
    <div className="management-page">
      <div className="management-container">
        <div className="management-header">
          <button
            className="logout-btn"
            onClick={() => setIsLogoutOpen(true)}
          >
            로그아웃
          </button>
        </div>

        <div className="management-content">
          {/* 왼쪽: 근무자 관리 */}
          <div className="left-section">
            <div className="section-header">
              <h3 className="section-title">근무자 관리</h3>
            </div>

            {/* ✅ 승인 완료된 근무자 카드 */}
            <div className="worker-grid">
              {workers.map(worker => (
                <div
                  key={worker.id}
                  className="worker-card"
                  onClick={() => navigate(`/admin/workers/${worker.id}`)}
                >
                  <div className="worker-icon">😊</div>
                  <p className="worker-name">{worker.name}</p>
                </div>
              ))}
            </div>

            <button
              className="manage-btn"
              onClick={() => setIsAddOpen(true)}
            >
              근무자 승인
            </button>
          </div>

          {/* 오른쪽: 출퇴근 관리 */}
          <div className="right-section">
            <div className="attendance-header">
              <h3 className="section-title">근무자 출퇴근 이력관리</h3>
              <p className="week-info">2026년 2월 5일 목요일</p>
            </div>

            <table className="attendance-table">
              <thead>
                <tr className="table-header">
                  <th className="table-th">이름</th>
                  <th className="table-th">출근시간</th>
                  <th className="table-th">퇴근시간</th>
                  <th className="table-th">이번 달 예상급여</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr key={index} className="table-row">
                    <td className="table-td">{record.name}</td>
                    <td className="table-td">{record.checkIn}</td>
                    <td className="table-td">{record.checkOut}</td>
                    <td className="table-td">{record.payTotal?.toLocaleString()} 원</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total-section">
              <p className="total-label">이번 달 총 급여</p>
              <p className="total-amount"> {monthlyTotal.toLocaleString()} 원</p>
            </div>
          </div>
        </div>
      </div>

      {/* 로그아웃 모달 */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          setIsLogoutOpen(false);
          alert('로그아웃 되었습니다');
        }}
      />

      {/* ✅ 근무자 승인 모달 */}
      <WorkerApproveModal
        isOpen={isAddOpen}
        workers={pendingWorkers}   // 🔥 핵심 변경
        onClose={() => setIsAddOpen(false)}
        onApprove={handleApprove}
      />
    </div>
  );
}

export default WorkerManagement;
