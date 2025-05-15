import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex items-center justify-center h-[100vh] w-[100vw] bg-background p-2 dark">
  <div className="w-[98%] h-[95%] bg-card rounded-2xl shadow-lg overflow-hidden flex">
    <main className="flex-1 overflow-hidden p-4 bg-background text-foreground">
      <div className="h-full">{children}</div>
    </main>
  </div>
</div>


  )
}


