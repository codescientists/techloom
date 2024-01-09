
import { getCartItems } from "@/lib/actions/user.action"
import { auth } from "@clerk/nextjs";
import CartItems from "./CartItems";


const Cart = async () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;

  const cartItems = await getCartItems(userId)

  return (
    <div>
      <CartItems cartItems={cartItems} userId={userId}/>  
    </div>
  )
}

export default Cart