import React,{useState , useEffect}from "react"
import {Container,PostForm} from "../components/index"
import { useNavigate, useParams } from "react-router-dom"
import service from "../appwrite/configure"

function EditPost(){
    const [post , setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(slug){
            service.getPost(slug)
            .then((post)=>{
                if(post){
                    setPost(post)
                }
            })
        } else{
            navigate("/")
        }
    },[slug,navigate])

    return post ? (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
          <Container>
            <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
              <PostForm post={post} />
            </div>
          </Container>
        </div>
      ) : null;
    }
    
    export default EditPost;