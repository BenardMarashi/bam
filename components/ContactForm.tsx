'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { addContactSubmission } from '@/lib/admin/firestore';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    
    console.log('📝 Form submission started');
    console.log('Form data:', formData);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error('Please fill in all required fields');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      console.log('📤 Calling addContactSubmission...');
      
      // Save to Firestore
      const docId = await addContactSubmission({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim(),
      });

      console.log('✅ Form submitted successfully! Document ID:', docId);
      
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        message: '',
      });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      
      let userMessage = t('form.errorMessage');
      
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
        
        // Provide more specific error messages
        if (error.message.includes('required fields')) {
          userMessage = 'Please fill in all required fields';
        } else if (error.message.includes('email')) {
          userMessage = 'Please enter a valid email address';
        } else if (error.message.includes('permission')) {
          userMessage = 'Connection error. Please check your internet and try again.';
        } else if (error.message.includes('not initialized')) {
          userMessage = 'System error. Please refresh the page and try again.';
        }
      }
      
      setErrorMessage(userMessage);
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section 
      ref={ref} 
      id="contact" 
      className="relative py-32 overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #F8F8F8 0%, #FFFFFF 100%)'
      }}
    >
      <div className="absolute inset-0 bg-grid-small opacity-20" />

      <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#C93C3C]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-[#C93C3C]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6" style={{ color: '#1f2937' }}>
            {t('title')}
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#4b5563' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-3xl p-8 lg:p-12 border"
            style={{
              backgroundColor: 'rgba(201, 60, 60, 0.05)',
              borderColor: 'rgba(201, 60, 60, 0.2)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    {t('form.name')} <span style={{ color: '#C93C3C' }}>{t('form.required')}</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('form.namePlaceholder')}
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-xl transition-all disabled:opacity-50 border focus:outline-none focus:ring-2 focus:ring-[#C93C3C]"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderColor: 'rgba(201, 60, 60, 0.2)',
                      color: '#1f2937'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    {t('form.email')} <span style={{ color: '#C93C3C' }}>{t('form.required')}</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('form.emailPlaceholder')}
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-xl transition-all disabled:opacity-50 border focus:outline-none focus:ring-2 focus:ring-[#C93C3C]"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderColor: 'rgba(201, 60, 60, 0.2)',
                      color: '#1f2937'
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    {t('form.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('form.companyPlaceholder')}
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-xl transition-all disabled:opacity-50 border focus:outline-none focus:ring-2 focus:ring-[#C93C3C]"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderColor: 'rgba(201, 60, 60, 0.2)',
                      color: '#1f2937'
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('form.phonePlaceholder')}
                    disabled={status === 'sending'}
                    className="w-full px-4 py-3 rounded-xl transition-all disabled:opacity-50 border focus:outline-none focus:ring-2 focus:ring-[#C93C3C]"
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      borderColor: 'rgba(201, 60, 60, 0.2)',
                      color: '#1f2937'
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                  {t('form.service')}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 rounded-xl transition-all disabled:opacity-50 border focus:outline-none focus:ring-2 focus:ring-[#C93C3C]"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(201, 60, 60, 0.2)',
                    color: '#1f2937'
                  }}
                >
                  <option value="">{t('form.selectService')}</option>
                  <option value="shopify">{t('form.services.shopify')}</option>
                  <option value="webapp">{t('form.services.webapp')}</option>
                  <option value="ai">{t('form.services.ai')}</option>
                  <option value="marketing">{t('form.services.marketing')}</option>
                  <option value="seo">{t('form.services.seo')}</option>
                  <option value="optimization">{t('form.services.optimization')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>
                  {t('form.message')} <span style={{ color: '#C93C3C' }}>{t('form.required')}</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('form.messagePlaceholder')}
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 rounded-xl transition-all resize-none disabled:opacity-50 border focus:outline-none focus:ring-2 focus:ring-[#C93C3C]"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderColor: 'rgba(201, 60, 60, 0.2)',
                    color: '#1f2937'
                  }}
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                className="w-full py-4 text-lg rounded-full font-semibold text-white shadow-2xl shadow-[#C93C3C]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: '#C93C3C' }}
              >
                {status === 'sending' && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {status === 'sending' ? t('form.sending') : t('form.submit')}
              </motion.button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl text-center"
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)'
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-600 font-semibold">Success!</p>
                  </div>
                  <p className="text-green-600 text-sm">{t('form.successMessage')}</p>
                </motion.div>
              )}
              
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl text-center"
                  style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-red-600 font-semibold">Error</p>
                  </div>
                  <p className="text-red-600 text-sm">{errorMessage || t('form.errorMessage')}</p>
                </motion.div>
              )}
            </form>

            <div className="mt-12 pt-8" style={{ borderTop: '1px solid rgba(201, 60, 60, 0.2)' }}>
              <p className="text-center mb-4" style={{ color: '#4b5563' }}>{t('reachUs')}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 text-center">
                <a href="mailto:hello@bam.at" className="transition-colors hover:opacity-80" style={{ color: '#C93C3C' }}>
                  {t('email')}
                </a>
                <a href="tel:+43XXXXXXXXX" className="transition-colors hover:opacity-80" style={{ color: '#C93C3C' }}>
                  {t('phone')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}