import { Event, DJ, FAQ } from './types';

export const EVENTS_DATA: Event[] = [
  {
    id: 'techno-nights',
    title: 'Techno Nights Vol. 12',
    date: '15 JUN',
    fullDate: 'Lunes, 15 de Junio, 2026',
    time: '23:00 - 06:00',
    genre: 'Electrónica',
    location: 'Fabrik, Madrid',
    city: 'Madrid',
    price: 45,
    imageAccent: 'from-[#1e1b4b] via-[#311042] to-[#03000a]',
    description: 'La duodécima entrega de nuestra icónica serie mensual en Fabrik. Disfruta de un sistema de sonido reforzado, luces láser de última generación y un lineup compuesto por los máximos referentes del techno internacional.',
    statusTag: 'DESTACADO',
    lineup: ['DJ Electron', 'NKTR', 'Sven Vath', 'Charlotte de Witte']
  },
  {
    id: 'perreo-intenso',
    title: 'Perreo Intenso Festival',
    date: '22 JUN',
    fullDate: 'Domingo, 22 de Junio, 2026',
    time: '00:00 - 07:00',
    genre: 'Reggaeton',
    location: 'Opium, Barcelona',
    city: 'Barcelona',
    price: 35,
    imageAccent: 'from-[#311042] via-[#5c1d63] to-[#03000a]',
    description: 'Baila hasta el amanecer con los mejores hits urbanos y el reggaeton de ayer y de hoy. Efectos de fuego frío, megatrón, animación exclusiva y todo el ritmo playero de Opium Barcelona.',
    statusTag: 'OFERTA',
    lineup: ['MC Flow', 'DJ Resident', 'DJ Honey', 'Yandel (Guest Set)']
  },
  {
    id: 'jazz-soul',
    title: 'Jazz & Soul Night',
    date: '29 JUN',
    fullDate: 'Lunes, 29 de Junio, 2026',
    time: '21:00 - 01:00',
    genre: 'En Vivo',
    location: 'Café Central, Madrid',
    city: 'Madrid',
    price: 25,
    imageAccent: 'from-[#0b132b] via-[#1c2541] to-[#03000a]',
    description: 'Una velada íntima de jazz suave, voz aterciopelada y soul clásico en el asombroso entorno acústico del histórico Café Central. Disfruta de una cena opcional y una carta de cócteles curada.',
    statusTag: 'RECOMENDADO',
    lineup: ['Luna Vibes', 'The Blue Notes Quatret', 'Sarah Adams']
  },
  {
    id: 'midnight-rooftop',
    title: 'Midnight Exclusive Rooftop',
    date: '06 JUL',
    fullDate: 'Lunes, 6 de Julio, 2026',
    time: '20:00 - 03:00',
    genre: 'Electrónica',
    location: 'Hotel W, Barcelona',
    city: 'Barcelona',
    price: 120,
    imageAccent: 'from-[#1e1b4b] via-[#581c87] to-[#03000a]',
    description: 'El evento más exclusivo del verano barcelonés. Una fiesta al atardecer en la terraza panorámica más codiciada de la ciudad. El precio incluye acceso directo, dos copas premium, zona de sofás privados y canapés de autor.',
    statusTag: 'PREMIUM',
    lineup: ['DJ Electron', 'Luna Vibes', 'Solomun (Exclusive Hybrid Set)']
  },
  {
    id: 'underground-sessions',
    title: 'Underground Sessions',
    date: '13 JUL',
    fullDate: 'Lunes, 13 de Julio, 2026',
    time: '23:30 - 06:30',
    genre: 'Electrónica',
    location: 'Razzmatazz, Barcelona',
    city: 'Barcelona',
    price: 28,
    imageAccent: 'from-[#172554] via-[#1e1b4b] to-[#03000a]',
    description: 'Un viaje sonoro por las profundidades del sonido club underground de Berlín y Detroit. Un espacio industrial crudo, sin artificios comerciales, donde la música y el baile bajo luces estroboscópicas son los únicos protagonistas.',
    statusTag: 'ÚLTIMAS',
    lineup: ['NKTR', 'Marcel Dettman', 'Ben Klock', 'DJ Electron']
  },
  {
    id: 'bellaqueo-summer',
    title: 'Bellaqueo Summer Edition',
    date: '20 JUL',
    fullDate: 'Lunes, 20 de Julio, 2026',
    time: '00:00 - 06:00',
    genre: 'Reggaeton',
    location: 'Shoko, Madrid',
    city: 'Madrid',
    price: 30,
    imageAccent: 'from-[#450a0a] via-[#311042] to-[#03000a]',
    description: 'Llega la edición veraniega oficial de Bellaqueo a la capital. Un ambiente con palmeras artificiales, pulseras luminosas de regalo led, y DJs que mezclarán lo más bailable del momento junto a clásicos del dembow.',
    statusTag: 'OFERTA',
    lineup: ['MC Flow', 'DJ Jader', 'Yorush']
  }
];

export const DJS_DATA: DJ[] = [
  {
    id: 'dj-electron',
    name: 'DJ Electron',
    initials: 'DJ',
    genre: 'Techno / House',
    glowColor: 'from-[#8b5cf6] to-[#ec4899]',
    bio: 'DJ Electron es un referente de la escena techno underground. Con sus sets híbridos de vinilo y controladores digitales, crea atmósferas magnéticas capaces de hipnotizar a estadios repletos.'
  },
  {
    id: 'mc-flow',
    name: 'MC Flow',
    initials: 'MC',
    genre: 'Reggaeton / Urban',
    glowColor: 'from-[#f43f5e] to-[#fb923c]',
    bio: 'El alma de las fiestas urbanas más enérgicas de Europa. Sus rimas rítmicas y selección de dembow de alta fidelidad han hecho vibrar a miles de personas en los mejores festivales internacionales.'
  },
  {
    id: 'luna-vibes',
    name: 'Luna Vibes',
    initials: 'LV',
    genre: 'Deep & Soul House',
    glowColor: 'from-[#3b82f6] to-[#8b5cf6]',
    bio: 'Pianista clásica convertida en DJ y productora. Sus composiciones melódicas y sets de Deep House traen una frescura única y un ambiente sofisticado ideal para terrazas al atardecer y clubs nocturnos.'
  },
  {
    id: 'nktr',
    name: 'NKTR',
    initials: 'NK',
    genre: 'Minimal Techno',
    glowColor: 'from-[#ec4899] to-[#8b5cf6]',
    bio: 'NKTR esculpe paisajes sonoros caracterizados por ritmos minimalistas limpios, bajos subgraves profundos y cortes sintéticos afilados. Una experiencia hipnótica recomendada para amantes de la electrónica pura.'
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    question: '¿Cómo puedo comprar mis entradas?',
    answer: 'Comprar tus entradas es sumamente rápido y 100% seguro. Explora nuestro catálogo de eventos en la web, haz clic en el botón "Comprar" o "Reservar" de tu evento favorito, selecciona la clase de entrada (General, VIP o Backstage) junto con la cantidad, completa tus datos personales y finaliza el checkout interactivo. Tus entradas se generarán de inmediato en formato digital con un código QR único.'
  },
  {
    question: '¿Puedo devolver mis entradas si no puedo asistir?',
    answer: '¡Por supuesto! En Noctix valoramos la flexibilidad de nuestros usuarios. Puedes solicitar la devolución y el reembolso íntegro de tus entradas hasta 48 horas antes del inicio del evento. Si estás dentro de las últimas 48 horas no es posible el reembolso directo, pero podrás transferir la titularidad de tu entrada a cualquier persona ingresando su correo desde nuestro panel de tickets.'
  },
  {
    question: '¿Qué incluye la entrada VIP y Backstage?',
    answer: 'La entrada VIP incluye acceso rápido prioritario por pasillo preferente sin filas tradicionales, acceso a la plataforma de altura con visibilidad VIP exclusiva del escenario, 1 copa premium de bienvenida de forma gratuita y entrada a la zona de aseos lujosos privados. La entrada Backstage añade barra libre premium ilimitada seleccionada, un pack de merchandising exclusivo Noctix, y acceso controlado a la zona trasera de la cabina de artistas para vivir el set a un palmo del DJ.'
  },
  {
    question: '¿Cómo accedo al evento con mi entrada digital?',
    answer: 'Noctix se compromete firmemente con el medio ambiente, por lo que nuestras entradas son 100% digitales y ecológicas, evitando impresiones en papel. Al llegar a la puerta del recinto, muestra en tu pantalla el ticket con su código QR (disponible en tu bandeja de entrada o directamente visible dentro de la app actualizando la tarjeta de la billetera virtual). El personal del evento escaneará el código al instante para darte entrada directa.'
  }
];
