import axios from "axios";

const BASE_URL="https://jobportalapi-2.onrender.com"

export const fetchJobs=async(token,page,size)=>{
    const res=await axios.get(BASE_URL+"/jobs",{
        params:{page,size},
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}
export const fetchJobsApplied=async(page,size,token)=>{
    console.log("ala")
    const res=await axios.get(BASE_URL+"/jobs/applied",{
        params:{
            page,size
        },
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}
export const fetchJobsForYou=async(token,page,size)=>{
    const res=await axios.get(BASE_URL+"/jobsforyou",{
        params:{page,size},
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}
export const applyJob=async(id,token)=>{
    const res=await axios.post(BASE_URL+"/job/apply/"+id,null,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}
export const fetchUserDetails=async(token)=>{
    const res=await axios.get(BASE_URL+"/user/details",{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res; 
}
export const fetchRecruiterDetails=async(email,token)=>{
    const res=await axios.get(BASE_URL+"/recruiter/"+email,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}

export const registerUser=async(data)=>{
    const res=await axios.post(BASE_URL+"/register/user",data,
        {
            headers:{"Content-Type":"application/json"}
        }
    );
    console.log(res);
    return res;
}
export const loginUser=async(data)=>{
    const res=await axios.post(BASE_URL+"/login",data,
        {
            headers:{"Content-Type":"application/json"}
        }
    )
    return res;
}
export const searchJobs=async(keyword,page,size,token)=>{
    const res=await axios.get(BASE_URL+"/jobposts/search",{
        params:{keyword,page,size},
        headers:{
            Authorization:"Bearer "+token
        }
    })
    return res;
}