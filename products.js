const PRODUCTS = [
  { id: "pc-nj-minji", name: "Minji photocard", group: "NewJeans", type: "Photocard", price: 12.5, era: "Get Up" },
  { id: "pc-nj-hanni", name: "Hanni photocard", group: "NewJeans", type: "Photocard", price: 14, era: "Get Up" },
  { id: "alb-bts-proof", name: "Proof compact", group: "BTS", type: "Album", price: 28, era: "Proof" },
  { id: "pc-skz-felix", name: "Felix photocard", group: "Stray Kids", type: "Photocard", price: 16, era: "5-STAR" },
  { id: "pc-skz-hyunjin", name: "Hyunjin photocard", group: "Stray Kids", type: "Photocard", price: 18, era: "5-STAR" },
  { id: "ls-bp", name: "Official lightstick", group: "BLACKPINK", type: "Lightstick", price: 55, era: "Ver. 2" },
  { id: "alb-ive", name: "I've MINE", group: "IVE", type: "Album", price: 24, era: "I've MINE" },
  { id: "pc-ive-wony", name: "Wonyoung photocard", group: "IVE", type: "Photocard", price: 15, era: "I've MINE" },
  { id: "set-txt", name: "Unit PC set (5)", group: "TXT", type: "Set", price: 42, era: "Temptation" },
  { id: "alb-aespa", name: "Armageddon", group: "aespa", type: "Album", price: 26, era: "Armageddon" }
];
function pulCart() {
  try { return JSON.parse(localStorage.getItem("pulCart") || "[]"); } catch { return []; }
}
function pulSave(items) {
  localStorage.setItem("pulCart", JSON.stringify(items));
  pulBadge();
}
function pulAdd(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const items = pulCart();
  const hit = items.find(x => x.id === id);
  if (hit) hit.qty += 1;
  else items.push({ id: p.id, name: p.name, group: p.group, price: p.price, qty: 1 });
  pulSave(items);
}
function pulSetQty(id, qty) {
  let items = pulCart();
  if (qty <= 0) items = items.filter(x => x.id !== id);
  else items.forEach(x => { if (x.id === id) x.qty = qty; });
  pulSave(items);
}
function pulTotal() {
  return pulCart().reduce((s, x) => s + x.price * x.qty, 0);
}
function pulBadge() {
  const n = pulCart().reduce((s, x) => s + x.qty, 0);
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = n ? String(n) : "";
    el.hidden = !n;
  });
}
document.addEventListener("DOMContentLoaded", pulBadge);
