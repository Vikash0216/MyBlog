import {PostForm,Container} from "../components/index"


function AddPost() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Container>
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
          <PostForm />
        </div>
      </Container>
    </div>
  );
}

export default AddPost;

