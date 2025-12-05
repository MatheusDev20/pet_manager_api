import { v4 } from 'uuid';

export type CommandProps<T> = Omit<T, 'id' | 'metadata'> & Partial<Command>;

type CommandMetadata = {
  readonly userId?: string;
  readonly timestamp: number;
};

export class Command {
  readonly id: string;
  readonly metadata: CommandMetadata;

  constructor(props: CommandProps<unknown>) {
    if (!props) throw new Error('Command Args should not be empty');
    this.id = props.id || v4();
    this.metadata = {
      timestamp: props?.metadata?.timestamp || Date.now(),
      userId: props?.metadata?.userId ?? '',
    };
  }
}
