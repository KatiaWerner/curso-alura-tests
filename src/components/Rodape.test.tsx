import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Rodape from './Rodape';
import { useListaDeParticipantes } from '../state/hook/useListaDeParticipante';

jest.mock('../state/hook/useListaDeParticipante', () => {
  return {
    useListaDeParticipantes: jest.fn(),
  };
});

const mockDeNavegacao = jest.fn();
const mockSorteio = jest.fn();

jest.mock('../state/hook/useSorteador', () => {
  return {
    useSorteador: () => mockSorteio,
  };
});

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => mockDeNavegacao,
  };
});

describe('onde não existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([]);
  });

  test('a brincadeira não pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.queryByRole('button');
    expect(botao).toBeDisabled();
  });
});

describe('quando existem participantes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([
      'Ana',
      'Catarrenta',
      'Jorel',
    ]);
  });

  test('a brincadeira pode ser iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.queryByRole('button');
    expect(botao).not.toBeDisabled();
  });

  test('a brincadeira foi iniciada', () => {
    render(
      <RecoilRoot>
        <Rodape />
      </RecoilRoot>
    );

    const botao = screen.getByRole('button');
    fireEvent.click(botao);

    expect(mockDeNavegacao).toHaveBeenCalledTimes(1);
    expect(mockDeNavegacao).toHaveBeenCalledWith('/sorteio');
    expect(mockSorteio).toHaveBeenCalledTimes(1);
  });
});
