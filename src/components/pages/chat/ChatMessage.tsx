'use client';

import { PawPrint } from 'lucide-react';
import type { ChatMessage as ChatMessageType } from '@/types/chat';
import PetCard from './PetCard';

interface ChatMessageProps {
  message: ChatMessageType;
}

function formatText(text: string) {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    let formatted = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    if (line.match(/^\s*[-•]\s+/)) {
      formatted = formatted.replace(/^(\s*)[-•]\s+/, '$1\u2022 ');
    }

    return (
      <span key={i}>
        <span dangerouslySetInnerHTML={{ __html: formatted }} />
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
          <PawPrint size={16} className="text-primary" />
        </div>
      )}

      <div className={`max-w-[85%] ${isUser ? 'order-1' : ''}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
            isUser
              ? 'bg-primary text-white rounded-br-md'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-md'
          }`}
        >
          {formatText(message.content)}
        </div>

        {message.pets && message.pets.length > 0 && (
          <div className="mt-2 space-y-2">
            {message.pets.map((pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-tertiary/10 dark:bg-tertiary/20 flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-xs font-semibold text-tertiary">You</span>
        </div>
      )}
    </div>
  );
}
