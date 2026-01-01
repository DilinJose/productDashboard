/**
 * Utility functions for authentication
 */

export interface User {
  user_id?: string
  name: string
  phone_number: string
}

/**
 * Set access token in both localStorage and cookies
 * Cookies are needed for middleware to access the token on the server side
 */
export function setAccessToken(token: string) {
  // Store in localStorage for client-side access
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
    
    // Store in cookies for middleware access
    // Set cookie with 7 days expiry
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    
    document.cookie = `accessToken=${token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax; Secure=${window.location.protocol === 'https:'}`;
  }
}

/**
 * Get access token from localStorage
 */
export function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
}

/**
 * Set user details in localStorage
 */
export function setUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
    
    // Also store in cookies for server-side access
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax; Secure=${window.location.protocol === 'https:'}`;
  }
}

/**
 * Get user details from localStorage
 */
export function getUser(): User | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr) as User;
      } catch (e) {
        console.error('Error parsing user data:', e);
        return null;
      }
    }
  }
  return null;
}

/**
 * Remove access token and user details from both localStorage and cookies
 */
export function removeAccessToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    
    // Remove cookies by setting expiry to past date
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}

