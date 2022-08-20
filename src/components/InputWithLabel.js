import { useRef, useEffect } from "react";
import { StyledLabel, StyledInput } from "../styles/Styles";

function InputWithLabel({ id, value, type="text", onInputChange, children, isFocused }){
    const inputRef = useRef();
    useEffect(function(){
      if(isFocused && inputRef.current){  
        inputRef.current.focus();
      }
    }, [isFocused]);
    return (
      <>
        <StyledLabel
          htmlFor={ id }
        >
            <strong>{ children }</strong>
        </StyledLabel>
        &nbsp;
        <StyledInput
          ref={ inputRef }
          id={id}
          type={ type }
          value={ value }
          onChange={ onInputChange }
          autoFocus={ isFocused }
        />
      </>
    );
  }

  export default InputWithLabel;