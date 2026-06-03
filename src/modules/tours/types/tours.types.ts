export interface TourSchoolSummary {
  documentId: string;
  slug: string | null;
  name: string;
  suburb: string | null;
  state: string | null;
  logoUrl: string | null;
  coverImageUrl: string | null;
}

export interface TourListItem {
  documentId: string;
  title: string;
  startsAt: string;
  location: string | null;
  capacity: number;
  bookedCount: number;
  remainingSpots: number;
  isFull: boolean;
  description: string | null;
  school: TourSchoolSummary | null;
}

export interface ToursPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ToursListResponse {
  data: TourListItem[];
  meta: { pagination: ToursPagination };
}

export type TourBookingStatus = 'booked' | 'cancelled';

export interface MyBookingTour {
  documentId: string;
  title: string;
  startsAt: string;
  location: string | null;
  capacity: number;
  school: TourSchoolSummary | null;
}

export interface MyBooking {
  documentId: string;
  status: TourBookingStatus;
  bookedAt: string | null;
  createdAt: string;
  tour: MyBookingTour | null;
}

export interface MyBookingsResponse {
  data: MyBooking[];
}

export interface BookTourResult {
  documentId: string;
  status: 'booked';
  bookedAt: string;
  tourId: string;
}

export interface BookTourResponse {
  data: BookTourResult;
}

export interface CancelBookingResult {
  documentId: string;
  status: 'cancelled';
}

export interface CancelBookingResponse {
  data: CancelBookingResult;
}

export interface TourCardProps {
  tour: TourListItem;
  isBooked: boolean;
  onBook: (tour: TourListItem) => void;
  isBooking: boolean;
}

export interface MyBookingCardProps {
  booking: MyBooking;
  onCancel: (booking: MyBooking) => void;
}

export interface CancelBookingDialogProps {
  booking: MyBooking | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending: boolean;
}
