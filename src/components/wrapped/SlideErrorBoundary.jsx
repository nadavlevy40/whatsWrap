import { Component } from 'react';

export default class SlideErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center px-6 gap-4">
          <div className="text-5xl">😅</div>
          <p className="text-white/60 text-sm text-center">
            Something went wrong on this slide.<br />
            Tap to continue →
          </p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-red-400 text-xs text-center max-w-xs break-words opacity-60">
              {this.state.error?.message}
            </p>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}