import Status from './status.interface';

export default interface Task {
  name: string;
  desc: string;
  deadLine: Date;
  openingDate: Date;
  id: number;
  status: Status;
}
