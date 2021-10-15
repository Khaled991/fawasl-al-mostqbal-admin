import { ReactElement, useEffect, useState } from 'react';
import './ProblemTablePage.scss';
import { collection, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../utils/firebase';
import {
  complaintSnapshotToIComplaint,
  IComplaint,
} from './../../models/complaint';

const ProblemTablePage = (): ReactElement => {
  const [complaints, setComplaints] = useState<IComplaint[]>([]);
  useEffect(() => {
    const complaintsRef = collection(firestore, 'complaints');

    const unsubscribe = onSnapshot(complaintsRef, complaintsSnapshot => {
      const complaints: IComplaint[] = [];
      complaintsSnapshot.forEach(doc => {
        const complaint: IComplaint = complaintSnapshotToIComplaint(doc);
        return complaints.push(complaint);
      });
      setComplaints(complaints);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="problem-table-page">
      <div className="tbl-header">
        <table className="problem-table" cellPadding={0} cellSpacing={0}>
          <thead>
            <tr>
              <th className="tbl-header-title">الاسم</th>
              <th className="tbl-header-title">البريد الالكتروني</th>
              <th className="tbl-header-title">تفاصيل الشكوي</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table cellPadding={0} cellSpacing={0}>
          <tbody>
            {complaints.map(({ details, email, name, id }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemTablePage;
