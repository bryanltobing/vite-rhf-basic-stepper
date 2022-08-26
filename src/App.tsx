import { useState } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'

import reactLogo from './assets/react.svg'
import './App.css'

type FormValues = {
  username: string
  password: string
  name: string
  email: string
  website: string
  github: string
}

function App() {
  const [activeStep, setActiveStep] = useState(0)
  const lastStepIndex = 2

  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      website: '',
      github: '',
    },
    resolver: async (data) => {
      let values: FormValues | {} = {}
      let errors: FieldErrors<FormValues> = {}

      if (activeStep === 0) {
        if (!data.username) {
          values = {}
          errors.username = {
            type: 'required',
            message: 'Username is required',
          }
        } else {
          values = data
          errors = {}
        }
        if (data.password.length < 6) {
          values = {}
          errors.password = {
            type: 'minLength',
            message: 'Password must include at least 6 characters',
          }
        } else {
        }
      }

      if (activeStep === 1) {
        if (!data.name) {
          values = {}
          errors.name = {
            type: 'required',
            message: 'Name is required',
          }
        }

        if (!/^\S+@\S+$/.test(data.email)) {
          values = {}
          errors.email = {
            type: 'pattern',
            message: 'Email is invalid',
          }
        }
      }

      if (activeStep === 2) {
        if (!data.website) {
          values = {}
          errors.website = {
            type: 'required',
            message: 'Website is required',
          }
        }
        if (!data.github) {
          values = {}
          errors.github = {
            type: 'required',
            message: 'Github is required',
          }
        }

        // PUT THIS IN LAST STEP
        if (Object.keys(errors).length < 1) {
          values = data
        }
      }

      return { values, errors }
    },
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

          <button type="submit">
            {activeStep === lastStepIndex ? 'Submit' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
