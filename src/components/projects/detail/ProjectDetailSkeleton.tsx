'use client';

export default function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-bg-main py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-border-main rounded-md" />
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-border-main rounded-md" />
          <div className="h-5 w-1/2 bg-border-main rounded-md" />
        </div>
        <div className="aspect-video w-full bg-border-main rounded-2xl" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-border-main rounded" />
          <div className="h-4 w-full bg-border-main rounded" />
          <div className="h-4 w-2/3 bg-border-main rounded" />
        </div>
      </div>
    </div>
  );
}
