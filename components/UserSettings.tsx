/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import Modal from './Modal';
import { useUI, useUser } from '@/lib/state';

export default function UserSettings() {
  const { name, info, setName, setInfo } = useUser();
  const { setShowUserConfig } = useUI();

  function updateClient() {
    setShowUserConfig(false);
  }

  return (
    <Modal onClose={() => setShowUserConfig(false)}>
      <div className="userSettings">
        <p>
          Esta es una herramienta simple que te permite diseñar, probar y bromear
          con personajes de IA personalizados sobre la marcha.
        </p>

        <form
          onSubmit={e => {
            e.preventDefault();
            setShowUserConfig(false);
            updateClient();
          }}
        >
          <p>Agregar esta información opcional hace que la experiencia sea más divertida:</p>

          <div>
            <p>Tu nombre</p>
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="¿Cómo te gusta que te llamen?"
            />
          </div>

          <div>
            <p>Tu información</p>
            <textarea
              rows={3}
              name="info"
              value={info}
              onChange={e => setInfo(e.target.value)}
              placeholder="Cosas que deberíamos saber sobre ti... Gustos, disgustos, pasatiempos, intereses, películas favoritas, libros, programas de televisión, comidas, etc."
            />
          </div>

          <button className="button primary">¡Vamos!</button>
        </form>
      </div>
    </Modal>
  );
}