import { PrismaClient } from '@prisma/client';
import { MARAGATA_ID } from '../../src/constants/stations';
import { MARAGATA_USER_ID } from '../../src/constants/users';

export async function seedStation(prisma: PrismaClient) {
  console.log('📻 Creando estación de radio...');

  // Limpiar estación existente - ahora se hace en cleanupDatabase
  // await prisma.station.deleteMany({});

  const station = await prisma.station.create({
    data: {
      id: MARAGATA_ID,
      userId: MARAGATA_USER_ID,
      name: 'Maragata FM',
      slogan: '¡Una Radio moderna, ágil, creíble! Música y noticias las 24 hs.',
      streamUrl: 'https://streaming2.locucionar.com/proxy/maragata975?mp=/;',
      websiteUrl: 'https://maragatafm.com/',
      logoUrl: 'https://pbs.twimg.com/profile_images/863517124895092736/o5pIUITw_400x400.jpg',
      facebookUrl: 'https://facebook.com/maragatafm',
      instagramUrl: '',
      twitterUrl: 'https://x.com/MaragataFM',
      youtubeUrl: '',
      tiktokUrl: '',
      country: 'Uruguay',
      state: 'San José',
      city: 'San José de Mayo',
      postalCode: '80000',
      phone: '+59843420931',
      whatsapp: '+59892608760',
      email: 'maragatafm@gmail.com',
      address: 'Asamblea 579',
      dayStartTime: '06:00', // El día de programación empieza a las 6 AM
    },
  });

  console.log(`✅ Estación creada: ${station.name}`);

  return station;
}
