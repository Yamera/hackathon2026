export const NAME_KEY = '@artflow_username';

export type ChatMessage = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: Date | null;
};

const MOCK_THREADS: Record<string, { name: string; msgs: { text: string; mine: boolean; minsAgo: number }[] }> = {
  '1': { name: 'Maya Ben', msgs: [
    { text: "Salut! J'ai adoré ton dernier projet 🎨", mine: false, minsAgo: 90 },
    { text: 'Merci beaucoup! Ça me touche vraiment', mine: true, minsAgo: 85 },
    { text: 'Tu travailles sur quoi en ce moment?', mine: false, minsAgo: 80 },
    { text: 'Un tableau sur la ville de nuit, les lumières de Montréal', mine: true, minsAgo: 75 },
    { text: "Oh wow, j'adorerais voir ça!", mine: false, minsAgo: 40 },
    { text: "Je t'envoie des photos quand c'est avancé 📸", mine: true, minsAgo: 30 },
    { text: "Super ! On se voit samedi pour l'atelier alors 😊", mine: false, minsAgo: 16 },
  ]},
  '2': { name: 'Thomas G.', msgs: [
    { text: "Thomas, ton travail m'inspire vraiment", mine: true, minsAgo: 180 },
    { text: "C'est gentil! Tu fais quoi comme art?", mine: false, minsAgo: 160 },
    { text: 'De la peinture abstraite principalement', mine: true, minsAgo: 150 },
    { text: 'Merci pour ton message, ça me motive beaucoup !', mine: false, minsAgo: 49 },
  ]},
  '3': { name: 'Léa Martin', msgs: [
    { text: "Hey! J'ai des nouvelles du projet", mine: false, minsAgo: 1500 },
    { text: 'Raconte-moi!', mine: true, minsAgo: 1490 },
    { text: "On a été sélectionnés pour l'expo de juin 🎉", mine: false, minsAgo: 1480 },
    { text: "C'est incroyable!! Félicitations à toi aussi", mine: true, minsAgo: 1440 },
    { text: 'On peut se faire un call cette semaine ?', mine: false, minsAgo: 1430 },
  ]},
  '4': { name: 'Studio 303', msgs: [
    { text: 'Bonjour, nous avons bien reçu votre demande', mine: false, minsAgo: 2880 },
    { text: 'Super merci! Vous avez des créneaux ce mois-ci?', mine: true, minsAgo: 2860 },
    { text: 'Oui, vendredi 30 mai à 19h, ça vous convient?', mine: false, minsAgo: 2000 },
    { text: 'Parfait pour moi!', mine: true, minsAgo: 1960 },
    { text: "Ta présence à l'événement est confirmée ✅", mine: false, minsAgo: 1920 },
  ]},
  '5': { name: 'Art Collectif', msgs: [
    { text: 'Bienvenue dans le collectif! 🎨', mine: false, minsAgo: 5760 },
    { text: "Merci, super content d'en faire partie", mine: true, minsAgo: 5700 },
    { text: 'On organise une réunion jeudi soir', mine: false, minsAgo: 4320 },
    { text: 'Je serai là!', mine: true, minsAgo: 4300 },
    { text: 'Nouveau projet : "Voix Multiples" Rejoins-nous !', mine: false, minsAgo: 3600 },
  ]},
  '6': { name: 'DJ Snake', msgs: [
    { text: "Yo! J'ai écouté ton dernier projet", mine: false, minsAgo: 10080 },
    { text: "Ah ouais? C'était comment?", mine: true, minsAgo: 10060 },
    { text: 'Franchement 🔥🔥🔥 Le rythme est parfait', mine: false, minsAgo: 10040 },
    { text: "Merci bro, j'ai bossé dur dessus", mine: true, minsAgo: 8000 },
    { text: "Le mix est prêt 🎧 Dis-moi ce que t'en penses !", mine: false, minsAgo: 7200 },
  ]},
};

export function getLocalMockMessages(convId: string): ChatMessage[] {
  const thread = MOCK_THREADS[convId];
  if (!thread) return [];
  const now = Date.now();
  return thread.msgs.map((msg, i) => ({
    id: `local_${i}`,
    text: msg.text,
    senderId: msg.mine ? '__me__' : `other_${convId}`,
    senderName: msg.mine ? 'Moi' : thread.name,
    createdAt: new Date(now - msg.minsAgo * 60000),
  }));
}

export async function createConversation(_myName: string, _otherName: string): Promise<string> {
  return `conv_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
}

export function formatMsgTime(date: Date | null): string {
  if (!date) return '';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "À l'instant";
  if (diffMin < 60) return `${diffMin} min`;
  if (diffMs < 86400000) return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
}
