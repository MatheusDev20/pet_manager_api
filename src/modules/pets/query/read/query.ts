import { Query, QueryProps } from 'src/libs/query';

export class ReadMyPetsQuery extends Query {
  readonly ownerId: string;

  constructor(props: QueryProps<ReadMyPetsQuery>) {
    super(props);
    this.ownerId = props.ownerId;
  }
}
