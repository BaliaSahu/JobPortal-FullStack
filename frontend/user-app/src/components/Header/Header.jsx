
import findJob from '../../assets/findJob.jpeg'


const Header = () => {
    return (
        <section className="py-3 py-md-5 py-xl-8 bg-light" style={{marginLeft:"30px",marginRight:"30px"}}>
            <div className="">
                <article>
                    <div className="card" style={{}}>
                        <div className="row g-0" style={{width:""}}>
                            <div className="col-12 col-md-6 order-1 order-md-0 d-flex align-items-center">
                                <div className="card-body p-md-4 p-xl-6 p-xxl-9">
                                    <div className="entry-header mb-3">
                                        <ul className="entry-meta list-unstyled d-flex mb-4">
                                            <li>
                                                <a className="d-inline-flex px-2 py-1 link-primary text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-2 text-decoration-none" href="#!">Entrepreneurship</a>
                                            </li>
                                        </ul>
                                        <h2 className="card-title entry-title display-3 fw-bold mb-4 lh-1" style={{display:"flex",flexDirection:"column" }}>

                                            <span>Find your</span>
                                            <span style={{color:"blue"}}> Dream Job </span>
                                            <span>with us</span>
                                        </h2>
                                    </div>
                                    <div className="card-text entry-summary text-secondary mb-4">
                                        Good life begins with a good company. Start explore thousands of jobs in one place.
                                    </div>
                                    <div className="entry-footer">
                                        <ul className="entry-meta list-unstyled d-flex align-items-center m-0">
                                            <li>
                                                <a className="fs-7 link-secondary text-decoration-none d-flex align-items-center" href="#!">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-calendar3" viewBox="0 0 16 16">
                                                        <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                                        <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                    </svg>
                                                    <span className="ms-2 fs-7">13 Apr 2030</span>
                                                </a>
                                            </li>
                                            <li>
                                                <span className="px-3">•</span>
                                            </li>
                                            <li>
                                                <a className="link-secondary text-decoration-none d-flex align-items-center" href="#!">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                                                        <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                                                        <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                                                    </svg>
                                                    <span className="ms-2 fs-7">158</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 d-flex">
                                <img className="img-fluid rounded-end object-fit-cover" loading="lazy" src={findJob} alt="Entrepreneurship" />
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}
export default Header;