```
/* ========== Minimal向けカード風見出し（角丸なし・高コントラスト対応） ========== */
div[data-type="markdown"] {
  --card-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* --- H1 カード --- */
div[data-type="markdown"] .HyperMD-header-1 {
  background: linear-gradient(135deg, #ffe5e9, #fad4e0);
  color: #86142a !important;
  padding: 12px 14px;
  font-weight: 800;
  box-shadow: var(--card-shadow);
  margin-top: 1.5em;
  margin-bottom: 0;
}

/* H1本文 */
div[data-type="markdown"] .HyperMD-header-1 + .cm-line,
div[data-type="markdown"] .HyperMD-header-1 ~ .cm-line:not(.HyperMD-header-1):not(.HyperMD-header-2):not(.HyperMD-header-3) {
  background: #fff8fa;
  border: 2px solid #fad4e0;
  padding: 6px 12px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.03);
  margin-left: 4px;
  margin-right: 4px;
}

/* --- H2 カード --- */
div[data-type="markdown"] .HyperMD-header-2 {
  background: linear-gradient(135deg, #e3f2fd, #cbe7ff);
  color: #123d7c !important;
  font-weight: 700;
  padding: 8px 12px;
  margin-top: 1em;
  margin-bottom: 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

/* H2本文 */
div[data-type="markdown"] .HyperMD-header-2 + .cm-line,
div[data-type="markdown"] .HyperMD-header-2 ~ .cm-line:not(.HyperMD-header-1):not(.HyperMD-header-2):not(.HyperMD-header-3) {
  background: #f9fbff;
  border: 1.5px solid #90caf9;
  padding: 6px 12px;
  margin-left: 12px;
  margin-right: 8px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
}

/* --- H3 カード --- */
div[data-type="markdown"] .HyperMD-header-3 {
  background: linear-gradient(135deg, #e8f5e9, #d7efd9);
  color: #1b5e20 !important;
  padding: 6px 10px;
  margin-top: 0.8em;
  margin-bottom: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

/* H3本文 */
div[data-type="markdown"] .HyperMD-header-3 + .cm-line,
div[data-type="markdown"] .HyperMD-header-3 ~ .cm-line:not(.HyperMD-header-1):not(.HyperMD-header-2):not(.HyperMD-header-3) {
  background: #f6fff7;
  border: 1.5px solid #c8e6c9;
  padding: 4px 10px;
  margin-left: 16px;
  margin-right: 8px;
  box-shadow: inset 0 1px 1px rgba(0,0,0,0.02);
}

/* --- ダークモード対応（背景明るめ・文字白め） --- */
.theme-dark div[data-type="markdown"] .HyperMD-header-1 {
  background: linear-gradient(135deg, #622534, #7a3243);
  color: #fff5f6 !important;
  border-color: #a34a5e;
}
.theme-dark div[data-type="markdown"] .HyperMD-header-2 {
  background: linear-gradient(135deg, #243b57, #2f4b6e);
  color: #eaf4ff !important;
  border-color: #4f6f9c;
}
.theme-dark div[data-type="markdown"] .HyperMD-header-3 {
  background: linear-gradient(135deg, #1e3521, #2e5230);
  color: #f1fff1 !important;
  border-color: #4d7a50;
}

/* ダークモード本文背景も調整 */
.theme-dark div[data-type="markdown"] .HyperMD-header-1 + .cm-line,
.theme-dark div[data-type="markdown"] .HyperMD-header-1 ~ .cm-line:not(.HyperMD-header-1):not(.HyperMD-header-2):not(.HyperMD-header-3) {
  background: #38242a;
  border-color: #7a3045;
}

.theme-dark div[data-type="markdown"] .HyperMD-header-2 + .cm-line,
.theme-dark div[data-type="markdown"] .HyperMD-header-2 ~ .cm-line:not(.HyperMD-header-1):not(.HyperMD-header-2):not(.HyperMD-header-3) {
  background: #1e2736;
  border-color: #4f6f9c;
}

.theme-dark div[data-type="markdown"] .HyperMD-header-3 + .cm-line,
.theme-dark div[data-type="markdown"] .HyperMD-header-3 ~ .cm-line:not(.HyperMD-header-1):not(.HyperMD-header-2):not(.HyperMD-header-3) {
  background: #202d22;
  border-color: #4d7a50;
}
```