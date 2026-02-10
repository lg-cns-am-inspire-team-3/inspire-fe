import { useState } from 'react';
import './WorkerDetail.css';

function WorkerDetail() {
  const [workerInfo] = useState({
    name: '근무자1',
    phone: '010-1234-5678'
  });

  const [schedules] = useState([
    { date: '1/5', day: '(월)', time: '10:00~ 15:00', pay: '51,600 원' },
    { date: '1/14', day: '(수)', time: '10:00~ 15:00', pay: '51,600 원' },
    { date: '1/13', day: '(화)', time: '10:00~ 15:00', pay: '51,600 원' },
    { date: '1/12', day: '(월)', time: '10:00~ 15:00', pay: '51,600 원' },
    { date: '1/09', day: '(토)', time: '10:00~ 15:00', pay: '51,600 원' }
  ]);

  return (
    <div className="detail-page">
      <div className="detail-container">
        <div className="detail-header">
          <button className="back-btn">← 근무자 목록</button>
          <button className="delete-btn">근무자 삭제</button>
        </div>

        <h2 className="detail-page-title">관리자-근무자관리 상세</h2>

        {/* 근무자 정보 카드 */}
        <div className="worker-info-card">
          <div className="worker-avatar">😊</div>
          <div className="worker-info">
            <h3 className="worker-info-name">{workerInfo.name}</h3>
            <p className="worker-info-phone">{workerInfo.phone}</p>
          </div>
        </div>

        {/* 최근 출근 기록 */}
        <div className="schedule-section">
          <h3 className="schedule-section-title">최근 출근 아이템</h3>
          <div className="schedule-list">
            {schedules.map((schedule, index) => (
              <div key={index} className="schedule-item">
                <div className="schedule-left">
                  <span className="schedule-date">
                    <span className="date-bold">{schedule.date}</span>{' '}
                    <span className="date-gray">{schedule.day}</span>
                  </span>
                  <span className="schedule-time">{schedule.time}</span>
                </div>
                <span className="schedule-pay">{schedule.pay}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 이번 달 급여 */}
        <div className="total-pay-section">
          <p className="total-pay-label">이번 달 상세 급여</p>
          <p className="total-pay-amount">825,000원</p>
        </div>
      </div>
    </div>
  );
}

export default WorkerDetail;