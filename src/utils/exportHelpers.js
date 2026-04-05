function download(name, content, type) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function exportCSV(transactions) {
  const rows = [['Date', 'Description', 'Category', 'Type', 'Amount']];
  transactions.forEach(t =>
    rows.push([t.date, `"${t.description}"`, t.category, t.type, t.amount])
  );
  download('vault-transactions.csv', rows.map(r => r.join(',')).join('\n'), 'text/csv');
}

export function exportJSON(transactions) {
  download('vault-transactions.json', JSON.stringify(transactions, null, 2), 'application/json');
}

export function exportSummary(transactions) {
  const inc = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Math.abs(t.amount), 0);
  const exp = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount), 0);
  const cats = {};
  transactions.filter(t => t.type === 'expense').forEach(t => {
    cats[t.category] = (cats[t.category] || 0) + Math.abs(t.amount);
  });
  const topCat = Object.entries(cats).sort((a, b) => b[1] - a[1])[0];
  const sr = inc > 0 ? ((inc - exp) / inc * 100).toFixed(1) : 0;
  const now = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });

  const txt = `VAULT FINANCE — SUMMARY REPORT
Generated: ${now}
${'═'.repeat(40)}

FINANCIAL OVERVIEW
──────────────────
Total Income:    $${inc.toLocaleString()}
Total Expenses:  $${exp.toLocaleString()}
Net Savings:     $${(inc - exp).toLocaleString()}
Savings Rate:    ${sr}%

TOP SPENDING CATEGORIES
────────────────────────
${Object.entries(cats)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => `${k.padEnd(18)} $${v.toLocaleString()}`)
    .join('\n')}

HIGHEST CATEGORY: ${topCat ? `${topCat[0]} ($${topCat[1].toLocaleString()})` : 'N/A'}
TRANSACTIONS: ${transactions.length} total
${'═'.repeat(40)}
`;
  download('vault-summary.txt', txt, 'text/plain');
}
