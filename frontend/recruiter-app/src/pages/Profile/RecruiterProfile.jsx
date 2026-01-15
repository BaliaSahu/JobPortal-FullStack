import React, { useContext, useEffect, useState } from "react";
import { Card, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import {
    fetchRecruiterProfile,
    updateRecruiterProfile,
    uploadProfileImg,
} from "../../service/RecruiterService";
import profileImg from "../../assets/profile.png";

const RecruiterProfile = () => {
    const { token } = useContext(StoreContext);

    const [profile, setProfile] = useState(null);
    const [originalProfile, setOriginalProfile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [img, setImg] = useState(null);

    useEffect(() => {
        if (!token) {
            navigate("/");
        }
        loadProfile();
        // eslint-disable-next-line
    }, []);

    /* ================= LOAD PROFILE ================= */
    const loadProfile = async () => {
        if (!token) return;
        try {
            setLoading(true);
            const res = await fetchRecruiterProfile(token);
            if (res.status === 200) {
                setProfile(res.data);
                setOriginalProfile(res.data);
            }
        } catch (err) {
            if (err?.response?.status === 401) {
                toast.error("Session expires Please Login again");
                navigate("/")
                return;
            }
            console.log(err);
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    /* ================= HANDLE INPUT ================= */
    const handleChange = (e) => {
        const value =
            e.target.name === "experienceYears" ? +e.target.value : e.target.value;
        setProfile({ ...profile, [e.target.name]: value });
    };

    /* ================= SAVE PROFILE ================= */
    const saveProfile = async () => {
        if (!token) return;

        // Validate required fields
        if (!profile.fullName || profile.fullName.trim() === "") {
            toast.error("Full Name cannot be empty");
            return;
        }

        if (!profile.mobile || profile.mobile.trim() === "") {
            toast.error("Mobile cannot be empty");
            return;
        }

        try {
            setSaving(true);
            await updateRecruiterProfile(profile, token);
            toast.success("Profile updated successfully");
            setEditMode(false);
            setOriginalProfile(profile); // Update original after save
        } catch (err) {
            console.log(err);
            toast.error("Profile update failed");
        } finally {
            setSaving(false);
        }
    };

    /* ================= UPLOAD IMAGE ================= */
    const uploadImage = async () => {
        if (!img) {
            toast.error("Please select an image");
            return;
        }
        try {
            const res = await uploadProfileImg(img, token);
            if (res.status === 200) {
                toast.success("Profile image updated");
                setImg(null);
                loadProfile();
            }
        } catch (err) {
            console.log(err);
            toast.error("Image upload failed");
        }
    };

    /* ================= CLEANUP IMAGE URL ================= */
    useEffect(() => {
        return () => {
            if (img) URL.revokeObjectURL(img);
        };
    }, [img]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    if (!profile) return null;

    return (
        <div className="container mt-4">
            <Card className="shadow-sm">
                <Card.Body>
                    <Row>
                        {/* LEFT COLUMN */}
                        <Col md={4} className="text-center border-end">
                            <img
                                src={
                                    img
                                        ? URL.createObjectURL(img)
                                        : profile.imgUrl || profileImg
                                }
                                alt="profile"
                                className="rounded-circle mb-3"
                                width="150"
                                height="150"
                            />

                            <h5>{profile.fullName}</h5>
                            <p className="text-muted">{profile.email}</p>

                            {!editMode && (
                                <Button
                                    variant="outline-primary"
                                    onClick={() => setEditMode(true)}
                                >
                                    Edit Profile
                                </Button>
                            )}

                            {editMode && (
                                <Form className="mt-3">
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setImg(e.target.files[0])}
                                    />
                                    <Button
                                        type="button"
                                        className="mt-2"
                                        variant="outline-primary"
                                        onClick={uploadImage}
                                        disabled={!img}
                                    >
                                        Upload Image
                                    </Button>
                                </Form>
                            )}
                        </Col>

                        {/* RIGHT COLUMN */}
                        <Col md={8}>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        name="fullName"
                                        value={profile.fullName || ""}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control
                                        name="mobile"
                                        value={profile.mobile || ""}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control
                                        name="company"
                                        value={profile.company || ""}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Experience (Years)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="experienceYears"
                                        value={profile.experienceYears || 0}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="address"
                                        value={profile.address || ""}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </Form.Group>

                                {editMode && (
                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="secondary"
                                            onClick={() => {
                                                setProfile(originalProfile);
                                                setEditMode(false);
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="primary"
                                            onClick={saveProfile}
                                            disabled={saving}
                                        >
                                            {saving ? "Saving..." : "Save"}
                                        </Button>
                                    </div>
                                )}
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RecruiterProfile;
