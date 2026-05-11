# Nodo Corporativo Av. 14 — Landing Page

## Contexto del proyecto

Landing page premium para un edificio corporativo ubicado en **Calle 14 Nº 5976 esq. Calle 160, Berazategui, Buenos Aires**.

El objetivo comercial real es atraer a una **clínica de diagnóstico por imágenes** como inquilina/compradora del edificio completo. La estética es corporativa AAA, pero cada especificación técnica (estructura de hormigón, ascensor Otis Gen2, plantas libres, accesos amplios) apunta a ese perfil médico. Mantener siempre ese doble objetivo al editar copy.

**Desarrollador:** Restaket II Real State Market  
**Comercialización exclusiva:** Proficio Propiedades — `info@proficio.com.ar` · `+54 11 4946-5540`  
**Ingeniero estructural:** Ing. Manuel Marcelo Gurreri

---

## Stack

- **HTML5** semántico — todo el contenido está en `index.html`
- **TailwindCSS** vía Play CDN (sin build)
- **CSS custom** en `css/style.css`
- **Vanilla JS** en `js/main.js`
- Sin framework, sin bundler, sin package.json

---

## Archivos clave

| Archivo | Rol |
|---|---|
| `index.html` | Página completa, todas las secciones |
| `css/style.css` | Estilos custom, animaciones, paleta de colores |
| `js/main.js` | Navbar scroll, tabs, lightbox, modal, formulario |

---

## Paleta y tipografía

```css
--accent:      #b5893a   /* dorado */
--dark:        #0a0a0a   /* fondo principal */
--dark-mid:    #111111
--text-cream:  #ede8dc
--font:        'Inter', sans-serif
--font-serif:  'Cormorant Garamond', serif
```

---

## Secciones de la página (orden)

1. **Navbar** — Logo "Nodo Corporativo / AV. 14 · BERAZATEGUI" + links de navegación
2. **Hero** — Fondo con `fachada-principal.webp`, título, CTA
3. **Strip de fotos** — 3 imágenes horizontales de la fachada
4. **Ubicación** — Dato "20 min de CABA · 20 min de La Plata" + mapa Google Maps embed
5. **Planta Baja** — Galería de 2-3 fotos + descripción
6. **Plantas** — Tabs con 4 opciones: Space Free / Layout Modular / Open Office / Penthouse
7. **Ingeniería / Dossier Técnico** — Galería de planos + cards técnicas
8. **Penthouse** — Sección hero secundaria
9. **Contacto** — Formulario + información de contacto
10. **Footer** — Logos, navegación, comercializadora

---

## Imágenes — estructura de carpetas

```
images/
  hero/
    fachada-principal.webp   ← fondo del hero (pantalla completa)
    fachada-aerea.webp       ← strip de fotos + galería PB
    fachada-lateral.webp     ← strip de fotos
    fachada-detalle.webp     ← strip de fotos
    P3 Final.jpg             ← sin uso activo
  plantas/
    planta-openoffice.webp   ← tab "Space Free"
    planta-medica.webp       ← tab "Layout Modular"
    planta-uno.png           ← tab "Open Office"
    Planta Terraza.png       ← tab "Penthouse"
  entorno/
    entorno.webp             ← galería planta baja (foto extra)
  Estructura/                ← MAYÚSCULA (case-sensitive en Linux)
    1.1 - Plano Estructura.jpg
    1.2 - Plano Estructura.jpg
    ... hasta 1.7
  Logos/                     ← MAYÚSCULA (case-sensitive en Linux)
    Logo Restaket.png        ← logo del desarrollador (footer)
    Proficio Logo.png        ← logo de la comercializadora (footer, filtro blanco)
```

> **Importante:** Las carpetas `Logos/` y `Estructura/` tienen la primera letra en mayúscula. En macOS da lo mismo, pero en el servidor Linux de Vercel es case-sensitive. Siempre usar la ruta exacta.

---

## JavaScript — funcionalidades en main.js

- **Navbar scroll:** se oscurece al hacer scroll
- **Menú hamburguesa mobile**
- **Smooth scroll** a secciones
- **Animaciones fade-up** con IntersectionObserver
- **Barras de métricas** animadas al entrar en viewport
- **Tabs de plantas:** `.tab-btn` / `.tab-panel` — IDs: `tab-openoffice`, `tab-modular`, `tab-uno`, `tab-penthouse`
- **Lightbox de planos:** se abre al clickear cualquier `.plano-item`, navegación con flechas y teclado
- **Modal PDF:** botón "Ver Informe Cálculo de Estructuras" → modal con datos del Ing. Gurreri
- **Formulario de contacto:** envía a Formspree (`https://formspree.io/f/mbdwanrd`)

---

## Formulario de contacto

Endpoint actual: `https://formspree.io/f/mbdwanrd`  
Campos: Nombre, Empresa/Institución, Email corporativo, Cargo, Mensaje, Tipo de consulta  
El botón de envío dice: **"Consultar"**

---

## Deploy

- **Repositorio GitHub:** `https://github.com/TestIAMCH/nodo-corporativo-berazategui` (público)
- **Vercel project:** `nodo-corporativo-av14`
- **URL Vercel:** `https://nodo-corporativo-av14.vercel.app`
- **Dominio propio:** `https://nodocorporativo.com.ar` (delegado vía NIC.ar a Vercel)
- **SSL:** certificado emitido por Vercel automáticamente

### Para publicar cambios:

```bash
# Si el deploy automático por push está activo:
git add -A && git commit -m "descripción" && git push

# Si falla el auto-deploy (problema conocido con repo privado):
vercel deploy --prod --archive=tgz
```

> El auto-deploy desde GitHub está configurado. Si falla, usar el comando manual.

---

## Datos de contacto reales en la página

| Campo | Valor |
|---|---|
| Email | info@proficio.com.ar |
| Teléfono | +54 11 4946-5540 |
| Dirección | Calle 14 Nº 5976 esq. Calle 160, Berazategui, Buenos Aires |
| Distancia | 20 min de CABA · 20 min de La Plata |

---

## Notas de diseño

- No usar emojis en el código ni en el copy
- Tono: corporativo premium, frío, preciso — nunca informal
- El copy médico debe ser implícito, nunca explícito ("equipamiento de alta densidad", no "resonador magnético")
- Los logos en el footer usan `filter: brightness(0) invert(1)` para el de Proficio (blanco), y color original para Restaket
- El logo de Restaket tiene ancho = 50% del contenedor `footer-logo-wrap` (que toma el ancho del texto "AV. 14 · BERAZATEGUI")
