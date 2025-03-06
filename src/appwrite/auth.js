import config from "../configVar/config";
import {Client,Account,ID} from 'appwrite'

export class AuthService{
     client = new Client();
     account;



     constructor (){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        this.account = new Account(this.client)
     }



     async createUser ({email,password,name}){
        try{
         const user =  await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (user) {
              await this.login(email, password);
              return user; // Return the created user
            }
            return null;            
        } catch(error){
            throw error;
        };
     }


     async login(email ,password){
      try {
         const session = await this.account.createEmailPasswordSession(email, password);
         if (session) {
             const user = await this.getCurrentUser(); // Fetch user immediately after login
             return { session, user }; // Return both session and user details
         }
         throw new Error("Session could not be created.")}
         catch (error) {
            console.log("Login failed:", error.message);
            throw new Error("Invalid email or password. Please try again.");
        }
     }

     async logout(){
        try{
           await this.account.deleteSessions('current')
           return true
        }catch(error){
         console.log("Logout failed:", error.message);
         return false; 
        }
     }
     async getCurrentUser() {
      try {
          return await this.account.get();
      } catch (error) {
          console.log("Error fetching current user:", error.message);
      }
      return null;
   }
   
}

const authService = new AuthService()

export default authService