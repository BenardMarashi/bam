import { 
  collection, addDoc, getDocs, query, orderBy, 
  deleteDoc, doc, Timestamp, updateDoc
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service: string;
  message: string;
  timestamp: Date | Timestamp;
  read?: boolean;
}

export async function addContactSubmission(data: Omit<ContactSubmission, 'id' | 'timestamp' | 'read'>) {
  try {
    console.log('🔵 Attempting to add contact submission:', data);
    
    if (!db) {
      throw new Error('Firestore database is not initialized');
    }

    const submissionData = {
      name: data.name,
      email: data.email,
      company: data.company || '',
      phone: data.phone || '',
      service: data.service,
      message: data.message,
      timestamp: Timestamp.now(),
      read: false
    };

    console.log('🔵 Submission data prepared:', submissionData);

    const docRef = await addDoc(collection(db, 'contact_submissions'), submissionData);
    
    console.log('✅ Contact submission added successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error in addContactSubmission:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    console.log('🔵 Fetching contact submissions...');
    
    if (!db) {
      throw new Error('Firestore database is not initialized');
    }

    const q = query(collection(db, 'contact_submissions'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    console.log('✅ Found', querySnapshot.docs.length, 'contact submissions');
    
    const submissions = querySnapshot.docs.map(doc => {
      const data = doc.data();
      console.log('Document data:', doc.id, data);
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        service: data.service,
        message: data.message,
        timestamp: data.timestamp?.toDate() || new Date(),
        read: data.read || false
      } as ContactSubmission;
    });

    return submissions;
  } catch (error) {
    console.error('❌ Error in getContactSubmissions:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
}

export async function markContactAsRead(id: string) {
  try {
    console.log('🔵 Marking contact as read:', id);
    await updateDoc(doc(db, 'contact_submissions', id), { read: true });
    console.log('✅ Contact marked as read');
  } catch (error) {
    console.error('❌ Error marking contact as read:', error);
    throw error;
  }
}

export async function deleteContactSubmission(id: string) {
  try {
    console.log('🔵 Deleting contact submission:', id);
    await deleteDoc(doc(db, 'contact_submissions', id));
    console.log('✅ Contact submission deleted');
  } catch (error) {
    console.error('❌ Error deleting contact submission:', error);
    throw error;
  }
}