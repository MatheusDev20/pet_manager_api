import { Command, CommandProps } from 'src/libs/command';

export class UpdateAppointmentCommand extends Command {
  readonly date: string;
  readonly reason: string;
  readonly notes: string;

  readonly appointmentId: string;

  constructor(props: CommandProps<UpdateAppointmentCommand>) {
    super(props);
    this.reason = props.reason;
    this.date = props.date;
    this.notes = props.notes;
    this.appointmentId = props.appointmentId;
  }
}
