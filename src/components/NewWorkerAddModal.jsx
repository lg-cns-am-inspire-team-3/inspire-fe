import { useState } from 'react';
import './NewWorkerAddModal.css';

function NewWorkerAddModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    salary: ''
  });

  // 🔥 모달 닫혀있으면 아무것도 안 그림
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData); // 부모로 데이터 전달

    setFormData({
      name: '',
      phone: '',
      address: '',
      salary: ''
    });

    onClose(); // 등록 후 모달 닫기
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      phone: '',
      address: '',
      salary: ''
    });
    onClose();
  };

  return (
    <div className="worker-modal-overlay" onClick={onClose}>
      <div
        className="worker-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="worker-modal-title">새 근무자 등록</h2>

        <form onSubmit={handleSubmit} className="worker-modal-form">
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              type="text"
              placeholder="예: 홍길동"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">전화번호</label>
            <input
              type="text"
              placeholder="예: 010-1234-5678"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">주소</label>
            <input
              type="text"
              placeholder="예: Seoul, gangnam-gu"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">시급</label>
            <input
              type="number"
              placeholder="예: 10000"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              className="form-input"
            />
          </div>

          <div className="button-group">
            <button
              type="button"
              className="btn-cancel"
              onClick={handleCancel}
            >
              취소
            </button>
            <button type="submit" className="btn-submit">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewWorkerAddModal;
