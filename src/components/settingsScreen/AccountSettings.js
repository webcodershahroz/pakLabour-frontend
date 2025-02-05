import React from 'react'

function ProfileSettings() {
  return (
    <>
       <div class="p-2 md:p-4">
            <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
              <h2 class="pl-6 text-2xl font-bold sm:text-xl">Account</h2>

              <div class="grid max-w-2xl mx-auto mt-8">
                <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                  <img
                    class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-brandcolor"
                    src={require("../../img/profile-photo.jpg")}
                    alt="Bordered avatar"
                  />

                  <div class="flex flex-col space-y-5 sm:ml-8">
                    <div>
                      <p className="font-bold text-2xl">
                        Muhammad Shahroz Shahzad
                      </p>
                      <p>shahrozshahzad17@gmail.com</p>
                    </div>
                    <button
                      type="button"
                      class="text-white bg-black  font-medium rounded-lg px-5 py-2.5 me-2"
                    >
                      Change picture
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default ProfileSettings;