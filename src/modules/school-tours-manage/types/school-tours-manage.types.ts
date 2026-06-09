export interface ManagedTour {
  documentId: string;
  title: string;
  startsAt: string;
  location: string | null;
  capacity: number;
  description: string | null;
  bookingsCount: number;
}

export interface ManagedToursResponse {
  data: ManagedTour[];
}

export interface ManagedTourResponse {
  data: ManagedTour;
}

export interface TourWritePayload {
  title: string;
  startsAt: string;
  location: string | null;
  capacity: number;
  description: string | null;
}

export interface ToursStaffMe {
  documentId: string;
  permissionLevel: 'admin' | 'staff';
  school: {
    documentId: string;
    name: string;
  };
}

export interface ToursStaffMeResponse {
  data: ToursStaffMe;
}
