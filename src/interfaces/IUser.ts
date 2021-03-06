export interface IUser {
  _id: string;
  email: string;
  active: boolean;

  emailVerified: boolean;
  password: string;
  salt: string;
  firstName?: string;
  lastName?: string;
  dob?: Date;
  gender?: 'Male' | 'Female' | 'Rather Not Say';
  location?: string;
  occupation?: 'Student' | 'Professional' | 'Unemployed';
}

export interface IUserInputDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date;
  gender: 'Male' | 'Female' | 'Rather Not Say';
  location: string;
  occupation: 'Student' | 'Professional' | 'Unemployed';
}
