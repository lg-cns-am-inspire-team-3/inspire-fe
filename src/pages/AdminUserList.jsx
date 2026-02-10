import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../api/adminApi';
import './AdminUserList.css';

function AdminUserList() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    salary: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 유효성 검사
    if (!formData.name || !formData.phone || !formData.address || !formData.salary) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    try {
      // 여기서는 일단 콘솔 출력만 (실제로는 POST API 필요)
      console.log('제출된 데이터:', formData);
      alert('근무자 등록이 완료되었습니다!');
      
      // 메인 페이지로 이동
      navigate('/admin/workers');
    } catch (error) {
      console.error('등록 실패:', error);
      alert('근무자 등록에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    setFormData({ name: '', phone: '', address: '', salary: '' });
    navigate('/admin/workers');
  };

  return (
    <div className="approval-page">
      <div className="approval-container">
        <h2 className="approval-title">새 근무자 등록</h2>
        
        <form onSubmit={handleSubmit} className="approval-form">
          <div className="form-group">
            <label className="form-label">이름</label>
            <input
              type="text"
              placeholder="예: 홍길동"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">전화번호</label>
            <input
              type="text"
              placeholder="예: 010-1234-5678"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">주소</label>
            <input
              type="text"
              placeholder="예: Seoul,gangnam-gu"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">시급</label>
            <input
              type="number"
              placeholder="예: 10000"
              value={formData.salary}
              onChange={(e) => setFormData({...formData, salary: e.target.value})}
              className="form-input"
            />
          </div>

          <div className="button-group">
            <button type="button" onClick={handleCancel} className="btn-cancel">
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

export default AdminUserList;