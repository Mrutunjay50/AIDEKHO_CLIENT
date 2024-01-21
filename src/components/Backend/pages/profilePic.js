import React from 'react'


const ProfilePic = ({userData}) => {
    
  return (
    <div>
    {userData ? (
            <div className='flex items-center justify-around py-2'>
              <div className="h-[5rem] w-[5rem] rounded-full shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
                {userData?.profilePicture ? (
                  <img
                    src={`${userData?.profilePicture}`}
                    alt="Profile Picture"
                    className="w-full h-full object-cover object-top rounded-full"
                  />
                ) : (
                  <img
                    className="object-cover rounded-full"
                    src="https://cdn.pixabay.com/photo/2016/04/22/04/57/graduation-1345143__340.png"
                    alt="profile photo"
                  />
                )}
              </div>
              <div className="text-xl">{userData?.name}</div>
              
            </div>
          ) : (
            <div className="text-2xl text-black/50">Log In</div>
          )}
       
    </div>
  )
}

export default ProfilePic