import { Client, Account, Databases, Storage, Functions } from 'appwrite';

const client = new Client();

// Use fallback values during build time if environment variables are not set
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'default-project';

client
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

export default client; 