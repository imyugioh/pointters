// export interface User {
//     firstName: string,
//     lastName: string,
//     completedRegistrationDate: string,
//     completedRegistration: boolean,
//     profilePic: string,
//     location: {
//         city: string,
//         country: string,
//         geoJson: {
//             type: string,
//             coordinates: number[]
//         },
//         postalCode: string,
//         province: string,
//         state: string
//     },
//   }
  
export interface ServiceUnit {
    category : {
           id: string,
           name: string
    },
    description: string,
    fulfillmentMethod :{
      local:boolean,
      online:boolean,
      shipment:boolean,
      store:boolean,
      localServiceRadius: string,
      localServiceRadiusUom: string
      },
    location: [
      {
        city: string,
        country: string,
        geoJson: {
          type: string,
          coordinates: [
            number, number
            ]
          },
        postalCode: string,
        province: string,
        state: string
      }
    ],
    media: {fileName: string,  mediaType: string}[],
    prices: [{
      currencyCode: string,
      currencySymbol: string,
      description: string,
      price: number,
      time: number,
      timeUnitOfMeasure: string
      }]
  }