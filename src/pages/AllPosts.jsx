import {PostCard,Container} from "../components/index"
import React,{useEffect} from "react"
import { fetchPosts } from "../store/postSlice"
import { useSelector , useDispatch } from "react-redux"
function AllPosts(){
  const dispatch = useDispatch()
  const posts = useSelector((state)=>state.posts.data.documents)
  const status = useSelector((state)=> state.posts)
  
    useEffect(()=>{
       dispatch(fetchPosts())
    },[dispatch])

    if(status.isLoading){
      return(
        <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl font-semibold">Loading Posts...</h2>
      </div>
      )
    }
    if(status.error){
      return (
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-xl font-semibold text-red-600">Something went wrong: {error}</h2>
        </div>
      );
    }
    return (
        <div className="py-8 bg-gray-100 min-h-screen">
          <Container>
            <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">All Posts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {
                Array.isArray(posts) && posts.length > 0 ? (posts.map((post) => (
                  <div key={post.$id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <PostCard  {...post} />
                  </div>
                ))) : (<p className="text-center text-gray-500 text-lg col-span-full">No posts available.</p>) 
              }
            </div>
          </Container>
        </div>
      );
    }
    
    export default AllPosts;