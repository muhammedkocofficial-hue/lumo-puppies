export type MediaAsset = {
  isExample?: boolean;
  desktopSrc?: string;
  mobileSrc?: string;
  alt: string;
  focalPosition?: string;
  mobileFocalPosition?: string;
  aspectRatio?: string;
  mobileAspectRatio?: string;
  caption?: string;
  width?: number;
  height?: number;
};
export type Proof = {
  title: string;
  verified: boolean;
  description: string;
  href?: string;
  media?: MediaAsset;
};
export type Breed = {
  slug: string;
  name: string;
  index: string;
  short: string;
  introduction: string;
  published: boolean;
  offeredByLumo: boolean;
  media?: MediaAsset;
  categories: { title: string; text: string }[];
  sources: { title: string; href: string }[];
  todo: string[];
};
export type Puppy = {
  isExample?: boolean;
  breedName?: string;
  status?: "available" | "reserved" | "home";
  slug: string;
  name: string;
  published: boolean;
  breedSlug?: string;
  colour?: string;
  sex?: string;
  birthDate?: string;
  personality?: string[];
  introduction?: string;
  gallery: MediaAsset[];
  video?: { src: string; poster: string };
  development: { date: string; text: string; verified: boolean }[];
  parents: {
    name: string;
    role: string;
    verified: boolean;
    media?: MediaAsset;
    description?: string;
  }[];
  documents: Proof[];
  todo: string[];
};
export type Award = {
  title: string;
  organisation: string;
  event?: string;
  year: number;
  description: string;
  verified: boolean;
  photo?: MediaAsset;
  certificate?: string;
  trophy?: MediaAsset;
};
export type Testimonial = {
  displayName: string;
  city?: string;
  puppyName?: string;
  quote: string;
  date?: string;
  verified: boolean;
  consent: boolean;
  photo?: MediaAsset;
  video?: { src: string; poster: string };
};
export type TeamMember = {
  name: string;
  role: string;
  biography: string;
  verified: boolean;
  portrait?: MediaAsset;
};
