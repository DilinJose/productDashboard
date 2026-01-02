
export interface User {
  user_id?: string
  name: string
  phone_number: string
}

export function setAccessToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `accessToken=${token}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax${secureFlag}`;
  }
}

export function getAccessToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
}

export function setUser(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const secureFlag = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax${secureFlag}`;
  }
}

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


export function removeAccessToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');

    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
}

