import React from "react";
import { StateProvider } from "./Sign/PrivacyInput";
import PrivacyInput from "./Sign/PrivacyInput";
import SuccessSign from "./Sign/SuccessSign";
import MyProfile from "./MyProfile/myProfile";

function StateProviderCompoent() {
  return (
    <StateProvider>
      <div>
        <PrivacyInput />
        <SuccessSign />
        <MyProfile />
      </div>
    </StateProvider>
  );
}

export default StateProviderCompoent;
