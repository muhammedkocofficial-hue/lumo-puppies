import type { Testimonial } from "@/types/content";
// TODO: obtain authentic quotes, dates, photography and explicit publication consent.
export const testimonials: Testimonial[] = [];
export const publicTestimonials = testimonials.filter(
  (t) => t.verified && t.consent,
);
