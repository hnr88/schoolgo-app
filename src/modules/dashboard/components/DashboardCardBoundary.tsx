'use client';

import { Component } from 'react';
import { ErrorState } from '@/modules/core';
import type {
  DashboardCardBoundaryProps,
  DashboardCardBoundaryState,
} from '@/modules/dashboard/types/dashboard.types';

export class DashboardCardBoundary extends Component<
  DashboardCardBoundaryProps,
  DashboardCardBoundaryState
> {
  state: DashboardCardBoundaryState = { hasError: false };

  static getDerivedStateFromError(): DashboardCardBoundaryState {
    return { hasError: true };
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { fallbackMessage, retryLabel, children } = this.props;

    if (this.state.hasError) {
      return (
        <ErrorState
          framed
          message={fallbackMessage}
          retryLabel={retryLabel}
          onRetry={this.handleRetry}
        />
      );
    }

    return children;
  }
}
