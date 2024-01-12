import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
const MyOrders = ({orders}:any) => { 

  return (
    <>
        {orders?.map((order: any)=>(
            <div key={order._id} className="my-4">
                <h5 className="text-lg font-bold">Order Id - #{order?._id?.toString()?.slice(0,6)} </h5>
                <div className="border rounded-md">
                    <Table className="border">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead className="text-right">Total Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {order?.products?.map((product: any)=>(
                                <TableRow key={product._id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <img src={product?.product?.images[0]} alt="" className="h-10 w-10 rounded border object-cover" />
                                            {product.product.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell>
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.product.price)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(product.product.price * product.quantity)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableCaption>
                            <div className="flex justify-between text-black mx-4 my-4">
                                <div className="flex flex-col items-start">
                                    <h5 className="text-lg font-bold mb-2">Delivery Address</h5>
                                    <div className="flex flex-col items-start">
                                        <p><span>Street - </span><span className="font-bold">{order.shippingAddress.street}</span></p>
                                        <p><span>City - </span><span className="font-bold">{order.shippingAddress.city}</span></p>
                                        <p><span>State - </span><span className="font-bold">{order.shippingAddress.state}</span></p>
                                        <p><span>Pincode - </span><span className="font-bold">{order.shippingAddress.pincode}</span></p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-lg">
                                    <span>Total - </span><span className="font-bold">
                                        {
                                        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                                            order.products.reduce(
                                            (sum:number, products:any) => sum + (products.product.price * products.quantity), 0
                                            )
                                        )
                                        }
                                    </span>
                                    </p>
                                    <Badge variant="outline" className="bg-green-500 text-white mx-1">
                                        {order?.isPaid ? "Paid" : "Unpaid" }
                                    </Badge>
                                    <Badge variant="outline" className="">{order.status}</Badge>
                                </div>  
                            </div>
                        </TableCaption>
                    </Table>
                </div>
            </div>
        ))}
    </>
  )
}

export default MyOrders