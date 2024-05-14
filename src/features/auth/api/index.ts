import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { Platform } from 'react-native'
import { User } from '@auth/models';

class AuthApi {
  async signIn(email: string, password: string) {
    try {
      const credentials = await auth().signInWithEmailAndPassword(email, password);
      const { user } = credentials;
      return this.getLocalUser(user);
    } catch (e) {
      console.log('[AuthApi] ERROR-signIn', e);
      throw e;
    }
  }
  
  async signUp(name: string, email: string, password: string, photo?: string) {
    try {
      const credentials = await auth().createUserWithEmailAndPassword(email, password);
      const { user } = credentials;
      const photoURL = await this.updatePhoto(user.uid, photo);
      await credentials.user.updateProfile({
        displayName: name,
        photoURL,
      });
      return this.getLocalUser(user);
    } catch (e) {
      console.log('[AuthApi] ERROR-signUp', e);
      throw e;
    }
  }

  async signOut() {
    try {
      return await auth().signOut();
    } catch (e) {
      console.log('[AuthApi] ERROR-signOut', e);
      throw e;
    }
  }

  async getUser() {
    const user = auth().currentUser!!;
    await user.reload();
    return this.getLocalUser(user);
  }

  private getLocalUser(user: FirebaseAuthTypes.User) {
    console.log(`[AuthApi]user ${user}`);
    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    } as User;
  }

  private async updatePhoto(uid: string, photo?: string) {
    try {
      if (photo) {
        const filename = photo.substring(photo.lastIndexOf('/') + 1);
        const uri = Platform.OS === 'ios' ? photo.replace('file://', '') : photo;
        const ref = storage().ref( `origin-mobile/${uid}/${filename}`);
        await ref.putFile(uri);
        return await ref.getDownloadURL();
      }
    } catch (e) {
      console.log('[AuthApi] ERROR-updatePhoto', e);
    } 
    return null;
  }

  private async getPhoto(uid: string, filename: string) {
    try {
      const ref = storage().ref( `origin-mobile/${uid}/${filename}`);
      return await ref.getDownloadURL();
    } catch (e) {
      console.log('[AuthApi] ERROR-getPhoto', e);
    }
  }
}

export const authApi = new AuthApi();
