import { StatBlock } from '@/components/NewDashboard/DashComponents/StatBlock'
import { CircularGauge } from '@/components/NewDashboard/DashComponents/CircularGauge'
import { SuggestedImprovements } from '@/components/NewDashboard/DashComponents/SuggestedImprovements'
import { ResumeScreen } from '@/screens';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button2.tsx"
import jsPDF from 'jspdf';

export default function DashboardPage() {
  const [feedBackLoaded, setFeedBackLoaded] = useState(false);
  const [feedBackLoading, setFeedBackLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [setAverageFitScoreData] = useState([]);
  const [feedBack, setFeedBack] = useState([]);
  const [fitScore, setFitScore] = useState(0);

  useEffect(() => {
    if (feedBackLoaded) {
      setFeedBack(feedBack);
      setFitScore(fitScore);
    }
  }, [feedBack, fitScore, feedBackLoaded]);

  const transformedFeedBack = feedBack
    .filter(item => item.trim() !== "")
    .map(item => ({ text: item }));

  const handleDownloadFeedback = () => {
    if (!feedBack || feedBack.length === 0 || fitScore === null) {
      alert('Feedback or Fit Score is missing!');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('User Feedback Report', 10, 20);
    doc.setFontSize(14);
    doc.text(`Fit Score: ${fitScore}`, 10, 40);
    doc.setFontSize(12);
    doc.text('Feedback:', 10, 60);

    if (feedBack.length > 0) {
      feedBack.forEach((item, index) => {
        doc.text(`${index + 1}. ${item}`, 10, 70 + index * 10);
      });
    } else {
      doc.text('No feedback provided.', 10, 70);
    }
    doc.save('feedback_report.pdf');
  };

  return (
    <div className="flex gap-8 h-full p-6">
      {/* Left column: Resume upload and Fit Score stacked */}
      <div className="w-[35%] flex flex-col gap-8">
        <ResumeScreen
          setAverageFitScoreData={setAverageFitScoreData}
          setFeedBackLoaded={setFeedBackLoaded}
          setFeedBackLoading={setFeedBackLoading}
          setProgress={setProgress}
          setFeedBack={setFeedBack}
          setFitScore={setFitScore}
        />
        <CircularGauge
          score={fitScore}
          maxScore={100}
          feedBackLoaded={feedBackLoaded}
          feedBackLoading={feedBackLoading}
          progress={progress}
        />
      </div>

      {/* Right column: Suggested Improvements takes full height */}
      <div className="w-[65%] flex flex-col h-full">
        <StatBlock title="Suggested Improvements" className="flex-grow overflow-auto min-h-[400px]">
          <SuggestedImprovements
            improvements={transformedFeedBack}
            feedBackLoaded={feedBackLoaded}
            feedBackLoading={feedBackLoading}
            progress={progress}
          />
        </StatBlock>
      </div>
    </div>
  )
}