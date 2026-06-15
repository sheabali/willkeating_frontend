import { MemorialData } from "@/src/types/memorial";
import { MemorialPage } from "./memorial-page";

export const metadata = {
  title: "Eleanor Harrington | Memorial",
  description: "Celebrating the life of Eleanor Harrington",
};

const memorialData: MemorialData = {
  name: "Eleanor Harrington",
  breadcrumb: [
    { label: "Obituary Management" },
    { label: "Eleanor Harrington" },
  ],
  born: {
    date: "May 14, 1938",
    location: "London, United Kingdom",
  },
  passed: {
    date: "October 28, 2023",
    age: "Age: 85 Years",
  },
  biography: [
    "Eleanor Harrington (née Sterling), a beloved educator, gardener, and storyteller, passed away peacefully at the age of 85, surrounded by the family she cherished so deeply.",
    "Born in the spring of 1938, Eleanor grew up with a boundless curiosity that led her to study mathematics and literature. For over forty years, she inspired generations of students at Willow Creek Academy, where she was known not just for her knowledge of the classics, but for her unwavering belief in the potential of every child who walked through her door.",
    'Beyond the classroom, Eleanor was an artist of the earth. Her garden was a sanctuary of beauty and wildflowers, a place where time seemed to slow down. She often said that "to plant a garden is to believe in tomorrow," a philosophy she lived by every single day.',
    "She is survived by her three children, seven grandchildren, and a community of friends who will forever miss her warmth, her quick wisdom, and her legendary blackberry cobbler. Her legacy of kindness reminds us of all who knew her.",
  ],
  coverPhoto: {
    src: "/images/Rectangle 14 (2).png",
    alt: "Eleanor Harrington portrait",
  },
  galleryPhotos: [
    {
      src: "/images/rectangle_15.png",
      alt: "Memorial gallery photo 1",
    },
    {
      src: "/images/Rectangle 14 (2).png",
      alt: "Memorial gallery photo 2",
    },
    {
      src: "/images/Rectangle 13 (3).png",
      alt: "Memorial gallery photo 3",
    },
  ],
  submissionDetails: {
    submittedBy: "Thomas Harrington",
    submissionDate: "Oct 30, 2023, 2:14 PM",
  },
  funeral: {
    location: "St. Mary's Cathedral",
    address: "245 Cathedral Hill, San Francisco, CA 94109",
    mapLink:
      "https://maps.google.com/?q=245+Cathedral+Hill,+San+Francisco,+CA+94109",
    serviceDate: "Saturday, November 12, 2023",
    serviceTime: "Service begins at 10:30 AM",
  },
  specialInstructions: [
    "In lieu of flowers, the family requests that donations be made to the Willow Creek Literacy Foundation. A reception will follow at the parish hall immediately after the service.",
  ],
};

export default function ObituaryDetails() {
  return <MemorialPage data={memorialData} />;
}
