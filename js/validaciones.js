export function validarString(string) {
  return !/[^A-Za-z\s\u00C0-\u017F]/i.test(string);
}

export function validarRango(num, min, max) {
  return num >= min && num <= max;
}

export function validarOpciones(string, opc1, opc2) {
  return string === opc1 || string === opc2;
}
