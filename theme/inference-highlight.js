// Custom syntax highlighting support for Inference source code in mdBook.
//
// This script runs after mdBook's main scripts and re-highlights any
// ```inference code blocks using the Rust highlighter from highlight.js.

(function() {
    if (typeof window === 'undefined' || !window.hljs || !window.document) {
        return;
    }

    var hljs = window.hljs;

    function highlightInferenceBlocks() {
        var nodes = Array.prototype.slice.call(
            document.querySelectorAll('code.language-inference')
        );

        if (!nodes.length) {
            return;
        }

        nodes.forEach(function(block) {
            var code = block.textContent;
            if (!code) {
                return;
            }

            var result;
            try {
                if (typeof hljs.highlight === 'function') {
                    result = hljs.highlight(code, {
                        language: 'inference',
                        ignoreIllegals: true
                    });
                } else if (typeof hljs.highlightAuto === 'function') {
                    // Fallback to auto-detection if needed.
                    result = hljs.highlightAuto(code);
                } else {
                    return;
                }
            } catch (e) {
                return;
            }

            if (!result || typeof result.value !== 'string') {
                return;
            }

            block.innerHTML = result.value;
            block.classList.add('hljs');
            block.classList.remove('language-inference');
            block.classList.add('language-rust');
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', highlightInferenceBlocks);
    } else {
        highlightInferenceBlocks();
    }
})();
