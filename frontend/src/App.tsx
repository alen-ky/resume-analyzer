import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeUpload } from './screens/ResumeUpload';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/resumeUpload" element={<ResumeUpload />} />
        <Route path="*" element={<Navigate to="/resumeUpload" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
