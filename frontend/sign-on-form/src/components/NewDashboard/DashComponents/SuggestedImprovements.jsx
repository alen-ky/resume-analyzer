/**
 * This file is responsible for the "Suggested Improvements" block
 * 
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Progress } from "@/components/ui/progress.tsx"
export function SuggestedImprovements({ improvements, feedBackLoaded, feedBackLoading, progress }) {
  return (
    <>
    {!feedBackLoaded && !feedBackLoading && <div className="flex items-center justify-center h-full">
      <p>No data yet</p>
      </div>}
    {feedBackLoaded &&<div className="space-y-2 overflow-auto">
      {improvements.map((improvement, index) => (
        <div key={index} className="text-foreground mb-2">{improvement.text}</div>
      ))}
    </div>}
     {feedBackLoading && <div className="flex items-center justify-center h-full"><Progress value={progress} /></div>}
    </>
  )
}

SuggestedImprovements.propTypes = {
  improvements: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};