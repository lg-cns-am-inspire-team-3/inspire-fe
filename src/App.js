import './App.css';
// import WorkerManagement from './pages/WorkerManagement';
// import WorkerDetail from './pages/WorkerDetail';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/admin/workers" element={<WorkerManagement />} />
//         <Route path="/admin/worker/:id" element={<WorkerDetail />} /> 
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorkerManagement from './pages/WorkerManagement';
import WorkerDetail from './pages/WorkerDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/workers" element={<WorkerManagement />} />
        
        <Route path="/admin/workers/:id" element={<WorkerDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

