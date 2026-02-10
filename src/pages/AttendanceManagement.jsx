import { useState } from 'react';
import './AttendanceManagement.css';

function AttendanceManagement() {
  // 더미 데이터
  const [attendanceData] = useState({
    week: '2024.12.09 ~ 2024.12.15',
    records: [
      { day: '12/9 (월)', checkIn: '10:00', checkOut: '20:00', hours: 10, pay: '42,000원' },
      { day: '12/10 (화)', checkIn: '10:00', checkOut: '20:00', hours: 10, pay: '42,000원' },
      { day: '12/11 (수)', checkIn: '12:00', checkOut: '22:00', hours: 10, pay: '42,000원' },
      { day: '12/12 (목)', checkIn: '12:00', checkOut: '22:00', hours: 10, pay: '42,000원' },
      { day: '12/13 (금)', checkIn: '00:00', checkOut: '00:00', hours: 0, pay: '0원' },
      { day: '12/14 (토)', checkIn: '00:00', checkOut: '00:00', hours: 0, pay: '0원' },
    ]
  });

  const totalPay = '42,000,000원';

  return (
    <div className="attendance-management-page">
      <div className="attendance-container">
        <h2>근무자 출퇴근 아이템별</h2>
        <p className="week-label">{attendanceData.week}</p>

        <div className="attendance-table-wrapper">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>출근시간</th>
                <th>퇴근시간</th>
                <th>시간 (8 시간이상)</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.records.map((record, index) => (
                <tr key={index}>
                  <td>{record.day}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut}</td>
                  <td>{record.hours}시간</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="total-section">
          <p className="total-label">이번 달 총 급여</p>
          <p className="total-amount">{totalPay}</p>
        </div>
      </div>
    </div>
  );
}

export default AttendanceManagement;