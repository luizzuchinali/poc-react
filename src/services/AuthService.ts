/**
 * AuthService provides authentication services, including sign-in and sign-out functionalities.
 */
class AuthService {
  /**
   * Sign-in process.
   * @param username - The username of the user trying to sign in.
   * @param password - The password of the user trying to sign in.
   * @returns A promise that resolves to true if authentication is successful, otherwise it rejects with an error.
   */
  signIn(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("auth", "true"); // Simulate setting auth token
        resolve(true);
      }, 1000);
    });
  }

  /**
   * Sign-out process.
   * @returns A promise that resolves when the user has been signed out.
   */
  signOut(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("auth"); // Simulate removing auth token
        resolve();
      }, 1000);
    });
  }
}

export default AuthService;
