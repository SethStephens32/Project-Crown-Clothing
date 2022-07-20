import './checkout.styles.css'
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-Item.component';

const Checkout = () =>{
    const {cartItems, addItemToCart, removeItemToCart, cartTotal} = useContext(CartContext);
    return(
        <div className='checkout-container'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
            {cartItems.map((cartItem)=>{
                return(
                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                );
            })}
            <span className='total'>Total: ${cartTotal}</span>
        </div>
    )
}
export default Checkout;