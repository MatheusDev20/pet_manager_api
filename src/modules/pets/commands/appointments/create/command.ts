import { Command, CommandProps } from 'src/libs/command';

export class CreateAppointmentCommand extends Command {
  readonly date: string;
  readonly reason: string;
  readonly notes: string;
  readonly petId: string;

  constructor(props: CommandProps<CreateAppointmentCommand>) {
    super(props);
    this.reason = props.reason;
    this.date = props.date;
    this.notes = props.notes;
    this.petId = props.petId;
  }
}
