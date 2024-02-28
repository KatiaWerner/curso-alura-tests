import ListaParticipantes from '../ListaParticipantes';
import Rodape from '../Rodape';
import Formulario from '../Formulario';
import Card from '../Card';

const Configuracao = () => {
  return (
    <Card>
      <section>
        <h2>Vamos começar!</h2>
        <Formulario />
        <ListaParticipantes />
        <Rodape />
      </section>
    </Card>
  );
};

export default Configuracao;
