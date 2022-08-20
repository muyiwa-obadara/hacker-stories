import Item from "./Item";

function List({ list, onRemoveItem }){
    return (
      list.map(item => <Item key={ item.objectID } item={ item } onRemoveItem={ onRemoveItem }/>)
    )
  }

  export default List;