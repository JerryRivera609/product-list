"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  Boxes,
  ChevronDown,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  LockKeyhole,
  LogIn,
  Package,
  Search,
  ShieldCheck,
  User,
} from "lucide-react";

type Variant = {
  name: string;
  sku: string;
  stock: number;
  averageDailySales: number;
};

type Product = {
  name: string;
  sku: string;
  stock: number;
  averageDailySales: number;
  variants: Variant[];
};

const products: Product[] = [
  {
    name: "Camisa Oxford Premium",
    sku: "EZZ-CAM-001",
    stock: 186,
    averageDailySales: 12,
    variants: [
      { name: "Blanco / S", sku: "EZZ-CAM-001-B-S", stock: 42, averageDailySales: 3 },
      { name: "Blanco / M", sku: "EZZ-CAM-001-B-M", stock: 68, averageDailySales: 5 },
      { name: "Negro / L", sku: "EZZ-CAM-001-N-L", stock: 76, averageDailySales: 4 },
    ],
  },
  {
    name: "Pantalon Ejecutivo Slim",
    sku: "EZZ-PAN-014",
    stock: 94,
    averageDailySales: 7,
    variants: [
      { name: "Negro / 30", sku: "EZZ-PAN-014-N-30", stock: 18, averageDailySales: 1.5 },
      { name: "Negro / 32", sku: "EZZ-PAN-014-N-32", stock: 35, averageDailySales: 2.5 },
      { name: "Grafito / 34", sku: "EZZ-PAN-014-G-34", stock: 41, averageDailySales: 3 },
    ],
  },
  {
    name: "Blazer Core Monocromo",
    sku: "EZZ-BLA-022",
    stock: 51,
    averageDailySales: 2.8,
    variants: [
      { name: "Negro / M", sku: "EZZ-BLA-022-N-M", stock: 16, averageDailySales: 0.8 },
      { name: "Negro / L", sku: "EZZ-BLA-022-N-L", stock: 21, averageDailySales: 1.1 },
      { name: "Marfil / M", sku: "EZZ-BLA-022-M-M", stock: 14, averageDailySales: 0.9 },
    ],
  },
];

function getDaysLeft(stock: number, averageDailySales: number) {
  if (averageDailySales <= 0) return "Sin venta";
  return `${Math.ceil(stock / averageDailySales)} dias`;
}

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState<string[]>([products[0].sku]);

  const totals = useMemo(
    () =>
      products.reduce(
        (summary, product) => ({
          stock: summary.stock + product.stock,
          dailySales: summary.dailySales + product.averageDailySales,
        }),
        { stock: 0, dailySales: 0 },
      ),
    [],
  );

  function toggleProduct(sku: string) {
    setExpandedProducts((current) =>
      current.includes(sku) ? current.filter((item) => item !== sku) : [...current, sku],
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-white text-black">
        <section className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex min-h-[42rem] flex-col justify-between border-r border-black/10 bg-black p-8 text-white sm:p-12">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white text-black">
                <Boxes size={22} strokeWidth={2.4} />
              </div>
              <div>
                <p className="text-xl font-semibold tracking-tight">Ezzeta</p>
                <p className="text-xs uppercase tracking-[0.28em] text-white/55">Backoffice</p>
              </div>
            </div>

            <div className="max-w-xl py-16">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70">
                <ShieldCheck size={16} /> Control operativo
              </div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                Gestion profesional de inventario y venta diaria.
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-white/62">
                Una maqueta limpia para iniciar sesion, revisar productos, desplegar variantes y estimar cuantos dias quedan antes de agotar stock.
              </p>
            </div>

            <div className="grid gap-3 text-sm text-white/64 sm:grid-cols-3">
              <div className="border-t border-white/15 pt-4">
                <p className="text-2xl font-semibold text-white">{products.length}</p>
                <p>Productos activos</p>
              </div>
              <div className="border-t border-white/15 pt-4">
                <p className="text-2xl font-semibold text-white">{totals.stock}</p>
                <p>Unidades en stock</p>
              </div>
              <div className="border-t border-white/15 pt-4">
                <p className="text-2xl font-semibold text-white">{totals.dailySales.toFixed(1)}</p>
                <p>Venta diaria prom.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-white px-6 py-12 sm:px-10">
            <div className="w-full max-w-md rounded-lg border border-black/10 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] sm:p-8">
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-[0.26em] text-black/45">Acceso seguro</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Iniciar sesion</h2>
                <p className="mt-2 text-sm leading-6 text-black/55">Ingresa al panel administrativo de Ezzeta.</p>
              </div>

              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  setIsLoggedIn(true);
                }}
              >
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-black/70">Usuario</span>
                  <span className="flex h-12 items-center gap-3 rounded-md border border-black/12 px-3 focus-within:border-black">
                    <User size={18} className="text-black/45" />
                    <input
                      className="w-full bg-transparent text-sm outline-none placeholder:text-black/35"
                      defaultValue="admin@ezzeta.com"
                      type="email"
                    />
                  </span>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-black/70">Contrasena</span>
                  <span className="flex h-12 items-center gap-3 rounded-md border border-black/12 px-3 focus-within:border-black">
                    <LockKeyhole size={18} className="text-black/45" />
                    <input
                      className="w-full bg-transparent text-sm outline-none placeholder:text-black/35"
                      defaultValue="ezzeta2026"
                      type="password"
                    />
                  </span>
                </label>

                <button className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-black px-4 text-sm font-semibold text-white transition hover:bg-black/85">
                  Entrar al backoffice
                  <LogIn size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="flex min-h-screen">
        <aside
          className={`hidden border-r border-black/10 bg-black text-white transition-all duration-300 md:flex md:flex-col ${
            isSidebarCollapsed ? "w-[5.25rem]" : "w-72"
          }`}
        >
          <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-black">
                <Boxes size={21} />
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <p className="truncate text-lg font-semibold tracking-tight">Ezzeta</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/45">Admin</p>
                </div>
              )}
            </div>
            <button
              aria-label="Colapsar barra lateral"
              className="rounded-md border border-white/10 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              onClick={() => setIsSidebarCollapsed((value) => !value)}
            >
              {isSidebarCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
            </button>
          </div>

          <nav className="flex-1 px-3 py-5 flex items-start justify-center">
            <button className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-2 py-2 text-left text-sm font-semibold text-black">
              <Package size={19} />
              {!isSidebarCollapsed && <span>Productos</span>}
            </button>
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3 rounded-md border border-white/10 px-3 py-3 text-white/70">
              <BarChart3 size={18} className="shrink-0" />
              {!isSidebarCollapsed && <span className="text-sm">Maquetacion v1</span>}
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1 bg-zinc-50">
          <header className="flex min-h-20 flex-col gap-4 border-b border-black/10 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-black/40">Modulo</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">Productos</h1>
            </div>
            <div className="flex h-11 w-full items-center gap-3 rounded-md border border-black/10 bg-white px-3 sm:max-w-xs">
              <Search size={18} className="text-black/40" />
              <input className="w-full bg-transparent text-sm outline-none placeholder:text-black/35" placeholder="Buscar producto" />
            </div>
          </header>

          <div className="px-5 py-6 lg:px-8">
            <div className="mb-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-black/10 bg-white p-4">
                <p className="text-sm text-black/50">Stock total</p>
                <p className="mt-2 text-2xl font-semibold">{totals.stock}</p>
              </div>
              <div className="rounded-lg border border-black/10 bg-white p-4">
                <p className="text-sm text-black/50">Venta diaria promedio</p>
                <p className="mt-2 text-2xl font-semibold">{totals.dailySales.toFixed(1)}</p>
              </div>
              <div className="rounded-lg border border-black/10 bg-white p-4">
                <p className="text-sm text-black/50">Cobertura estimada</p>
                <p className="mt-2 text-2xl font-semibold">{getDaysLeft(totals.stock, totals.dailySales)}</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-black/10 bg-white">
              <div className="grid min-w-[760px] grid-cols-[1.5fr_0.6fr_0.8fr_0.8fr] border-b border-black/10 bg-black px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/72">
                <span>Producto</span>
                <span>Stock</span>
                <span>Venta diaria prom.</span>
                <span>Dias para agotarse</span>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[760px] divide-y divide-black/10">
                  {products.map((product) => {
                    const isExpanded = expandedProducts.includes(product.sku);

                    return (
                      <div key={product.sku}>
                        <button
                          className="grid w-full grid-cols-[1.5fr_0.6fr_0.8fr_0.8fr] items-center px-5 py-4 text-left transition hover:bg-zinc-50"
                          onClick={() => toggleProduct(product.sku)}
                        >
                          <span className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-black/10 bg-white">
                              {isExpanded ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
                            </span>
                            <span>
                              <span className="block font-semibold">{product.name}</span>
                              <span className="mt-1 block text-xs text-black/45">{product.sku}</span>
                            </span>
                          </span>
                          <span className="font-medium">{product.stock}</span>
                          <span>{product.averageDailySales}</span>
                          <span className="font-semibold">{getDaysLeft(product.stock, product.averageDailySales)}</span>
                        </button>

                        {isExpanded && (
                          <div className="bg-zinc-50/80 py-2">
                            {product.variants.map((variant) => (
                              <div
                                className="grid grid-cols-[1.5fr_0.6fr_0.8fr_0.8fr] items-center px-5 py-3 text-sm text-black/72"
                                key={variant.sku}
                              >
                                <span className="ml-11 border-l border-black/15 pl-5">
                                  <span className="block font-medium text-black">{variant.name}</span>
                                  <span className="mt-1 block text-xs text-black/40">{variant.sku}</span>
                                </span>
                                <span>{variant.stock}</span>
                                <span>{variant.averageDailySales}</span>
                                <span>{getDaysLeft(variant.stock, variant.averageDailySales)}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
