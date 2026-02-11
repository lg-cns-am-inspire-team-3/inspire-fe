import './WorkerApproveModal.css';

function WorkerApproveModal({ isOpen, workers, onClose, onApprove }) {
  if (!isOpen) return null;

  return (
    <div className="approve-modal-overlay" onClick={onClose}>
      <div
        className="approve-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="approve-modal-title">근무자 승인</h3>

        <ul className="approve-list">
          {workers.map(worker => (
            <li key={worker.id} className="approve-item">
              <span className="approve-name">{worker.name}</span>
              <button
                className="approve-btn"
                onClick={() => onApprove(worker.id)}
              >
                승인
              </button>
            </li>
          ))}
        </ul>

        <button className="approve-close-btn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default WorkerApproveModal;
