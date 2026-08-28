import type { PipelineData } from "../data/types";
import "./Pipeline.css";

/**
 * Вертикальная технологическая схема кейса.
 *  - обычный поток: шаги сверху вниз;
 *  - merge: первые N шагов — параллельные входы, сходятся в следующий;
 *  - loop: замыкающий узел обратной связи.
 */
export default function Pipeline({ data }: { data: PipelineData }) {
  const { steps, merge = 0, loop, loopLabel, title } = data;
  const inputs = merge > 1 ? steps.slice(0, merge) : [];
  const rest = merge > 1 ? steps.slice(merge) : steps;

  return (
    <figure className="pl">
      <figcaption className="tech pl__title">{title}</figcaption>

      <div className="pl__body">
        {inputs.length > 0 && (
          <div className="pl__merge">
            <div className="pl__inputs">
              {inputs.map((s) => (
                <span className="pl__node pl__node--input" key={s}>
                  {s}
                </span>
              ))}
            </div>
            <span className="pl__merge-line" aria-hidden="true" />
          </div>
        )}

        <ol className="pl__flow">
          {rest.map((s, i) => (
            <li className="pl__step" key={s}>
              {(i > 0 || inputs.length > 0) && (
                <span className="pl__link" aria-hidden="true" />
              )}
              <span className="pl__node">{s}</span>
            </li>
          ))}

          {loop && (
            <li className="pl__step pl__step--loop">
              <span className="pl__link pl__link--dash" aria-hidden="true" />
              <span className="pl__node pl__node--loop">
                <span aria-hidden="true">↻</span> {loopLabel}
              </span>
              <span className="pl__loop-note">постоянное дообучение модели</span>
            </li>
          )}
        </ol>
      </div>
    </figure>
  );
}
