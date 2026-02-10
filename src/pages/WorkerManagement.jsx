import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerManagement.css';
import LogoutModal from '../components/LogoutModal';
import NewWorkerAddModal from '../components/NewWorkerAddModal';

function WorkerManagement() {
  const navigate = useNavigate(); 

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [workers, setWorkers] = useState([
    { id: 1, name: '근무자1' },
    { id: 2, name: '근무자2' },
    { id: 3, name: '근무자3' },
    { id: 4, name: '근무자4' },
    { id: 5, name: '근무자5' },
    { id: 6, name: '근무자6' },
    { id: 7, name: '근무자7' },
    { id: 8, name: '근무자8' },
  ]);

  const [attendanceData] = useState([
    { date: '12/9 (월)', checkIn: '10:00', checkOut: '20:00', pay: '84,000원' },
    { date: '12/10 (화)', checkIn: '12:00', checkOut: '20:00', pay: '42,000원' },
    { date: '12/11 (수)', checkIn: '10:00', checkOut: '22:00', pay: '42,000원' },
    { date: '12/12 (목)', checkIn: '12:00', checkOut: '00:00', pay: '42,000원' },
    { date: '12/13 (금)', checkIn: '10:00', checkOut: '20:00', pay: '0원' },
    { date: '12/14 (토)', checkIn: '00:00', checkOut: '00:00', pay: '0원' }
  ]);

  return (
    <div className="management-page">
      <div className="management-container">
        <div className="management-header">
          <h2 className="page-title">관리자-메인</h2>
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

            {/* 🔥 근무자 카드 */}
            <div className="worker-grid">
              {workers.map(worker => (
                <div
                  key={worker.id}
                  className="worker-card"
                  onClick={() => navigate(`/admin/workers/${worker.id}`)} // 🔥 여기!!
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
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          setIsLogoutOpen(false);
          alert('로그아웃 되었습니다');
        }}
      />

      {/* 근무자 추가 모달 */}
      <NewWorkerAddModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onSubmit={(data) => {
          const newWorker = {
            id: Date.now(),
            name: data.name
          };
          setWorkers(prev => [...prev, newWorker]);
        }}
      />
    </div>
  );
}

export default WorkerManagement;

