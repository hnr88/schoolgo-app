'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Languages, Loader2 } from 'lucide-react';
import { useTranslateMessage } from '@/modules/messaging-translation/queries/use-translate-message.mutation';
import type {
  TranslateMessageButtonProps,
  TranslateMessageResult,
} from '@/modules/messaging-translation/types/translate-message.types';

export function TranslateMessageButton({
  messageDocumentId,
  content,
}: TranslateMessageButtonProps) {
  const t = useTranslations('MessagingTranslation');
  const [result, setResult] = useState<TranslateMessageResult | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const { mutate, isPending } = useTranslateMessage();

  const isSameAsOriginal = result !== null && result.translated.trim() === content.trim();

  const handleTranslate = () => {
    mutate(messageDocumentId, {
      onSuccess: (data) => {
        setResult(data);
        setShowOriginal(false);
      },
    });
  };

  if (result === null) {
    return (
      <button
        type='button'
        onClick={handleTranslate}
        disabled={isPending}
        className='flex items-center gap-1 text-xs font-medium text-foggy transition-opacity hover:opacity-70 disabled:opacity-50'
      >
        {isPending ? (
          <Loader2 className='h-3.5 w-3.5 animate-spin' aria-hidden='true' />
        ) : (
          <Languages className='h-3.5 w-3.5' aria-hidden='true' />
        )}
        {t('translate')}
      </button>
    );
  }

  return (
    <div className='flex flex-col gap-1'>
      {!showOriginal && (
        <div className='rounded-xl bg-gray-50 px-4 py-3 text-sm whitespace-pre-wrap text-foreground'>
          {result.translated}
        </div>
      )}
      <div className='flex items-center gap-2 text-xs text-foggy'>
        <Languages className='h-3.5 w-3.5' aria-hidden='true' />
        <span>
          {isSameAsOriginal ? t('alreadyOriginalLocale') : t('translatedLabel')}
        </span>
        {!isSameAsOriginal && (
          <button
            type='button'
            onClick={() => setShowOriginal((value) => !value)}
            className='font-medium underline-offset-2 transition-opacity hover:opacity-70 hover:underline'
          >
            {showOriginal ? t('showTranslation') : t('showOriginal')}
          </button>
        )}
      </div>
    </div>
  );
}
