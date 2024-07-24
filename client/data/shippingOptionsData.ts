import {ShippingOption} from '../../models/ShippingOptions'

const shippingOptions: ShippingOption[] = [
    {
      id: 1,
      shippingType: 'Standard (3-7 working days)',
      price: 5,
    },
    {
      id: 2,
      shippingType: 'Express (2-4 working days)',
      price: 8,
    },
    {
      id: 3,
      shippingType: 'Overnight (1 working day)',
      price: 12.5,
    },
  ]

  export default shippingOptions