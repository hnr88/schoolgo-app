'use client';

import { useTranslations } from 'next-intl';
import { Form } from '@/components/ui/form';
import { Wizard } from '@/modules/forms';
import {
  PARENT_WIZARD_STEPS,
  PARENT_WIZARD_STEP_TITLE_KEYS,
} from '@/modules/students/constants/parent-wizard.constants';
import { useParentStudentWizard } from '@/modules/students/hooks/use-parent-student-wizard';
import type { ParentStudentFormValues } from '@/modules/students/schemas/parent-student.schema';
import { ParentWizardHeader } from '@/modules/students/components/parent-wizard/ParentWizardHeader';
import { ParentWizardRail } from '@/modules/students/components/parent-wizard/ParentWizardRail';
import { StepPersonal } from '@/modules/students/components/parent-wizard/StepPersonal';
import { StepEducation } from '@/modules/students/components/parent-wizard/StepEducation';
import { StepGuardian } from '@/modules/students/components/parent-wizard/StepGuardian';
import { StepMedia } from '@/modules/students/components/parent-wizard/StepMedia';
import { StepReview } from '@/modules/students/components/parent-wizard/StepReview';

export function ParentStudentWizard({
  documentId,
  initialValues,
}: {
  documentId?: string;
  initialValues?: ParentStudentFormValues;
} = {}) {
  const t = useTranslations('StudentWizard');
  const {
    form,
    photo,
    voiceIntro,
    handlePhotoChange,
    handleVoiceIntroChange,
    canAdvance,
    onFinish,
    isSubmitting,
  } = useParentStudentWizard({ documentId, initialValues });

  const steps = PARENT_WIZARD_STEPS.map((id) => ({
    id,
    title: t(PARENT_WIZARD_STEP_TITLE_KEYS[id]),
  }));

  const firstName = form.watch('firstName') ?? '';
  const lastName = form.watch('lastName') ?? '';
  const studentName = `${firstName} ${lastName}`;

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Wizard
          steps={steps}
          labels={{ back: t('back'), next: t('next'), finish: t('finish') }}
          canAdvance={canAdvance}
          onFinish={onFinish}
          isSubmitting={isSubmitting}
          hideProgress
          header={(chrome) => <ParentWizardHeader {...chrome} />}
          aside={(chrome) => <ParentWizardRail chrome={chrome} studentName={studentName} />}
        >
          {(step, _index, goTo) => {
            switch (step.id) {
              case 'personal':
                return <StepPersonal control={form.control} />;
              case 'education':
                return <StepEducation control={form.control} />;
              case 'guardian':
                return <StepGuardian control={form.control} />;
              case 'media':
                return (
                  <StepMedia
                    control={form.control}
                    photo={photo}
                    voiceIntro={voiceIntro}
                    onPhotoChange={handlePhotoChange}
                    onVoiceIntroChange={handleVoiceIntroChange}
                  />
                );
              case 'review':
                return (
                  <StepReview
                    values={form.watch()}
                    photo={photo}
                    voiceIntro={voiceIntro}
                    onEdit={goTo}
                  />
                );
              default:
                return null;
            }
          }}
        </Wizard>
      </form>
    </Form>
  );
}
