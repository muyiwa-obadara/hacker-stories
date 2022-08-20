import InputWithLabel from "./InputWithLabel";
import { StyledSearchForm, StyledButtonLarge } from "../styles/Styles";

function SearchForm({ searchTerm, onSearchInput, onSearchSubmit }) {
    return (
      <StyledSearchForm onSubmit={ onSearchSubmit }>
          <InputWithLabel
            id="search"
            value={ searchTerm }
            onInputChange={ onSearchInput }
            isFocused>
            Search:
          </InputWithLabel>
          <StyledButtonLarge
            type="submit"
            disabled={ !searchTerm }>
              Submit
          </StyledButtonLarge>
        </StyledSearchForm>
    );
  }

  export default SearchForm;