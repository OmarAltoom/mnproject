export function formatDateTime(iso, locale = 'ar-EG') {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString(locale === 'en' ? 'en-US' : 'ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    console.error("Error formatting date time:", e);
    return "—";
  }
}

export function formatDate(iso, locale = 'ar-EG') {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(locale === 'en' ? 'en-US' : 'ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return "—";
  }
}

export function formatTime(iso, locale = 'ar-EG') {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString(locale === 'en' ? 'en-US' : 'ar-EG', {
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    console.error("Error formatting time:", e);
    return "—";
  }
}

// Keep old functions for backward compatibility
export const formatDateTimeASCII = (iso) => formatDateTime(iso, 'en');
export const formatDateASCII = (iso) => formatDate(iso, 'en');