import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../components/context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext)

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const [paymentMethod, setPaymentMethod] = useState('COD')
  const [transactionId, setTransactionId] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Payment numbers for different methods
  const paymentNumbers = {
    bKash: '01737166595',
    Nagad: '01737166595',
    Rocket: '01737166595'
  }

  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    setData((data) => ({ ...data, [name]: value }))
  }

  const validateTransactionId = (id) => {
    // Basic validation for transaction ID format
    return /^\d{10,12}$/.test(id)
  }

  const validateMobileNumber = (number) => {
    // Validate Bangladesh mobile number format
    return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(number)
  }

  const placeOrder = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    // Validate mobile number for mobile banking
    if (['bKash', 'Nagad', 'Rocket'].includes(paymentMethod)) {
      if (!validateMobileNumber(mobileNumber)) {
        setError('Please enter a valid mobile number (e.g., 01XXXXXXXXX)')
        setLoading(false)
        return
      }
      if (!validateTransactionId(transactionId)) {
        setError('Please enter a valid transaction ID (10-12 digits)')
        setLoading(false)
        return
      }
    }

    let orderItems = []
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item
        itemInfo['quantity'] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      paymentMethod,
      transactionId: ['bKash', 'Nagad', 'Rocket'].includes(paymentMethod) ? transactionId : null,
      mobileNumber: ['bKash', 'Nagad', 'Rocket'].includes(paymentMethod) ? mobileNumber : null
    }

    try {
      let response = await axios.post(url + '/api/order/place', orderData, {
        headers: { token },
      })

      if (response.data.success) {
        if (paymentMethod === 'Stripe') {
          const { session_url } = response.data
          window.location.replace(session_url)
        } else {
          // Show success message before redirecting
          alert(response.data.message)
          navigate('/myorders')
        }
      } else {
        setError(response.data.message || 'Error placing order')
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error placing order')
    } finally {
      setLoading(false)
    }
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/cart')
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery Information</p>
        <div className='multi-fields'>
          <input
            required
            name='firstName'
            onChange={onChangeHandler}
            value={data.firstName}
            type='text'
            placeholder='First name'
          />
          <input
            required
            name='lastName'
            onChange={onChangeHandler}
            value={data.lastName}
            type='text'
            placeholder='Last name'
          />
        </div>
        <input
          required
          name='email'
          onChange={onChangeHandler}
          value={data.email}
          type='email'
          placeholder='Email address'
        />
        <input
          required
          name='street'
          onChange={onChangeHandler}
          value={data.street}
          type='text'
          placeholder='Street'
        />
        <div className='multi-fields'>
          <input
            required
            name='city'
            onChange={onChangeHandler}
            value={data.city}
            type='text'
            placeholder='City'
          />
          <input
            required
            name='state'
            onChange={onChangeHandler}
            value={data.state}
            type='text'
            placeholder='State'
          />
        </div>
        <div className='multi-fields'>
          <input
            required
            name='zipcode'
            onChange={onChangeHandler}
            value={data.zipcode}
            type='text'
            placeholder='Zip code'
          />
          <input
            required
            name='country'
            onChange={onChangeHandler}
            value={data.country}
            type='text'
            placeholder='Country'
          />
        </div>
        <input
          required
          name='phone'
          onChange={onChangeHandler}
          value={data.phone}
          type='text'
          placeholder='Phone'
        />

        <div className='payment-method'>
          <p className='title'>Payment Method</p>
          <div className='payment-options'>
            <label>
              <input
                type='radio'
                name='payment'
                value='COD'
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            <label>
              <input
                type='radio'
                name='payment'
                value='bKash'
                checked={paymentMethod === 'bKash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              bKash
            </label>
            <label>
              <input
                type='radio'
                name='payment'
                value='Nagad'
                checked={paymentMethod === 'Nagad'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Nagad
            </label>
            <label>
              <input
                type='radio'
                name='payment'
                value='Rocket'
                checked={paymentMethod === 'Rocket'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Rocket
            </label>
            <label>
              <input
                type='radio'
                name='payment'
                value='Stripe'
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit Card (Stripe)
            </label>
          </div>

          {['bKash', 'Nagad', 'Rocket'].includes(paymentMethod) && (
            <div className='mobile-banking-details'>
              <div className='payment-number-display'>
                <p className='payment-number-title'>Send payment to:</p>
                <div className='payment-number-box'>
                  <span className='payment-number'>{paymentNumbers[paymentMethod]}</span>
                  <button 
                    type='button' 
                    className='copy-button'
                    onClick={() => {
                      navigator.clipboard.writeText(paymentNumbers[paymentMethod]);
                      alert('Payment number copied to clipboard!');
                    }}
                  >
                    Copy
                  </button>
                </div>
                <p className='payment-instruction'>
                  Send the exact amount to this number and enter your payment details below
                </p>
              </div>

              <div className='mobile-number-input'>
                <input
                  required
                  type='text'
                  placeholder={`Enter your ${paymentMethod} number (e.g., 01XXXXXXXXX)`}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <p className='mobile-hint'>Enter the mobile number you used to send the payment</p>
              </div>
              <div className='transaction-input'>
                <input
                  required
                  type='text'
                  placeholder={`Enter ${paymentMethod} Transaction ID (10-12 digits)`}
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
                <p className='transaction-hint'>Please enter the transaction ID from your payment confirmation message</p>
              </div>
              <div className='payment-amount'>
                <p className='amount-title'>Amount to Pay:</p>
                <p className='amount-value'>৳{(getTotalCartAmount() + 50).toLocaleString('bn-BD')}</p>
              </div>
            </div>
          )}
        </div>

        {error && <div className='error-message'>{error}</div>}
      </div>

      <div className='place-order-right'>
        <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>৳{getTotalCartAmount().toLocaleString('bn-BD')}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>৳{getTotalCartAmount() === 0 ? 0 : 50}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>
                ৳{getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 50).toLocaleString('bn-BD')}
              </b>
            </div>
          </div>
          <button type='submit' disabled={loading}>
            {loading ? 'Processing...' : 'PLACE ORDER'}
          </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
