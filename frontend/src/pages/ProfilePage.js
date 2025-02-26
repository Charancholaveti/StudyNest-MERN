import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import lec from './lec2.jpg';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [classroomName, setClassroomName] = useState('');
    const [description, setDescription] = useState('');
    const [classroomsCreatedByMe, setClassroomsCreatedByMe] = useState([]);
    const [classroomsJoinedByMe, setClassroomsJoinedByMe] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/getuser`, {
                    method: 'GET',
                    credentials: 'include',
                });
                const data = await response.json();
                console.log(data)
                if (response.ok) {
                    setUser(data.data);
                } else {
                    toast.error(data.message || 'Failed to fetch user data');
                }

            }
            catch (error) {
                toast.error('An error occurred while fetching user data');
            } finally {
                setLoading(false);
            }
        }
        fetchUser();

    }, [])


    const fetchClassrooms = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/class/classroomscreatedbyme`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setClassroomsCreatedByMe(data.data);
            } else {
                toast.error(data.message || 'Failed to fetch classrooms');
            }
        } catch (error) {
            toast.error('An error occurred while fetching classrooms');
        }
    }
    const fetchClassroomsJoinedByMe = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/class/classroomsforstudent`, {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            console.log(data)
            if (response.ok) {
                setClassroomsJoinedByMe(data.data);
            }
        }
        catch (error) {
            toast.error('An error occurred while fetching joined classrooms');
        }
    }


    useEffect(() => {
        if (user) {
            fetchClassrooms();
            fetchClassroomsJoinedByMe()
        }
    }, [user]);


    const handleCreateClassroom = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/class/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: classroomName,
                    description,
                }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Classroom created successfully');
                setClassroomName('');
                setDescription('');
                setShowPopup(false);
                fetchClassrooms();
            } else {
                toast.error(data.message || 'Failed to create classroom');
            }
        }
        catch (error) {
            toast.error('An error occurred while creating classroom');
        }
    }

    const navigate = useNavigate();

    const handleRowClick = (classroomId) => {
        navigate(`/classes/${classroomId}`);  // Navigate to the class details page
    };
    return (
        <center><div className="profile-page">
            {loading ? (
                <div className="loading">Loading...</div>
            )
                : user ? (
                    <>
                        <h1 className='head1'>Profile</h1>
                        <br></br>
                        <div className="profile-info">
                            <img
                                src={lec} 
                                alt="Profile"
                                className="profile-picture"
                            />
                            <div className="profile-details">
                                <h2>{user.name}</h2><br></br>
                                <p><b>Email:</b> {user.email}</p>
                                <p><b>Role: </b>{user.role}</p>
                                <br></br>
                                {user.role === 'teacher' && (
                                    <button className="create-classroom-btn" onClick={() => setShowPopup(true)}>
                                        Create Classroom
                                    </button>
                                )}
                            </div>
                        </div>

                        {showPopup && (
                            <div className="popup-overlay">
                                <div className="popup-content">
                                    <h3>Create Classroom</h3>
                                    <input
                                        type="text"
                                        placeholder="Classroom Name"
                                        value={classroomName}
                                        onChange={(e) => setClassroomName(e.target.value)}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

                                    <div className="popup-buttons">
                                        <button onClick={handleCreateClassroom}>Submit</button>
                                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                                    </div>
                                </div>
                            </div>
                        )}


                        {
                            user.role === 'teacher' &&
                            <div className="classroom-list">
                                <h2>Classrooms created by Me</h2>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classroomsCreatedByMe.map(classroom => (
                                            <tr key={classroom._id} onClick={() => handleRowClick(classroom._id)}>
                                                <td>{classroom.name}</td>
                                                <td>{classroom.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>


                        }

                        <div className="classroom-list">
                            <h2>Classrooms joined by Me</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classroomsJoinedByMe.map(classroom => (
                                        <tr key={classroom._id} onClick={() => handleRowClick(classroom._id)} className="clickable-row">
                                            <td>{classroom.name}</td>
                                            <td>{classroom.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )
                    : (
                        <p>No user data found.</p>
                    )
            }
        </div></center>
    )
}

export default ProfilePage