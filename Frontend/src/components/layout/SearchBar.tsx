import React from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search Prerana...',
  className,
}) => {
  return (
    <form
      role="search"
      className={cn('relative w-full max-w-xs', className)}
      onSubmit={(event) => event.preventDefault()}
    >
      <Input
        variantType="search"
        type="search"
        placeholder={placeholder}
        aria-label="Search Prerana"
        className="h-9 bg-slate-900/70"
      />
    </form>
  );
};
