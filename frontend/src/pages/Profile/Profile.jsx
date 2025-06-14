import React, { useEffect, useState } from 'react'
import MyOrders from '../MyOrders/MyOrders'
import Cart from '../Cart/Cart'

// Default user data
const defaultUserData = {
    name: 'Your Name',
    email: 'editemail@email.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Your bio goes here',
    location: 'Your location',
    joined: 'Joined on January',
  socialLinks: {
    linkedin: '',
    twitter: '',
    github: '',
    website: ''
  },
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  title: 'Professional Title',
  company: 'Company Name'
}

// Fetch user data from localStorage or use default
const fetchUserFromDB = async () => {
  const savedUser = localStorage.getItem('userProfile')
  return savedUser ? JSON.parse(savedUser) : defaultUserData
}

// Update user data in localStorage
const updateUserInDB = async (updatedUser) => {
  localStorage.setItem('userProfile', JSON.stringify(updatedUser))
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
    socialLinks: {
      linkedin: '',
      twitter: '',
      github: '',
      website: ''
    },
    skills: [],
    title: '',
    company: ''
  })
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [newSkill, setNewSkill] = useState('')

  useEffect(() => {
    const loadUserData = async () => {
      const userData = await fetchUserFromDB()
      setUser(userData)
      setForm(userData)
    }
    loadUserData()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('social.')) {
      const platform = name.split('.')[1]
      setForm(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: value
        }
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
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
    try {
    const updatedUser = await updateUserInDB(form)
    setUser(updatedUser)
    setEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
      // You could add error handling UI here
    } finally {
    setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div style={{
        minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: 800,
          margin: '0 auto',
          background: '#fff',
        borderRadius: 16,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Tab Bar */}
        <div style={{
            display: 'flex',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0'
        }}>
          {['profile', 'orders', 'cart'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '16px',
                fontSize: 16,
                fontWeight: 600,
                color: activeTab === tab ? '#3b82f6' : '#64748b',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #3b82f6' : 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
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
              <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <div style={{
                  position: 'relative',
                  display: 'inline-block',
                  marginBottom: 24
                }}>
                  <img
                    src={editing ? form.avatar : user.avatar}
                    alt='Avatar'
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '4px solid #fff',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  {editing && (
                    <label style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      background: '#3b82f6',
                      color: '#fff',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
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
                              setForm(prev => ({ ...prev, avatar: reader.result }))
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        style={{ display: 'none' }}
                      />
                    </label>
                  )}
                </div>

                {editing ? (
                  <div>
                    <input
                      type='text'
                      name='name'
                      value={form.name}
                      onChange={handleChange}
                      placeholder='Full Name'
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: 16,
                        marginBottom: 12,
                        backgroundColor: '#f8fafc'
                      }}
                    />
                    <input
                      type='email'
                      name='email'
                      value={form.email}
                      onChange={handleChange}
                      placeholder='Email Address'
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: 16,
                        marginBottom: 12,
                        backgroundColor: '#f8fafc'
                      }}
                    />
                    <input
                      type='text'
                      name='title'
                      value={form.title}
                      onChange={handleChange}
                      placeholder='Professional Title'
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: 16,
                        marginBottom: 12,
                        backgroundColor: '#f8fafc'
                      }}
                    />
                  </div>
                ) : (
                  <div>
                    <h2 style={{
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#1e293b',
                      margin: '0 0 8px',
                      letterSpacing: '-0.5px'
                    }}>
                      {user.name}
                    </h2>
                    <p style={{
                      fontSize: 18,
                      color: '#3b82f6',
                      margin: '0 0 8px',
                      fontWeight: 500
                    }}>
                      {user.email}
                    </p>
                    <p style={{
                      fontSize: 16,
                      color: '#64748b',
                      margin: '0 0 8px',
                      fontWeight: 500
                    }}>
                      {user.title}
                    </p>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#1e293b',
                  margin: '0 0 16px'
                }}>
                  About
                </h3>
                {editing ? (
                    <textarea
                      name='bio'
                      value={form.bio}
                    onChange={handleChange}
                    placeholder='Tell us about yourself'
                    style={{
                      width: '100%',
                      padding: 12,
                      border: '1px solid #e2e8f0',
                      borderRadius: 8,
                      fontSize: 16,
                      minHeight: 120,
                      resize: 'vertical'
                    }}
                  />
                ) : (
                  <p style={{
                    fontSize: 16,
                    color: '#1e293b',
                    lineHeight: 1.6
                  }}>
                    {user.bio}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#1e293b',
                  margin: '0 0 16px'
                }}>
                  Skills
                </h3>
                {editing ? (
                  <div>
                    <div style={{
                      display: 'flex',
                      gap: 8,
                      marginBottom: 12
                    }}>
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill"
                        style={{
                          flex: 1,
                          padding: 12,
                          border: '1px solid #e2e8f0',
                          borderRadius: 8,
                          fontSize: 16
                        }}
                      />
                      <button
                        onClick={handleAddSkill}
                        style={{
                          padding: '12px 24px',
                          background: '#3b82f6',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer',
                          fontWeight: 600
                        }}
                      >
                        Add
                      </button>
                    </div>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8
                    }}>
                      {form.skills.map((skill, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#e2e8f0',
                            color: '#1e293b',
                            padding: '6px 12px',
                            borderRadius: 16,
                            fontSize: 14,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6
                          }}
                        >
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#64748b',
                              cursor: 'pointer',
                              fontSize: 18,
                              padding: 0,
                              lineHeight: 1
                            }}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8
                  }}>
                    {user.skills.map((skill, index) => (
                      <span
                        key={index}
                        style={{
                          background: '#e2e8f0',
                          color: '#1e293b',
                          padding: '6px 12px',
                          borderRadius: 16,
                          fontSize: 14
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 32 }}>
                <h3 style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: '#1e293b',
                  margin: '0 0 16px'
                }}>
                  Social Links
                </h3>
                {editing ? (
                  <div>
                    <input
                      type='text'
                      name='social.linkedin'
                      value={form.socialLinks.linkedin}
                      onChange={handleChange}
                      placeholder='LinkedIn URL'
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: 16,
                        marginBottom: 12
                      }}
                    />
                    <input
                      type='text'
                      name='social.twitter'
                      value={form.socialLinks.twitter}
                      onChange={handleChange}
                      placeholder='Twitter URL'
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: 16,
                        marginBottom: 12
                      }}
                    />
                    <input
                      type='text'
                      name='social.github'
                      value={form.socialLinks.github}
                      onChange={handleChange}
                      placeholder='GitHub URL'
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: 16,
                        marginBottom: 12
                      }}
                    />
                    <input
                      type='text'
                      name='social.website'
                      value={form.socialLinks.website}
                      onChange={handleChange}
                      placeholder='Personal Website'
                      style={{
                        width: '100%',
                        padding: 12,
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: 16
                      }}
                    />
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 12
                  }}>
                    {user.socialLinks.linkedin && (
                      <a
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontWeight: 500
                        }}
                      >
                        LinkedIn
                      </a>
                    )}
                    {user.socialLinks.twitter && (
                      <a
                        href={user.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontWeight: 500
                        }}
                      >
                        Twitter
                      </a>
                    )}
                    {user.socialLinks.github && (
                      <a
                        href={user.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontWeight: 500
                        }}
                      >
                        GitHub
                      </a>
                    )}
                    {user.socialLinks.website && (
                      <a
                        href={user.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          fontWeight: 500
                        }}
                      >
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 16,
                marginTop: 32
              }}>
                {editing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      style={{
                        padding: '12px 32px',
                        background: '#3b82f6',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      style={{
                        padding: '12px 32px',
                        background: '#f1f5f9',
                        color: '#64748b',
                        border: '1px solid #e2e8f0',
                        borderRadius: 8,
                        fontSize: 16,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEdit}
                    style={{
                      padding: '12px 32px',
                      background: '#3b82f6',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: 16,
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
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
