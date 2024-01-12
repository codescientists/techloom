
import OrderTable from "@/components/admin/shared/OrderTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getAllOrders } from "@/lib/actions/order.action";
import { EyeIcon } from "lucide-react";

const orders = [
  {
    _id: '3',
    name: 'Michael Brown',
    email: 'michaelbrown@example.com',
    status: 'Delivered',
    date: '2023-12-25',
    items: [
      {
        name: 'T-Shirt',
        quantity: 2,
      },
      {
        name: 'Laptop Case',
        quantity: 1,
      },
    ],
  },
  {
    _id: '4',
    name: 'Sarah Jones',
    email: 'sarahjones@example.com',
    status: 'Cancelled',
    date: '2023-12-27',
    reason: 'Change of mind',
  },
  {
    _id: '5',
    name: 'David Lee',
    email: 'davidlee@example.com',
    status: 'Processing',
    date: '2023-12-29',
    paymentMethod: 'Credit Card',
  },
  {
    _id: '6',
    name: 'Emma Miller',
    email: 'emmamiller@example.com',
    status: 'On Hold',
    date: '2023-12-28',
    message: 'Waiting for stock of Item X',
  },
  {
    _id: '7',
    name: 'Alexander White',
    email: 'alexanderwhite@example.com',
    status: 'Review pending',
    date: '2023-12-30',
    rating: 4,
    review: 'Overall good experience, but shipping was a bit slow.',
  },
];


const Orders = async () => {

  const orders = await getAllOrders();

  const data = orders.map((order: any) => {
    const { user, status, createdAt, _id } = order;
  
    const newObj = {
      name: user.name,
      email: user.email,
      status: status,
      date: createdAt,
      _id: _id
    };
  
    return newObj;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Orders</h2>
      </div>

      <OrderTable data={data}/>
    </div>
  )
}

export default Orders