import AuthButton from '../auth/AuthButton'

export default function NavBar() {
  return (
    <div className="relative px-4">
      <div className="flex justify-between border-b-2 border-gray-100 py-4">
        <div className="flex justify-start">test</div>
        <div className="flex justify-center">test</div>
        <div className="flex justify-end">
          <AuthButton />
        </div>
      </div>
    </div>
  )
}