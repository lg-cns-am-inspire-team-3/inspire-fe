import logo from './logo.svg';
import './App.css';
import AttendanceScanPage from './pages/AttendanceScanPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/attendance/scan" element={<AttendanceScanPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
