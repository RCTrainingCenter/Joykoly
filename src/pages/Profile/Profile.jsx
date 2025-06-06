import React, { useEffect, useState } from 'react'
import MyOrders from '../MyOrders/MyOrders'
import Cart from '../Cart/Cart'

// Simulate fetching user data from a database (replace with real API call)
const fetchUserFromDB = async () => {
  // Example: Replace with your actual fetch/axios call
  return {
    name: 'Your Name',
    email: 'editemail@email.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Your bio goes here',
    location: 'Your location',
    joined: 'Joined on January',
  }
}

// Simulate updating user data in a database (replace with real API call)
const updateUserInDB = async (updatedUser) => {
  // Replace with your actual update logic (e.g., fetch/axios POST/PUT)
  // For now, just return the updated user after a short delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(updatedUser), 500)
  })
}

const Profile = () => {
  const [user, setUser] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    avatar: '',
    bio: '',
    location: '',
    joined: '',
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    fetchUserFromDB().then((data) => {
      setUser(data)
      setForm(data)
    })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEdit = () => {
    setEditing(true)
  }

  const handleCancel = () => {
    setForm(user)
    setEditing(false)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)
    const updatedUser = await updateUserInDB(form)
    setUser(updatedUser)
    setEditing(false)
    setLoading(false)
  }

  if (!user) {
    return (
      <div
        style={{
          textAlign: 'center',
          marginTop: 80,
          color: '#1976d2',
          fontSize: 22,
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f5faff 100%)',
        padding: '40px 0',
      }}
    >
      <div
        style={{
          maxWidth: 500,
          margin: '0 auto',
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.13)',
          padding: 0,
          fontFamily: 'Segoe UI, sans-serif',
          border: '1.5px solid #e3eafc',
        }}
      >
        {/* Tab Bar */}
        <div
          style={{
            display: 'flex',
            borderBottom: '2px solid #e3eafc',
            borderRadius: '24px 24px 0 0',
            overflow: 'hidden',
            background: 'linear-gradient(90deg, #fafdff 60%, #e3f0ff 100%)',
          }}
        >
          {['profile', 'orders', 'cart'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '18px 0',
                fontSize: 17,
                fontWeight: 700,
                color: activeTab === tab ? '#1976d2' : '#5a6b8a',
                background: activeTab === tab ? '#fff' : 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '3px solid #1976d2' : '3px solid transparent',
                cursor: 'pointer',
                outline: 'none',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              {tab === 'profile' ? 'Profile' : tab === 'orders' ? 'My Orders' : 'My Cart'}
            </button>
          ))}
        </div>
        {/* Tab Content */}
        <div style={{ padding: 32 }}>
          {activeTab === 'profile' && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{
                  display: 'inline-block',
                  position: 'relative',
                  marginBottom: 18,
                }}>
                  <img
                    src={editing ? form.avatar : user.avatar}
                    alt='Avatar'
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '5px solid #1976d2',
                      boxShadow: '0 4px 16px rgba(25, 118, 210, 0.13)',
                      background: '#fff',
                      transition: 'box-shadow 0.2s',
                    }}
                  />
                  {editing && (
                    <label style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      background: '#1976d2',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.13)',
                      border: '2px solid #fff',
                      fontSize: 20,
                    }}>
                      <span role="img" aria-label="edit">✏️</span>
                      <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              setForm({ ...form, avatar: reader.result })
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  )}
                </div>
                {editing && (
                  <input
                    type='text'
                    name='avatar'
                    value={form.avatar}
                    onChange={handleChange}
                    placeholder='Avatar URL'
                    style={{
                      width: '100%',
                      marginBottom: 12,
                      padding: 8,
                      borderRadius: 8,
                      border: '1.5px solid #b6c8e6',
                      fontSize: 15,
                      background: '#fafdff',
                      boxShadow: '0 1px 4px rgba(25, 118, 210, 0.06)',
                    }}
                  />
                )}
                {editing ? (
                  <>
                    <input
                      type='text'
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      placeholder='Name'
                      style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: 10,
                        borderRadius: 8,
                        border: '1.5px solid #b6c8e6',
                        fontSize: 16,
                        background: '#fafdff',
                        boxShadow: '0 1px 4px rgba(25, 118, 210, 0.06)',
                      }}
                    />
                    <input
                      type='email'
                      name='email'
                      value={form.email}
                      onChange={handleChange}
                      placeholder='Email'
                      style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: 10,
                        borderRadius: 8,
                        border: '1.5px solid #b6c8e6',
                        fontSize: 16,
                        background: '#fafdff',
                        boxShadow: '0 1px 4px rgba(25, 118, 210, 0.06)',
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h2
                      style={{
                        margin: '12px 0 4px',
                        color: '#1976d2',
                        fontWeight: 800,
                        fontSize: 28,
                        letterSpacing: 0.5,
                      }}
                    >
                      {user.name}
                    </h2>
                    <p
                      style={{
                        color: '#5a6b8a',
                        margin: 0,
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {user.email}
                    </p>
                  </>
                )}
              </div>

              <hr
                style={{
                  margin: '32px 0',
                  border: 'none',
                  borderTop: '2px solid #e3eafc',
                }}
              />

              <div>
                {editing ? (
                  <>
                    <textarea
                      name='bio'
                      value={form.bio}
                      onChange={handleChange}
                      placeholder='Bio'
                      style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: 10,
                        minHeight: 60,
                        borderRadius: 8,
                        border: '1.5px solid #b6c8e6',
                        fontSize: 16,
                        background: '#fafdff',
                        resize: 'vertical',
                        boxShadow: '0 1px 4px rgba(25, 118, 210, 0.06)',
                      }}
                    />
                    <input
                      type='text'
                      name='location'
                      value={form.location}
                      onChange={handleChange}
                      placeholder='Location'
                      style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: 10,
                        borderRadius: 8,
                        border: '1.5px solid #b6c8e6',
                        fontSize: 16,
                        background: '#fafdff',
                        boxShadow: '0 1px 4px rgba(25, 118, 210, 0.06)',
                      }}
                    />
                    <input
                      type='text'
                      name='joined'
                      value={form.joined}
                      onChange={handleChange}
                      placeholder='Joined'
                      style={{
                        width: '100%',
                        marginBottom: 12,
                        padding: 10,
                        borderRadius: 8,
                        border: '1.5px solid #b6c8e6',
                        fontSize: 16,
                        background: '#fafdff',
                        boxShadow: '0 1px 4px rgba(25, 118, 210, 0.06)',
                      }}
                    />
                  </>
                ) : (
                  <>
                    <p style={{ margin: '0 0 10px', color: '#333', fontSize: 16 }}>
                      <strong style={{ color: '#1976d2' }}>Bio:</strong> {user.bio}
                    </p>
                    <p style={{ margin: '0 0 10px', color: '#333', fontSize: 16 }}>
                      <strong style={{ color: '#1976d2' }}>Location:</strong> {user.location}
                    </p>
                    <p style={{ margin: 0, color: '#333', fontSize: 16 }}>
                      <strong style={{ color: '#1976d2' }}>Joined:</strong> {user.joined}
                    </p>
                  </>
                )}
              </div>

              <div style={{ textAlign: 'center', margin: '36px 0 0' }}>
                {editing ? (
                  <>
                    <button
                      onClick={handleSave}
                      style={{
                        background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 10,
                        padding: '13px 36px',
                        cursor: 'pointer',
                        fontWeight: 800,
                        marginRight: 12,
                        fontSize: 17,
                        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                        transition: 'background 0.2s, box-shadow 0.2s',
                      }}
                      disabled={loading}
                      onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1565c0 60%, #1976d2 100%)'}
                      onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)'}
                    >
                      {loading ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancel}
                      style={{
                        background: '#f5faff',
                        color: '#1976d2',
                        border: '1.5px solid #b6c8e6',
                        borderRadius: 10,
                        padding: '13px 36px',
                        cursor: 'pointer',
                        fontWeight: 800,
                        fontSize: 17,
                        marginLeft: 0,
                        transition: 'background 0.2s, box-shadow 0.2s',
                      }}
                      disabled={loading}
                      onMouseOver={e => e.currentTarget.style.background = '#e3f0ff'}
                      onMouseOut={e => e.currentTarget.style.background = '#f5faff'}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    style={{
                      background: 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 10,
                      padding: '13px 36px',
                      cursor: 'pointer',
                      fontWeight: 800,
                      fontSize: 17,
                      boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
                      transition: 'background 0.2s, box-shadow 0.2s',
                    }}
                    onMouseOver={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1565c0 60%, #1976d2 100%)'}
                    onMouseOut={e => e.currentTarget.style.background = 'linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)'}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </>
          )}
          {activeTab === 'orders' && (
            <div>
              <MyOrders />
            </div>
          )}
          {activeTab === 'cart' && (
            <div>
              <Cart />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
