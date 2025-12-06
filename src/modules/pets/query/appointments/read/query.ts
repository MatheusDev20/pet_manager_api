import { Query, QueryProps } from 'src/libs/query';

export class ReadAppointmentsQueryCommand extends Query {
  readonly ownerId: string;
  readonly dateFilter?: string;
  readonly serviceFilter?: 'bath' | 'surgery' | 'vet_consultation' | 'vaccine';
  readonly petId: string;

  constructor(props: QueryProps<ReadAppointmentsQueryCommand>) {
    super(props);
    this.ownerId = props.ownerId;
    this.dateFilter = props.dateFilter;
    this.serviceFilter = props.serviceFilter;
    this.petId = props.petId;
  }
}
