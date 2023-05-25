import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const clientConfig = {
  projectId: 'vo8irzzh',
  dataset: 'production',
};

export const client = sanityClient({
  projectId: clientConfig.projectId,
  dataset: clientConfig.dataset,
  apiVersion: '2022-12-19',
  token: 'sk4UoY9nWCg86gTTp06Vhiym5SwB12107chBTAaGxXX5K3NKku32o5cvrUnQCF9YamtqeeSaPCd0RpO5MNsFKpK9GSycz0XL94bnCGqG9PuILx1g4dwVYvi3DqaDu13Vzl1hcWSmgs5tUGKVHNhdaccSQR9oLBwHhLUags6n0K4BO8Nl8N90',
  useCdn: true,
  ignoreBrowserTokenWarning: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = source => builder.image(source);
