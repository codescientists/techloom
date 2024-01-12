import MyOrders from '@/components/root/shared/MyOrders';
import ProfileForm from '@/components/root/shared/ProfileForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUserOrders } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';


const Profile = async () => {

  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const user = await getUserOrders(userId);

  return (
    <Tabs defaultValue="profile" className="w-[900px] container my-5 flex flex-col">
      <TabsList className='w-fit mx-auto'>
        <TabsTrigger value="profile">My Profile</TabsTrigger>
        <TabsTrigger value="orders">My Orders</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <ProfileForm user={user} />
      </TabsContent>
      <TabsContent value="orders">
        <MyOrders orders={user?.orders} />
      </TabsContent>
    </Tabs>
  )
}

export default Profile