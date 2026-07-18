import type { Metadata } from 'next';
import ChatWidget from '@/components/shared/ChatWidget';

export const metadata: Metadata = {
  title: 'Chat with Us | Forever Paws',
  description: 'Get instant help with pet adoption, find your perfect companion, or ask any questions about Forever Paws.',
};

export default function ChatPage() {
  return (
    <div className="min-h-[80dvh] bg-[#FFF9F2] dark:bg-def-dark-bg">
      <ChatWidget fullPage />
    </div>
  );
}
