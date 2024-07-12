function PaymentMethod() {
  return (
    <div className="w-full mr-6 mb-4 flex flex-row">
      <div className="w-full mr-6">
        <label htmlFor="payment" className="font-medium">
          SELECT PAYMENT METHOD
        </label>
        <select name="payment" id="payment" className="border p-2 w-full">
          <option value="card">Debit Card</option>
          <option value="visa">PayPal</option>
          <option value="visa">Google Pay</option>
          <option value="visa">Apple Pay</option>
          <option value="visa">Bnana Coin</option>
        </select>
      </div>
      <div className="w-full p-2 mb-4"></div>
    </div>
  )
}

export default PaymentMethod
