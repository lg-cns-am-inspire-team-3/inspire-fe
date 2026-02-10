import './DeleteWorkerModal.css';

function DeleteWorkerModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">근무자 삭제</h3>
        <p className="modal-message">
          정말로 근무자정보를 삭제하시겠습니까?<br />
          삭제 후 복구가 불가능합니다.
        </p>
        <div className="modal-button-group">
          <button className="modal-btn-cancel" onClick={onClose}>
            아니오
          </button>
          <button className="modal-btn-confirm" onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteWorkerModal;