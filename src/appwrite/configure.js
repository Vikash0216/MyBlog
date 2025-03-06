import config from "../configVar/config";
import { Databases, Client, ID, Query, Storage } from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
          return  await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionID,
                slug,
    
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status
                }
            )
        }
        catch (error) {
            console.log('Createpost error',error);
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
       try{
      return await this.databases.updateDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionID,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
        )
       } catch(error){
        console.log("Updae Post error",error);
        return false;
       }
    }

    async deletePost(slug){
        try{
         await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionID,
                slug
            )
            return true
        }
        catch(error){
            console.log('Delete Post error',error); 
            return false;
        }
    }

    async getPost(slug) {
        try {
            if (!slug) {
                throw new Error("Invalid slug: Slug is required.");
            }
    
            const post = await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionID,
                slug
            );
    
            return post;
        } catch (error) {
            console.log("Error fetching post:", error); // More detailed error logging
            return null; // Can be changed to `false` if preferred
        }
    }
    

    async getPosts() {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionID,
                [Query.equal("status", "active")] // ✅ Corrected array syntax
            );
        } catch (error) {
            console.log("Error fetching posts from database:", error); // ✅ Improved error logging
            return false;
        }
    }
    

    // For file Upload

    async uploadFile(file){
        try{
         return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Upload file error from database",error);
            return false
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        }catch(error){
            console.log("Deletefile error from database",error);  
            return false          
        }
    }
    previewFile(fileId){
           return  this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            ) 
    }
    downloadFile(fileId){
        return this.bucket.getFileDownload(
            config.appwriteBucketId,
            fileId
        )
    }
}



const service = new Service()
export default service