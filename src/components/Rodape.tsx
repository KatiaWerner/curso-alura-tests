import { useNavigate } from 'react-router-dom';
import { useListaDeParticipantes } from '../state/hook/useListaDeParticipante';
import { useSorteador } from '../state/hook/useSorteador';

const Rodape = () => {
  const participantes = useListaDeParticipantes();

  const navergarPara = useNavigate();

  const sortear = useSorteador();

  const iniciar = () => {
    sortear();
    navergarPara('/sorteio');
  };

  return (
    <footer className="rodape-configuracoes">
      <button
        className="botao"
        disabled={participantes.length < 3}
        onClick={iniciar}
      >
        Iniciar brincadeira
      </button>
      <img src="/imagens/sacolas.png" alt="Sacolas de compras" />
    </footer>
  );
};
export default Rodape;
