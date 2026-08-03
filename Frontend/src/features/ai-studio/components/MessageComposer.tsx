import React from 'react';
import { SendHorizontal, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void;
  isGenerating?: boolean;
  placeholder?: string;
  className?: string;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({
  value,
  onChange,
  onSend,
  isGenerating = false,
  placeholder = 'Ask Prerana AI anything…',
  className,
}) => {
  const canSend = value.trim().length > 0 && !isGenerating;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (canSend) onSend(value);
    }
  };

  const handleSend = () => {
    if (canSend) onSend(value);
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-800 bg-slate-900/80 p-3 shadow-soft backdrop-blur-sm',
        className
      )}
    >
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <Textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-h-[52px] max-h-44 border-0 bg-transparent px-2 py-1.5 focus:border-0 focus:ring-0 resize-none"
            aria-label="Message Prerana AI"
          />
        </div>
        <Button
          type="button"
          size="icon"
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className="shrink-0"
        >
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between px-2 pt-1.5">
        <p className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
          <Sparkles className="h-3 w-3 text-indigo-400" />
          Enter to send · Shift+Enter for a new line
        </p>
        <p className="text-[11px] tabular-nums text-slate-600">{value.length}/500</p>
      </div>
    </div>
  );
};
