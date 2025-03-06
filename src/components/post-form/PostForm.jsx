import React from "react";
import {RTE,Button,Input,Select} from "../index"
import service from "../../appwrite/configure";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { useEffect } from "react";

function PostForm({post}){

    const {register,handleSubmit,watch,setValue,getValues,control} = useForm({
        defaultValues:{
            title:post?.title || "",
            slug:post?.slug || "",
            content:post?.content || "",
            status:post?.status || "active"
        }
    })


    const navigate = useNavigate()
    const userData = useSelector((state)=> state.auth.userData)

    const submit = async (data)=>{
        let file = null
        if(data.image && data.image[0]){
            file = await service.uploadFile(data.image[0])
        }
        
        if(post){
          if(file){
           await service.deleteFile(post.featuredImage)
          }
         const dbPost = await service.updatePost(post.$id,{...data,featuredImage:file?file.$id:post.featuredImage})
         if(dbPost){
            navigate("/")
         }
        }
        else{
            if(file){
             const fileId = file.$id
             data.featuredImage = fileId
            const dbPost = await service.createPost({...data,
                userId:userData.$id,
             }) 
             if(dbPost){
                navigate(`/post/${dbPost.$id}`)
             }
            }
        }
    }

    const slugTransform = useCallback((value)=>{
        if(value && typeof value === "string"){
            return value
            .trim()
            .toLocaleLowerCase()
            .replace(/ /g,'_')
        }
        return ''
    },[])

    useEffect(()=>{
        const subscription = watch((value,{name})=>{
            if(name === 'title'){
                setValue('slug',slugTransform(value.title,{
                    shouldValidate:true
                }))
            }
        })


        return()=> subscription.unsubscribe();
    },[watch,slugTransform,setValue])


    return (
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-wrap bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          {/* Left Column */}
          <div className="w-full md:w-2/3 px-2 space-y-4">
            {/* Title Input */}
            <Input
              label="Title:"
              placeholder="Enter post title"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              {...register("title", { required: true })}
            />
    
            {/* Slug Input */}
            <Input
              label="Slug:"
              placeholder="Enter slug"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
              }}
            />
    
            {/* Rich Text Editor */}
            <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValue={getValues("content")}
            />

          </div>
    
          {/* Right Column */}
          <div className="w-full md:w-1/3 px-2 space-y-4">
            {/* File Upload */}
            <Input
              label="Upload Image:"
              type="file"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
    
            {/* Image Preview */}
            {post && (
              <div className="w-full flex justify-center">
                <img
                  src={service.previewFile(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg shadow-lg w-40 h-40 object-cover"
                />
              </div>
            )}
    
            {/* Status Select */}
            <Select
              label="Status:"
              options={["active", "inactive"]} // ✅ Make sure it's "options" (not "option")
              className="w-full"
              {...register("status", { required: true })}
            />
    
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-white font-semibold py-2 rounded-lg transition duration-300"
              bgColor={post ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      );
    };
    
    export default PostForm;