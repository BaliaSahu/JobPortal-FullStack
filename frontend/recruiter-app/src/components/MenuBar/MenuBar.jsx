
import { Link } from 'react-router-dom';
import profile from '../../assets/profile.png'
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const MenuBar = () => {
    const{setToken,token}=useContext(StoreContext);

    return (
        <nav style={{marginLeft:"20px",marginRight:"20px"}} className="navbar navbar-expand-lg bg-white shadow-sm py-2">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold fs-4" to="/home">
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
                            <Link className="nav-link fw-semibold" to="/myjobs">My Jobs</Link>
                        </li> 

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/create">Create Job</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/search">Search Candidates</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link fw-semibold" to="/about">About</Link>
                        </li>
                        

                        
                    </ul>
                    {!token && <div className="ms-lg-3 d-flex align-items-center">
                        <Link to="/" style={{width:"full",marginTop:"4px"}} className="btn btn-primary px-3">
                            Sign In
                        </Link>
                    </div>}
                     {!token && <div className="ms-lg-3 d-flex align-items-center">
                        <Link to="/register" style={{width:"full",marginTop:"4px"}} className="btn btn-success px-3">
                            Sign Up
                        </Link>
                    </div>}
                    {token && <div className="dropdown ms-lg-3">
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
                            <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item text-danger" onClick={()=> {setToken(""); localStorage.setItem("token","");  localStorage.removeItem("token")}} >Logout</a></li>
                        </ul>
                    </div>}
                </div>
            </div>
        </nav>

    )
}
export default MenuBar;