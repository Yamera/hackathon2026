import { db, auth } from './firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';

export type ChatMessage = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt: Timestamp | null;
};

export async function ensureSignedIn(): Promise<string> {
  if (auth.currentUser) return auth.currentUser.uid;
  const { user } = await signInAnonymously(auth);
  return user.uid;
}

export function subscribeToMessages(
  conversationId: string,
  callback: (messages: ChatMessage[]) => void,
) {
  const q = query(
    collection(db, 'chats', conversationId, 'messages'),
    orderBy('createdAt', 'asc'),
  );
  return onSnapshot(q, (snap) => {
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() } as ChatMessage)));
  });
}

export async function sendMessage(
  conversationId: string,
  text: string,
  senderName: string,
): Promise<void> {
  const uid = await ensureSignedIn();
  await addDoc(collection(db, 'chats', conversationId, 'messages'), {
    text: text.trim(),
    senderId: uid,
    senderName,
    createdAt: serverTimestamp(),
  });
}
