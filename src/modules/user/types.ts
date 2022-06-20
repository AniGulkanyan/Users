export interface IUser {
    name: string;
    surname: string;
    _id?: string;
    email: string;
    metadata?: Record<string, any>;
    checked?: boolean;
}
