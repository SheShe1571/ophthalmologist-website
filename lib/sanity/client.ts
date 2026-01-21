import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Fetch functions
export async function getServices() {
  return sanityClient.fetch(`
    *[_type == "service"] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      subtitle,
      description,
      icon,
      "heroImage": heroImage.asset->url,
      benefits,
      process,
      faqs,
      duration
    }
  `);
}

export async function getServiceBySlug(slug: string) {
  return sanityClient.fetch(`
    *[_type == "service" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      subtitle,
      description,
      icon,
      "heroImage": heroImage.asset->url,
      benefits,
      process,
      faqs,
      duration
    }
  `, { slug });
}

export async function getReviews() {
  return sanityClient.fetch(`
    *[_type == "review" && isVisible == true] | order(date desc) {
      _id,
      name,
      rating,
      text,
      "service": service->title,
      date
    }
  `);
}

export async function getVideos() {
  return sanityClient.fetch(`
    *[_type == "video" && isVisible == true] | order(order asc) {
      _id,
      title,
      youtubeId,
      "thumbnail": thumbnail.asset->url,
      duration
    }
  `);
}

export async function getFAQs() {
  return sanityClient.fetch(`
    *[_type == "faq"] | order(order asc) {
      _id,
      question,
      answer,
      category
    }
  `);
}

export async function getSiteSettings() {
  return sanityClient.fetch(`
    *[_type == "siteSettings"][0] {
      siteName,
      siteDescription,
      phone,
      whatsapp,
      email,
      address,
      mapCoordinates,
      socialMedia,
      workingHours,
      defaultWhatsAppMessage
    }
  `);
}

export async function getDoctor() {
  return sanityClient.fetch(`
    *[_type == "doctor"][0] {
      name,
      title,
      "image": image.asset->url,
      bio,
      credentials,
      experience,
      operations,
      patients
    }
  `);
}

// Submit contact form to Sanity
export async function createSubmission(data: {
  name: string;
  phone: string;
  service?: string;
  message?: string;
}) {
  const writeClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN,
    useCdn: false,
  });

  return writeClient.create({
    _type: 'submission',
    ...data,
    status: 'new',
    createdAt: new Date().toISOString(),
  });
}
