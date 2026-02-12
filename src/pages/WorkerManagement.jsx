import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './WorkerManagement.css';
import LogoutModal from '../components/LogoutModal';
import WorkerApproveModal from '../components/WorkerApproveModal';
// ✅ [확인] adminApi.js 파일명과 경로가 일치하는지 확인하세요.
import { adminApi } from '../api/adminApi';

function WorkerManagement() {
  const navigate = useNavigate();

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // ✅ 서버에서 받아올 데이터를 담는 상태값
  const [workers, setWorkers] = useState([]); // 승인 완료(ACTIVE) 근무자 리스트
  const [pendingWorkers, setPendingWorkers] = useState([]); // 승인 대기(SUSPENDED) 근무자 리스트

  // ✅ 페이지 로드 시 실시간 데이터 로딩
  useEffect(() => {
    fetchWorkerData();
  }, []);

  const fetchWorkerData = async () => {
    try {
      // ✅ [수정] 백엔드에서 분리한 두 개의 API를 병렬로 호출하여 성능 최적화
      const [activeRes, suspendedRes] = await Promise.all([
        adminApi.getActiveUsers(),       // 백엔드의 getActiveUsers()와 연결
        adminApi.getSuspendedUsers()  // 백엔드의 getSuspendedUsers()와 연결
      ]);

      // ✅ [디버깅] 데이터 구조 확인용 로그 (나중에 지우셔도 됩니다)
      console.log("ACTIVE 응답:", activeRes.data);
      console.log("SUSPENDED 응답:", suspendedRes.data);

      // ✅ [수정] 백엔드가 이미 필터링해서 줬으므로 프론트 필터 없이 그대로 저장
      // 데이터가 없을 경우를 대비해 빈 배열([])을 기본값으로 설정합니다.
      setWorkers(activeRes.data || []);
      setPendingWorkers(suspendedRes.data || []);

    } catch (error) {
      console.error("데이터 로딩 중 에러 발생:", error);
      alert("근무자 데이터를 불러오는 데 실패했습니다.");
    }
  };

  // ✅ 근무자 승인 처리 로직
  const handleApprove = async (workerId) => {
    try {
      // 1. 서버에 승인 요청 (PATCH)
      await adminApi.approveUser(workerId);

      // 2. 대기 목록에서 승인된 유저 객체 찾기
      const approvedWorker = pendingWorkers.find(worker => worker.id === workerId);

      // 3. UI 실시간 반영 (새로고침 없이 목록 업데이트)
      // 승인 완료 목록(workers)에 추가
      setWorkers(prev => [...prev, approvedWorker]);
      // 대기 목록(pendingWorkers)에서 제거
      setPendingWorkers(prev => prev.filter(worker => worker.id !== workerId));

      alert(`${approvedWorker.name} 님의 승인이 완료되었습니다.`);
    } catch (error) {
      console.error("승인 처리 실패:", error);
      alert("승인 처리 중 서버 오류가 발생했습니다.");
    }
  };

  // ✅ 출퇴근 샘플 데이터 (추후 API 연동 예정)
  const [attendanceData] = useState([
    { name: '근무자1', checkIn: '10:00', checkOut: '20:00', paytotal: '84,000원' },
    { name: '근무자2', checkIn: '12:00', checkOut: '20:00', paytotal: '42,000원' },
  ]);

  return (
    <div className="management-page">
      <div className="management-container">
        <div className="management-header">
          <button className="logout-btn" onClick={() => setIsLogoutOpen(true)}>
            로그아웃
          </button>
        </div>

        <div className="management-content">
          {/* 왼쪽 섹션: 근무자 관리 카드 목록 */}
          <div className="left-section">
            <div className="section-header">
              <h3 className="section-title">근무자 관리</h3>
            </div>

            <div className="worker-grid">
              {workers.length > 0 ? (
                workers.map(worker => (
                  <div
                    key={worker.id}
                    className="worker-card"
                    // ✅ 카드 클릭 시 상세 페이지로 이동 (id 전달)
                    onClick={() => navigate(`/admin/workers/${worker.id}`)}
                  >
                    <div className="worker-icon">😊</div>
                    <p className="worker-name">{worker.name}</p>
                  </div>
                ))
              ) : (
                <p className="empty-msg">등록된 근무자가 없습니다.</p>
              )}
            </div>

            <button className="manage-btn" onClick={() => setIsAddOpen(true)}>
              근무자 승인
            </button>
          </div>

          {/* 오른쪽 섹션: 출퇴근 현황 테이블 */}
          <div className="right-section">
            <div className="attendance-header">
              <h3 className="section-title">근무자 출퇴근 이력관리</h3>
              <p className="week-info">2026년 2월 11일 수요일</p>
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
                    <td className="table-td">{record.monthlyPay?.toLocaleString()} 원</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="total-section">
              <p className="total-label">이번 달 총 급여</p>
              {/* <p className="total-amount"> {monthlyTotal.toLocaleString()} 원</p> */}
            </div>
          </div>
        </div>
      </div>

      {/* 모달 컴포넌트들 */}
      <LogoutModal
        isOpen={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        onConfirm={() => {
          setIsLogoutOpen(false);
          alert('로그아웃 되었습니다');
        }}
      />

      <WorkerApproveModal
        isOpen={isAddOpen}
        workers={pendingWorkers} // ✅ 서버에서 받은 대기자 목록 전달
        onClose={() => setIsAddOpen(false)}
        onApprove={handleApprove}
      />
    </div>
  );
}

export default WorkerManagement;