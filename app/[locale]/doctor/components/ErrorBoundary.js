import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // يمكن تسجيل الخطأ هنا
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 bg-red-100 text-red-700">حدث خطأ غير متوقع. يرجى إعادة تحميل الصفحة.</div>;
    }
    return this.props.children;
  }
}
