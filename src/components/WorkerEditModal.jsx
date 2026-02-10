import { useState, useEffect } from 'react';
import './WorkerEditModal.css';

function WorkerEditModal({ isOpen, workerInfo, onClose, onSave }) {
  const [form, setForm] = useState(workerInfo);

  useEffect(() => {
    setForm(workerInfo);
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
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <label className="edit-label">전화번호</label>
        <input
          className="edit-input"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <label className="edit-label">시급 (원)</label>
        <input
          className="edit-input"
          type="number"
          value={form.wage}
          onChange={(e) =>
            setForm({ ...form, wage: Number(e.target.value) })
          }
        />

        <div className="edit-btn-group">
          <button className="cancel-btn" onClick={onClose}>
            취소
          </button>
          <button
            className="save-btn"
            onClick={() => {
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
