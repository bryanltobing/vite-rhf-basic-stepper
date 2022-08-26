import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import reactLogo from './assets/react.svg'
import './App.css'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const firstStepSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must include at least 6 characters' }),
})
const secondStepSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().regex(/^\S+@\S+$/, { message: 'Email is invalid' }),
})
const lastStepSchema = z.object({
  website: z.string().min(1, { message: 'Website is required' }),
  github: z.string().min(1, { message: 'Github is required' }),
})

const schema = firstStepSchema.and(secondStepSchema).and(lastStepSchema)

type FormValues = z.infer<typeof schema>

function App() {
  const [activeStep, setActiveStep] = useState(0)
  const lastStepIndex = 2

  const usedSchema = useMemo(() => {
    if (activeStep === 0) {
      return firstStepSchema
    }

    if (activeStep === 1) {
      return secondStepSchema
    }

    // Last step
    return schema
  }, [activeStep])

  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      website: '',
      github: '',
    },
    resolver: zodResolver(usedSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (activeStep < lastStepIndex) {
      return setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    // SUBMIT FORM
    window.alert(JSON.stringify(data, null, 2))
  }

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h3>Stepper Form</h3>

      <h5 style={{ opacity: activeStep === 0 ? 1 : 0.5 }}>First Step</h5>
      <h5 style={{ opacity: activeStep === 1 ? 1 : 0.5 }}>Second Step</h5>
      <h5 style={{ opacity: activeStep === 2 ? 1 : 0.5 }}>Last Step</h5>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="stack space-2">
          {activeStep === 0 && (
            <>
              <input placeholder="Username" {...form.register('username')} />
              <input
                type="password"
                placeholder="Password"
                {...form.register('password')}
              />
            </>
          )}
          {activeStep === 1 && (
            <>
              <input placeholder="Name" {...form.register('name')} autoFocus />
              <input
                type="email"
                placeholder="Email"
                {...form.register('email')}
              />
            </>
          )}

          {activeStep === 2 && (
            <>
              <input
                placeholder="Website"
                {...form.register('website')}
                autoFocus
              />
              <input placeholder="Github" {...form.register('github')} />
            </>
          )}

          <ul>
            {Object.values(form.formState.errors).map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
          </ul>

          {activeStep !== 0 && (
            <button
              className="btn-secondary"
              type="button"
              onClick={() => setActiveStep((prevStep) => prevStep - 1)}
            >
              &lt; Back
            </button>
          )}

          <button type="submit">
            {activeStep === lastStepIndex ? 'Submit' : 'Next >'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
