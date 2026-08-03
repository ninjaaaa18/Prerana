import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex rounded-full border border-slate-700 bg-slate-800/80 p-4 text-indigo-400">
        <Compass className="h-8 w-8" />
      </div>
      <div className="mt-6 space-y-2">
        <p className="font-display text-6xl font-bold text-slate-200">404</p>
        <h1 className="text-xl font-semibold text-slate-100">Page not found</h1>
        <p className="text-sm text-slate-400">
          The page you are looking for doesn&apos;t exist or has moved.
        </p>
      </div>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-indigo-600/25 transition-colors hover:bg-indigo-500"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </div>
  );
};
