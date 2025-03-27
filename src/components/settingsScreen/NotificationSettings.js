import React from "react";

function NotificationSettings() {
  return (
    <>
      <div className="p-2 md:p-4">
        <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 className="text-2xl font-bold sm:text-xl">Notification</h2>
          <p className="text-sm">For imprtant information PakLabour send you notifications</p>

          <div className="grid max-w-2xl mx-auto mt-8">
            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                <div className="flex items-center">
                    <input id="email-notifications" type="checkbox" checked />
                    <label className="pl-2 text-sm" htmlFor="email-notifications">Send emails</label>
                </div>
            </div>
            <p className="text-sm my-3">When you receive a message we will send you the email to your linked email address</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationSettings;
