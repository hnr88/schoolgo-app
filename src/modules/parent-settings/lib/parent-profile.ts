import type { ProfileValues } from '@/modules/parent-settings/schemas/profile.schema';
import type { ParentMe } from '@/modules/parent-settings/types/parent-settings.types';

/** Build react-hook-form defaults from a (possibly incomplete) parent record. */
export function toProfileDefaults(me: ParentMe): ProfileValues {
  return {
    firstName: me.firstName ?? '',
    lastName: me.lastName ?? '',
    relationshipToStudent: me.relationshipToStudent ?? '',
    occupation: me.occupation ?? '',
    phone: me.phone ?? '',
    secondaryPhone: me.secondaryPhone ?? '',
    preferredContactMethod: me.preferredContactMethod ?? 'phone',
    addressLine: me.addressLine ?? '',
    city: me.city ?? '',
    stateRegion: me.stateRegion ?? '',
    postalCode: me.postalCode ?? '',
    countryOfResidence: me.countryOfResidence ?? '',
    emergencyContactName: me.emergencyContactName ?? '',
    emergencyContactPhone: me.emergencyContactPhone ?? '',
    emergencyContactRelationship: me.emergencyContactRelationship ?? '',
  };
}
