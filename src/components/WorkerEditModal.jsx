import { useState, useEffect } from 'react';
import './WorkerEditModal.css';

function WorkerEditModal({ isOpen, workerInfo, onClose, onSave }) {
  // ✅ workerInfo가 바뀔 때마다 form 상태를 업데이트하기 위해 초기값 설정
  const [form, setForm] = useState(workerInfo || {});

  useEffect(() => {
    if (workerInfo) {
      // ✅ 부모로부터 받은 데이터(workerInfo)를 form에 복사
      setForm(workerInfo);
    }
  }, [workerInfo]);

  if (!isOpen) return null;

  return (
    <div className="edit-modal-overlay" onClick={onClose}>
      <div
        className="edit-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="edit-modal-title">근무자 정보 수정</h3>

        <label className="edit-label">이름</label>
        <input
          className="edit-input"
          value={form.name || ''}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <label className="edit-label">전화번호</label>
        <input
          className="edit-input"
          placeholder="010-0000-0000"
          // ✅ [규격 맞춤] phone -> contact로 변경 (백엔드 DTO와 일치)
          value={form.contact || ''} 
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
        />

        <label className="edit-label">시급 (원)</label>
        <input
          className="edit-input"
          type="number"
          // ✅ [규격 맞춤] wage -> salary로 변경 (백엔드 DTO와 일치)
          value={form.salary || 0}
          onChange={(e) =>
            // ✅ [타입 맞춤] 입력값을 Number로 변환하여 백엔드 Integer 타입에 대응
            setForm({ ...form, salary: Number(e.target.value) })
          }
        />

        <div className="edit-btn-group">
          <button className="cancel-btn" onClick={onClose}>
            취소
          </button>
          <button
            className="save-btn"
            onClick={() => {
              // ✅ 수정된 데이터를 부모 컴포넌트의 API 호출 함수(onSave)로 전달
              onSave(form);
              onClose();
            }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkerEditModal;