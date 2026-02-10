import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './WorkerDetail.css';
import DeleteWorkerModal from '../components/DeleteWorkerModal';
import WorkerEditModal from '../components/WorkerEditModal';

function WorkerDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // 🔥 임시 근무자 데이터
  const workers = [
    { id: 1, name: '근무자1', phone: '010-1111-1111', wage: 12000 },
    { id: 2, name: '근무자2', phone: '010-2222-2222', wage: 11000 },
    { id: 3, name: '근무자3', phone: '010-3333-3333', wage: 10000 },
  ];

  const foundWorker = workers.find(
    worker => worker.id === Number(id)
  );

  const [workerInfo, setWorkerInfo] = useState(foundWorker);

  const [schedules] = useState([
    { date: '1/5', day: '(월)', time: '10:00~15:00', pay: '51,600 원' },
    { date: '1/14', day: '(수)', time: '10:00~15:00', pay: '51,600 원' },
    { date: '1/13', day: '(화)', time: '10:00~15:00', pay: '51,600 원' },
  ]);

  if (!workerInfo) {
    return <p>근무자를 찾을 수 없습니다.</p>;
  }

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
            <p className="worker-info-phone">{workerInfo.phone}</p>
            <p className="worker-info-wage">
                시급 <strong>{workerInfo.wage.toLocaleString()}원</strong>
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



        {/* 출근 기록 */}
        <div className="schedule-section">
          <h3 className="schedule-section-title">최근 출근 아이템</h3>
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
        onConfirm={() => {
          setIsDeleteOpen(false);
          alert('근무자가 삭제되었습니다');
          navigate('/admin/workers');
        }}
      />

      {/* 🔥 정보 수정 모달 */}
      <WorkerEditModal
        isOpen={isEditOpen}
        workerInfo={workerInfo}
        onClose={() => setIsEditOpen(false)}
        onSave={(updatedInfo) => {
          setWorkerInfo(updatedInfo);
        }}
      />
    </div>
  );
}

export default WorkerDetail;
