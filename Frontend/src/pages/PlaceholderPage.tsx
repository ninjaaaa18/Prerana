import React from 'react';
import { Construction } from 'lucide-react';
import { EmptyState } from '@/components/ui/empty-state';

export interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="py-6">
      <EmptyState
        icon={<Construction className="h-8 w-8" />}
        title={title}
        description={description || `The ${title} experience is coming soon.`}
      />
    </div>
  );
};
