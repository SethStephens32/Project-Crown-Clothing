import './cartDropdown.styles.css';
import Button from '../button/button.component';
import CartItem from '../cart-item/cartItem.component';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from 'react-router';

const CartDropDown = () =>{
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckpoutHandler = () =>{
        navigate('./checkout');
    }
    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
               {cartItems.map((item)=>(
                   <CartItem key={item.id} cartItem={item}/>
               ))}
            </div>
            <Button onClick={goToCheckpoutHandler}>Go to checkout</Button>
        </div>
    )
}
export default CartDropDown;