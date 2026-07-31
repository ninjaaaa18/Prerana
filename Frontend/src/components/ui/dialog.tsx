import * as React from 'react';
import { Modal } from './modal';
import { Button } from './button';
import { AlertTriangle, Info } from 'lucide-react';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'info' | 'warning' | 'destructive';
  isLoading?: boolean;
}

const icons = {
  info: <Info className="w-6 h-6 text-sky-400" />,
  warning: <AlertTriangle className="w-6 h-6 text-amber-400" />,
  destructive: <AlertTriangle className="w-6 h-6 text-rose-400" />,
};

const iconBg = {
  info: 'bg-sky-500/10 border-sky-500/20',
  warning: 'bg-amber-500/10 border-amber-500/20',
  destructive: 'bg-rose-500/10 border-rose-500/20',
};

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'info',
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full border ${iconBg[variant]}`}>
            {icons[variant]}
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-slate-100">{title}</h3>
            <p className="text-sm text-slate-400 mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            variant={variant === 'destructive' ? 'destructive' : 'primary'}
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
