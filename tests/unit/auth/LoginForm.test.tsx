import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginForm from '@/app/(auth)/_components/LoginForm'
// import { describe, it, expect, jest, beforeEach } from '@jest/globals'

// Mocks are handled in setup.tsx
import { mockRouter } from '../../setup.tsx'
const mockPush = mockRouter.push


// Mock AuthContext
const mockCheckAuth = jest.fn()
jest.mock('@/context/AuthContext', () => ({
    useAuth: () => ({
        checkAuth: mockCheckAuth,
    }),
}))

// Mock auth actions
const mockHandleLogin = jest.fn()
jest.mock('@/lib/actions/auth.actions', () => ({
    handleLogin: (data: any) => mockHandleLogin(data),
}))



describe('LoginForm', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        window.alert = jest.fn() // Mock window.alert
    })

    it('renders login form correctly', () => {
        render(<LoginForm />)
        expect(screen.getByText(/Login to Your Account/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument()
    })

    it('shows validation error for invalid email', async () => {
        render(<LoginForm />)
        const emailInput = screen.getByPlaceholderText(/Email/i)
        const passwordInput = screen.getByPlaceholderText(/Password/i)
        const loginButton = screen.getByRole('button', { name: /Log In/i })

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })

        const form = emailInput.closest('form')!
        fireEvent.submit(form)

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Invalid email')
        })
    })

    it('calls handleLogin and redirects on successful login', async () => {
        mockHandleLogin.mockResolvedValue({ success: true, data: { token: 'fake-token' } })

        render(<LoginForm />)
        const emailInput = screen.getByPlaceholderText(/Email/i)
        const passwordInput = screen.getByPlaceholderText(/Password/i)
        const loginButton = screen.getByRole('button', { name: /Log In/i })

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password123' } })
        fireEvent.click(loginButton)

        await waitFor(() => {
            expect(mockHandleLogin).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'password123',
            })
            expect(mockCheckAuth).toHaveBeenCalled()
            expect(mockPush).toHaveBeenCalledWith('/dashboard')
        })
    })

    it('shows error alert on failed login', async () => {
        mockHandleLogin.mockResolvedValue({ success: false, message: 'Invalid credentials' })

        render(<LoginForm />)
        fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'wrongpassword' } })
        fireEvent.click(screen.getByRole('button', { name: /Log In/i }))

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith('Invalid credentials')
        })
    })
})
