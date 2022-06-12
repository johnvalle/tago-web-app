import { ISecuredItem } from '@/database/models/SecuredItem/types';

export type SecuredItemFormData = Exclude<ISecuredItem, 'id' | 'dateCreated'>;
