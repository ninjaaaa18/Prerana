import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Bot, Pin, PinOff, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChatLayout } from '../components/ChatLayout';
import { ChatMessage } from '../components/ChatMessage';
import { EmptyConversation } from '../components/EmptyConversation';
import { MessageComposer } from '../components/MessageComposer';
import { TypingIndicator } from '../components/TypingIndicator';
import { AI_MODES, CHAT_SESSIONS, PROMPT_SUGGESTIONS, getSimulatedReply } from '../data';
import type { AIModeId, ChatMessage as ChatMessageType } from '../types';

const makeId = () => `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const formatTime = () =>
  new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

export const ChatPage: React.FC = () => {
  const { sessionId = 'new' } = useParams<{ sessionId: string }>();
  const [searchParams] = useSearchParams();

  const activeSession = CHAT_SESSIONS.find((session) => session.id === sessionId);
  const isNew = !activeSession;

  const queryMode = searchParams.get('mode') as AIModeId | null;
  const activeMode =
    AI_MODES.find((mode) => mode.id === (activeSession?.modeId ?? queryMode ?? 'assistant')) ??
    AI_MODES[0];

  const [messages, setMessages] = React.useState<ChatMessageType[]>([]);
  const [composer, setComposer] = React.useState('');
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [isPinned, setIsPinned] = React.useState(activeSession?.isPinned ?? false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const initialPrompt = React.useMemo(() => searchParams.get('prompt') ?? '', [searchParams]);

  React.useEffect(() => {
    setMessages(activeSession?.messages ?? []);
    setIsGenerating(false);
    setComposer(initialPrompt);
    setIsPinned(activeSession?.isPinned ?? false);
  }, [sessionId, activeSession, initialPrompt]);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, isGenerating]);

  const handleSend = (text: string) => {
    if (!text.trim() || isGenerating) return;
    const trimmed = text.trim();

    const userMessage: ChatMessageType = {
      id: makeId(),
      role: 'user',
      content: trimmed,
      timestamp: formatTime(),
      status: 'complete',
    };
    setMessages((prev) => [...prev, userMessage]);
    setComposer('');
    setIsGenerating(true);

    window.setTimeout(() => {
      const reply: ChatMessageType = {
        id: makeId(),
        role: 'assistant',
        content: getSimulatedReply(trimmed),
        timestamp: formatTime(),
        status: 'streaming',
      };
      setMessages((prev) => [...prev, reply]);
      setIsGenerating(false);
    }, 1100);
  };

  const handleStreamComplete = (messageId: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId ? { ...message, status: 'complete' } : message
      )
    );
  };

  const handleRegenerate = (messageId: string) => {
    setMessages((prev) => {
      const index = prev.findIndex((message) => message.id === messageId);
      if (index === -1) return prev;
      const previousUser = prev
        .slice(0, index)
        .reverse()
        .find((message) => message.role === 'user');
      return prev.map((message, i) =>
        i === index
          ? {
              ...message,
              content: getSimulatedReply(previousUser?.content ?? message.content),
              status: 'streaming' as const,
            }
          : message
      );
    });
  };

  const handlePickSuggestion = (prompt: string) => {
    setComposer(prompt);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/app/ai-studio"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'shrink-0')}
            aria-label="Back to AI Studio"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="min-w-0">
            <h1 className="truncate font-display text-xl font-bold tracking-tight text-slate-50 sm:text-2xl">
              {activeSession?.title ?? 'New conversation'}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="sm">
                <activeMode.icon className="h-3 w-3" />
                {activeMode.name}
              </Badge>
              {activeSession && (
                <Badge variant="secondary" size="sm">
                  {activeSession.subject}
                </Badge>
              )}
              {isNew && (
                <Badge variant="info" size="sm">
                  <Sparkles className="h-3 w-3" />
                  New chat
                </Badge>
              )}
            </div>
          </div>
        </div>

        {!isNew && (
          <button
            type="button"
            onClick={() => setIsPinned((prev) => !prev)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              isPinned
                ? 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            )}
            aria-pressed={isPinned}
          >
            {isPinned ? <Pin className="h-3.5 w-3.5" /> : <PinOff className="h-3.5 w-3.5" />}
            {isPinned ? 'Pinned' : 'Pin'}
          </button>
        )}
      </div>

      <ChatLayout sessions={CHAT_SESSIONS} activeSessionId={sessionId}>
        <div className="flex flex-col gap-4">
          <div
            ref={scrollRef}
            className="flex max-h-[60vh] min-h-[320px] flex-col gap-5 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6"
          >
            {messages.length === 0 ? (
              <div className="m-auto w-full">
                <EmptyConversation
                  suggestions={PROMPT_SUGGESTIONS}
                  onPickSuggestion={handlePickSuggestion}
                />
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onStreamComplete={handleStreamComplete}
                  onRegenerate={handleRegenerate}
                />
              ))
            )}

            {isGenerating && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-600/15 text-indigo-300">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-slate-700/80 bg-slate-900/80">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>

          <MessageComposer
            value={composer}
            onChange={setComposer}
            onSend={handleSend}
            isGenerating={isGenerating}
          />
        </div>
      </ChatLayout>
    </div>
  );
};
