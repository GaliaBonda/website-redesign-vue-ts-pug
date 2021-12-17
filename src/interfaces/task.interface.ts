import Status from './status.interface';

export default interface Task {
  name: string;
  desc: string;
  deadLine: string;
  id: number;
  status: Status;
}
