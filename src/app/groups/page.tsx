import './Group.scss';
import { getReceipts } from '@/lib/receipts';
import GroupsPage from '@/widgets/Groups/GroupsPage';

export default async function Page() {
  const receipts = await getReceipts();

  return <GroupsPage receipts={receipts} />;
}
