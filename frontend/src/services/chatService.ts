import { signInAnonymously } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  writeBatch,
  type DocumentData,
  type QueryDocumentSnapshot,
  type Unsubscribe,
} from 'firebase/firestore';

import { auth, db } from '@/config/firebase';
import { getLocalMockMessages, type ChatMessage } from '@/lib/chat';

type MessageListener = (messages: ChatMessage[]) => void;
type ErrorListener = (error: Error) => void;

let sessionPromise: Promise<string> | null = null;

function messagesCollection(conversationId: string) {
  return collection(db, 'conversations', conversationId, 'messages');
}

function toChatMessage(snapshot: QueryDocumentSnapshot<DocumentData>): ChatMessage {
  const data = snapshot.data();
  const createdAt =
    data.createdAt && typeof data.createdAt.toDate === 'function'
      ? data.createdAt.toDate()
      : null;

  return {
    id: snapshot.id,
    conversationId: String(data.conversationId ?? ''),
    senderId: String(data.senderId ?? ''),
    senderName: String(data.senderName ?? ''),
    text: String(data.text ?? ''),
    createdAt,
  };
}

export async function ensureChatSession(): Promise<string> {
  if (auth.currentUser) {
    return auth.currentUser.uid;
  }

  if (!sessionPromise) {
    sessionPromise = signInAnonymously(auth)
      .then(({ user }) => user.uid)
      .finally(() => {
        sessionPromise = null;
      });
  }

  return sessionPromise;
}

export async function prepareConversation(conversationId: string, participantName: string): Promise<void> {
  const ownerId = await ensureChatSession();
  const conversationRef = doc(db, 'conversations', conversationId);
  const conversationSnapshot = await getDoc(conversationRef);

  if (conversationSnapshot.exists()) {
    return;
  }

  const demoMessages = getLocalMockMessages(conversationId);
  const batch = writeBatch(db);

  batch.set(conversationRef, {
    participantName,
    ownerId,
    isDemo: demoMessages.length > 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  demoMessages.forEach((message) => {
    const messageRef = doc(messagesCollection(conversationId), message.id);
    batch.set(messageRef, {
      conversationId: message.conversationId,
      senderId: message.senderId,
      senderName: message.senderName,
      text: message.text,
      createdAt: message.createdAt,
    });
  });

  await batch.commit();
}

export function subscribeToMessages(
  conversationId: string,
  onMessages: MessageListener,
  onError: ErrorListener,
): Unsubscribe {
  const messagesQuery = query(messagesCollection(conversationId), orderBy('createdAt', 'asc'));

  return onSnapshot(
    messagesQuery,
    (snapshot) => onMessages(snapshot.docs.map(toChatMessage)),
    (error) => onError(error),
  );
}

export async function sendMessage(
  conversationId: string,
  senderName: string,
  text: string,
): Promise<void> {
  const cleanedText = text.trim();
  if (!cleanedText) {
    return;
  }

  const senderId = await ensureChatSession();
  const conversationRef = doc(db, 'conversations', conversationId);
  const messageRef = doc(messagesCollection(conversationId));
  const batch = writeBatch(db);

  batch.set(messageRef, {
    conversationId,
    senderId,
    senderName,
    text: cleanedText,
    createdAt: serverTimestamp(),
  });
  batch.set(
    conversationRef,
    {
      lastMessage: cleanedText,
      lastMessageAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  await batch.commit();
}

export async function createConversation(myName: string, participantName: string): Promise<string> {
  const ownerId = await ensureChatSession();
  const conversationRef = doc(collection(db, 'conversations'));

  await setDoc(conversationRef, {
    ownerId,
    ownerName: myName,
    participantName,
    isDemo: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return conversationRef.id;
}

export function getChatErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.includes('auth/operation-not-allowed')) {
    return "Active l'authentification anonyme dans Firebase pour utiliser le clavardage.";
  }

  return 'Impossible de joindre le clavardage. Réessaie dans un instant.';
}
