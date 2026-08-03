import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/landing/Reveal';
import { AIHero } from '../components/AIHero';
import { QuickActions } from '../components/QuickActions';
import { ModeCard } from '../components/ModeCard';
import { PromptSuggestions } from '../components/PromptSuggestions';
import { SessionCard } from '../components/SessionCard';
import { ResourceGrid } from '../components/ResourceGrid';
import { ResourcePreview } from '../components/ResourcePreview';
import { StudioSection } from '../components/StudioSection';
import { AI_MODES, CHAT_SESSIONS, PROMPT_SUGGESTIONS, RESOURCES } from '../data';
import type { ResourceItem } from '../types';

const viewAllLink =
  'inline-flex items-center gap-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300';

export const AIStudioPage: React.FC = () => {
  const [previewResource, setPreviewResource] = React.useState<ResourceItem | null>(null);

  return (
    <div className="space-y-10">
      <AIHero />

      <Reveal>
        <StudioSection
          title="Quick actions"
          subtitle="Jump straight into your favourite workflow"
        >
          <QuickActions />
        </StudioSection>
      </Reveal>

      <Reveal>
        <StudioSection
          title="Choose an AI mode"
          subtitle="Pick the way you want to learn today"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {AI_MODES.map((mode) => (
              <ModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </StudioSection>
      </Reveal>

      <Reveal>
        <StudioSection
          title="Try a prompt"
          subtitle="One tap to start a conversation"
        >
          <PromptSuggestions suggestions={PROMPT_SUGGESTIONS} />
        </StudioSection>
      </Reveal>

      <Reveal>
        <StudioSection
          title="Recent sessions"
          subtitle="Pick up where you left off"
          action={
            <Link to="/app/ai-studio/chat/session-1" className={viewAllLink}>
              Open latest chat
              <ChevronRight className="h-4 w-4" />
            </Link>
          }
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {CHAT_SESSIONS.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))}
          </div>
        </StudioSection>
      </Reveal>

      <Reveal>
        <div id="resources" className="scroll-mt-24">
          <StudioSection
            title="Turn any topic into study tools"
            subtitle="Mind maps, flashcards, slides and more — generated on demand"
          >
            <ResourceGrid resources={RESOURCES} onPreview={setPreviewResource} />
          </StudioSection>
        </div>
      </Reveal>

      <ResourcePreview
        resource={previewResource}
        onClose={() => setPreviewResource(null)}
      />
    </div>
  );
};
