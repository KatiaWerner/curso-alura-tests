import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipante';
import Sorteio from './Sorteio';
import { useResultadoDoSorteio } from '../../state/hook/useResultadoDoSorteio';

jest.mock('../../state/hook/useListaDeParticipante', () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

jest.mock('../../state/hook/useResultadoDoSorteio', () => {
  return {
    useResultadoDoSorteio: jest.fn(),
  };
});

describe('a pagina de sorteio', () => {
  const participantes = ['Ana', 'Catarrenta', 'Jorel'];

  const resultado = new Map([
    ['Ana', 'Jorel'],
    ['Jorel', 'Catarrenta'],
    ['Catarrenta', 'Ana'],
  ]);

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
  });

  test('todos os participantes podem exibir o seu amigo secreto', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const opcoes = screen.queryAllByRole('option');
    expect(opcoes).toHaveLength(participantes.length);
  });

  test('o amigo secreto é exibido quando solicitado', () => {
    render(
      <RecoilRoot>
        <Sorteio />
      </RecoilRoot>
    );

    const select = screen.getByPlaceholderText('Selecione o seu nome');

    fireEvent.change(select, {
      target: {
        value: participantes[0],
      },
    });

    const botao = screen.getByRole('button');
    fireEvent.click(botao);

    const amigoSecreto = screen.getByRole('alert');

    expect(amigoSecreto).toBeInTheDocument();
  });
});
