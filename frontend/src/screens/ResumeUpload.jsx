import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ResumeUpload() {
  const navigate = useNavigate();
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleResumeChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = async () => {
    if (!resumeFile || !jobDescription) {
      alert('Please upload a resume and paste a job description');
      return;
    }

    try {
      // upload Resume
      const formData = new FormData();
      formData.append('resume_file', resumeFile);

      const uploadResponse = await fetch('http://127.0.0.1:8000/api/resume-upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadData.status !== 'Success') {
        alert(uploadData.message);
        return;
      }

      const uid = uploadData.uid;

      // upload job description
      const descResponse = await fetch('http://127.0.0.1:8000/api/job-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid, job_description: jobDescription }),
      });

      const descData = await descResponse.json();

      if (descData.status !== 'Success') {
        alert(descData.message);
        return;
      }

      // analyze resume
      const analyzeResponse = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid }),
      });

      const analyzeData = await analyzeResponse.json();

      navigate('/dashboard'); // or '/dashboard' depending on your route
      alert(`Fit Score: ${analyzeData.fit_score}\nFeedback: ${analyzeData.feedback.join(', ')}`);

    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="p-8 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Upload Your Resume</h2>

      <input type="file" onChange={handleResumeChange} accept=".pdf, .docx, .txt" />

      <textarea
        className="border p-2 w-full h-40"
        placeholder="Paste Job Description Here..."
        value={jobDescription}
        onChange={handleDescriptionChange}
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Analyze Resume
      </button>
    </div>
  );
}