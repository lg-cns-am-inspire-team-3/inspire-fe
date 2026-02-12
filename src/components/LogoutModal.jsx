import './LogoutModal.css';
import { useLogout } from '../auth/logout';

function LogoutModal({ isOpen, onClose, onConfirm }) {

  if (!isOpen) return null;

  return (
    <div className="logout-modal-overlay" onClick={onClose}>
      <div className="logout-modal-container" onClick={(e) => e.stopPropagation()}>
        <h3 className="logout-modal-title">로그아웃</h3>
        <p className="logout-modal-message">
          정말로 로그아웃 하시겠습니까?
        </p>
        <div className="logout-modal-button-group">
          <button className="logout-modal-btn-yes" onClick={onConfirm}>
            예
          </button>
          <button className="logout-modal-btn-no" onClick={onClose}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;