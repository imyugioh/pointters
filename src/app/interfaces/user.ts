import { Location } from "./location";

export interface User {
	firstName: string,
	lastName: string,
	completedRegistrationDate: string,
	completedRegistration: boolean,
	profilePic: string,
	profileBackgroundMedia : any,
	location: {
		city: string,
		country: string,
		geoJson: {
			type: string,
			coordinates: number[]
		},
		postalCode: string,
		province: string,
		state: string
	  },
	  _id: string,
	  email: string;
  }
  