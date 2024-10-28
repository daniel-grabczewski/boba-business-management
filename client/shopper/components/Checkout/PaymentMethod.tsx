function PaymentMethod() {
  return (
    <div className="w-full mr-6 mb-4 flex flex-row">
      <div className="w-full mr-6">
        <label htmlFor="payment" className="font-medium whitespace-nowrap">
          SELECT PAYMENT METHOD
        </label>
        <select
          name="payment"
          id="payment"
          className="border p-2 w-full rounded-md"
        >
          <option value="card">Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="google">Google Pay</option>
          <option value="apple">Apple Pay</option>
          <option value="banana">Banana Coin</option>
        </select>
      </div>
      <div className="w-full p-2 mb-4"></div>
    </div>
  )
}

export default PaymentMethod
