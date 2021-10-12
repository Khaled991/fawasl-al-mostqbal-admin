import { DocumentData, QueryDocumentSnapshot } from '@firebase/firestore';

export interface IComplaint {
  id?: string;
  details: string;
  email: string;
  name: string;
}

export const complaintSnapshotToIComplaint = (
  complaintSnapshot: QueryDocumentSnapshot<DocumentData>
): IComplaint => ({
  id: complaintSnapshot.id,
  ...(complaintSnapshot.data() as IComplaint),
});
