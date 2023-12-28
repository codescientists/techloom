import currency from 'currency.js'
import React from 'react'

const Dashboard = () => {

  return (
    <div>
      {/* REVENUE  */}
      <h5 className="text-xl font-semibold">Revenue</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 mr-4 flex flex-col items-center justify-center">
            <h5 className="text-gray-900 font-semibold uppercase">Today</h5>
            <h3 className="text-4xl text-blue-800 font-semibold">₹ 4,000</h3>
            <p className="text-gray-600">estimated earning</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 mr-4 flex flex-col items-center justify-center">
            <h5 className="text-gray-900 font-semibold uppercase">THIS WEEK</h5>
            <h3 className="text-4xl text-blue-800 font-semibold">₹ 20,000</h3>
            <p className="text-gray-600">estimated earning</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 mr-4 flex flex-col items-center justify-center">
            <h5 className="text-gray-900 font-semibold uppercase">This month</h5>
            <h3 className="text-4xl text-blue-800 font-semibold">₹ 2,50,000</h3>
            <p className="text-gray-600">estimated earning</p>
        </div>
      </div>


      {/* ORDERS */}
      <h5 className="text-xl font-semibold">Orders</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 mr-4 flex flex-col items-center justify-center">
            <h5 className="text-gray-900 font-semibold uppercase">Today</h5>
            <h3 className="text-4xl text-blue-800 font-semibold">2</h3>
            <p className="text-gray-600">2 orders today</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 mr-4 flex flex-col items-center justify-center">
            <h5 className="text-gray-900 font-semibold uppercase">This week</h5>
            <h3 className="text-4xl text-blue-800 font-semibold">25</h3>
            <p className="text-gray-600">25 orders today</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 mr-4 flex flex-col items-center justify-center">
            <h5 className="text-gray-900 font-semibold uppercase">This month</h5>
            <h3 className="text-4xl text-blue-800 font-semibold">50</h3>
            <p className="text-gray-600">50 orders today</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard