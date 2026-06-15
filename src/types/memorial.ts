export interface MemorialData {
  name: string;
  breadcrumb?: {
    label: string;
    href?: string;
  }[];
  born: {
    date: string;
    location: string;
  };
  passed: {
    date: string;
    age?: string;
  };
  biography: string[];
  coverPhoto?: {
    src: string;
    alt: string;
  };
  galleryPhotos?: Array<{
    src: string;
    alt: string;
  }>;
  submissionDetails: {
    submittedBy: string;
    submissionDate: string;
  };
  funeral: {
    location: string;
    address: string;
    mapLink?: string;
    serviceDate: string;
    serviceTime: string;
  };
  specialInstructions?: string[];
}
