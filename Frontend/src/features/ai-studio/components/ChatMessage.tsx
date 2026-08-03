import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Check, Copy, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import type { ChatMessage as ChatMessageType } from '../types';

export interface ChatMessageProps {
  message: ChatMessageType;
  onStreamComplete?: (messageId: string) => void;
  onRegenerate?: (messageId: string) => void;
  className?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  onStreamComplete,
  onRegenerate,
  className,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const isAssistant = message.role === 'assistant';
  const isStreaming = isAssistant && message.status === 'streaming';

  const [displayed, setDisplayed] = React.useState(isStreaming ? '' : message.content);
  const [copied, setCopied] = React.useState(false);
  const [rating, setRating] = React.useState<'up' | 'down' | null>(null);

  React.useEffect(() => {
    if (!isStreaming) {
      setDisplayed(message.content);
      return;
    }

    if (reducedMotion) {
      setDisplayed(message.content);
      onStreamComplete?.(message.id);
      return;
    }

    const step = Math.max(3, Math.ceil(message.content.length / 80));
    let index = 0;
    setDisplayed('');

    const timer = window.setInterval(() => {
      index += step;
      setDisplayed(message.content.slice(0, index));
      if (index >= message.content.length) {
        window.clearInterval(timer);
        onStreamComplete?.(message.id);
      }
    }, 30);

    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStreaming, message.content, reducedMotion]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = message.content;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const handleRegenerate = () => {
    onRegenerate?.(message.id);
  };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex gap-3', isAssistant ? 'flex-row' : 'flex-row-reverse', className)}
    >
      {isAssistant && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-600/15 text-indigo-300">
          <Bot className="h-4 w-4" />
        </div>
      )}

      <div className={cn('flex max-w-[85%] flex-col gap-1.5 sm:max-w-[75%]', isAssistant ? 'items-start' : 'items-end')}>
        <div
          className={cn(
            'rounded-2xl border px-4 py-3 text-sm leading-relaxed whitespace-pre-line',
            isAssistant
              ? 'rounded-tl-sm border-slate-700/80 bg-slate-900/80 text-slate-200'
              : 'rounded-tr-sm border-indigo-500/30 bg-indigo-600 text-slate-50'
          )}
        >
          {displayed}
          {isStreaming && !reducedMotion && (
            <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-indigo-300 align-middle" />
          )}
        </div>

        <div className={cn('flex items-center gap-2', isAssistant ? 'flex-row' : 'flex-row-reverse')}>
          <span className="text-[11px] text-slate-500">{message.timestamp}</span>
          {isAssistant && (
            <div className="flex items-center gap-0.5 text-slate-500">
              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy response"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-slate-800 hover:text-slate-200"
              >
                {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              </button>
              <button
                type="button"
                onClick={handleRegenerate}
                disabled={isStreaming}
                aria-label="Regenerate response"
                className="inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-slate-800 hover:text-slate-200 disabled:opacity-40"
              >
                <RefreshCw className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => setRating((prev) => (prev === 'up' ? null : 'up'))}
                aria-label="Rate response up"
                aria-pressed={rating === 'up'}
                className={cn(
                  'inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-slate-800',
                  rating === 'up' ? 'text-emerald-400' : 'hover:text-slate-200'
                )}
              >
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button
                type="button"
                onClick={() => setRating((prev) => (prev === 'down' ? null : 'down'))}
                aria-label="Rate response down"
                aria-pressed={rating === 'down'}
                className={cn(
                  'inline-flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-slate-800',
                  rating === 'down' ? 'text-rose-400' : 'hover:text-slate-200'
                )}
              >
                <ThumbsDown className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {!isAssistant && <Avatar name="You" size="sm" className="mt-0.5" />}
    </motion.div>
  );
};
