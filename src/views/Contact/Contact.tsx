import React from 'react'
import { useForm } from 'react-hook-form';

interface formInputs {
  nombre: string 
  email: string 
  telefono: number
}

export const Contact = () => {

  const { register, handleSubmit } = useForm<formInputs>();

  const onSubmit = (data: formInputs) => {
    console.log('onSubmit', data)
  }
  return (
    <div>
    <div>Contact</div>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder='Nombre' { ...register("nombre") }/>
      <input type="email" placeholder='Email' { ...register("email") } />
      <input type='phone' placeholder='Teléfono' {...register("telefono") } />
      <button>Enviar</button>
    </form>
    </div>
  )
}
