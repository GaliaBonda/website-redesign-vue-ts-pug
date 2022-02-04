export default interface Record {
  recordType: string;
  recordText: string;
  recordDate: Date;
  recordHasDetails: boolean;
  recordDetails: string;
  recordHasImg: boolean;
  id: number;
}
