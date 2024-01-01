
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


const Orders = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Orders</h2>
      </div>



      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order:any) => (
            <TableRow key={order._id}>
              <TableCell className="font-medium">{order._id}</TableCell>
              <TableCell className="font-medium">{order.name}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                  <button className="text-xs flex items-center border px-2 py-1 rounded-sm">
                    <EyeIcon className="h-2 w-2 mr-1"/> View Details
                  </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Orders