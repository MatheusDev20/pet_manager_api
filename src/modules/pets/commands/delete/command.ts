import { Command, CommandProps } from 'src/libs/command';

export class DeleteCommand extends Command {
  readonly ownerId: string;
  readonly petId: string;

  constructor(props: CommandProps<DeleteCommand>) {
    super(props);
    this.ownerId = props.ownerId;
    this.petId = props.petId;
  }
}
