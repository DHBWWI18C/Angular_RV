import { UserRole } from '../enum/UserRole';

export interface CurrentUser {
    userRole: UserRole;
    id: number
}