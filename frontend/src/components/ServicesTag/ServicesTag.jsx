import React from 'react'
import { TbTruckDelivery } from 'react-icons/tb'
import { HiOutlineCurrencyDollar } from 'react-icons/hi2'
import { BiSupport } from 'react-icons/bi'
import { MdOutlinePayment } from 'react-icons/md'
import './ServicesTag.css'

const services = [
  {
    title: '50 Taka delivery',
    subtitle: 'Free shipping on all order',
    icon: <TbTruckDelivery />,
  },
  {
    title: 'Returns',
    subtitle: 'Back guarantee under 7 days',
    icon: <HiOutlineCurrencyDollar />,
  },
  {
    title: 'Support 24/7',
    subtitle: 'Support online 24 hours a day',
    icon: <BiSupport />,
  },
  {
    title: 'Payments',
    subtitle: '100% payment security',
    icon: <MdOutlinePayment />,
  },
]

const ServicesTag = () => {
  return (
    <div className='services-container'>
      <div className='services-grid'>
        {services?.map((item, index) => (
          <div key={index} className='service-item'>
            <div className='icon-container'>
              {item?.icon}
            </div>
            <div className='service-content'>
              <h3 className='service-title'>{item?.title}</h3>
              <p className='service-subtitle'>{item?.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ServicesTag
