import { realizarSorteio } from './realizarSorteio';

describe('dado um sorteio amigo secreto', () => {
  test('cada participante não sorteie o próprio nome', () => {
    const participantes = ['Ana', 'Catarrenta', 'Jorel', 'Vó', 'Venéria'];

    const sorteio = realizarSorteio(participantes);
    participantes.forEach((participante) => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    });
  });
});
