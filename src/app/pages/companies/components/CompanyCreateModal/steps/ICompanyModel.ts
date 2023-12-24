export interface ICompanyAddress {
  countryId: number;
  cityId: number;
  address: string;
  postCode: string;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  // businessPhoneNumber : "5646174961";
  // startedDate : "2021-06-01T00:00:00";
  // contractEndDate : "2021-06-01T00:00:00";
  // contractIdentifite: true;
}


export interface ICreateCompanyData {
  name: string;
  phoneNumber: string;
  email: string;
  logo: string; 
  companyAddress: ICompanyAddress;
  users: IRegister;
}

export type StepProps = {
  data: ICreateCompanyData,
  updateData: (fieldsToUpdate: Partial<ICreateCompanyData>) => void,
  hasError: boolean
}


export const defaultCreateCompanyData: ICreateCompanyData = {
  name: '',
  phoneNumber: '',
  email: '',
  logo: '',
  companyAddress: {
    countryId: 0,
    cityId: 0,
    address: '',
    postCode: ''
  },
  users: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    // businessPhoneNumber : "5646174961",
    // startedDate : "2021-06-01T00:00:00",
    // contractEndDate : "2021-06-01T00:00:00",
    // contractIdentifite: true
  }
};




