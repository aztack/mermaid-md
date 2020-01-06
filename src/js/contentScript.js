import log from './utils/logger.js';
window.addEventListener('message', e => {
  if (e.source === window) {
    chrome.runtime.sendMessage(e.data);
  }
});

// load and init mermaid
window.addEventListener('load', () => {
  execScript(chrome.runtime.getURL('js/lib/mermaid.8.4.4.min.js'), false, () => {
    log(`Mermaid loaded`);
    const nodes = [];
    debugger
    chrome.storage.sync.get(['selectors'], (result) => {
      const nodes = (result.selectors || []).reduce((all, sel) => {
        all = all.concat(Array.from(document.querySelectorAll(sel)));
        return all;
      }, []);
      nodes.forEach(it => {
        it.classList.add('mermaid');
      });
      execScript(`mermaid.init()`, true, () => {
        log(`Mermaid initialized`);
      }, (e) => {
        log(`Initialized mermaid failed:`, e)
      });
    });
  }, (e) => {
    log(`Load Mermaid failed:`, e);
  });
});

function execScript(code, embed, onload, onerror) {
  const s = document.createElement('script');
  if (embed) {
    s.textContent = code;
    onload && onload();
  } else {
    s.src = code;
  }
  s.onload = () => {
    s.remove();
    onload && onload();
  };
  s.onerror = (e) => {
    onerror && onerror(e);
  };
  document.body.appendChild(s);
}