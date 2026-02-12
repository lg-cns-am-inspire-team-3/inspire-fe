import { useState, useEffect } from 'react';
import './NewWorkerAddModal.css';

// ✅ initialData 프롭을 추가하여 수정 시 기존 데이터를 받을 수 있게 합니다.
function NewWorkerAddModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    salary: ''
  });

  // ✅ [중요] 모달이 열릴 때 initialData(기본 정보)가 있으면 입력창에 채워줍니다.
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        contact: initialData.contact || '',
        address: initialData.address || '',
        // 시급이 0이면 빈 문자열로 보여줘서 사용자가 지우는 번거로움을 줄입니다.
        salary: initialData.salary === 0 ? '' : initialData.salary
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ 데이터 정제: 시급은 반드시 숫자로 변환하여 전송합니다.
    const submitData = {
      ...formData,
      salary: formData.salary ? Number(formData.salary) : 0
    };

    onSubmit(submitData);

    // 필드 초기화 및 닫기
    handleCancel();
  };

  const handleCancel = () => {
    setFormData({ name: '', contact: '', address: '', salary: '' });
    onClose();
  };

  return (
    <div className="worker-modal-overlay" onClick={handleCancel}>
      <div
        className="worker-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="worker-modal-title">
          {initialData ? '근무자 정보 수정' : '새 근무자 등록'}
        </h2>

        <form onSubmit={handleSubmit} className="worker-modal-form">
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              type="text"
              placeholder="예: 홍길동"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">전화번호</label>
            <input
              type="text"
              placeholder="예: 010-1234-5678"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">주소</label>
            <input
              type="text"
              placeholder="예: 서울시 강남구"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">시급 (원)</label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="시급을 입력하세요"
              value={formData.salary || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setFormData({ ...formData, salary: value });
              }}
              className="form-input"
            />
          </div>

          <div className="button-group">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              취소
            </button>
            <button type="submit" className="btn-submit">
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewWorkerAddModal;