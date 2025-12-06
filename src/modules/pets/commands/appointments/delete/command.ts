import { Command, CommandProps } from 'src/libs/command';

export class DeleteAppointmentCommand extends Command {
  readonly ownerId: string;
  readonly appointmentId: string;

  constructor(props: CommandProps<DeleteAppointmentCommand>) {
    super(props);
    this.ownerId = props.ownerId;
    this.appointmentId = props.appointmentId;
  }
}
