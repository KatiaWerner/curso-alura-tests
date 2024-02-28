import { act, fireEvent, render, screen } from '@testing-library/react';
import Formulario from './Formulario';
import { RecoilRoot } from 'recoil';

describe('comportamento do formulário', () => {
  test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );

    // encontrar o botão
    const botao = screen.getByRole('button');

    // garantir que o input esteja no documento
    expect(input).toBeInTheDocument();

    // garantir que o botão esteja desabilitado
    expect(botao).toBeDisabled();
  });

  test('adicionar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    // encontrar no DOM o input
    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );

    // encontrar o botão
    const botao = screen.getByRole('button');

    // inserir um valor no input
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina',
      },
    });

    // clicar no botao de submeter
    fireEvent.click(botao);

    // garantir que o input esteja com o foco ativo
    expect(input).toHaveFocus();

    // garantir que o input não tenha um valor
    expect(input).toHaveValue('');
  });

  test('nomes duplicados não podem ser adicionados na lista', () => {
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
    const botao = screen.getByRole('button');
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina',
      },
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina', // Adicionando um nome duplicado
      },
    });
    fireEvent.click(botao);

    // Agora vamos tentar encontrar um elemento com uma classe específica para a mensagem de erro
    const mensagemDeErro = screen.queryByText(
      'Nomes repetidos não são permitidos!'
    );

    // Espera-se que a mensagem de erro seja encontrada
    expect(mensagemDeErro).toBeInTheDocument();
  });

  test('a mensagem deve sumir após os timers', () => {
    jest.useFakeTimers();
    render(
      <RecoilRoot>
        <Formulario />
      </RecoilRoot>
    );

    const input = screen.getByPlaceholderText(
      'Insira os nomes dos participantes'
    );
    const botao = screen.getByRole('button');
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina',
      },
    });
    fireEvent.click(botao);
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina', // Adicionando um nome duplicado
      },
    });
    fireEvent.click(botao);
    let mensagemDeErro = screen.queryByRole('alert');

    // Espera-se que a mensagem de erro seja encontrada
    expect(mensagemDeErro).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    mensagemDeErro = screen.queryByRole('alert');
    expect(mensagemDeErro).toBeNull();
  });
});
