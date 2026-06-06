export { SchoolDashboard } from '@/modules/school-dashboard/components/SchoolDashboard';
export { SchoolAnalyticsPage } from '@/modules/school-dashboard/components/SchoolAnalyticsPage';
export { useSchoolFunnel } from '@/modules/school-dashboard/queries/use-school-funnel.query';
export { useSchoolForecast } from '@/modules/school-dashboard/queries/use-school-forecast.query';
export type {
  SchoolStaffMe,
  SchoolDashboardData,
  SchoolOnboardingState,
} from '@/modules/school-dashboard/types/school-dashboard.types';
export type {
  FunnelAnalytics,
  FunnelStage,
  FunnelStatus,
  FunnelConversionStep,
  FunnelTotals,
  FunnelAgentSource,
  FunnelAnalyticsParams,
  IntakeForecast,
  ForecastIntake,
  ForecastPipeline,
  IntakeForecastParams,
} from '@/modules/school-dashboard/types/school-analytics.types';
