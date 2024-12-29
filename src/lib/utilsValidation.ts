import { readDocuments } from '../lib/utilsDatabase';

export function isValidPhone(phone) {
  // Validate phone number using E.164 format (international standard)
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}

export function isValidEmail(email) {
  // Validate email using a common regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function isRegistered(firstName, lastName, email) {
    try {
      const query = { firstName, lastName, email };
      const users = await readDocuments('users', query);
  
      // Return true if the user is already registered
      return users.length > 0;
    } catch (error) {
      console.error('Error checking registration:', error);
      throw error;
    }
  }