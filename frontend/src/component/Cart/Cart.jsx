import CartItems from './CartItems'
import {Helmet} from "react-helmet"

const Cart = () => {
  return (
    <section className='mt-10'>

      <Helmet>
        <title>SJ Furnitures | Check Cart</title>
        <meta name="description" content="Learn more about us and what makes our app special." />
      </Helmet>

      <CartItems />
    </section>
  )
}

export default Cart
