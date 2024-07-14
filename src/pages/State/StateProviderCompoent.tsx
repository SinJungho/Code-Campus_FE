import React from "react";
import { StateProvider } from "../Sign/SignUp/PrivacyInput";
import PrivacyInput from "../Sign/SignUp/PrivacyInput";
import SuccessSign from "../Sign/SignUp/SuccessSign";
import MyProfile from "../MyProfile/MyProfile";
import ChooseMemberType from "../Sign/SignUp/ChooseMemberType";

function StateProviderCompoent() {
  return (
    <StateProvider>
      <div>
        <PrivacyInput />
        <SuccessSign />
      </div>
    </StateProvider>
  );
}

export default StateProviderCompoent;
