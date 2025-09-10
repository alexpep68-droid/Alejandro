/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { useRef } from 'react';
import {
  Agent,
  AGENT_COLORS,
  APPEARANCES,
  APPEARANCE,
  INTERLOCUTOR_VOICE,
  INTERLOCUTOR_VOICES,
} from '@/lib/presets/agents';
import Modal from './Modal';
import c from 'classnames';
import { useAgent, useUI } from '@/lib/state';
import Portrait from './Portrait';

export default function EditAgent() {
  const agent = useAgent(state => state.current);
  const updateAgent = useAgent(state => state.update);
  const nameInput = useRef(null);
  const { setShowAgentEdit } = useUI();

  function onClose() {
    setShowAgentEdit(false);
  }

  function updateCurrentAgent(adjustments: Partial<Agent>) {
    updateAgent(agent.id, adjustments);
  }

  function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  return (
    <Modal onClose={() => onClose()}>
      <div className="editAgent">
        <div>
          <form>
            <div>
              <input
                className="largeInput"
                type="text"
                placeholder="Nombre"
                value={agent.name}
                onChange={e => updateCurrentAgent({ name: e.target.value })}
                ref={nameInput}
              />
            </div>

            <div>
              <label>
                Personalidad
                <textarea
                  value={agent.personality}
                  onChange={e =>
                    updateCurrentAgent({ personality: e.target.value })
                  }
                  rows={7}
                  placeholder="¿Cómo debo actuar? ¿Cuál es mi propósito? ¿Cómo describirías mi personalidad?"
                />
              </label>
            </div>
          </form>
        </div>

        <div>
          <div className="agentPreview">
            <Portrait
              appearance={agent.appearance}
              color={agent.bodyColor}
              size={200}
            />
          </div>
          <div>
            <label>Color</label>
            <ul className="colorPicker">
              {AGENT_COLORS.map((color, i) => (
                <li
                  key={i}
                  className={c({ active: color === agent.bodyColor })}
                >
                  <button
                    style={{ backgroundColor: color }}
                    onClick={() => updateCurrentAgent({ bodyColor: color })}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label>Apariencia</label>
            <ul className="appearancePicker">
              {APPEARANCES.map(appearance => (
                <li key={appearance}>
                  <button
                    className={c('appearance-button', {
                      active: appearance === agent.appearance,
                    })}
                    onClick={() =>
                      updateCurrentAgent({
                        appearance: appearance as APPEARANCE,
                      })
                    }
                  >
                    {toTitleCase(appearance)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="voicePicker">
            Voz
            <select
              value={agent.voice}
              onChange={e => {
                updateCurrentAgent({
                  voice: e.target.value as INTERLOCUTOR_VOICE,
                });
              }}
            >
              {INTERLOCUTOR_VOICES.map(voice => (
                <option key={voice} value={voice}>
                  {voice}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={() => onClose()} className="button primary">
          ¡Vamos!
        </button>
      </div>
    </Modal>
  );
}