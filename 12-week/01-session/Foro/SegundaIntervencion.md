# ¿Qué errores de diseño han encontrado en apps que utilizan a diario y cómo se podrían mejorar?

En el uso cotidiano de aplicaciones móviles, es común encontrar errores de diseño que afectan la experiencia de usuario (UX) y la usabilidad. Estos fallos suelen estar relacionados con una mala jerarquía visual, interacciones confusas o falta de coherencia en la navegación. Debemos analizar y corregir estos errores es esencial para lograr interfaces más intuitivas, accesibles y eficientes. 

Los errores más comunes en las apps modernas provienen de decisiones que priorizan la estética o la novedad sobre la facilidad de uso. Al aplicar principios de las experiencias de usuarios como la consistencia, visibilidad del estado del sistema y prevención de errores mejora la confianza y satisfacción del usuario.

Cada una de estas mejoras deben enfocarse en reducir la carga mental, anticipar las necesidades del usuario y mantener patrones familiares de interacción, lo que a largo plazo incrementa la fidelización y el éxito de la aplicación.

## Referencias 

Nielsen, J., & Molich, R. (1990). Heuristic Evaluation of User Interfaces.

Norman, D. (2013). The Design of Everyday Things. Basic Books.

Krug, S. (2014). Don’t Make Me Think, Revisited: A Common Sense Approach to Web Usability. New Riders

## Ejemplo código

A continuación, se muestra un pequeño ejemplo en **HTML y CSS** para mejorar la jerarquía visual de un botón de acción principal en una app:

```html

<!-- Antes: botón poco visible -->
<button class="btn">Enviar</button>

<!-- Después: botón con jerarquía visual clara -->
<button class="btn-primary">Enviar</button>

<style>
  .btn-primary {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }
</style>

