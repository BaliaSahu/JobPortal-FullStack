
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.png'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const MenuBar = () => {
    const{token,logOut} =useContext(StoreContext);
    console.log(token+" menubar")
    console.log(!token)
    return (
        <nav style={{marginLeft:"20px",marginRight:"20px"}} className="navbar navbar-expand-lg bg-white shadow-sm py-2">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    JobCrack
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" style={{fontSize:"15px"}} id="navbarNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{margin:"10px"}}>

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/job">Jobs</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/jobsforyou">Jobs For You</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/applied/jobs">Applied Jobs</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/search">Search Jobs</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/about">About</Link>
                        </li>
                    </ul>
                    {!token && <div className="ms-lg-3 d-flex align-items-center">
                        <Link to="/login" style={{width:"full",marginTop:"4px"}} className="btn btn-primary px-3">
                            Sign In
                        </Link>
                    </div>}
                     {!token && <div className="ms-lg-3 d-flex align-items-center">
                        <Link to="/register" style={{width:"full",marginTop:"4px"}} className="btn btn-success px-3">
                            Sign Up
                        </Link>
                    </div> }
                    { token && <div className="dropdown ms-lg-3">
                        <button
                            className="btn border-0 bg-light rounded-circle p-1"
                            data-bs-toggle="dropdown"
                        >
                            <img
                                src={profile}
                                alt="profile"
                                className="rounded-circle"
                                width="35"
                                height="35"
                            />
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end">
                            <li><Link className='dropdown-item' to="/profile/view">Profile View</Link></li>
                            <li><Link className="dropdown-item" to="/profile">Profile Edit</Link></li>
                            
                            <li><button className="dropdown-item text-danger" onClick={()=>logOut()} >Logout</button></li>
                        </ul>
                    </div>}
                </div>
            </div>
        </nav>
    )
}
export default MenuBar;