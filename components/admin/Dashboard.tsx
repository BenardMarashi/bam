'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from '@/i18n/routing';
import {
  getContactSubmissions,
  deleteContactSubmission,
  markContactAsRead,
  type ContactSubmission,
} from '@/lib/admin/firestore';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    console.log('🔵 Loading dashboard data...');
    console.log('User:', user?.email);
    
    try {
      const contactsData = await getContactSubmissions();
      console.log('✅ Loaded contacts:', contactsData.length);
      setContacts(contactsData);
    } catch (error) {
      console.error('❌ Error loading data:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
        setError(error.message);
      } else {
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      console.log('🔵 Signing out...');
      await signOut();
      console.log('✅ Signed out successfully');
      router.push('/admin/login');
    } catch (error) {
      console.error('❌ Error signing out:', error);
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm('Are you sure you want to delete this contact submission?')) {
      try {
        console.log('🔵 Deleting contact:', id);
        await deleteContactSubmission(id);
        setContacts(contacts.filter(c => c.id !== id));
        console.log('✅ Contact deleted successfully');
      } catch (error) {
        console.error('❌ Error deleting contact:', error);
        alert('Failed to delete contact. Please try again.');
      }
    }
  };

  const handleMarkContactRead = async (id: string) => {
    try {
      console.log('🔵 Marking contact as read:', id);
      await markContactAsRead(id);
      setContacts(contacts.map(c => c.id === id ? { ...c, read: true } : c));
      console.log('✅ Contact marked as read');
    } catch (error) {
      console.error('❌ Error marking contact as read:', error);
      alert('Failed to mark as read. Please try again.');
    }
  };

  const formatDate = (date: Date | any) => {
    try {
      // Handle both Firestore Timestamp and Date objects
      const dateObj = date instanceof Date ? date : date.toDate();
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const unreadContacts = contacts.filter(c => !c.read).length;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="glass-effect glass-border border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D8420E] to-[#D8420E] rounded-xl flex items-center justify-center">
                <span className="text-2xl">🐻</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="px-6 py-2 glass-effect glass-border rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
            >
              Sign Out
            </motion.button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect glass-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Contacts</p>
                <p className="text-3xl font-bold">{contacts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📧</span>
              </div>
            </div>
            {unreadContacts > 0 && (
              <p className="text-sm text-[#D8420E] mt-2">{unreadContacts} unread</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect glass-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Read</p>
                <p className="text-3xl font-bold">{contacts.filter(c => c.read).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect glass-border rounded-2xl p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Unread</p>
                <p className="text-3xl font-bold">{unreadContacts}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🔔</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Contact Submissions</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadData}
            disabled={loading}
            className="px-4 py-2 glass-effect glass-border rounded-xl hover:bg-white/5 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading && <div className="w-4 h-4 border-2 border-[#D8420E] border-t-transparent rounded-full animate-spin" />}
            🔄 Refresh
          </motion.button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 glass-effect glass-border rounded-xl bg-red-500/10 border-red-500/20">
            <div className="flex items-center gap-2 text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Error loading data: {error}</span>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-[#D8420E] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div className="glass-effect glass-border rounded-2xl p-12 text-center">
                <p className="text-gray-400 text-lg">No contact submissions yet</p>
                <p className="text-gray-500 text-sm mt-2">Submissions will appear here when users fill out the contact form</p>
                <button
                  onClick={loadData}
                  className="mt-4 px-6 py-2 btn-primary"
                >
                  Check for New Submissions
                </button>
              </div>
            ) : (
              contacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`glass-effect glass-border rounded-2xl p-6 hover:bg-white/5 transition-all ${
                    !contact.read ? 'border-[#D8420E] bg-[#D8420E]/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {!contact.read && (
                          <span className="px-2 py-1 bg-[#D8420E]/20 text-[#D8420E] text-xs font-semibold rounded">
                            NEW
                          </span>
                        )}
                        <span className="text-gray-400 text-sm">
                          {formatDate(contact.timestamp)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{contact.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                        <div>
                          <span className="text-gray-400">Email:</span>
                          <a href={`mailto:${contact.email}`} className="ml-2 text-[#D8420E] hover:underline">
                            {contact.email}
                          </a>
                        </div>
                        {contact.company && (
                          <div>
                            <span className="text-gray-400">Company:</span>
                            <span className="ml-2 text-white">{contact.company}</span>
                          </div>
                        )}
                        {contact.phone && (
                          <div>
                            <span className="text-gray-400">Phone:</span>
                            <a href={`tel:${contact.phone}`} className="ml-2 text-[#D8420E] hover:underline">
                              {contact.phone}
                            </a>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-400">Service:</span>
                          <span className="ml-2 text-white">{contact.service || 'Not specified'}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Message:</p>
                        <p className="text-white leading-relaxed">{contact.message}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!contact.read && (
                        <button
                          onClick={() => handleMarkContactRead(contact.id!)}
                          className="px-4 py-2 bg-[#D8420E]/20 text-[#D8420E] text-sm rounded-lg hover:bg-[#D8420E]/30 transition-colors whitespace-nowrap"
                        >
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteContact(contact.id!)}
                        className="px-4 py-2 bg-red-500/20 text-red-400 text-sm rounded-lg hover:bg-red-500/30 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}