import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('Navigation');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <Link
          href="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-[#C93C3C] text-gray-900 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          {t('home')}
        </Link>
      </div>
    </div>
  );
}