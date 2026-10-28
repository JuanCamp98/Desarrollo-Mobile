export const colors = {
  background: '#F6F9FE',
  navy: '#102A43',
  blue: '#1764C0',
  blueLight: '#E8F1FF',
  text: '#172B4D',
  muted: '#697586',
  white: '#FFFFFF',
  border: '#DCE6F2',
  danger: '#D92D20',
  green: '#16805D'
};

export const formatPrice = (value) =>
  `$ ${Number(value || 0).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`;
