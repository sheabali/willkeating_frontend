import { Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

interface FuneralInformationProps {
  location: string;
  address: string;
  mapLink?: string;
  serviceDate: string;
  serviceTime: string;
  specialInstructions?: string[];
}

export function FuneralInformation({
  location,
  address,
  mapLink,
  serviceDate,
  serviceTime,
  specialInstructions,
}: FuneralInformationProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-lg text-neutral-900 tracking-wider uppercase">
        Funeral & Memorial Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Location Information */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-neutral-900">{location}</h3>
              <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                {address}
              </p>
              {mapLink && (
                <Link
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors mt-2 inline-block underline"
                >
                  View on Map →
                </Link>
              )}
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4 pt-4 border-t border-neutral-200">
            <div className="flex gap-3">
              <Calendar className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-neutral-900">{serviceDate}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-neutral-700">{serviceTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Instructions */}
        {specialInstructions && specialInstructions.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-semibold text-neutral-900 text-sm uppercase tracking-widest">
              Special Instructions
            </h4>
            <div className="space-y-3">
              {specialInstructions.map((instruction, index) => (
                <p
                  key={index}
                  className="text-sm text-neutral-700 leading-relaxed"
                >
                  {instruction}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
