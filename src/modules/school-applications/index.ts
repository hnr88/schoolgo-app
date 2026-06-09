export { SchoolApplicationListPage } from '@/modules/school-applications/components/SchoolApplicationListPage';
export { SchoolApplicationDetailPage } from '@/modules/school-applications/components/SchoolApplicationDetailPage';

export {
  useServiceCatalog,
  SERVICE_CATALOG_QUERY_KEY,
} from '@/modules/school-applications/queries/use-service-catalog.query';
export type { UseServiceCatalogParams } from '@/modules/school-applications/queries/use-service-catalog.query';
export { useAttachService } from '@/modules/school-applications/queries/use-attach-service.mutation';
export { useApplicationServices } from '@/modules/school-applications/queries/use-application-services.query';
export { AttachServiceDialog } from '@/modules/school-applications/components/dialogs/AttachServiceDialog';
export { SchoolServicesSection } from '@/modules/school-applications/components/SchoolServicesSection';
export {
  attachServiceSchema,
} from '@/modules/school-applications/schemas/attach-service.schema';
export { schoolApplicationListItemSchema } from '@/modules/school-applications/schemas/application-assignment.schema';
export type { AttachServiceFormValues } from '@/modules/school-applications/schemas/attach-service.schema';

export type {
  SchoolApplicationStatus,
  SchoolApplicationListItem,
  SchoolApplicationListParams,
  SchoolApplicationDetail,
  SchoolActionKey,
  VettingCheckName,
  VettingCheckStatus,
  VettingCheck,
  VettingIntegrityStatus,
  VettingIntegrity,
  VettingDocVerificationStatus,
  VettingDocVerification,
  VettingOverall,
  VettingResult,
  VettingResultResponse,
  ServiceCatalogCategory,
  ServiceCatalogItem,
  ServiceCatalogResponse,
  AttachServiceLineItem,
  AttachServiceResult,
  AttachServiceResponse,
  ServiceInvoiceStatus,
  ServiceInvoice,
  ServiceInvoicesResponse,
} from '@/modules/school-applications/types/school-applications.types';
