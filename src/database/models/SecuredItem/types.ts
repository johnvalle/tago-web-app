export interface ISecuredItem {
  id: string;
  name: string;
  encryptedValue: string;
  isEncrypted: boolean;
  dateCreated: string;
  category?: string;
}
