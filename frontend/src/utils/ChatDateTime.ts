import { Message } from '@/core/models';

export type ChatItem =
  | { type: 'message'; message: Message }
  | { type: 'day'; date: string }
  | { type: 'unread' };

function getLocalDateKey(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('pt-BR').split('/').reverse().join('-');
}

export function groupMessagesByDay(
  messages: Message[],
  firstUnreadId: string | null,
): ChatItem[] {
  const result: ChatItem[] = [];
  let lastDay: string | null = null;
  for (const msg of messages) {
    const dayKey = getLocalDateKey(msg.text.createdAt);
    if (dayKey !== lastDay) {
      result.push({ type: 'day', date: dayKey });
      lastDay = dayKey;
    }
    if (msg.text.id === firstUnreadId) result.push({ type: 'unread' });
    result.push({ type: 'message', message: msg });
  }
  return result;
}

export function formatDayLabel(dayKey: string): string {
  const [year, month, day] = dayKey.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((today.getTime() - date.getTime()) / 86400000);
  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Ontem';
  if (diffDays === 2) return 'Anteontem';
  const formatted = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
  return formatted.replace(
    /de ([a-záàâãéêíóôõúç])/i,
    (_match, letter) => `de ${letter.toUpperCase()}`,
  );
}

export function formatTime(isoDate: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));
}
