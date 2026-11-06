const CODE_LINES = [
  [
    { text: '// portfolio.ts — Manuel Rincon', className: 'tok-comment' },
  ],
  [
    { text: 'import', className: 'tok-keyword' },
    { text: ' { ', className: 'tok-punct' },
    { text: 'Injectable', className: 'tok-type' },
    { text: ' } ', className: 'tok-punct' },
    { text: 'from', className: 'tok-keyword' },
    { text: ' ', className: 'tok-plain' },
    { text: '"@nestjs/common"', className: 'tok-string' },
    { text: ';', className: 'tok-punct' },
  ],
  [],
  [
    { text: 'type', className: 'tok-keyword' },
    { text: ' ', className: 'tok-plain' },
    { text: 'Stack', className: 'tok-type' },
    { text: ' = ', className: 'tok-punct' },
    { text: '"Angular"', className: 'tok-string' },
    { text: ' | ', className: 'tok-punct' },
    { text: '"React"', className: 'tok-string' },
    { text: ' | ', className: 'tok-punct' },
    { text: '"NestJS"', className: 'tok-string' },
    { text: ' | ', className: 'tok-punct' },
    { text: '".NET"', className: 'tok-string' },
    { text: ';', className: 'tok-punct' },
  ],
  [],
  [
    { text: 'interface', className: 'tok-keyword' },
    { text: ' ', className: 'tok-plain' },
    { text: 'Developer', className: 'tok-type' },
    { text: ' {', className: 'tok-punct' },
  ],
  [
    { text: '  name', className: 'tok-prop' },
    { text: ': ', className: 'tok-punct' },
    { text: 'string', className: 'tok-type' },
    { text: ';', className: 'tok-punct' },
  ],
  [
    { text: '  role', className: 'tok-prop' },
    { text: ': ', className: 'tok-punct' },
    { text: '"Full Stack"', className: 'tok-string' },
    { text: ';', className: 'tok-punct' },
  ],
  [
    { text: '  stack', className: 'tok-prop' },
    { text: ': ', className: 'tok-punct' },
    { text: 'Stack[]', className: 'tok-type' },
    { text: ';', className: 'tok-punct' },
  ],
  [
    { text: '}', className: 'tok-punct' },
  ],
  [],
  [
    { text: '@Injectable', className: 'tok-decorator' },
    { text: '()', className: 'tok-punct' },
  ],
  [
    { text: 'export', className: 'tok-keyword' },
    { text: ' ', className: 'tok-plain' },
    { text: 'class', className: 'tok-keyword' },
    { text: ' ', className: 'tok-plain' },
    { text: 'PortfolioService', className: 'tok-type' },
    { text: ' {', className: 'tok-punct' },
  ],
  [
    { text: '  private', className: 'tok-keyword' },
    { text: ' ', className: 'tok-plain' },
    { text: 'readonly', className: 'tok-keyword' },
    { text: ' ', className: 'tok-plain' },
    { text: 'developer', className: 'tok-var' },
    { text: ': ', className: 'tok-punct' },
    { text: 'Developer', className: 'tok-type' },
    { text: ' = {', className: 'tok-punct' },
  ],
  [
    { text: '    name', className: 'tok-prop' },
    { text: ': ', className: 'tok-punct' },
    { text: '"Manuel Rincon"', className: 'tok-string' },
    { text: ',', className: 'tok-punct' },
  ],
  [
    { text: '    role', className: 'tok-prop' },
    { text: ': ', className: 'tok-punct' },
    { text: '"Full Stack"', className: 'tok-string' },
    { text: ',', className: 'tok-punct' },
  ],
  [
    { text: '    stack', className: 'tok-prop' },
    { text: ': [', className: 'tok-punct' },
    { text: '"Angular"', className: 'tok-string' },
    { text: ', ', className: 'tok-punct' },
    { text: '"React"', className: 'tok-string' },
    { text: ', ', className: 'tok-punct' },
    { text: '"NestJS"', className: 'tok-string' },
    { text: ', ', className: 'tok-punct' },
    { text: '".NET"', className: 'tok-string' },
    { text: ']', className: 'tok-punct' },
    { text: ',', className: 'tok-punct' },
  ],
  [
    { text: '  };', className: 'tok-punct' },
  ],
  [
    { text: '}', className: 'tok-punct' },
  ],
];

const TYPE_MIN_DELAY = 9;
const TYPE_MAX_DELAY = 24;
const LINE_PAUSE = 130;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomTypeDelay = () =>
  TYPE_MIN_DELAY + Math.random() * (TYPE_MAX_DELAY - TYPE_MIN_DELAY);

const createLineElement = () => {
  const line = document.createElement('span');
  line.className = 'hero-code__line';
  return line;
};

const addLineNumbers = (gutter) => {
  CODE_LINES.forEach((_, index) => {
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    gutter.appendChild(number);
  });
};

export function initCodeTyping() {
  const output = document.getElementById('hero-code-output');
  const gutter = document.getElementById('hero-code-gutter');
  const status = document.getElementById('hero-code-status');

  if (!output || !gutter) return;

  addLineNumbers(gutter);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const caret = document.createElement('span');
  caret.className = 'hero-code__caret';
  caret.setAttribute('aria-hidden', 'true');

  const markReady = () => {
    if (!status) return;
    status.textContent = 'ready';
    status.parentElement?.classList.add('is-ready');
  };

  const renderLine = (tokens) => {
    const line = createLineElement();
    output.appendChild(line);
    line.appendChild(caret);

    tokens.forEach((token) => {
      const tokenEl = document.createElement('span');
      tokenEl.className = token.className;
      tokenEl.textContent = token.text;
      line.insertBefore(tokenEl, caret);
    });
  };

  if (prefersReducedMotion) {
    CODE_LINES.forEach(renderLine);
    caret.remove();
    markReady();
    return;
  }

  const typeLine = async (tokens) => {
    const line = createLineElement();
    output.appendChild(line);
    line.appendChild(caret);

    for (const token of tokens) {
      const tokenEl = document.createElement('span');
      tokenEl.className = token.className;
      line.insertBefore(tokenEl, caret);

      for (const char of token.text) {
        tokenEl.textContent += char;
        await sleep(randomTypeDelay());
      }
    }
  };

  const typeCode = async () => {
    for (const tokens of CODE_LINES) {
      await typeLine(tokens);
      await sleep(tokens.length === 0 ? LINE_PAUSE / 2 : LINE_PAUSE);
    }
    markReady();
  };

  typeCode();
}
