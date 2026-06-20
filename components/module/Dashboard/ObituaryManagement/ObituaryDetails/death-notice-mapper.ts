/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";

export function mapDeathNoticeToMemorialPage(apiData: any): any {
  const images = apiData.images ?? [];
  const [coverSrc, ...restImages] = images;

  return {
    name: apiData.name,
    breadcrumb: apiData.name,
    born: apiData.dateOfBirth
      ? format(new Date(apiData.dateOfBirth), "MMM d, yyyy")
      : undefined,
    passed: apiData.dateOfPassing
      ? format(new Date(apiData.dateOfPassing), "MMM d, yyyy")
      : undefined,
    coverPhoto: coverSrc
      ? { src: coverSrc, alt: `${apiData.name} memorial photo` }
      : undefined,
    galleryPhotos: restImages.map((src: any) => ({
      src,
      alt: `${apiData.name} memorial photo`,
    })),

    biography: apiData.story
      ? apiData.story.split(/\n\s*\n/).filter(Boolean)
      : [],
    submissionDetails: {
      submittedBy: apiData.createdBy?.fullName,
      submissionDate: apiData.createdAt
        ? format(new Date(apiData.createdAt), "MMM d, yyyy")
        : undefined,
    },

    funeral: apiData.location ? { location: apiData.location } : undefined,
  };
}
