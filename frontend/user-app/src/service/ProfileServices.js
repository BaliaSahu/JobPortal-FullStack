import axios from "axios";

const BASE_URL="https://jobportalapi-2.onrender.com"


export const deleteEducationDetails=async(data,token)=>{
    const res=await axios.delete(BASE_URL+"/delete/education",{
        headers:{
            "Authorization":"Bearer "+token
        },
        data:data
    })
    return res;
}
export const deleteExperienceDetails=async(data,token)=>{
    const res=await axios.delete(BASE_URL+"/delete/experience",{
        headers:{
            "Authorization":"Bearer "+token
        },
        data:data
    })
    return res;
}
export const deleteProjectDetails=async(data,token)=>{
    const res=await axios.delete(BASE_URL+"/delete/project",{
        headers:{
            "Authorization":"Bearer "+token
        },
        data:data
    })
    return res;
}
export const deleteCertificationDetails=async(data,token)=>{
    const res=await axios.delete(BASE_URL+"/delete/certification",{
        headers:{
            "Authorization":"Bearer "+token
        },
        data:data
    })
    return res;
}
export const profileUpload=async(image,token)=>{

    const formData=new FormData();
    formData.append("image",image);

    const res=await axios.put(BASE_URL+"/update/profile",formData,{
        headers:{
            "Authorization":"Bearer "+token,
            "Content-Type":"multipart/form-data"
        }
    })
    return res;
}

export const resumeUpload=async(resume,token)=>{
    const formData=new FormData();
    formData.append("resume",resume);

    const res=await axios.put(BASE_URL+"/update/resume",formData,
        {
            headers:{
                "Content-Type":"multipart/form-data",
                "Authorization":"Bearer "+token
            }
        }
    )
    return res;
}
export const updateBasicInfo=async(data,token)=>{
    const res=await axios.put(BASE_URL+"/update/basicinfo",data,{
        headers:{
            "AUthorization":"Bearer "+token
        }
    }) 
    return res;
}
export const updateEducation=async(data,token)=>{
    console.log(data)
    const res=await axios.put(BASE_URL+"/update/education",data,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}
export const updateExperience=async(data,token)=>{
    const res=await axios.put(BASE_URL+"/update/experience",data,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}
export const updateProject=async(data,token)=>{
    const res=await axios.put(BASE_URL+"/update/project",data,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}
export const updateCertification=async(data,token)=>{
    const res=await axios.put(BASE_URL+"/update/certification",data,{
        headers:{
            "Authorization":"Bearer "+token
        }
    })
    return res;
}