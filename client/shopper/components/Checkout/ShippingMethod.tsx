import { ShippingOption } from '../../../../models/ShippingOptions'
interface ShippingMethodProps {
  shippingOptions: ShippingOption[]
  handleShippingChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

function ShippingMethod({
  shippingOptions,
  handleShippingChange,
}: ShippingMethodProps) {
  return (
    <div className="w-full mr-6 mb-4 flex flex-row">
      <div className="w-full mr-6"><label htmlFor="shipping" className="font-medium">
        SELECT SHIPPING METHOD
      </label>
      <select
        name="shipping"
        id="shipping"
        className="border p-2 w-full mb-4"
        onChange={handleShippingChange}
      >
        {shippingOptions.map((option: ShippingOption) => (
          <option value={option.id} key={option.id}>
            {option.shippingType}
          </option>
        ))}
      </select></div>
      <div className="w-full p-2 mb-4"></div>
      
    </div>
  )
}

export default ShippingMethod
