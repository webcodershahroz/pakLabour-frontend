import React from "react";
import AccountSettings from "./AccountSettings";
import NotificationSettings from "./NotificationSettings";
import { Link, useSearchParams } from "react-router-dom";

function Settings() {
  const [params] = useSearchParams();
  const settingsScreenType = params.get("type");
  return (
    <>
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
            <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

            <Link
              to="/settings?type=account"
              className={`px-3 py-2.5  hover:font-bold ${settingsScreenType==='account'?'font-bold':'font-normal'}`}
            >
              Account
            </Link>
            <Link
              to="/settings?type=notification"
              className={`px-3 py-2.5  hover:font-bold ${settingsScreenType==='notification'?'font-bold':'font-normal'}`}

            >
              Notifications
            </Link>
          </div>
        </aside>
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          {settingsScreenType === "account" ? (
            <AccountSettings />
          ) : (
            <NotificationSettings />
          )}
        </main>
      </div>
    </>
  );
}

export default Settings;
