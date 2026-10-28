import { MOCKAPI_PRODUCTS_URL } from './config';

export const demoProducts = [
  { id: '1', name: 'Auriculares Air', price: 59900, category: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700', description: 'Auriculares cómodos para escuchar música todos los días.' },
  { id: '2', name: 'Teclado Compact', price: 74500, category: 'Accesorios', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700', description: 'Teclado compacto, práctico para estudiar y trabajar.' },
  { id: '3', name: 'Mochila Urban', price: 68900, category: 'Organización', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700', description: 'Mochila urbana para llevar tus cosas de forma organizada.' },
  { id: '4', name: 'Reloj Pulse', price: 96000, category: 'Tecnología', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700', description: 'Reloj minimalista para todos los días.' },
  { id: '5', name: 'Botella Térmica', price: 32900, category: 'Hogar', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700', description: 'Botella reutilizable para acompañarte durante el día.' },
  { id: '6', name: 'Lámpara Desk', price: 54900, category: 'Hogar', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700', description: 'Lámpara de escritorio para tu espacio de estudio.' },
  { id: '7', name: 'Cuadernos Set', price: 18900, category: 'Papelería', image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=700', description: 'Cuadernos para organizar ideas y apuntes.' },
  { id: '8', name: 'Zapatillas Move', price: 112000, category: 'Calzado', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700', description: 'Zapatillas urbanas con diseño cómodo.' }
];

export function normalizeProduct(item, index = 0) {
  return {
    id: String(item.id ?? index + 1),
    name: item.name ?? item.nombre ?? item.title ?? 'Producto',
    price: Number(item.price ?? item.precio ?? 0),
    category: item.category ?? item.categoria ?? 'General',
    image: item.image ?? item.imagen ?? item.thumbnail ?? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700',
    description: item.description ?? item.descripcion ?? item.title ?? 'Producto de nuestro catálogo.'
  };
}

export const productsUrl = MOCKAPI_PRODUCTS_URL.trim();
