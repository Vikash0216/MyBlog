import React from "react"
import {Signup as SignupComponent} from "../components/index"

function Signup(){
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <SignupComponent />
          </div>
        </div>
      );
}

export default Signup