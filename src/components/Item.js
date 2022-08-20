import { RiDeleteBack2Line } from "react-icons/ri";
import { StyledItem, StyledColumn, StyledButtonSmall } from "../styles/Styles";
import styles from "../App.module.css";

function Item({ item, onRemoveItem }){
    return (
      <StyledItem>
        <StyledColumn width="40%">
          <a href={ item.url }>{ item.title }</a>
        </StyledColumn>
        <StyledColumn width="30%">{ item.author }</StyledColumn>
        <StyledColumn width="10%">{ item.num_comments }</StyledColumn>
        <StyledColumn width="10%">{ item.points }</StyledColumn>
        <StyledColumn width="10%">
          <StyledButtonSmall
            type="button"
            onClick={ () => onRemoveItem(item) }
          >
            <RiDeleteBack2Line
              className={ styles.dismissIcon }
            />
          </StyledButtonSmall>
        </StyledColumn>
      </StyledItem>
    );
}
  
export default Item;