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
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-effect glass-border rounded-3xl p-8 lg:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.name')} <span className="text-[#C93C3C]">{t('form.required')}</span>
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
                    className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C93C3C] transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {t('form.email')} <span className="text-[#C93C3C]">{t('form.required')}</span>
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
                    className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C93C3C] transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C93C3C] transition-all disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C93C3C] transition-all disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.service')}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  disabled={status === 'sending'}
                  className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C93C3C] transition-all bg-transparent disabled:opacity-50"
                >
                  <option value="" className="bg-black">{t('form.selectService')}</option>
                  <option value="shopify" className="bg-black">{t('form.services.shopify')}</option>
                  <option value="webapp" className="bg-black">{t('form.services.webapp')}</option>
                  <option value="ai" className="bg-black">{t('form.services.ai')}</option>
                  <option value="marketing" className="bg-black">{t('form.services.marketing')}</option>
                  <option value="seo" className="bg-black">{t('form.services.seo')}</option>
                  <option value="optimization" className="bg-black">{t('form.services.optimization')}</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('form.message')} <span className="text-[#C93C3C]">{t('form.required')}</span>
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
                  className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C93C3C] transition-all resize-none disabled:opacity-50"
                />
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                className="w-full btn-primary py-4 text-lg shadow-2xl shadow-[#C93C3C]/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                  className="p-4 glass-effect glass-border rounded-xl text-center bg-green-500/10 border-green-500/20"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-400 font-semibold">Success!</p>
                  </div>
                  <p className="text-green-300 text-sm">{t('form.successMessage')}</p>
                </motion.div>
              )}
              
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 glass-effect glass-border rounded-xl text-center bg-red-500/10 border-red-500/20"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p className="text-red-400 font-semibold">Error</p>
                  </div>
                  <p className="text-red-300 text-sm">{errorMessage || t('form.errorMessage')}</p>
                </motion.div>
              )}
            </form>

            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-600 text-center mb-4">{t('reachUs')}</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 text-center">
                <a href="mailto:hello@bam.at" className="text-[#C93C3C] hover:text-[#C93C3C] transition-colors">
                  {t('email')}
                </a>
                <a href="tel:+43XXXXXXXXX" className="text-[#C93C3C] hover:text-[#C93C3C] transition-colors">
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