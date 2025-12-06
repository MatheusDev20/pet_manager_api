import { PrismaClient } from '../src/generated/prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const me = await prisma.user.create({
    data: {
      email: 'matheusdev20@gmail.com',
      password: await hash('superSenha@123', 10),
      firstName: 'Matheus',
      lastName: 'De Paula',
    },
  });

  const yorick = await prisma.pet.create({
    data: {
      name: 'Yorick',
      specie: 'Dog',
      age: 5,
      ownerId: me.id,
      weight: 20.5,
      notes: 'No known health issues.',
    },
  });

  const olaf = await prisma.pet.create({
    data: {
      name: 'Olaf',
      specie: 'Cat',
      age: 3,
      ownerId: me.id,
      weight: 10.2,
      notes: 'Allergic to certain foods.',
    },
  });

  await prisma.appointment.create({
    data: {
      date: new Date('2024-07-15T10:00:00Z'),
      service: 'vaccine',
      petId: olaf.id,
      notes: 'Ensure vaccinations are up to date.',
    },
  });

  await prisma.appointment.create({
    data: {
      date: new Date('2024-07-15T10:00:00Z'),
      service: 'surgery',
      petId: yorick.id,
      notes: 'Check for possible dental issues.',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
