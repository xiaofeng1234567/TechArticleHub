import { useEffect } from 'react';

// Simple Markdown parsing functions
export function parseMarkdown(markdown: string): string {
  let html = markdown;
  
  // Headers
  html = html.replace(/^# (.*$)/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^### (.*$)/gm, '<h3>$1</h3>');

  // Code blocks with language
  html = html.replace(/```(\w+)\n([\s\S]*?)```/gm, '<pre><code class="language-$1">$2</code></pre>');
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Lists
  html = html.replace(/^\- (.*$)/gm, '<li>$1</li>');
  html = html.replace(/^\d+\. (.*$)/gm, '<li>$1</li>');
  
  // Wrap lists
  let inList = false;
  const lines = html.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('<li>') && !inList) {
      lines[i] = '<ul>' + lines[i];
      inList = true;
    } else if (!lines[i].startsWith('<li>') && inList) {
      lines[i - 1] = lines[i - 1] + '</ul>';
      inList = false;
    }
  }
  
  if (inList) {
    lines[lines.length - 1] = lines[lines.length - 1] + '</ul>';
  }
  
  html = lines.join('\n');
  
  // Tables
  const tableRegex = /\|(.+)\|\n\|([-:]+\|)+\n((?:\|.+\|\n)+)/g;
  html = html.replace(tableRegex, function(match, headers, separators, rows) {
    const headerCells = headers.split('|').map(cell => cell.trim()).filter(Boolean);
    const headerRow = '<tr>' + headerCells.map(cell => `<th>${cell}</th>`).join('') + '</tr>';
    
    const bodyRows = rows.trim().split('\n').map(row => {
      const cells = row.split('|').map(cell => cell.trim()).filter(Boolean);
      return '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
    }).join('');
    
    return `<table><thead>${headerRow}</thead><tbody>${bodyRows}</tbody></table>`;
  });
  
  // Paragraphs (excluding elements that should not be wrapped)
  html = html.replace(/^(?!<h|<pre|<ul|<table|<li|<p)(.*$)/gm, '<p>$1</p>');
  
  return html;
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
