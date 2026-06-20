/* eslint-disable @typescript-eslint/no-explicit-any */
import { FuneralInformation } from "./funeral-information";
import { LifeRemembered } from "./life-remembered";
import { MediaGallery } from "./media-gallery";
import { MemorialHeader } from "./memorial-header";
import { SubmissionDetails } from "./submission-details";
import { VitalStats } from "./vital-stats";

interface MemorialPageProps {
  data: any;
}

export function MemorialPage({ data }: MemorialPageProps) {
  return (
    <main className="min-h-screen bg-white">
      <MemorialHeader name={data.name} breadcrumb={data.breadcrumb} />

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16">
          <div className="lg:col-span-2">
            <VitalStats born={data.born} passed={data.passed} />
          </div>
          <div className="lg:col-span-1">
            <MediaGallery
              coverPhoto={data.coverPhoto}
              galleryPhotos={data.galleryPhotos}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12 lg:mb-16">
          <div className="lg:col-span-2">
            <LifeRemembered biography={data?.biography} />
          </div>
          <div className="lg:col-span-1">
            <SubmissionDetails
              submittedBy={data?.submissionDetails?.submittedBy}
              submissionDate={data?.submissionDetails?.submissionDate}
            />
          </div>
        </div>

        {data.funeral && (
          <div className="border-t border-neutral-200 pt-12 lg:pt-16">
            <FuneralInformation
              location={data.funeral.location}
              address={data.funeral.address}
              mapLink={data.funeral.mapLink}
              serviceDate={data.funeral.serviceDate}
              serviceTime={data.funeral.serviceTime}
              specialInstructions={data.specialInstructions}
            />
          </div>
        )}
      </div>
    </main>
  );
}
