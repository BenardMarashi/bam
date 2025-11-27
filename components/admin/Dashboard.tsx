'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from '@/i18n/routing';
import {
  getContactSubmissions,
  deleteContactSubmission,
  markContactAsRead,
  type ContactSubmission,
} from '@/lib/admin/firestore';

export default function Dashboard() {
  const t = useTranslations('Admin.dashboard');
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
    if (confirm(t('submissions.confirmDelete'))) {
      try {
        console.log('🔵 Deleting contact:', id);
        await deleteContactSubmission(id);
        setContacts(contacts.filter(c => c.id !== id));
        console.log('✅ Contact deleted successfully');
      } catch (error) {
        console.error('❌ Error deleting contact:', error);
        alert(t('errors.deleteFailed'));
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
      alert(t('errors.markReadFailed'));
    }
  };

  const formatDate = (date: Date | any) => {
    try {
      const dateObj = date instanceof Date ? date : date.toDate();
      return dateObj.toLocaleDateString('sq-AL', {
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
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Header */}
      <div 
        className="border-b"
        style={{ 
          backgroundColor: 'rgba(201, 60, 60, 0.1)',
          borderColor: 'rgba(201, 60, 60, 0.3)'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#C93C3C' }}
              >
                <span className="text-2xl">🐻</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold" style={{ color: '#ffffff' }}>{t('title')}</h1>
                <p className="text-sm" style={{ color: '#9ca3af' }}>{user?.email}</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="px-6 py-2 rounded-xl transition-colors"
              style={{ 
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid rgba(239, 68, 68, 0.5)',
                color: '#ef4444'
              }}
            >
              {t('signOut')}
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
            className="rounded-2xl p-6"
            style={{ 
              backgroundColor: 'rgba(201, 60, 60, 0.1)',
              border: '1px solid rgba(201, 60, 60, 0.3)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: '#9ca3af' }}>{t('stats.totalContacts')}</p>
                <p className="text-3xl font-bold" style={{ color: '#ffffff' }}>{contacts.length}</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
              >
                <span className="text-2xl">📧</span>
              </div>
            </div>
            {unreadContacts > 0 && (
              <p className="text-sm mt-2" style={{ color: '#C93C3C' }}>{unreadContacts} {t('stats.unreadCount')}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-6"
            style={{ 
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: '#9ca3af' }}>{t('stats.read')}</p>
                <p className="text-3xl font-bold" style={{ color: '#ffffff' }}>{contacts.filter(c => c.read).length}</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}
              >
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-6"
            style={{ 
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              border: '1px solid rgba(168, 85, 247, 0.3)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm mb-1" style={{ color: '#9ca3af' }}>{t('stats.unread')}</p>
                <p className="text-3xl font-bold" style={{ color: '#ffffff' }}>{unreadContacts}</p>
              </div>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)' }}
              >
                <span className="text-2xl">🔔</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: '#ffffff' }}>{t('submissions.title')}</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadData}
            disabled={loading}
            className="px-4 py-2 rounded-xl transition-colors disabled:opacity-50 flex items-center gap-2"
            style={{ 
              backgroundColor: 'rgba(201, 60, 60, 0.2)',
              border: '1px solid rgba(201, 60, 60, 0.5)',
              color: '#ffffff'
            }}
          >
            {loading && <div className="w-4 h-4 border-2 border-[#C93C3C] border-t-transparent rounded-full animate-spin" />}
            🔄 {t('refresh')}
          </motion.button>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            className="mb-6 p-4 rounded-xl"
            style={{ 
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)'
            }}
          >
            <div className="flex items-center gap-2" style={{ color: '#ef4444' }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{t('errors.loadingData')} {error}</span>
            </div>
            <p className="mt-2 text-sm" style={{ color: '#fca5a5' }}>
              {t('errors.firestoreHint')}
            </p>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-[#C93C3C] border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4" style={{ color: '#9ca3af' }}>{t('loading')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.length === 0 ? (
              <div 
                className="rounded-2xl p-12 text-center"
                style={{ 
                  backgroundColor: 'rgba(201, 60, 60, 0.05)',
                  border: '1px solid rgba(201, 60, 60, 0.2)'
                }}
              >
                <p className="text-lg" style={{ color: '#9ca3af' }}>{t('submissions.noSubmissions')}</p>
                <p className="text-sm mt-2" style={{ color: '#6b7280' }}>{t('submissions.noSubmissionsDesc')}</p>
                <button
                  onClick={loadData}
                  className="mt-4 px-6 py-2 rounded-xl font-semibold"
                  style={{ 
                    backgroundColor: '#C93C3C',
                    color: '#ffffff'
                  }}
                >
                  {t('submissions.checkNew')}
                </button>
              </div>
            ) : (
              contacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl p-6 transition-all"
                  style={{ 
                    backgroundColor: !contact.read ? 'rgba(201, 60, 60, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    border: !contact.read ? '1px solid rgba(201, 60, 60, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        {!contact.read && (
                          <span 
                            className="px-2 py-1 text-xs font-semibold rounded"
                            style={{ 
                              backgroundColor: 'rgba(201, 60, 60, 0.3)',
                              color: '#ff6b6b'
                            }}
                          >
                            {t('submissions.new')}
                          </span>
                        )}
                        <span className="text-sm" style={{ color: '#9ca3af' }}>
                          {formatDate(contact.timestamp)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>{contact.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
                        <div>
                          <span style={{ color: '#9ca3af' }}>{t('submissions.email')}</span>
                          <a href={`mailto:${contact.email}`} className="ml-2 hover:underline" style={{ color: '#C93C3C' }}>
                            {contact.email}
                          </a>
                        </div>
                        {contact.company && (
                          <div>
                            <span style={{ color: '#9ca3af' }}>{t('submissions.company')}</span>
                            <span className="ml-2" style={{ color: '#ffffff' }}>{contact.company}</span>
                          </div>
                        )}
                        {contact.phone && (
                          <div>
                            <span style={{ color: '#9ca3af' }}>{t('submissions.phone')}</span>
                            <a href={`tel:${contact.phone}`} className="ml-2 hover:underline" style={{ color: '#C93C3C' }}>
                              {contact.phone}
                            </a>
                          </div>
                        )}
                        <div>
                          <span style={{ color: '#9ca3af' }}>{t('submissions.service')}</span>
                          <span className="ml-2" style={{ color: '#ffffff' }}>{contact.service || t('submissions.notSpecified')}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm mb-2" style={{ color: '#9ca3af' }}>{t('submissions.message')}</p>
                        <p className="leading-relaxed" style={{ color: '#e5e7eb' }}>{contact.message}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {!contact.read && (
                        <button
                          onClick={() => handleMarkContactRead(contact.id!)}
                          className="px-4 py-2 text-sm rounded-lg transition-colors whitespace-nowrap"
                          style={{ 
                            backgroundColor: 'rgba(34, 197, 94, 0.2)',
                            border: '1px solid rgba(34, 197, 94, 0.5)',
                            color: '#22c55e'
                          }}
                        >
                          {t('submissions.markRead')}
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteContact(contact.id!)}
                        className="px-4 py-2 text-sm rounded-lg transition-colors"
                        style={{ 
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          border: '1px solid rgba(239, 68, 68, 0.5)',
                          color: '#ef4444'
                        }}
                      >
                        {t('submissions.delete')}
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