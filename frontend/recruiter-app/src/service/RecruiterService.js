
import axios from 'axios';
const BASE_URL="https://jobportalapi-2.onrender.com"



export const fetchMyJobs = (page, size, token) => {
  return axios.get(`${BASE_URL+"/jobposts"}?page=${page}&size=${size}`, {
    headers: {
      Authorization: "Bearer "+token
    }
  });
};

export const getJobById=async(id,token)=>{
    const res=await axios.get(BASE_URL+"/job/"+id,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}

export const updateJob=async (id,data,token)=>{
    const res=await axios.put(BASE_URL+"/update/jobpost/"+id,data,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res; 
}

export const deleteJobPost=async(id,token)=>{
    const res=await axios.delete(BASE_URL+"/delete/jobpost/"+id,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}

export const register=async(data)=>{
 const res=await axios.post(BASE_URL+"/register/hr",data,{
    headers:{
        "Content-Type":"application/json"
    }
 });
 return res;
}

export const login=async(data)=>{
    const res=await axios.post(BASE_URL+"/login/hr",data,{
        headers:{
            "Content-Type":"application/json"
        }
    })
    return res;
}

export const createJob=async(data,token)=>{
    const res=await axios.post(BASE_URL+"/create/jobpost",data,{
        headers:{
            // "Content-Type":"application/json",
            "Authorization":"Bearer "+token
        }
    })
    return res;
}

export const fetchAppliedCandidates=async(jobId, page, size, token)=>{
    const res=await axios.get(BASE_URL+"/applied/users/"+jobId,{
        params:{page,size},
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    console.log(res)
    return res;
}
export const fetchRecruiterProfile = async(token) => {
  const res= await axios.get(BASE_URL+"/recruiter/details", {
    headers: {
      "Authorization":"Bearer "+token
    },
  });
  return res;
};
export const updateRecruiterProfile=async(data,token)=>{
    const res=await axios.put(BASE_URL+"/recruiter/update",data,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}
export const uploadProfileImg = async (Image, token) => {
    const formData = new FormData();
    formData.append("img", Image);

    const res = await axios.put(
        BASE_URL + "/recruiter/upload",
        formData,
        {
            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );
    return res;
}

export const fetchUserDetails=async(email,token)=>{
    const res=await axios.get(BASE_URL+"/user/details/"+email,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}

export const fetchCandidateBySkill=async(page, size, skills, token )=>{
    const res = await axios.get(BASE_URL+"/candidates/skills",
            {
              params: { skills, page: page, size },
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
    return res;
}