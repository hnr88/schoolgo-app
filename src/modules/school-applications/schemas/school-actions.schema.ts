import { z } from 'zod';

export const makeOfferSchema = z.object({
  offerDeadline: z.string().min(1, 'required'),
  offerConditions: z.string().optional(),
  offerAnnualFee: z.string().optional(),
});

export const extendOfferSchema = z.object({
  offerDeadline: z.string().min(1, 'required'),
});

export const declineSchema = z.object({
  declineReason: z.string().min(1, 'required'),
  declineNote: z.string().optional(),
});

export const scheduleInterviewSchema = z.object({
  interviewScheduledAt: z.string().min(1, 'required'),
  interviewMethod: z.string().min(1, 'required'),
  interviewWith: z.string().optional(),
  interviewMeetingLink: z.string().optional(),
});

export const completeInterviewSchema = z.object({
  interviewOutcome: z.string().min(1, 'required'),
  interviewNotes: z.string().optional(),
});

export const requestDocumentsSchema = z.object({
  documentTypes: z.string().min(1, 'required'),
  note: z.string().optional(),
});

export const examOutcomeSchema = z.object({
  examOutcome: z.enum(['passed', 'further_review', 'not_recommended']),
  examScore: z.string().optional(),
  examNotes: z.string().optional(),
});

export const issueCoeSchema = z.object({
  coeNumber: z.string().min(1, 'required'),
  coeStartDate: z.string().optional(),
  coeEndDate: z.string().optional(),
});

export type MakeOfferForm = z.infer<typeof makeOfferSchema>;
export type ExtendOfferForm = z.infer<typeof extendOfferSchema>;
export type DeclineForm = z.infer<typeof declineSchema>;
export type ScheduleInterviewForm = z.infer<typeof scheduleInterviewSchema>;
export type CompleteInterviewForm = z.infer<typeof completeInterviewSchema>;
export type RequestDocumentsForm = z.infer<typeof requestDocumentsSchema>;
export type ExamOutcomeForm = z.infer<typeof examOutcomeSchema>;
export type IssueCoeForm = z.infer<typeof issueCoeSchema>;
