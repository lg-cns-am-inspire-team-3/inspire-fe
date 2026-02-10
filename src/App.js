import './App.css';
import AttendanceScanPage from './pages/AttendanceScanPage';
import AdminUserList from './pages/AdminUserList';
import WorkerManagement from './pages/WorkerManagement';
import AttendanceManagement from './pages/AttendanceManagement';
import WorkerDetail from './pages/WorkerDetail';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/attendance/scan" element={<AttendanceScanPage />} />

        
        <Route path="/admin/register" element={<AdminUserList />} />
        <Route path="/admin/workers" element={<WorkerManagement />} />
        <Route path="/admin/attendance" element={<AttendanceManagement />} />
        <Route path="/admin/worker/:id" element={<WorkerDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
