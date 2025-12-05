import { Command, CommandProps } from 'src/libs/command';

export class CreatePetCommand extends Command {
  readonly name: string;
  readonly specie: string;
  readonly age: number;
  readonly weight: number;
  readonly notes: string;
  readonly ownerId: string;

  constructor(props: CommandProps<CreatePetCommand>) {
    super(props);
    this.name = props.name;
    this.specie = props.specie;
    this.age = props.age;
    this.weight = props.weight;
    this.notes = props.notes;
    this.ownerId = props.ownerId;
  }
}
