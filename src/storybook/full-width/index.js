import React from "react";

const fullWidth = storyFn => (
  <div
    style={{
      minWidth: "90vw"
    }}
  >
    {storyFn()}
  </div>
);

export default fullWidth;
