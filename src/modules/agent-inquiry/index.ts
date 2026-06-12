export { ContactAgentDialog } from '@/modules/agent-inquiry/components/ContactAgentDialog';
export { useContactAgent } from '@/modules/agent-inquiry/hooks/useContactAgent';
export { useSubmitInquiry } from '@/modules/agent-inquiry/mutations/use-submit-inquiry.mutation';
export {
  contactAgentSchema,
  type ContactAgentFormValues,
} from '@/modules/agent-inquiry/schemas/contact-agent.schema';
export type {
  ContactAgentDialogProps,
  SubmitInquiryPayload,
  SubmittedInquiry,
} from '@/modules/agent-inquiry/types/agent-inquiry.types';
