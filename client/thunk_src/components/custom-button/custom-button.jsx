import React from "react";
import { CustomButtonContainer} from "./custom-button.styled";

const CustomButton = ({children, ...props}) => (
  <CustomButtonContainer {...props}>
    {children}
  </CustomButtonContainer>
)

export default CustomButton;
