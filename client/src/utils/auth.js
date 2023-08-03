// Import the 'jwt-decode' library for decoding JWT tokens
import decode from 'jwt-decode';

// Define a class for managing authentication-related functions
class AuthService {
  // Get user profile from decoded token
  getProfile() {
    return decode(this.getToken());
  }

  // Check if user is logged in by verifying token validity
  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  // Check if a token is expired
  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  // Get the stored token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Store the token in local storage upon login
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    // Redirect user to the homepage
    window.location.assign('/');
  }

  // Clear token from local storage and log user out
  logout() {
    localStorage.removeItem('id_token');
    // Redirect user to the homepage
    window.location.assign('/');
  }
}

// Export an instance of the AuthService class
export default new AuthService();
