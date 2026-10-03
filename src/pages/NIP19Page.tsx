import { nip19 } from 'nostr-tools';
import { Navigate, useParams } from 'react-router-dom';
import NotFound from './NotFound';

export function NIP19Page() {
  const { nip19: identifier } = useParams<{ nip19: string }>();
  if (!identifier) return <NotFound />;
  let questionId: string | undefined;
  try {
    const decoded = nip19.decode(identifier);
    if (decoded.type === 'note') questionId = decoded.data;
    if (decoded.type === 'nevent') questionId = decoded.data.id;
  } catch { questionId = undefined; }
  return questionId ? <Navigate to={`/question/${questionId}`} replace /> : <NotFound />;
}
