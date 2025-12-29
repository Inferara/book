// Minimal highlighter stub for mdBook that adds syntax highlighting
// support for Inference source code blocks (```inference).
//
// mdBook will call `hljs.configure` and `hljs.highlightBlock` on all
// code blocks. We provide just enough of the highlight.js API for that
// to work, and implement custom coloring for `language-inference`.

(function() {
	if (typeof window === 'undefined' || !window.document) {
		return;
	}

	if (!window.hljs) {
		window.hljs = {};
	}

	var hljs = window.hljs;

	// mdBook calls this to configure highlight.js; we ignore options.
	hljs.configure = hljs.configure || function(_options) {
		// no-op
	};

	function escapeHtml(text) {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	function highlightInference(code) {
		var lines = code.split(/\r?\n/);
		var keywordRegex = /\b(fn|return|let|mut|if|else|while|for|match|type|spec|ensures|requires|assert|assume|true|false)\b/g;
		var typeRegex = /\b(i8|i16|i32|i64|u8|u16|u32|u64|bool|unit)\b/g;
		var numberRegex = /\b(0x[0-9a-fA-F]+|0b[01]+|\d+)\b/g;
		var commentRegex = /\/\/(.*)$/;
		var docstringRegex = /\/\/\/(.*)$/;
		var fnNameRegex = /(\s*)(fn)(\s+)([A-Za-z_][A-Za-z0-9_]*)/;

		return lines.map(function(line) {
			// Check if line contains a comment or docstring first
			var docstringMatch = line.match(docstringRegex);
			var commentMatch = !docstringMatch && line.match(commentRegex);
			
			var codeBeforeComment = line;
			var commentPart = '';
			
			if (docstringMatch) {
				codeBeforeComment = line.substring(0, docstringMatch.index);
				commentPart = line.substring(docstringMatch.index);
			} else if (commentMatch) {
				codeBeforeComment = line.substring(0, commentMatch.index);
				commentPart = line.substring(commentMatch.index);
			}
			
			// Escape and highlight the code part
			var html = escapeHtml(codeBeforeComment);
			
			// Function names in declarations: fn name(...)
			html = html.replace(fnNameRegex, function(_, ws, fnKw, gap, name) {
				return ws
					+ '<span class="hljs-keyword">' + fnKw + '<\/span>'
					+ gap
					+ '<span class="hljs-title hljs-function">' + name + '<\/span>';
			});
			// Keywords
			html = html.replace(keywordRegex, '<span class="hljs-keyword">$1<\/span>');
			// Types (styled as built-ins so they are colored in both
			// light and dark highlight themes)
			html = html.replace(typeRegex, '<span class="hljs-type hljs-built_in">$1<\/span>');
			// Numbers
			html = html.replace(numberRegex, '<span class="hljs-number">$1<\/span>');
			
			// Add comment/docstring part at the end
			if (commentPart) {
				html += '<span class="hljs-comment">' + escapeHtml(commentPart) + '<\/span>';
			}

			return html;
		}).join('\n');
	}

	// Core API used by mdBook.
	hljs.highlightBlock = function(block) {
		if (!block || !block.classList) {
			return;
		}

		if (block.classList.contains('language-inference')) {
			var code = block.textContent || '';
			var highlighted = highlightInference(code);
			block.innerHTML = highlighted;
			block.classList.add('hljs');
			return;
		}

		// For all other languages, leave the block as-is (no-op).
	};
})();

