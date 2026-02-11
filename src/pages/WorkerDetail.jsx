import { useState, useEffect } from 'react'; // ✅ useEffect 추가
import { useNavigate, useParams } from 'react-router-dom';
import './WorkerDetail.css';
import DeleteWorkerModal from '../components/DeleteWorkerModal';
import WorkerEditModal from '../components/WorkerEditModal';
// ✅ [추가] 백엔드 통신을 위한 API 임포트
import { adminApi } from '../api/adminApi';

function WorkerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // ✅ [수정] 임시 데이터 대신 상태(State)로 관리
  const [workerInfo, setWorkerInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ [추가] 페이지 로드 시 백엔드에서 상세 정보 가져오기
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // GET /api/v1/admin/users/{id} 호출
        const response = await adminApi.getUserDetail(id);
        setWorkerInfo(response.data);
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        alert("근무자 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // ✅ [수정] 정보 수정 저장 (백엔드 PUT 연동)
  const handleSave = async (updatedInfo) => {
    try {
      // 1. 서버에 수정 요청 (PUT)
      await adminApi.updateUser(id, updatedInfo);
      
      // 2. 서버 응답 성공 시 UI 상태 업데이트
      setWorkerInfo(updatedInfo);
      alert('정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error("수정 실패:", error);
      alert("정보 수정 중 오류가 발생했습니다.");
    }
  };

  // ✅ [수정] 근무자 삭제 처리 (백엔드 DELETE 연동)
  const handleDelete = async () => {
    try {
      // 1. 서버에 삭제 요청 (DELETE)
      await adminApi.deleteUser(id);
      
      alert('근무자가 삭제되었습니다.');
      setIsDeleteOpen(false);
      navigate('/admin/workers'); // 목록으로 이동
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 처리 중 오류가 발생했습니다.");
    }
  };

  // ✅ 임시 출근 기록 (이 부분은 추후 출퇴근 API와 연동하세요)
  const [schedules] = useState([
    { date: '1/5', day: '(월)', time: '10:00~15:00', pay: '51,600 원' },
    { date: '1/14', day: '(수)', time: '10:00~15:00', pay: '51,600 원' },
  ]);

  if (loading) return <p>데이터를 불러오는 중입니다...</p>;
  if (!workerInfo) return <p>근무자를 찾을 수 없습니다.</p>;

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <button
            className="back-btn"
            onClick={() => navigate('/admin/workers')}
          >
            ← 근무자 목록
          </button>

          <button
            className="delete-btn"
            onClick={() => setIsDeleteOpen(true)}
          >
            근무자 삭제
          </button>
        </div>

        <div className="worker-info-card">
          <div className="worker-avatar">😊</div>

          <div className="worker-info-wrapper">
            <div className="worker-info">
              <h3 className="worker-info-name">{workerInfo.name}</h3>
              {/* ✅ [수정] phone -> contact 필드명 매칭 */}
              <p className="worker-info-phone">{workerInfo.contact || '전화번호 없음'}</p>
              <p className="worker-info-wage">
                {/* ✅ [수정] wage -> salary 필드명 매칭 */}
                시급 <strong>{(workerInfo.salary || 0).toLocaleString()}원</strong>
              </p>
            </div>

            <button
              className="worker-edit-btn"
              onClick={() => setIsEditOpen(true)}
            >
              정보 수정
            </button>
          </div>
        </div>

        {/* 출근 기록 섹션 */}
        <div className="schedule-section">
          <h3 className="schedule-section-title">최근 출퇴근 이력</h3>
          <div className="schedule-list">
            {schedules.map((schedule, index) => (
              <div key={index} className="schedule-item">
                <div className="schedule-left">
                  <span className="schedule-date">
                    <strong>{schedule.date}</strong> {schedule.day}
                  </span>
                  <span className="schedule-time">{schedule.time}</span>
                </div>
                <span className="schedule-pay">{schedule.pay}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="total-pay-section">
          <p className="total-pay-label">이번 달 상세 급여</p>
          <p className="total-pay-amount">825,000원</p>
        </div>
      </div>

      {/* 삭제 모달 */}
      <DeleteWorkerModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete} // ✅ 연동된 삭제 함수 연결
      />

      {/* 정보 수정 모달 */}
      <WorkerEditModal
        isOpen={isEditOpen}
        workerInfo={workerInfo}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave} // ✅ 연동된 저장 함수 연결
      />
    </div>
  );
}

export default WorkerDetail;