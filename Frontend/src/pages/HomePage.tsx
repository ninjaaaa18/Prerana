import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Layers, Activity } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { checkHealth } from '@/services/api.service';
import { Button } from '@/components/ui/button';

export const HomePage: React.FC = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: checkHealth,
  });

  return (
    <div className="space-y-12 py-6">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Scalable Production Architecture
        </h1>
        <p className="text-slate-400 text-lg">
          React 19, Vite, Tailwind CSS v4, TypeScript, React Router, TanStack Query, Zod & Express Backend.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Button variant="primary" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            Documentation
          </Button>
        </div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 max-w-md mx-auto flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-indigo-400" />
          <span className="text-sm font-medium text-slate-300">Backend API Health:</span>
        </div>
        <div className="text-sm">
          {isLoading ? (
            <span className="text-yellow-400">Checking...</span>
          ) : isError ? (
            <span className="text-red-400 font-semibold">Offline</span>
          ) : (
            <span className="text-emerald-400 font-semibold">{data?.status || 'OK'}</span>
          )}
        </div>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
          <Zap className="w-8 h-8 text-indigo-400" />
          <h3 className="text-lg font-semibold text-slate-200">High Performance</h3>
          <p className="text-sm text-slate-400">
            Powered by Vite and React 19 for lightning fast builds and client-side routing.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
          <ShieldCheck className="w-8 h-8 text-purple-400" />
          <h3 className="text-lg font-semibold text-slate-200">Type Safe</h3>
          <p className="text-sm text-slate-400">
            End-to-end TypeScript integration with strict schema validation using Zod.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 space-y-3">
          <Layers className="w-8 h-8 text-pink-400" />
          <h3 className="text-lg font-semibold text-slate-200">Clean Architecture</h3>
          <p className="text-sm text-slate-400">
            Independent modular structure with clean separation of concerns.
          </p>
        </div>
      </div>
    </div>
  );
};
