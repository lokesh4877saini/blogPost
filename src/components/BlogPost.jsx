import React, { useState, useEffect } from 'react'
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast'
const BlogPost = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [isopen, setIsopen] = useState('none')
    const [formData, setFormData] = useState({
        title: '',
        thing: ''
    })
    const [items, setItems] = useState([]);
    const fetchUserData = async () => {
        auth.onAuthStateChanged(async (user) => {
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setUserDetails(docSnap.data())
            }
            else {
                console.log("User is not logged in")
            }
        });
    }
    useEffect(() => {
        fetchUserData()
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name && value) {
            setFormData({
                ...formData,
                [name]: value
            })
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // add form data to items array
        console.log(e)
        if (formData) {
            setItems([...items, formData])
            // clear form fields
            setFormData({
                title: '',
                thing: ''
            })
            toast.success("Blog-post Create Successfully")
            setTimeout(() => {
                setIsopen('none')
            }, 500);
        } else {
            alert("Please Enter detials")
        }
    }
    const handlModal = () => {
        if (isopen === 'none') {
            setIsopen('modal')
        } else {
            setIsopen('none')
        }
        setFormData({
            title: '',
            thing: ''
        })
    }
    return (
        <div>
            {
                userDetails ? (
                    <>
                        <div className="header">
                            <h1 className='post-heading'>Hey &nbsp;
                                {userDetails.firstName}
                                !!</h1>
                            <button onClick={handlModal}>Add New Blog</button>
                            <div
                                className={isopen === 'modal' ? 'modal' : 'none'}
                            > <form action="" onSubmit={handleSubmit}>
                                    <div className="modalheader">
                                        <h2>Add Your Blog</h2>
                                        <span onClick={handlModal} >&#x274C;</span>
                                    </div>
                                    <div className="body">
                                        <input type="text" onChange={handleChange} name="title" id="" value={formData.title} placeholder='Write a Title' />
                                        <textarea name="thing" id="" cols="20" rows="5" value={formData.thing} onChange={handleChange}
                                            placeholder='write something'></textarea>
                                    </div>
                                    <div className="footer">
                                        <button className='footerBtn1' type='submit' >Create</button>
                                    </div>
                                </form>
                                <button className='footerBtn2' onClick={handlModal} >cancel</button>
                            </div>
                        </div>

                        <div className="postcontainer">
                            <ul className="postes">
                                {
                                    items.map((item, index) => (
                                        <li key={index} >

                                            <h1 className='title'>{item.title}</h1>
                                            <p className='para'>{item.thing}</p>



                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
                ) :
                    <p
                        style={{
                            fontSize: "2rem",
                            color: "black",
                            textAlign: 'center',
                            margin: "5rem auto",
                        }}
                    >Loading..</p>
            }
        </div>
    )
}

export default BlogPost;