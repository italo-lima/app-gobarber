import {ValidationError} from "yup"

// o lado esquerdo determina que pode ser qualquer nome, desde que seja uma string
// criação de keys dinãmicas
interface Erros {
  [key: string]: string;
}

export default function getVallidationErros(err: ValidationError): Erros {
  const validationsErrors: Erros = {}

  err.inner.forEach(error => {
    validationsErrors[error.path] = error.message
  })

  return validationsErrors
}
