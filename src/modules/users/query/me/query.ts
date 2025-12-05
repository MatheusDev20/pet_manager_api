import { Query, QueryProps } from 'src/libs/query';

export class GetMeQuery extends Query {
  readonly userId: string;

  constructor(props: QueryProps<GetMeQuery>) {
    super(props);
    this.userId = props.userId;
  }
}
