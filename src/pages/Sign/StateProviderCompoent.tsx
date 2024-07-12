import React from "react";
import { StateProvider } from "./PrivacyInput";
import PrivacyInput from "./PrivacyInput";
import SuccessSign from "./SuccessSign";

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
