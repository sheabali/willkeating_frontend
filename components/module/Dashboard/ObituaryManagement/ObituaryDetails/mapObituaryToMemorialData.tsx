interface CreatedBy {
  fullName: string;
  email: string;
  phone: string;
  image: string;
}

interface ObituaryRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  dateOfPassing: string;
  images: string[];
  createdAt: string;
  createdBy: CreatedBy;
  funeralLocation?: string;
  funeralDate?: string;
  funeralTime?: string;
  location?: string;
  story?: string;
}

export function mapObituaryToMemorialData(
  record: ObituaryRecord,
  isFuneral: boolean,
) {
  const [coverPhoto, ...galleryPhotos] = record.images ?? [];

  return {
    name: record.name,
    breadcrumb: [
      { label: "Home", href: "/" },
      {
        label: isFuneral ? "Funeral Notices" : "Death Notices",
        href: isFuneral ? "/funeral-notices" : "/death-notices",
      },
      { label: record.name, href: undefined },
    ],
    born: record.dateOfBirth,
    passed: record.dateOfPassing,
    coverPhoto: coverPhoto ?? null,
    galleryPhotos,
    biography: record.story ?? "",
    submissionDetails: {
      submittedBy: record.createdBy?.fullName ?? "Unknown",
      submissionDate: record.createdAt,
    },
    funeral: {
      location: isFuneral ? record.funeralLocation : record.location,
      address: isFuneral ? record.funeralLocation : record.location,
      mapLink: undefined,
      serviceDate: isFuneral ? record.funeralDate : undefined,
      serviceTime: isFuneral ? record.funeralTime : undefined,
    },
    specialInstructions: undefined,
  };
}
