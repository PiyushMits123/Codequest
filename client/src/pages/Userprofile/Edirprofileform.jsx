import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Avatar from '../../Comnponent/Avatar/Avatar.jsx'
import { updateprofile,fetchallusers } from '../../action/users'
import './Userprofile.css'

const Edirprofileform = ({ currentuser, setswitch }) => {
  const [name, setname] = useState(currentuser?.result?.name)
  const [about, setabout] = useState(currentuser?.result?.about)
  const [tags, settags] = useState([])
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const dispatch = useDispatch()

  const handleImageChange = async(e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault()

    if (!tags.length || tags[0] === '') {
      alert("Update tags field")
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('about', about)
    formData.append('tags', JSON.stringify(tags))
    if (imageFile) formData.append('profileImage', imageFile)

     dispatch(updateprofile(currentuser?.result?._id, formData))
    setswitch(false)
    dispatch(fetchallusers()) 
  }

  return (
    <div className='topkaro'>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className='edit-profile-title-2'>Public Information</h2>
      <form className="edit-profile-form" onSubmit={handlesubmit}>
        <div className="avatar-upload flex " style={{width:"fit-content"}}>
          <Avatar backgroundColor="purple" color="white"  style={{maxWidth:"fit-content"}}  fontSize="20px" px="10px" py="10px">
            {imagePreview ? (
              <img src={imagePreview} alt="Profile Preview" style={{ maxWidth: '100%', height: '100%' }} />
            ) : (
              currentuser?.result?.name.charAt(0)
            )}
          </Avatar>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <label htmlFor="name">
          <h3>Display name</h3>
          <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
        </label>

        <label htmlFor="about">
          <h3>About me</h3>
          <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setabout(e.target.value)}></textarea>
        </label>

        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input type="text" id="tags" onChange={(e) => settags(e.target.value.trim().split(" "))} />
        </label>

        <br />
        <input type="submit" value="Save Profile" className='user-submit-btn' />
        <button type='button' className='user-cancel-btn' onClick={() => setswitch(false)}>Cancel</button>
      </form>
    </div>
  )
}

export default Edirprofileform
