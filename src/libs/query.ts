import { v4 } from 'uuid';

export type QueryProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Query>;

type QueryMetadata = {
  readonly userId?: string;
  readonly timestamp: number;
};

export class Query {
  readonly id: string;
  readonly metadata: QueryMetadata;

  constructor(props: QueryProps<unknown>) {
    if (!props) throw new Error('Query Args should not be empty');
    this.id = props.id || v4();
    this.metadata = {
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId ?? '',
    };
  }
}
