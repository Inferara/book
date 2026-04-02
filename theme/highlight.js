// Syntax highlighting for Inference language code blocks in mdBook.
//
// Replaces the default highlight.js bundled by mdBook with a minimal
// stub that tokenizes ```inference blocks and applies hljs-* CSS
// classes compatible with all built-in mdBook themes.

(function() {
	if (typeof window === 'undefined' || !window.document) {
		return;
	}

	if (!window.hljs) {
		window.hljs = {};
	}

	var hljs = window.hljs;

	hljs.configure = hljs.configure || function() {};

	function escapeHtml(text) {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');
	}

	var KEYWORDS = /^(fn|pub|return|let|mut|const|if|else|loop|break|struct|impl|enum|type|forall|exists|assume|unique|spec|external|use|module|from|assert)$/;
	var BUILTINS = /^(i8|i16|i32|i64|u8|u16|u32|u64|bool|unit)$/;

	function highlightInference(code) {
		var tokens = [];
		var i = 0;
		var len = code.length;

		while (i < len) {
			// Doc comments ///
			if (code[i] === '/' && code[i + 1] === '/' && code[i + 2] === '/') {
				var end = code.indexOf('\n', i);
				if (end === -1) end = len;
				tokens.push('c', code.substring(i, end));
				i = end;
				continue;
			}

			// Line comments //
			if (code[i] === '/' && code[i + 1] === '/') {
				var end = code.indexOf('\n', i);
				if (end === -1) end = len;
				tokens.push('c', code.substring(i, end));
				i = end;
				continue;
			}

			// String literals
			if (code[i] === '"') {
				var j = i + 1;
				while (j < len && code[j] !== '"' && code[j] !== '\n') {
					if (code[j] === '\\') j++;
					j++;
				}
				if (j < len && code[j] === '"') j++;
				tokens.push('s', code.substring(i, j));
				i = j;
				continue;
			}

			// Numbers (hex, binary, decimal)
			if (code[i] >= '0' && code[i] <= '9') {
				var j = i;
				if (code[j] === '0' && (code[j + 1] === 'x' || code[j + 1] === 'X')) {
					j += 2;
					while (j < len && /[0-9a-fA-F_]/.test(code[j])) j++;
				} else if (code[j] === '0' && (code[j + 1] === 'b' || code[j + 1] === 'B')) {
					j += 2;
					while (j < len && /[01_]/.test(code[j])) j++;
				} else {
					while (j < len && /[0-9_]/.test(code[j])) j++;
				}
				tokens.push('n', code.substring(i, j));
				i = j;
				continue;
			}

			// @ (uzumaki)
			if (code[i] === '@') {
				tokens.push('k', '@');
				i++;
				continue;
			}

			// Identifiers and keywords
			if ((code[i] >= 'a' && code[i] <= 'z') || (code[i] >= 'A' && code[i] <= 'Z') || code[i] === '_') {
				var j = i;
				while (j < len && (/[a-zA-Z0-9_]/.test(code[j]) || code[j] === '\'')) j++;
				var word = code.substring(i, j);

				if (word === 'true' || word === 'false') {
					tokens.push('l', word);
				} else if (word === 'self') {
					tokens.push('k', word);
				} else if (word === 'fn') {
					tokens.push('k', word);
					// Look ahead for function name
					var k = j;
					while (k < len && (code[k] === ' ' || code[k] === '\t')) k++;
					if (k < len && ((code[k] >= 'a' && code[k] <= 'z') || (code[k] >= 'A' && code[k] <= 'Z') || code[k] === '_')) {
						tokens.push('', code.substring(j, k));
						var nameStart = k;
						while (k < len && (/[a-zA-Z0-9_]/.test(code[k]) || code[k] === '\'')) k++;
						tokens.push('t', code.substring(nameStart, k));
						i = k;
						continue;
					}
				} else if (KEYWORDS.test(word)) {
					tokens.push('k', word);
				} else if (BUILTINS.test(word)) {
					tokens.push('b', word);
				} else if (word[0] >= 'A' && word[0] <= 'Z') {
					tokens.push('T', word);
				} else {
					// Check for function call: identifier followed by (
					var k = j;
					while (k < len && (code[k] === ' ' || code[k] === '\t')) k++;
					if (k < len && code[k] === '(') {
						tokens.push('t', word);
					} else {
						tokens.push('', word);
					}
				}
				i = j;
				continue;
			}

			// Plain characters (operators, punctuation, whitespace)
			tokens.push('', code[i]);
			i++;
		}

		var parts = [];
		for (var idx = 0; idx < tokens.length; idx += 2) {
			var tag = tokens[idx];
			var text = escapeHtml(tokens[idx + 1]);
			switch (tag) {
				case 'k': parts.push('<span class="hljs-keyword">' + text + '</span>'); break;
				case 'b': parts.push('<span class="hljs-type">' + text + '</span>'); break;
				case 'T': parts.push('<span class="hljs-title">' + text + '</span>'); break;
				case 't': parts.push('<span class="hljs-title">' + text + '</span>'); break;
				case 'l': parts.push('<span class="hljs-literal">' + text + '</span>'); break;
				case 'n': parts.push('<span class="hljs-number">' + text + '</span>'); break;
				case 's': parts.push('<span class="hljs-string">' + text + '</span>'); break;
				case 'c': parts.push('<span class="hljs-comment">' + text + '</span>'); break;
				default:  parts.push(text); break;
			}
		}
		return parts.join('');
	}

	hljs.highlightBlock = function(block) {
		if (!block || !block.classList) {
			return;
		}

		if (block.classList.contains('language-inference')) {
			var code = block.textContent || '';
			block.innerHTML = highlightInference(code);
			block.classList.add('hljs');
			return;
		}
	};
})();
