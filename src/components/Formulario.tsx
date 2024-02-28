import React, { useRef, useState } from 'react';
import { useAdicionarParticipante } from '../state/hook/useAdicionarParticipante';
import { useMensagemDeErro } from '../state/hook/useMensagemDeErro';

const Formulario = () => {
  const [nome, setNome] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const adicionarNaLista = useAdicionarParticipante();

  const mensagemDeErro = useMensagemDeErro();

  const adicionarParticipante = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    adicionarNaLista(nome);
    setNome('');
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={adicionarParticipante}>
      <div className="grupo-input-btn">
        <input
          ref={inputRef}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          type="text"
          placeholder="Insira os nomes dos participantes"
        />
        <button disabled={!nome}>Adicionar</button>
        {mensagemDeErro && <p role="alert">{mensagemDeErro}</p>}
      </div>
    </form>
  );
};

export default Formulario;
