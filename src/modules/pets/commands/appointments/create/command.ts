import { Command, CommandProps } from 'src/libs/command';

export class CreateAppointmentCommand extends Command {
  readonly date: string;
  readonly service: string;
  readonly notes: string;
  readonly petId: string;
  readonly userId: string;

  constructor(props: CommandProps<CreateAppointmentCommand>) {
    super(props);
    this.service = props.service;
    this.date = props.date;
    this.notes = props.notes;
    this.petId = props.petId;
    this.userId = props.userId;
  }
}
