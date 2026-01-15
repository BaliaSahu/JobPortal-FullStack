import { useRef } from "react";
import lookJob from '../../assets/lookJob.jpeg'
import briefcase from '../../assets/briefcase.png'
import apply from '../../assets/apply.png'
import resumeBuild from '../../assets/resumeBuild.png'

const Trusted = () => {

    const category = [
        { first: "Full Stack Developer", second: "Build and Maintain full stack application", third: "1000+ new job posted" },
        { first: "Web Developer", second: "Build and Maintain websited for clients", third: "950+ new job posted" },
        { first: "UI-UX Designer", second: "Design user interfaces and enhance user experience", third: "800+ new job posted" },
        { first: "Content Writing", second: "Write and edit content for various platforms", third: "800+ new job posted" },
        { first: "Data Entry", second: "Input data into systems accurately and efficiently", third: "1000+ new job posted" },
        { first: "Software Developer", second: "Having knowledge of Coding in any languages", third: "1000+ new job posted" },
        { first: "Sales", second: "Sell products and services to customers", third: "900+ new job posted" },
        { first: "Finance", second: "Manage finacial records and transactions", third: "700+ new job posted" }
    ];


    return (
        <div>
            <div className="container text-center my-5">
                <h2 className="fw-bold mb-4">
                    Trusted By <span className="text-primary">1000+</span> Companies
                </h2>

                <ul className="d-flex flex-wrap justify-content-center gap-3 list-unstyled fs-5">
                    <li className="mx-2">Google</li>
                    <li className="mx-2">Amazon</li>
                    <li className="mx-2">Figma</li>
                    <li className="mx-2">Microsoft</li>
                    <li className="mx-2">Spotify</li>
                    <li className="mx-2">Walmart</li>
                    <li className="mx-2">Accenture</li>
                    <li className="mx-2">Infosys</li>
                    <li className="mx-2">Deloitte</li>
                    <li className="mx-2">Netflix</li>
                    <li className="mx-2">Meta</li>
                </ul>
            </div>
            <div className="container text-center my-5">
                <h2 className="fw-bold mb-4">
                    Browse <span className="text-primary">Job</span> Category
                </h2>

                <div className="position-relative" style={{ width: "", overflow: "hidden" }}>
                    <div
                       
                        className="d-flex"
                        style={{
                            overflowX: "auto",
                            scrollBehavior: "smooth",
                            whiteSpace: "nowrap",
                            gap: "20px",
                        }}
                    >
                        {category.map((e, id) => (
                            <div key={id} style={{ minWidth: "400px" ,height:"160px" }}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h2 className="card-title">{e.first}</h2>
                                        <p className="card-text">{e.second}</p>
                                    </div>
                                    <div className="card" style={{display:"flex",alignItems:"center",justifyContent:"center", width:"100% "}}>
                                        <a className="btn btn-primary btn-sm">{e.third}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                   
                </div>
            </div>
            <div className="container text-center my-5">
                <div>
                    <div className="fw-bold mb-4" style={{fontSize:"30px"}} >How it <span style={{color:"blue"}}>Works</span></div>
                    <div>
                        <p style={{fontSize:"20px"}}>Effortlessly navigate through the process and land your dream job.</p>
                    </div>
                </div>
            </div>
             <section className="py-3 py-md-5 py-xl-8 bg-light" style={{marginLeft:"30px",marginRight:"30px"}}>
                        <div className="">
                            <article>
                                <div className="card" style={{}}>
                                    <div className="row g-0" style={{width:""}}>
                                        <div className="col-12 col-md-6 d-flex">
                                            <img className="img-fluid rounded-end object-fit-cover" loading="lazy" src={lookJob} alt="Entrepreneurship" />
                                        </div>
                                        <div className="col-12 col-md-6 order-1 order-md-0 d-flex align-items-center" style={{justifyContent:"center"}}>
                                            <ul style={{display:"flex",gap:"40px",justifyContent:"center",alignItems:"left",flexDirection:"column",listStyle:'none'}}>
                                                <li style={{fontSize:"18px"}}><img style={{height:"40px",marginRight:"10px"}} src={resumeBuild} alt="" />Build Your Resume</li>
                                                <li style={{fontSize:"18px"}}><img style={{height:"40px",marginRight:"10px"}} src={apply} alt="" />Apply For Job</li>
                                                <li style={{fontSize:"18px"}}> <img style={{height:"40px",marginRight:"10px"}} src={briefcase} alt="" /> Get Hired</li>
                                            </ul>
                                        </div>
                                        
                                    </div>
                                </div>
                            </article>
                        </div>
                    </section>
        </div>
    );
};

export default Trusted;
