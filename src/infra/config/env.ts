import z from 'zod'

const envSchema = z.object({
  SALT: z.string().default('salt'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.log(_env.error.format())

  throw new Error('Invalid environment variables')
}

export const env = _env.data
