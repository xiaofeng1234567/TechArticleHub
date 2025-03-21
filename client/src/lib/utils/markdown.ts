import { useEffect } from 'react';

// Enhanced Markdown parsing functions
export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';
  
  let html = markdown;
  
  // Convert line breaks
  html = html.replace(/\r\n/g, '\n');
  html = html.replace(/\r/g, '\n');
  
  // Escape HTML special characters in code blocks with better styling
  const codeBlocks: string[] = [];
  html = html.replace(/```(\w*)\n([\s\S]*?)```/gm, (match, lang, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    const language = lang || 'text';
    codeBlocks.push(`
      <div class="code-block-wrapper relative my-6 rounded-lg overflow-hidden">
        <div class="code-language bg-slate-800 text-slate-300 text-xs px-4 py-1 font-mono">${language}</div>
        <pre class="p-0 m-0 bg-slate-800 text-slate-200 rounded-b-lg"><code class="language-${language} block p-4 overflow-x-auto">${escapeHtml(code.trim())}</code></pre>
      </div>
    `);
    return placeholder;
  });

  // Escape inline code with better styling
  const inlineCodes: string[] = [];
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`;
    inlineCodes.push(`<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-slate-800">${escapeHtml(code)}</code>`);
    return placeholder;
  });
  
  // Headers
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^#### (.*$)/gm, '<h4>$1</h4>');
  html = html.replace(/^##### (.*$)/gm, '<h5>$1</h5>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.*?)_/g, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="my-4 max-w-full rounded">');
  
  // Horizontal rule
  html = html.replace(/^\s*---+\s*$/gm, '<hr class="my-4">');
  
  // Blockquotes
  html = html.replace(/^>\s+(.*$)/gm, '<blockquote class="border-l-4 border-slate-300 pl-4 py-1 my-4 italic text-slate-600">$1</blockquote>');
  
  // Lists
  const unorderedListRegex = /(?:^\s*[-*+]\s+.+$\n?)+/gm;
  html = html.replace(unorderedListRegex, (match) => {
    const items = match.split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.trim().replace(/^[-*+]\s+(.*)$/, '<li>$1</li>'))
      .join('');
    return `<ul class="list-disc pl-5 my-4">${items}</ul>`;
  });

  const orderedListRegex = /(?:^\s*\d+\.\s+.+$\n?)+/gm;
  html = html.replace(orderedListRegex, (match) => {
    const items = match.split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.trim().replace(/^\d+\.\s+(.*)$/, '<li>$1</li>'))
      .join('');
    return `<ol class="list-decimal pl-5 my-4">${items}</ol>`;
  });
  
  // Tables
  const tableRegex = /\|(.+)\|\n\|([-:]+\|)+\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, function(match, headers, separators, rows) {
    const headerCells = headers.split('|').map((cell: string) => cell.trim()).filter(Boolean);
    const headerRow = '<tr>' + headerCells.map((cell: string) => `<th class="border border-slate-300 p-2 bg-slate-100">${cell}</th>`).join('') + '</tr>';
    
    const bodyRows = rows.trim().split('\n').map((row: string) => {
      const cells = row.split('|').map((cell: string) => cell.trim()).filter(Boolean);
      return '<tr>' + cells.map((cell: string) => `<td class="border border-slate-300 p-2">${cell}</td>`).join('') + '</tr>';
    }).join('');
    
    return `<div class="overflow-x-auto my-4"><table class="min-w-full border-collapse"><thead>${headerRow}</thead><tbody>${bodyRows}</tbody></table></div>`;
  });
  
  // Paragraphs (add a more specific regex to avoid nesting)
  const paragraphLines = html.split('\n').map(line => {
    if (line.trim() === '') return '';
    if (/^<(h[1-6]|pre|ul|ol|li|blockquote|div|p|table|hr)/i.test(line)) return line;
    return `<p>${line}</p>`;
  });
  html = paragraphLines.join('\n');

  // Replace code block placeholders
  codeBlocks.forEach((block, i) => {
    html = html.replace(`__CODE_BLOCK_${i}__`, block);
  });

  // Replace inline code placeholders
  inlineCodes.forEach((code, i) => {
    html = html.replace(`__INLINE_CODE_${i}__`, code);
  });
  
  return html;
}

// Helper function to escape HTML special characters
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Hook to apply syntax highlighting after render
export function useSyntaxHighlighting() {
  useEffect(() => {
    // Apply syntax highlighting to code blocks if hljs is available
    if (window.hljs) {
      document.querySelectorAll('pre code').forEach((block) => {
        window.hljs.highlightElement(block);
      });
    }
  }, []);
}

// Type declaration for external hljs library
declare global {
  interface Window {
    hljs: {
      highlightElement: (element: Element) => void;
    };
  }
}
