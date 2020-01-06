export default function log (...args) {
  args.unshift('background:#f9f; color: #000;font-size: 12px; padding: 0;border:1px solid black');
  args.unshift('%c[mermaid-md] ▶ ');
  return console.log.apply(console, args);
}